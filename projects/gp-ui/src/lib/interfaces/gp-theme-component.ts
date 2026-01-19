import { StyleValue } from '../base/style/base.style'

export interface GpThemeComponentVarsDefinition {
  default?: Record<string, StyleValue>
  light?: Record<string, StyleValue>
  dark?: Record<string, StyleValue>
  [mode: string]: Record<string, StyleValue> | undefined
}

export interface GpThemeComponentDefinition {
  host?: Record<string, StyleValue>
  vars?: GpThemeComponentVarsDefinition
  css?: string
}
