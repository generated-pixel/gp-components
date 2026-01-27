import { GpThemeColorSchemaDefinition } from './gp-theme-color-schema';
import { GpThemeComponentDefinition } from './gp-theme-component';
import { GpThemeContainerDefinition } from './gp-theme-container';
import { GpThemeFormFieldDefinition } from './gp-theme-form-field';
import { GpThemeIconDefinition } from './gp-theme-icon';
import { GpThemeLabelDefinition } from './gp-theme-label';
import { GpThemeSwitcherDefinition } from './gp-theme-switcher';

export interface GpThemeSemanticDefinition {
  colorSchema?: GpThemeColorSchemaDefinition;
  container?: GpThemeContainerDefinition;
  formField?: GpThemeFormFieldDefinition;
  label?: GpThemeLabelDefinition;
  themeSwitcher?: GpThemeSwitcherDefinition;
  icon?: GpThemeIconDefinition;
  panel?: GpThemeComponentDefinition;
  inputText?: GpThemeComponentDefinition;
  password?: GpThemeComponentDefinition;
  tooltip?: GpThemeComponentDefinition;
  blockui?: GpThemeComponentDefinition;
  [section: string]: unknown;
}
