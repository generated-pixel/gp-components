import { ComponentThemeOverrides } from '../base/style/base.style';
import { ThemeMode } from '../config/gp-config';

export interface ThemeSwitchOption {
  id: string;
  translationKey: string;
  theme: ComponentThemeOverrides;
}

export interface ResolvedThemeOption extends ThemeSwitchOption {
  label: string;
}

export interface ThemeModeOption {
  id: ThemeMode;
  translationKey: string;
}

export interface ResolvedThemeModeOption extends ThemeModeOption {
  label: string;
}
