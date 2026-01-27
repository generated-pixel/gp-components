import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type FieldsetTheme = ComponentStyleConfig;

export const FIELDSET_STYLE = new InjectionToken<BaseStyle<FieldsetTheme>>('FIELDSET_STYLE');

@Injectable()
export class FieldsetStyle extends BaseStyle<FieldsetTheme> {
  protected readonly componentName = 'gp-fieldset';

  protected getDefaultTheme(): FieldsetTheme {
    return {
      classes: ['gp-fieldset-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-fieldset-theme-background, #ffffff)',
        color: 'var(--gp-fieldset-theme-color, #111827)',
        borderColor: 'var(--gp-fieldset-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-fieldset-theme-border-width, 1px)',
        radius: 'var(--gp-fieldset-theme-radius, 0.375rem)',
        padding: 'var(--gp-fieldset-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-fieldset.gp-fieldset-root {
          background-color: var(--gp-fieldset-background);
          color: var(--gp-fieldset-color);
          border: var(--gp-fieldset-border-width) solid var(--gp-fieldset-border-color);
          border-radius: var(--gp-fieldset-radius);
          padding: var(--gp-fieldset-padding);
        }

        @media (max-width: 600px) {
          gp-fieldset.gp-fieldset-root {
            width: var(--gp-fieldset-theme-mobile-width, 100%);
          }
        }
      `,
    };
  }
}

export const FIELDSET_STYLE_PROVIDER: Provider = {
  provide: FIELDSET_STYLE,
  useClass: FieldsetStyle,
};
