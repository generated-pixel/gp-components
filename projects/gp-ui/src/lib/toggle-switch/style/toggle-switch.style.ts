import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type ToggleSwitchTheme = ComponentStyleConfig;

export const TOGGLE_SWITCH_STYLE = new InjectionToken<BaseStyle<ToggleSwitchTheme>>(
  'TOGGLE_SWITCH_STYLE',
);

@Injectable()
export class ToggleSwitchStyle extends BaseStyle<ToggleSwitchTheme> {
  protected readonly componentName = 'gp-toggle-switch';

  protected getDefaultTheme(): ToggleSwitchTheme {
    return {
      classes: ['gp-toggle-switch-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-toggle-switch-theme-background, #ffffff)',
        color: 'var(--gp-toggle-switch-theme-color, #111827)',
        borderColor: 'var(--gp-toggle-switch-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-toggle-switch-theme-border-width, 1px)',
        radius: 'var(--gp-toggle-switch-theme-radius, 0.375rem)',
        padding: 'var(--gp-toggle-switch-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-toggle-switch.gp-toggle-switch-root {
          background-color: var(--gp-toggle-switch-background);
          color: var(--gp-toggle-switch-color);
          border: var(--gp-toggle-switch-border-width) solid var(--gp-toggle-switch-border-color);
          border-radius: var(--gp-toggle-switch-radius);
          padding: var(--gp-toggle-switch-padding);
        }

        @media (max-width: 600px) {
          gp-toggle-switch.gp-toggle-switch-root {
            width: var(--gp-toggle-switch-theme-mobile-width, 100%);
          }
        }
      `,
    };
  }
}

export const TOGGLE_SWITCH_STYLE_PROVIDER: Provider = {
  provide: TOGGLE_SWITCH_STYLE,
  useClass: ToggleSwitchStyle,
};
