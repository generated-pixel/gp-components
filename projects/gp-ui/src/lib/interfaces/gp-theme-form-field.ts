import { StyleValue } from '../base/style/base.style'
import { GpThemeModeDictionary } from './gp-theme-mode-dictionary'

export interface GpThemeFormFieldBorderDefinition {
  width?: StyleValue
  focusWidth?: StyleValue
  radius?: StyleValue
  color?: GpThemeModeDictionary<StyleValue>
  focusColor?: GpThemeModeDictionary<StyleValue>
  [property: string]: StyleValue | GpThemeModeDictionary<StyleValue> | undefined
}

export interface GpThemeFormFieldDefinition {
  gap?: StyleValue
  padding?: StyleValue
  border?: GpThemeFormFieldBorderDefinition
  background?: GpThemeModeDictionary<StyleValue>
  color?: GpThemeModeDictionary<StyleValue>
  placeholderColor?: GpThemeModeDictionary<StyleValue>
  focusRing?: GpThemeModeDictionary<StyleValue>
  [property: string]: StyleValue | GpThemeFormFieldBorderDefinition | GpThemeModeDictionary<StyleValue> | undefined
}
