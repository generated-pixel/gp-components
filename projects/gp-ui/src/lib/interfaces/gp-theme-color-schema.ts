import { StyleValue } from '../base/style/base.style'

export interface GpThemeColorSchemaMode {
  backgroundColor?: StyleValue
  surfaceColor?: StyleValue
  textColor?: StyleValue
  [property: string]: StyleValue | undefined
}

export interface GpThemeColorSchemaDefinition {
  light?: GpThemeColorSchemaMode
  dark?: GpThemeColorSchemaMode
  [mode: string]: GpThemeColorSchemaMode | undefined
}
