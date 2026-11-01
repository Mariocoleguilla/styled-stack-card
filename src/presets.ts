// Gestión centralizada (singleton por página) de los presets personalizados.
//
// - Una única suscripción por conexión, compartida por todas las tarjetas y el
//   editor, con contador de referencias.
// - Con la integración >= 1.1 se usa `styled_stack_card/subscribe_presets`,
//   abierto a cualquier usuario y que además envía los presets actuales al
//   suscribirse (no hace falta descargar el archivo JS).
// - Sin ese comando (integración antigua o no instalada): administradores ->
//   `subscribe_events` como antes; resto -> sin suscripción, carga inicial del
//   archivo y refresco al volver a la pestaña (`visibilitychange`).
// - Cada actualización se guarda en `window.StyledStackCustomPresets` y se
//   anuncia UNA vez con el evento de window `styled-stack-card-presets-updated`.

export const PRESETS_UPDATED_EVENT = 'styled-stack-card-presets-updated';
const WS_SUBSCRIBE_TYPE = 'styled_stack_card/subscribe_presets';
const BUS_EVENT = 'styled_stack_card_presets_updated';
const MANAGER_DOMAIN = 'styled_stack_card_manager';
const PRESETS_URL = '/local/styled-stack-card-presets/styled-stack-card-presets.js';
const CACHE_KEY = 'styled-stack-card-presets-cache';
const TEARDOWN_DELAY = 5000;

type Presets = Record<string, any>;
type Unsub = () => void | Promise<void>;

interface HassLike {
  connection?: any;
  user?: { is_admin?: boolean };
  config?: { components?: string[] };
}

declare global {
  interface Window {
    StyledStackCustomPresets?: Presets;
  }
}

let presetsVersion = 0;
let lastSerialized: string | undefined;

/** Versión de los presets: cambia cada vez que el contenido cambia. */
export function getPresetsVersion(): number {
  return presetsVersion;
}

function setPresets(presets: Presets | null | undefined, persist = true): void {
  const value: Presets = presets && typeof presets === 'object' ? presets : {};
  let serialized: string;
  try {
    serialized = JSON.stringify(value);
  } catch {
    return;
  }
  window.StyledStackCustomPresets = value;
  if (serialized === lastSerialized) return;
  lastSerialized = serialized;
  presetsVersion++;
  if (persist) {
    try {
      localStorage.setItem(CACHE_KEY, serialized);
    } catch {
      /* almacenamiento no disponible */
    }
  }
  window.dispatchEvent(new CustomEvent(PRESETS_UPDATED_EVENT, { detail: value }));
}

// Estado inicial: el global (si alguien ya cargó el archivo) o la caché local,
// para pintar el degradado correcto en el primer render sin esperar a la red.
(() => {
  if (window.StyledStackCustomPresets) {
    try {
      lastSerialized = JSON.stringify(window.StyledStackCustomPresets);
    } catch {
      /* ignore */
    }
    return;
  }
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      window.StyledStackCustomPresets = JSON.parse(cached);
      lastSerialized = cached;
    }
  } catch {
    /* ignore */
  }
})();

// ---------------------------------------------------------------------------
// Carga del archivo JS de presets (solo como respaldo)
// ---------------------------------------------------------------------------

let fileLoadInFlight: Promise<void> | null = null;
let fileLoadedOnce = false;

function loadPresetsFile(): Promise<void> {
  if (fileLoadInFlight) return fileLoadInFlight;
  fileLoadInFlight = new Promise<void>((resolve) => {
    document.querySelectorAll('script[data-styled-stack-presets]').forEach((s) => s.remove());
    const script = document.createElement('script');
    script.src = `${PRESETS_URL}?t=${Date.now()}`;
    script.dataset.styledStackPresets = '';
    const done = (ok: boolean) => {
      fileLoadInFlight = null;
      fileLoadedOnce = true;
      // El archivo asigna window.StyledStackCustomPresets; setPresets solo
      // avisa a las tarjetas si el contenido ha cambiado de verdad.
      if (ok && window.StyledStackCustomPresets) setPresets(window.StyledStackCustomPresets);
      resolve();
    };
    script.onload = () => done(true);
    script.onerror = () => done(false);
    document.head.appendChild(script);
  });
  return fileLoadInFlight;
}

// ---------------------------------------------------------------------------
// Suscripción compartida
// ---------------------------------------------------------------------------

