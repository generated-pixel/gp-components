import { ComponentVarsDefinition, StyleValue } from '../base/style/base.style'

export interface GpComponentThemeDefinition {
  classes?: string[]
  host?: Record<string, StyleValue>
  vars?: ComponentVarsDefinition
  css?: string
}
