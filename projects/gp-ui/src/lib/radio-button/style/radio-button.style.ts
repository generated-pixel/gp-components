import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type RadioButtonTheme = ComponentStyleConfig;

export const RADIO_BUTTON_STYLE = new InjectionToken<BaseStyle<RadioButtonTheme>>(
  'RADIO_BUTTON_STYLE',
);

@Injectable()
export class RadioButtonStyle extends BaseStyle<RadioButtonTheme> {
  protected readonly componentName = 'gp-radio-button';

  protected getDefaultTheme(): RadioButtonTheme {
    return {
      classes: ['gp-radio-button-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-radio-button-theme-background, #ffffff)',
        color: 'var(--gp-radio-button-theme-color, #111827)',
        borderColor: 'var(--gp-radio-button-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-radio-button-theme-border-width, 1px)',
        radius: 'var(--gp-radio-button-theme-radius, 0.375rem)',
        padding: 'var(--gp-radio-button-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-radio-button.gp-radio-button-root {
          background-color: var(--gp-radio-button-background);
          color: var(--gp-radio-button-color);
          border: var(--gp-radio-button-border-width) solid var(--gp-radio-button-border-color);
          border-radius: var(--gp-radio-button-radius);
          padding: var(--gp-radio-button-padding);
        }

        @media (max-width: 600px) {
          gp-radio-button.gp-radio-button-root {
            width: var(--gp-radio-button-theme-mobile-width, 100%);
          }
        }
      `,
    };
  }
}

export const RADIO_BUTTON_STYLE_PROVIDER: Provider = {
  provide: RADIO_BUTTON_STYLE,
  useClass: RadioButtonStyle,
};
