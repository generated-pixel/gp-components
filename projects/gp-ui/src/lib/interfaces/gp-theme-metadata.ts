import { GpThemePrimitiveDefinition } from './gp-theme-primitive'
import { GpThemeSemanticDefinition } from './gp-theme-semantic'

export interface GpThemeMetadataDefinition {
  primitives?: GpThemePrimitiveDefinition | null
  semantic?: GpThemeSemanticDefinition | null
}
