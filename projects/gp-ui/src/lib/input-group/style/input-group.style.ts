import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type InputGroupTheme = ComponentStyleConfig;

export const INPUT_GROUP_STYLE = new InjectionToken<BaseStyle<InputGroupTheme>>(
  'INPUT_GROUP_STYLE',
);

@Injectable()
export class InputGroupStyle extends BaseStyle<InputGroupTheme> {
  protected readonly componentName = 'gp-input-group';

  protected getDefaultTheme(): InputGroupTheme {
    return {
      classes: ['gp-input-group-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-input-group-theme-background, #ffffff)',
        color: 'var(--gp-input-group-theme-color, #111827)',
        borderColor: 'var(--gp-input-group-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-input-group-theme-border-width, 1px)',
        radius: 'var(--gp-input-group-theme-radius, 0.375rem)',
        padding: 'var(--gp-input-group-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-input-group.gp-input-group-root {
          background-color: var(--gp-input-group-background);
          color: var(--gp-input-group-color);
          border: var(--gp-input-group-border-width) solid var(--gp-input-group-border-color);
          border-radius: var(--gp-input-group-radius);
          padding: var(--gp-input-group-padding);
        }

        @media (max-width: 600px) {
          gp-input-group.gp-input-group-root {
            width: var(--gp-input-group-theme-mobile-width, 100%);
          }
        }
      `,
    };
  }
}

export const INPUT_GROUP_STYLE_PROVIDER: Provider = {
  provide: INPUT_GROUP_STYLE,
  useClass: InputGroupStyle,
};
