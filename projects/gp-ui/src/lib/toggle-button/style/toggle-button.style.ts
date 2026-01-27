import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type ToggleButtonTheme = ComponentStyleConfig;

export const TOGGLE_BUTTON_STYLE = new InjectionToken<BaseStyle<ToggleButtonTheme>>(
  'TOGGLE_BUTTON_STYLE',
);

@Injectable()
export class ToggleButtonStyle extends BaseStyle<ToggleButtonTheme> {
  protected readonly componentName = 'gp-toggle-button';

  protected getDefaultTheme(): ToggleButtonTheme {
    return {
      classes: ['gp-toggle-button-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-toggle-button-theme-background, #ffffff)',
        color: 'var(--gp-toggle-button-theme-color, #111827)',
        borderColor: 'var(--gp-toggle-button-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-toggle-button-theme-border-width, 1px)',
        radius: 'var(--gp-toggle-button-theme-radius, 0.375rem)',
        padding: 'var(--gp-toggle-button-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-toggle-button.gp-toggle-button-root {
          background-color: var(--gp-toggle-button-background);
          color: var(--gp-toggle-button-color);
          border: var(--gp-toggle-button-border-width) solid var(--gp-toggle-button-border-color);
          border-radius: var(--gp-toggle-button-radius);
          padding: var(--gp-toggle-button-padding);
        }

        @media (max-width: 600px) {
          gp-toggle-button.gp-toggle-button-root {
            width: var(--gp-toggle-button-theme-mobile-width, 100%);
          }
        }
      `,
    };
  }
}

export const TOGGLE_BUTTON_STYLE_PROVIDER: Provider = {
  provide: TOGGLE_BUTTON_STYLE,
  useClass: ToggleButtonStyle,
};
