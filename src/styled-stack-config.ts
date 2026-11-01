import type { LovelaceCardConfig } from 'custom-card-helpers';

export interface StyledStackConfig extends LovelaceCardConfig {
  cards?: LovelaceCardConfig[];
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
