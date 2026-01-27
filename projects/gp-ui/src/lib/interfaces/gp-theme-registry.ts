import { ComponentThemeOverrides } from '../base/style/base.style';
import { GpResolvedTheme } from './gp-resolved-theme';
import { GpThemeDefinition } from './gp-theme-definition';

export type GpThemeRegistryEntry = ComponentThemeOverrides | GpThemeDefinition;

export interface CreateThemeFromJsonOptions {
  registry?: Record<string, GpThemeRegistryEntry>;
  onResolvedTheme?: (theme: GpResolvedTheme) => void;
}
