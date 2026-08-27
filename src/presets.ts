let customPresetsLoadingPromise: Promise<void> | null = null;

export function loadCustomPresets(force: boolean = false): Promise<void> {
  if (force) {
    customPresetsLoadingPromise = null;
    const oldScript = document.querySelector('script[src*="styled-stack-card-presets.js"]');
    if (oldScript) {
      oldScript.remove();
    }
  } else {
    if ((window as any).StyledStackCustomPresets) {
      return Promise.resolve();
    }
    if (customPresetsLoadingPromise) {
      return customPresetsLoadingPromise;
    }
  }

  customPresetsLoadingPromise = new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = `/local/styled-stack-card-presets/styled-stack-card-presets.js?t=${Date.now()}`;
    script.type = 'text/javascript';
    script.onload = () => {
      window.dispatchEvent(
        new CustomEvent('styled-stack-card-presets-updated', {
          detail: (window as any).StyledStackCustomPresets,
        })
      );
      resolve();
    };
    script.onerror = () => resolve();
    document.head.appendChild(script);
  });

  return customPresetsLoadingPromise;
}

export function getGradientStyle(styleConfig: any): string {
  const style = styleConfig || {};
  const presetKey = style.preset || 'custom';

  // 1. Built-in presets
  if (presetKey === 'spotify') return `linear-gradient(135deg, rgba(17, 255, 0, 0.60) 0%, rgba(22, 119, 9, 0.60) 50%, rgba(0, 0, 0, 0.60) 100%)`;
  if (presetKey === 'lights') return `linear-gradient(135deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 0, 0.65) 50%, rgba(191, 99, 13, 0.65) 100%)`;
  if (presetKey === 'water') return `linear-gradient(135deg, rgba(0, 170, 255, 0.60) 0%, rgba(0, 119, 179, 0.80) 50%, rgba(255, 255, 255, 0.37) 100%)`;
  if (presetKey === 'alert') return `linear-gradient(135deg, rgba(255, 0, 0, 0.60) 0%, rgba(119, 9, 9, 0.60) 50%, rgba(46, 0, 0, 0.60) 100%)`;

  // 2. Custom presets from window.StyledStackCustomPresets
  const customPresets = (window as any).StyledStackCustomPresets;
  if (presetKey !== 'custom' && customPresets && customPresets[presetKey]) {
    const custom = customPresets[presetKey];
    const start = custom.color_start || 'transparent';
    const end = custom.color_end || 'transparent';
    const angle = custom.angle ?? 135;

    if (custom.color_mid) {
      const midPos = custom.color_mid_pos ?? 50;
      return `linear-gradient(${angle}deg, ${start} 0%, ${custom.color_mid} ${midPos}%, ${end} 100%)`;
    }
    return `linear-gradient(${angle}deg, ${start} 0%, ${end} 100%)`;
  }

  // 3. Manual colors (preset === 'custom' or custom values)
  const start = style.color_start || 'transparent';
  const end = style.color_end || 'transparent';
  const angle = style.angle ?? 135;

  if (style.color_mid) {
    const midPos = style.color_mid_pos ?? 50;
    return `linear-gradient(${angle}deg, ${start} 0%, ${style.color_mid} ${midPos}%, ${end} 100%)`;
  }

  return `linear-gradient(${angle}deg, ${start} 0%, ${end} 100%)`;
}