// ws:         suscrito a styled_stack_card/subscribe_presets
// events:     integración antigua + admin -> subscribe_events
// visibility: integración antigua + no admin -> refresco al volver a la pestaña
// pending:    el comando aún no existe porque HA está arrancando (o acaba de
//             reiniciarse); se reintenta cuando llega la config nueva de HA
// none:       sin integración
type Mode = 'ws' | 'events' | 'visibility' | 'pending' | 'none';

interface HassConfigLike {
  components?: string[];
  state?: string;
}

let refCount = 0;
let currentConn: any = null;
let currentHass: HassLike | null = null;
let unsub: Unsub | null = null;
let mode: Mode | null = null;
let subscribing: Promise<void> | null = null;
let teardownTimer: number | undefined;
let generation = 0;
let lastFailure = 0;
let pendingConfig: HassConfigLike | undefined;
let lastPendingRetry = 0;
const RETRY_DELAY = 30000;
const PENDING_RETRY_DELAY = 2000;

function managerLoaded(hass: HassLike): boolean {
  return !!hass.config?.components?.includes(MANAGER_DOMAIN);
}

function haRunning(hass: HassLike): boolean {
  const state = (hass.config as HassConfigLike | undefined)?.state;
  return !state || state === 'RUNNING';
}

const onVisibility = () => {
  if (document.visibilityState === 'visible' && currentHass && managerLoaded(currentHass)) {
    loadPresetsFile();
  }
};

// Tras una reconexión: rehacemos la suscripción nosotros (se pide con
// resubscribe: false). Si HA se ha reiniciado, puede que la integración aún no
// haya registrado el comando; la librería descartaría la suscripción en
// silencio, así que la pasamos a "pending" y reintentamos más tarde.
const onReady = () => {
  if (mode !== 'ws' && mode !== 'pending') return;
  if (!currentHass || refCount === 0) return;
  unsub = null; // la suscripción anterior murió con la conexión
  mode = null;
  startSubscribe(currentHass, true);
};

function teardown(): void {
  generation++;
  const u = unsub;
  unsub = null;
  if (u) {
    try {
      Promise.resolve(u()).catch(() => undefined);
    } catch {
      /* conexión ya cerrada */
    }
  }
  if (mode === 'visibility') {
    document.removeEventListener('visibilitychange', onVisibility);
  }
  currentConn?.removeEventListener?.('ready', onReady);
  mode = null;
  subscribing = null;
  pendingConfig = undefined;
  currentConn = null;
  currentHass = null;
}

async function subscribe(hass: HassLike, gen: number, afterReconnect: boolean): Promise<void> {
  const conn = hass.connection;
  try {
    const u = await conn.subscribeMessage(
      (ev: { presets?: Presets }) => setPresets(ev?.presets),
      { type: WS_SUBSCRIBE_TYPE },
      { resubscribe: false }
    );
    if (gen !== generation) {
      Promise.resolve(u()).catch(() => undefined);
      return;
    }
    unsub = u;
    mode = 'ws';
    return;
  } catch (err: any) {
    if (gen !== generation) return;
    if (err?.code !== 'unknown_command') {
      // Error transitorio (p. ej. conexión perdida): se reintentará en la
      // siguiente actualización de `hass`, como mucho cada RETRY_DELAY ms.
      lastFailure = Date.now();
      currentConn?.removeEventListener?.('ready', onReady);
      currentConn = null;
      mode = null;
      return;
    }
    // HA arrancando o recién reconectado: la integración puede no estar lista.
    if (afterReconnect || !haRunning(hass)) {
      mode = 'pending';
      pendingConfig = hass.config as HassConfigLike;
      return;
    }
  }

  // Integración antigua o no instalada.
  // Solo intentamos descargar el archivo si la integración está cargada: así,
  // sin integración, no hay un 404 en la consola en cada carga de página.
  const hasManager = managerLoaded(hass);
  if (hasManager && !fileLoadedOnce) loadPresetsFile();

  if (hasManager && hass.user?.is_admin) {
    try {
      const u = await conn.subscribeEvents(
        (ev: { data?: { presets?: Presets } }) => {
          if (ev?.data?.presets) setPresets(ev.data.presets);
          else loadPresetsFile();
        },
        BUS_EVENT
      );
      if (gen !== generation) {
        Promise.resolve(u()).catch(() => undefined);
        return;
      }
      unsub = u;
      mode = 'events';
      return;
    } catch {
      if (gen !== generation) return;
    }
  }

  if (hasManager) {
    document.addEventListener('visibilitychange', onVisibility);
    mode = 'visibility';
  } else {
    mode = 'none';
  }
}

