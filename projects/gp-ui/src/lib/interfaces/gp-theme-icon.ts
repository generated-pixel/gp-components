import { StyleValue } from '../base/style/base.style';
import { GpThemeModeDictionary } from './gp-theme-mode-dictionary';

export interface GpThemeIconDefinition {
  size?: StyleValue;
  color?: GpThemeModeDictionary<StyleValue>;
  strokeWidth?: GpThemeModeDictionary<StyleValue>;
  [property: string]: StyleValue | GpThemeModeDictionary<StyleValue> | undefined;
}
