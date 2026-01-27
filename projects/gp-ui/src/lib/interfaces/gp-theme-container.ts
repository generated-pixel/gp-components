import { StyleValue } from '../base/style/base.style';
import { GpThemeModeDictionary } from './gp-theme-mode-dictionary';

export interface GpThemeContainerBorderDefinition {
  width?: StyleValue;
  radius?: StyleValue;
  color?: GpThemeModeDictionary<StyleValue>;
  [property: string]: StyleValue | GpThemeModeDictionary<StyleValue> | undefined;
}

export interface GpThemeContainerDefinition {
  padding?: StyleValue;
  border?: GpThemeContainerBorderDefinition;
  shadow?: GpThemeModeDictionary<StyleValue>;
  [property: string]:
    | StyleValue
    | GpThemeContainerBorderDefinition
    | GpThemeModeDictionary<StyleValue>
    | undefined;
}
