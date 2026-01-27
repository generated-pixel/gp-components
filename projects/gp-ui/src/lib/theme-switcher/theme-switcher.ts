import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { GP_DEFAULT_THEME } from '../themes/default.theme';
import { GP_DEVELOPER_THEME } from '../themes/developer.theme';
import { GP_PRIDE_THEME } from '../themes/pride.theme';
import { Base } from '../base/base';
import { THEME_SWITCHER_STYLE, THEME_SWITCHER_STYLE_PROVIDER } from './style/theme-switcher.style';
import { ThemeMode } from '../config/gp-config';
import {
  ResolvedThemeModeOption,
  ResolvedThemeOption,
  ThemeModeOption,
  ThemeSwitchOption,
} from '../interfaces/theme-switcher.interfaces';

export type { ThemeModeOption, ThemeSwitchOption } from '../interfaces/theme-switcher.interfaces';

@Component({
  selector: 'gp-theme-switcher',
  standalone: true,
  templateUrl: './theme-switcher.html',
  providers: [THEME_SWITCHER_STYLE_PROVIDER],
})
export class ThemeSwitcher extends Base {
  private readonly style = inject(THEME_SWITCHER_STYLE);

  readonly themesInput = input<ThemeSwitchOption[] | null>(null);
  readonly initialThemeId = input<string | undefined>(undefined);
  readonly themeModesInput = input<ThemeModeOption[] | null>(null);
  readonly initialThemeMode = input<ThemeMode | undefined>(undefined);

  private readonly builtInThemes = signal<ThemeSwitchOption[]>([
    { id: 'default', translationKey: 'themeDefaultLabel', theme: GP_DEFAULT_THEME },
    { id: 'developer', translationKey: 'themeDeveloperLabel', theme: GP_DEVELOPER_THEME },
    { id: 'pride', translationKey: 'themePrideLabel', theme: GP_PRIDE_THEME },
  ]);

  private readonly selectedThemeId = signal<string | undefined>(undefined);
  private readonly selectedThemeMode = signal<ThemeMode>('auto');

  private readonly builtInModes = signal<ThemeModeOption[]>([
    { id: 'auto', translationKey: 'themeModeAutoLabel' },
    { id: 'light', translationKey: 'themeModeLightLabel' },
    { id: 'dark', translationKey: 'themeModeDarkLabel' },
  ]);

  readonly labelText = computed(() => this.resolveTranslation('themeSwitcherLabel', 'Theme'));
  readonly modeLabelText = computed(() => this.resolveTranslation('themeModeLabel', 'Color mode'));

  readonly resolvedOptions = computed<ResolvedThemeOption[]>(() => {
    const provided = this.themesInput();
    const source = provided && provided.length ? provided : this.builtInThemes();

    return source.map((option) => ({
      ...option,
      label: this.resolveTranslation(option.translationKey, option.id),
    }));
  });

  readonly resolvedModeOptions = computed<ResolvedThemeModeOption[]>(() => {
    const provided = this.themeModesInput();
    const source = provided && provided.length ? provided : this.builtInModes();

    return source.map((option) => ({
      ...option,
      label: this.resolveTranslation(option.translationKey, option.id),
    }));
  });

  constructor() {
    super();
    effect(() => {
      const desiredId = this.config.themeId();
      const options = this.resolvedOptions();

      if (!options.length) {
        return;
      }

      const fallbackId = options[0]?.id;
      const exists = desiredId ? options.find((option) => option.id === desiredId) : undefined;
      const targetId = exists?.id ?? fallbackId;

      if (!targetId) {
        return;
      }

      if (targetId === this.selectedThemeId()) {
        return;
      }

      this.applyTheme(targetId, { updateConfig: false });
    });

    effect(() => {
      const desiredMode = this.config.themeMode();
      const options = this.resolvedModeOptions();

      if (!options.length) {
        return;
      }

      const fallbackMode = options[0]?.id ?? 'auto';
      const exists = desiredMode ? options.find((option) => option.id === desiredMode) : undefined;
      const targetMode = exists?.id ?? fallbackMode;

      if (!targetMode) {
        return;
      }

      if (targetMode === this.selectedThemeMode()) {
        return;
      }

      this.applyThemeMode(targetMode, { updateConfig: false });
    });
  }

  override onInit(): void {
    super.onInit();
    this.attachStyle(this.style);

    const options = this.resolvedOptions();

    if (!options.length) {
      this.selectedThemeId.set(undefined);
      this.config.replaceTheme(undefined);
      this.config.setThemeId(undefined);
      return;
    }

    const configThemeId = this.config.themeId();
    const providedInitialId = this.initialThemeId();

    const targetId =
      this.pickExistingThemeId([configThemeId, providedInitialId], options) ?? options[0]?.id;

    if (!targetId) {
      return;
    }

    this.applyTheme(targetId);

    const modeOptions = this.resolvedModeOptions();

    if (!modeOptions.length) {
      this.applyThemeMode('auto');
      return;
    }

    const configThemeMode = this.config.themeMode();
    const providedInitialMode = this.initialThemeMode();
    const modeTarget =
      this.pickExistingThemeMode([configThemeMode, providedInitialMode], modeOptions) ??
      modeOptions[0]?.id ??
      'auto';

    this.applyThemeMode(modeTarget);
  }

  onThemeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const value = select.value;

    if (!value) {
      return;
    }

    this.applyTheme(value);
  }

  onThemeModeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const value = select.value as ThemeMode;

    if (!value) {
      return;
    }

    this.applyThemeMode(value);
  }

  protected readonly currentThemeId = computed(() => this.selectedThemeId());
  protected readonly currentThemeMode = computed(() => this.selectedThemeMode());

  private applyTheme(themeId: string, settings?: { updateConfig?: boolean }): void {
    const options = this.resolvedOptions();
    const selected = options.find((option) => option.id === themeId);

    if (!selected) {
      return;
    }

    this.selectedThemeId.set(selected.id);
    this.config.replaceTheme(selected.theme);

    if (settings?.updateConfig !== false) {
      this.config.setThemeId(selected.id);
    }
  }

  private applyThemeMode(mode: ThemeMode, settings?: { updateConfig?: boolean }): void {
    const options = this.resolvedModeOptions();
    const selected = options.find((option) => option.id === mode);

    const target = selected?.id ?? options[0]?.id ?? 'auto';

    if (!target) {
      return;
    }

    this.selectedThemeMode.set(target);

    if (settings?.updateConfig !== false) {
      this.config.setThemeMode(target);
    }
  }

  private pickExistingThemeId(
    ids: Array<string | undefined>,
    options: ResolvedThemeOption[],
  ): string | undefined {
    for (const id of ids) {
      if (!id) {
        continue;
      }

      const match = options.find((option) => option.id === id);

      if (match) {
        return match.id;
      }
    }

    return undefined;
  }

  private pickExistingThemeMode(
    modes: Array<ThemeMode | undefined>,
    options: ResolvedThemeModeOption[],
  ): ThemeMode | undefined {
    for (const mode of modes) {
      if (!mode) {
        continue;
      }

      const match = options.find((option) => option.id === mode);

      if (match) {
        return match.id;
      }
    }

    return undefined;
  }

  private resolveTranslation(key: string, fallback: string): string {
    const value = this.config.getTranslation(key);
    return typeof value === 'string' && value.trim().length ? value : fallback;
  }
}
