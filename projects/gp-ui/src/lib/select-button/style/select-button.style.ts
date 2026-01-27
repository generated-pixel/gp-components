import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type SelectButtonTheme = ComponentStyleConfig;

export const SELECT_BUTTON_STYLE = new InjectionToken<BaseStyle<SelectButtonTheme>>(
  'SELECT_BUTTON_STYLE',
);

@Injectable()
export class SelectButtonStyle extends BaseStyle<SelectButtonTheme> {
  protected readonly componentName = 'gp-select-button';

  protected getDefaultTheme(): SelectButtonTheme {
    return {
      classes: ['gp-select-button-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-select-button-theme-background, #ffffff)',
        color: 'var(--gp-select-button-theme-color, #111827)',
        borderColor: 'var(--gp-select-button-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-select-button-theme-border-width, 1px)',
        radius: 'var(--gp-select-button-theme-radius, 0.375rem)',
        padding: 'var(--gp-select-button-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-select-button.gp-select-button-root {
          background-color: var(--gp-select-button-background);
          color: var(--gp-select-button-color);
          border: var(--gp-select-button-border-width) solid var(--gp-select-button-border-color);
          border-radius: var(--gp-select-button-radius);
          padding: var(--gp-select-button-padding);
        }

        @media (max-width: 600px) {
          gp-select-button.gp-select-button-root {
            width: var(--gp-select-button-theme-mobile-width, 100%);
          }
        }
      `,
    };
  }
}

export const SELECT_BUTTON_STYLE_PROVIDER: Provider = {
  provide: SELECT_BUTTON_STYLE,
  useClass: SelectButtonStyle,
};