function startSubscribe(hass: HassLike, afterReconnect = false): void {
  const gen = ++generation;
  subscribing = subscribe(hass, gen, afterReconnect).finally(() => {
    if (gen === generation) subscribing = null;
  });
}

function ensureSubscribed(hass: HassLike | undefined): void {
  if (!hass?.connection) return;
  if (currentConn === hass.connection && (mode !== null || subscribing)) {
    currentHass = hass;
    // Pendiente: reintentar cuando el frontend haya recibido una config nueva
    // de HA (se sustituye el objeto hass.config) con la integración cargada o
    // con HA ya en marcha (si entonces sigue sin existir, no está instalada).
    if (mode === 'pending' && !subscribing && hass.config !== pendingConfig) {
      if (Date.now() - lastPendingRetry < PENDING_RETRY_DELAY) return;
      if (managerLoaded(hass) || haRunning(hass)) {
        lastPendingRetry = Date.now();
        mode = null;
        startSubscribe(hass, false);
      } else {
        pendingConfig = hass.config as HassConfigLike;
      }
    }
    return;
  }
  if (currentConn && currentConn !== hass.connection) teardown();
  if (!currentConn && lastFailure && Date.now() - lastFailure < RETRY_DELAY) return;
  currentConn = hass.connection;
  currentHass = hass;
  currentConn.addEventListener?.('ready', onReady);
  startSubscribe(hass, false);
}

/**
 * Registra a un consumidor (tarjeta o editor montado). Llamar una vez al
 * montarse con `hass` disponible; devuelve la función para darse de baja.
 */
export function retainPresets(hass: HassLike | undefined): () => void {
  refCount++;
  if (teardownTimer !== undefined) {
    clearTimeout(teardownTimer);
    teardownTimer = undefined;
  }
  ensureSubscribed(hass);
  let released = false;
  return () => {
    if (released) return;
    released = true;
    refCount = Math.max(0, refCount - 1);
    if (refCount === 0 && teardownTimer === undefined) {
      // Pequeño margen: al cambiar de vista se desmontan todas las tarjetas y
      // se montan las nuevas casi a la vez; así no se rehace la suscripción.
      teardownTimer = window.setTimeout(() => {
        teardownTimer = undefined;
        if (refCount === 0) teardown();
      }, TEARDOWN_DELAY);
    }
  };
}

/** Actualiza la referencia a `hass` (por si cambia la conexión). */
export function updatePresetsHass(hass: HassLike | undefined): void {
  if (refCount > 0) ensureSubscribed(hass);
}

// ---------------------------------------------------------------------------
// Cálculo del degradado
// ---------------------------------------------------------------------------

const BUILT_IN: Record<string, string> = {
  spotify: 'linear-gradient(135deg, rgba(17, 255, 0, 0.60) 0%, rgba(22, 119, 9, 0.60) 50%, rgba(0, 0, 0, 0.60) 100%)',
  lights: 'linear-gradient(135deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 0, 0.65) 50%, rgba(191, 99, 13, 0.65) 100%)',
  water: 'linear-gradient(135deg, rgba(0, 170, 255, 0.60) 0%, rgba(0, 119, 179, 0.80) 50%, rgba(255, 255, 255, 0.37) 100%)',
  alert: 'linear-gradient(135deg, rgba(255, 0, 0, 0.60) 0%, rgba(119, 9, 9, 0.60) 50%, rgba(46, 0, 0, 0.60) 100%)',
};

function gradientFrom(def: any): string {
  const start = def.color_start || 'transparent';
  const end = def.color_end || 'transparent';
  const angle = def.angle ?? 135;
  if (def.color_mid) {
    const midPos = def.color_mid_pos ?? 50;
    return `linear-gradient(${angle}deg, ${start} 0%, ${def.color_mid} ${midPos}%, ${end} 100%)`;
  }
  return `linear-gradient(${angle}deg, ${start} 0%, ${end} 100%)`;
}

export function getGradientStyle(styleConfig: any): string {
  const style = styleConfig || {};
  const presetKey = style.preset || 'custom';

  // 1. Presets integrados
  if (Object.prototype.hasOwnProperty.call(BUILT_IN, presetKey)) return BUILT_IN[presetKey];

  // 2. Presets personalizados (window.StyledStackCustomPresets)
  const customPresets = window.StyledStackCustomPresets;
  if (presetKey !== 'custom' && customPresets && customPresets[presetKey]) {
    return gradientFrom(customPresets[presetKey]);
  }

  // 3. Colores manuales
  return gradientFrom(style);
}
