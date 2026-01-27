import { StyleValue } from '../base/style/base.style';
import { GpThemeModeDictionary } from './gp-theme-mode-dictionary';

export interface GpThemeLabelDefinition {
  gap?: StyleValue;
  fontSize?: StyleValue;
  fontWeight?: StyleValue;
  textTransform?: StyleValue;
  letterSpacing?: StyleValue;
  color?: GpThemeModeDictionary<StyleValue>;
  requiredColor?: GpThemeModeDictionary<StyleValue>;
  [property: string]: StyleValue | GpThemeModeDictionary<StyleValue> | undefined;
}
