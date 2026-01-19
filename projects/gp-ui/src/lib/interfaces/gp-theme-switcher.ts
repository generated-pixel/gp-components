import { StyleValue } from '../base/style/base.style'
import { GpThemeModeDictionary } from './gp-theme-mode-dictionary'

export interface GpThemeSwitcherSelectDefinition {
  radius?: StyleValue
  padding?: StyleValue
  background?: GpThemeModeDictionary<StyleValue>
  border?: GpThemeModeDictionary<StyleValue>
  color?: GpThemeModeDictionary<StyleValue>
  focusBorder?: GpThemeModeDictionary<StyleValue>
  focusRing?: GpThemeModeDictionary<StyleValue>
  [property: string]: StyleValue | GpThemeModeDictionary<StyleValue> | undefined
}

export interface GpThemeSwitcherDefinition {
  gap?: StyleValue
  controlGap?: StyleValue
  labelColor?: GpThemeModeDictionary<StyleValue>
  select?: GpThemeSwitcherSelectDefinition
  [property: string]: StyleValue | GpThemeModeDictionary<StyleValue> | GpThemeSwitcherSelectDefinition | undefined
}
