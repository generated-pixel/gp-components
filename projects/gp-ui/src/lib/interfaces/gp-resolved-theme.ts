import { ComponentThemeOverrides } from '../base/style/base.style';
import { GpThemePrimitiveDefinition } from './gp-theme-primitive';
import { GpThemeSemanticDefinition } from './gp-theme-semantic';

export interface GpResolvedThemeMetadata {
  primitives: GpThemePrimitiveDefinition;
  semantic: GpThemeSemanticDefinition;
}

export interface GpResolvedTheme extends GpResolvedThemeMetadata {
  name?: string;
  components: ComponentThemeOverrides;
}
