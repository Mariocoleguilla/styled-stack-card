import { LitElement, html, css, nothing } from 'lit';
import type { HomeAssistant } from 'custom-card-helpers';
import {
  getGradientStyle,
  getPresetsVersion,
  retainPresets,
  updatePresetsHass,
  PRESETS_UPDATED_EVENT,
} from './presets';
import type { StyledStackConfig } from './styled-stack-config';

type CardElement = HTMLElement & {
  hass?: HomeAssistant;
  getCardSize?: () => number | Promise<number>;
};

// ---------------------------------------------------------------------------
// Helpers de HA compartidos por todas las instancias
// ---------------------------------------------------------------------------

let cardHelpers: any;
let cardHelpersPromise: Promise<any> | undefined;

function loadHelpers(): Promise<any> {
  if (!cardHelpersPromise) {
    cardHelpersPromise = (window as any).loadCardHelpers().then((h: any) => {
      cardHelpers = h;
      return h;
    });
  }
  return cardHelpersPromise!;
}

function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const ka = Object.keys(a);
  if (ka.length !== Object.keys(b).length) return false;
  return ka.every((k) => Object.prototype.hasOwnProperty.call(b, k) && deepEqual(a[k], b[k]));
}

function withTimeout<T>(ms: number, p: Promise<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('timeout')), ms);
    p.then(
      (v) => { clearTimeout(t); resolve(v); },
      (e) => { clearTimeout(t); reject(e); }
    );
  });
}

/** Igual que computeCardSize del frontend de HA. */
function computeCardSize(card: CardElement): number | Promise<number> {
  if (typeof card.getCardSize === 'function') {
    try {
      return withTimeout(500, Promise.resolve(card.getCardSize())).catch(() => 1);
    } catch {
      return 1;
    }
  }
  if (customElements.get(card.localName)) return 1;
  return customElements.whenDefined(card.localName).then(() => computeCardSize(card));
}

// ---------------------------------------------------------------------------

export class StyledStackCard extends LitElement {
  private _config?: StyledStackConfig;
  private _cards?: CardElement[];
  private _cardConfigs: any[] = [];
  private _cardsReady: Promise<void> = Promise.resolve();
  private _resolveCardsReady?: () => void;
  private _hass?: HomeAssistant;
  private _releasePresets?: () => void;
  private _gradientCache?: { style: any; version: number; presets: any; value: string };

  // `hass` NO es reactivo: cambia con cada evento de estado de HA y la tarjeta
  // no lo usa para pintarse; solo se reenvía a las tarjetas hijas.
  static get properties() {
    return {
      _config: { state: true },
      _cards: { state: true },
    };
  }

  private _onPresetsUpdated = () => {
    const preset = this._config?.style_config?.preset;
    // Solo hace falta repintar si la tarjeta usa un preset personalizado.
    if (preset && preset !== 'custom') this.requestUpdate();
  };

  // --- API de tarjeta Lovelace ------------------------------------------------

  public static async getConfigElement() {
    await StyledStackCard.ensureHaEditorElements();
    return document.createElement('styled-stack-card-editor');
  }

  /** Carga hui-card-picker y hui-card-element-editor vía el editor nativo del vertical-stack. */
  public static async ensureHaEditorElements(): Promise<void> {
    if (customElements.get('hui-card-picker') && customElements.get('hui-card-element-editor')) return;
    const helpers = await loadHelpers();
    // vertical-stack se carga en diferido: el elemento devuelto puede no estar
    // actualizado aún, así que esperamos a que la clase esté definida.
    helpers.createCardElement({ type: 'vertical-stack', cards: [] });
    await customElements.whenDefined('hui-vertical-stack-card');
    const cls = customElements.get('hui-vertical-stack-card') as any;
    if (cls?.getConfigElement) await cls.getConfigElement();
    await customElements.whenDefined('hui-card-picker');
    await customElements.whenDefined('hui-card-element-editor');
  }

  public static getStubConfig() {
    return {
      style_config: {
        preset: 'spotify',
      },
      cards: [],
    };
  }

  public set hass(hass: HomeAssistant | undefined) {
    this._hass = hass;
    if (this._cards) {
      for (const card of this._cards) card.hass = hass;
    }
    if (hass && this.isConnected) {
      if (!this._releasePresets) this._releasePresets = retainPresets(hass as any);
      else updatePresetsHass(hass as any);
    }
  }

  public get hass(): HomeAssistant | undefined {
    return this._hass;
  }

  public setConfig(config: StyledStackConfig) {
    if (!config) throw new Error('Invalid configuration');
    this._config = config;
    const cardConfigs = Array.isArray(config.cards) ? config.cards : [];
    if (cardHelpers) {
      this._buildCards(cardConfigs);
      return;
    }
    // Primera tarjeta de la página: los helpers aún no están cargados.
    if (!this._resolveCardsReady) {
      this._cardsReady = new Promise<void>((r) => (this._resolveCardsReady = r));
    }
    loadHelpers().then(() => {
      if (this._config === config) this._buildCards(cardConfigs);
    });
  }

