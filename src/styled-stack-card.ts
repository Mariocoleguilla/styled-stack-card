import { LitElement, html, css } from 'lit';
import { HomeAssistant, LovelaceCardConfig } from 'custom-card-helpers';
import { loadCustomPresets, getGradientStyle } from './presets';

interface StyledStackConfig extends LovelaceCardConfig {
  cards?: any[];
  style_config?: {
    preset?: string;
    color_start?: string;
    color_mid?: string;
    color_mid_pos?: number;
    color_end?: string;
    angle?: string | number;
    [key: string]: any;
  };
}

export class StyledStackCard extends LitElement {
  private _cards: any[];
  private config!: StyledStackConfig;
  private _unsubPresets?: () => void;
  private _isSubscribingPresets: boolean = false;
  private _boundPresetsUpdated!: () => void;

  static get properties() {
    return {
      hass: { attribute: false },
      config: { state: true },
      _cards: { state: true }
    };
  }

  constructor() {
    super();
    this._cards = [];
    this._boundPresetsUpdated = () => {
      this.requestUpdate();
    };
  }

  connectedCallback() {
    super.connectedCallback();
    loadCustomPresets().then(() => this.requestUpdate());
    window.addEventListener('styled-stack-card-presets-updated', this._boundPresetsUpdated);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('styled-stack-card-presets-updated', this._boundPresetsUpdated);
    if (this._unsubPresets) {
      this._unsubPresets();
      this._unsubPresets = undefined;
    }
    this._isSubscribingPresets = false;
  }

  public static async getConfigElement() {
    await StyledStackCard.ensureHaEditorElements();
    return document.createElement('styled-stack-card-editor');
  }

  /** Carga hui-card-picker y hui-card-element-editor vía el editor nativo del vertical-stack. */
  public static async ensureHaEditorElements(): Promise<void> {
    if (customElements.get('hui-card-picker')) return;

    const helpers = await (window as any).loadCardHelpers();
    const stackCard = helpers.createCardElement({ type: 'vertical-stack' });
    const cardClass = stackCard.constructor as { getConfigElement?: () => Promise<unknown> };

    if (cardClass.getConfigElement) {
      await cardClass.getConfigElement();
    }

    await customElements.whenDefined('hui-card-picker');
    await customElements.whenDefined('hui-card-element-editor');
  }

  private _hass!: HomeAssistant;

  public set hass(hass: HomeAssistant) {
    const oldHass = this._hass;
    this._hass = hass;
    if (this._cards) {
      this._cards.forEach((card) => {
        card.hass = hass;
      });
    }

    if (hass && !oldHass && (hass as any).connection && !this._unsubPresets && !this._isSubscribingPresets) {
      this._isSubscribingPresets = true;
      try {
        (hass as any).connection.subscribeEvents((ev: any) => {
          if (ev.data?.presets) {
            (window as any).StyledStackCustomPresets = ev.data.presets;
          }
          loadCustomPresets(true).then(() => this.requestUpdate());
        }, 'styled_stack_card_presets_updated').then((unsub: any) => {
          this._unsubPresets = unsub;
          this._isSubscribingPresets = false;
        }).catch(() => {
          this._isSubscribingPresets = false;
        });
      } catch (e) {
        this._isSubscribingPresets = false;
      }
    }
  }

  public get hass(): HomeAssistant {
    return this._hass;
  }

  async setConfig(config: StyledStackConfig) {
    this.config = config;
    loadCustomPresets().then(() => this.requestUpdate());
    if (config.cards && Array.isArray(config.cards)) {
      await this._createCards();
    } else {
      this._cards = [];
    }
  }

  private async _createCards() {
    const helpers = await (window as any).loadCardHelpers();

    this._cards = await Promise.all(
      this.config.cards!.map(async (cardConfig: any) => {
        const element = helpers.createCardElement(cardConfig);
        if (this._hass) {
          element.hass = this._hass;
        }
        return element;
      })
    );
  }

  private getGradientStyle() {
    return getGradientStyle(this.config?.style_config);
  }

  // Configuración por defecto para el buscador de tarjetas
  public static getStubConfig() {
    return {
      style_config: {
        preset: 'spotify'
      },
      cards: []
    };
  }

  render() {
    if (!this.config) return html``;

    if (!this._cards || this._cards.length === 0) {
      return html`
        <ha-card style="background: ${this.getGradientStyle()};">
          <div class="card-content" style="padding: 16px; text-align: center;">
            <p>⚙️ <b>Styled Stack Card:</b> Añade tarjetas en el código YAML o configura las opciones.</p>
          </div>
        </ha-card>
      `;
    }

    return html`
      <ha-card style="background: ${this.getGradientStyle()}; border: none;">
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
        transition: all 0.3s ease-out;
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
