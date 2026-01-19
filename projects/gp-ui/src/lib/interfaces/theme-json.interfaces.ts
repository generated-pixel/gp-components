import { ComponentThemeOverrides, ComponentVarsDefinition, StyleValue } from '../base/style/base.style'

export interface GpComponentThemeDefinition {
  classes?: string[]
  host?: Record<string, StyleValue>
  vars?: ComponentVarsDefinition
  css?: string
}

export type GpThemePrimitiveScale = Record<string, StyleValue>

export type GpThemePrimitiveDefinition = Record<string, GpThemePrimitiveScale | StyleValue>

export interface GpThemeModeDictionary<T> {
  light?: T
  dark?: T
  [mode: string]: T | undefined
}

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

export interface GpThemeContainerBorderDefinition {
  width?: StyleValue
  radius?: StyleValue
  color?: GpThemeModeDictionary<StyleValue>
  [property: string]: StyleValue | GpThemeModeDictionary<StyleValue> | undefined
}

export interface GpThemeContainerDefinition {
  padding?: StyleValue
  border?: GpThemeContainerBorderDefinition
  shadow?: GpThemeModeDictionary<StyleValue>
  [property: string]: StyleValue | GpThemeContainerBorderDefinition | GpThemeModeDictionary<StyleValue> | undefined
}

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

export interface GpThemeLabelDefinition {
  gap?: StyleValue
  fontSize?: StyleValue
  fontWeight?: StyleValue
  textTransform?: StyleValue
  letterSpacing?: StyleValue
  color?: GpThemeModeDictionary<StyleValue>
  requiredColor?: GpThemeModeDictionary<StyleValue>
  [property: string]: StyleValue | GpThemeModeDictionary<StyleValue> | undefined
}

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

export interface GpThemeIconDefinition {
  size?: StyleValue
  color?: GpThemeModeDictionary<StyleValue>
  strokeWidth?: GpThemeModeDictionary<StyleValue>
  [property: string]: StyleValue | GpThemeModeDictionary<StyleValue> | undefined
}

export interface GpThemeSemanticDefinition {
  colorSchema?: GpThemeColorSchemaDefinition
  container?: GpThemeContainerDefinition
  formField?: GpThemeFormFieldDefinition
  label?: GpThemeLabelDefinition
  themeSwitcher?: GpThemeSwitcherDefinition
  icon?: GpThemeIconDefinition
  [section: string]: unknown
}

export interface GpThemeMetadataDefinition {
  primitives?: GpThemePrimitiveDefinition | null
  semantic?: GpThemeSemanticDefinition | null
}

interface GpThemeDefinitionBase extends GpThemeMetadataDefinition {
  name?: string
  extends?: string | string[]
  primitive?: GpThemePrimitiveDefinition | null
  primitives?: GpThemePrimitiveDefinition | null
  semantic?: GpThemeSemanticDefinition | null
  sematic?: GpThemeSemanticDefinition | null
  components?: Record<string, GpComponentThemeDefinition | null | undefined>
}

export interface GpThemeJson extends GpThemeDefinitionBase {
  [componentId: string]: unknown
}

export interface GpThemeDefinition extends GpThemeDefinitionBase {
  components?: Record<string, GpComponentThemeDefinition | undefined>
}

export interface GpResolvedThemeMetadata {
  primitives: GpThemePrimitiveDefinition
  semantic: GpThemeSemanticDefinition
}

export interface GpResolvedTheme extends GpResolvedThemeMetadata {
  name?: string
  components: ComponentThemeOverrides
}

export type GpThemeRegistryEntry = ComponentThemeOverrides | GpThemeDefinition

export interface CreateThemeFromJsonOptions {
  registry?: Record<string, GpThemeRegistryEntry>
  onResolvedTheme?: (theme: GpResolvedTheme) => void
}