  public async getCardSize(): Promise<number> {
    await this._cardsReady;
    if (!this._config) return 0;
    if (!this._cards || this._cards.length === 0) return 1;
    const sizes = await Promise.all(this._cards.map((c) => computeCardSize(c)));
    return sizes.reduce((sum, s) => sum + s, 0);
  }

  /** Vistas de secciones: ancho completo por defecto (igual que el valor por defecto de HA). */
  public getGridOptions() {
    return { columns: 12, min_columns: 3, rows: 'auto' as const };
  }

  /** Compatibilidad con HA < 2024.11 (antes de getGridOptions). */
  public getLayoutOptions() {
    return { grid_columns: 4, grid_min_columns: 1, grid_rows: 'auto' as const };
  }

  // --- Ciclo de vida -----------------------------------------------------------

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(PRESETS_UPDATED_EVENT, this._onPresetsUpdated);
    // Si los presets cambiaron mientras estaba desconectada (masonry mueve las
    // tarjetas entre columnas), el aviso se perdió: repintamos si hace falta.
    if (this.hasUpdated && this._backgroundStale()) this.requestUpdate();
    // Se rehace al volver a montarse (cambio de vista), no solo con el primer hass.
    if (this._hass && !this._releasePresets) {
      this._releasePresets = retainPresets(this._hass as any);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(PRESETS_UPDATED_EVENT, this._onPresetsUpdated);
    this._releasePresets?.();
    this._releasePresets = undefined;
  }

  // --- Tarjetas hijas ----------------------------------------------------------

  private _createCard(cardConfig: any): CardElement {
    const element: CardElement = cardHelpers.createCardElement(cardConfig);
    if (this._hass) element.hass = this._hass;
    // La tarjeta hija era personalizada y aún no estaba definida: HA creó una de
    // error/carga y avisa con ll-rebuild cuando ya existe. Recreamos solo esa
    // hija (sin esto, el evento sube hasta el hui-card padre, que recrea la
    // styled-stack-card entera).
    element.addEventListener(
      'll-rebuild',
      (ev) => {
        ev.stopPropagation();
        this._rebuildCard(element, cardConfig);
      },
      { once: true }
    );
    // Tarjeta nativa de carga diferida (p. ej. calendar): al definirse, le
    // volvemos a pasar hass por si cambió mientras tanto.
    element.addEventListener(
      'll-upgrade',
      (ev) => {
        ev.stopPropagation();
        if (this._hass) element.hass = this._hass;
      },
      { once: true }
    );
    return element;
  }

  private _buildCards(cardConfigs: any[]) {
    const oldCards = this._cards || [];
    const oldConfigs = this._cardConfigs;
    this._cards = cardConfigs.map((cfg, i) =>
      oldCards[i] && deepEqual(oldConfigs[i], cfg) ? oldCards[i] : this._createCard(cfg)
    );
    this._cardConfigs = cardConfigs;
    if (this._resolveCardsReady) {
      this._resolveCardsReady();
      this._resolveCardsReady = undefined;
    }
  }

  private _rebuildCard(oldElement: CardElement, cardConfig: any) {
    if (!this._cards) return;
    const index = this._cards.indexOf(oldElement);
    if (index === -1) return;
    const cards = [...this._cards];
    cards[index] = this._createCard(cardConfig);
    this._cards = cards;
  }

  // --- Render ----------------------------------------------------------------

  private _backgroundStale(): boolean {
    const cache = this._gradientCache;
    return !cache || cache.version !== getPresetsVersion() || cache.presets !== window.StyledStackCustomPresets;
  }

  private _background(): string {
    const style = this._config?.style_config;
    const version = getPresetsVersion();
    const presets = window.StyledStackCustomPresets;
    const cache = this._gradientCache;
    if (cache && cache.style === style && cache.version === version && cache.presets === presets) {
      return cache.value;
    }
    const value = getGradientStyle(style);
    this._gradientCache = { style, version, presets, value };
    return value;
  }

  render() {
    if (!this._config) return nothing;

    // Mientras se crean las hijas, contenedor vacío (sin el aviso de "sin tarjetas").
    if (!this._cards) {
      return html`
        <ha-card style="background: ${this._background()}; border: none;">
          <div class="card-content"></div>
        </ha-card>
      `;
    }

    if (this._cards.length === 0) {
      return html`
        <ha-card style="background: ${this._background()};">
          <div class="card-content" style="padding: 16px; text-align: center;">
            <p>⚙️ <b>Styled Stack Card:</b> Añade tarjetas en el código YAML o configura las opciones.</p>
          </div>
        </ha-card>
      `;
    }

    return html`
      <ha-card style="background: ${this._background()}; border: none;">
        <div class="card-content">
          ${this._cards}
        </div>
      </ha-card>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      ha-card {
        overflow: hidden;
      }
      .card-content {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 0;
        --ha-card-background: none !important;
        --card-background-color: transparent !important;
      }
    `;
  }
}
