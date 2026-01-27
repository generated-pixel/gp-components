import { GpComponentThemeDefinition } from './gp-component-theme-definition';
import { GpThemeMetadataDefinition } from './gp-theme-metadata';
import { GpThemePrimitiveDefinition } from './gp-theme-primitive';
import { GpThemeSemanticDefinition } from './gp-theme-semantic';

interface GpThemeDefinitionBase extends GpThemeMetadataDefinition {
  name?: string;
  extends?: string | string[];
  primitive?: GpThemePrimitiveDefinition | null;
  primitives?: GpThemePrimitiveDefinition | null;
  semantic?: GpThemeSemanticDefinition | null;
  sematic?: GpThemeSemanticDefinition | null;
  components?: Record<string, GpComponentThemeDefinition | null | undefined>;
}

export interface GpThemeJson extends GpThemeDefinitionBase {
  [componentId: string]: unknown;
}

export interface GpThemeDefinition extends GpThemeDefinitionBase {
  components?: Record<string, GpComponentThemeDefinition | undefined>;
}
