import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type AutoCompleteTheme = ComponentStyleConfig;

export const AUTO_COMPLETE_STYLE = new InjectionToken<BaseStyle<AutoCompleteTheme>>(
  'AUTO_COMPLETE_STYLE',
);

@Injectable()
export class AutoCompleteStyle extends BaseStyle<AutoCompleteTheme> {
  protected readonly componentName = 'gp-auto-complete';

  protected getDefaultTheme(): AutoCompleteTheme {
    return {
      classes: ['gp-auto-complete-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-auto-complete-theme-background, #ffffff)',
        color: 'var(--gp-auto-complete-theme-color, #111827)',
        borderColor: 'var(--gp-auto-complete-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-auto-complete-theme-border-width, 1px)',
        radius: 'var(--gp-auto-complete-theme-radius, 0.375rem)',
        padding: 'var(--gp-auto-complete-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-auto-complete.gp-auto-complete-root {
          background-color: var(--gp-auto-complete-background);
          color: var(--gp-auto-complete-color);
          border: var(--gp-auto-complete-border-width) solid var(--gp-auto-complete-border-color);
          border-radius: var(--gp-auto-complete-radius);
          padding: var(--gp-auto-complete-padding);
        }

        @media (max-width: 600px) {
          gp-auto-complete.gp-auto-complete-root {
            width: var(--gp-auto-complete-theme-mobile-width, 100%);
          }
        }
      `,
    };
  }
}

export const AUTO_COMPLETE_STYLE_PROVIDER: Provider = {
  provide: AUTO_COMPLETE_STYLE,
  useClass: AutoCompleteStyle,
};
