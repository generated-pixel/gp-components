import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type MultiSelectTheme = ComponentStyleConfig;

export const MULTI_SELECT_STYLE = new InjectionToken<BaseStyle<MultiSelectTheme>>(
  'MULTI_SELECT_STYLE',
);

@Injectable()
export class MultiSelectStyle extends BaseStyle<MultiSelectTheme> {
  protected readonly componentName = 'gp-multi-select';

  protected getDefaultTheme(): MultiSelectTheme {
    return {
      classes: ['gp-multi-select-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-multi-select-theme-background, #ffffff)',
        color: 'var(--gp-multi-select-theme-color, #111827)',
        borderColor: 'var(--gp-multi-select-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-multi-select-theme-border-width, 1px)',
        radius: 'var(--gp-multi-select-theme-radius, 0.375rem)',
        padding: 'var(--gp-multi-select-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-multi-select.gp-multi-select-root {
          background-color: var(--gp-multi-select-background);
          color: var(--gp-multi-select-color);
          border: var(--gp-multi-select-border-width) solid var(--gp-multi-select-border-color);
          border-radius: var(--gp-multi-select-radius);
          padding: var(--gp-multi-select-padding);
        }

        @media (max-width: 600px) {
          gp-multi-select.gp-multi-select-root {
            width: var(--gp-multi-select-theme-mobile-width, 100%);
          }
        }
      `,
    };
  }
}

export const MULTI_SELECT_STYLE_PROVIDER: Provider = {
  provide: MULTI_SELECT_STYLE,
  useClass: MultiSelectStyle,
};
