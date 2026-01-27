import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type TextareaTheme = ComponentStyleConfig;

export const TEXTAREA_STYLE = new InjectionToken<BaseStyle<TextareaTheme>>('TEXTAREA_STYLE');

@Injectable()
export class TextareaStyle extends BaseStyle<TextareaTheme> {
  protected readonly componentName = 'gp-textarea';

  protected getDefaultTheme(): TextareaTheme {
    return {
      classes: ['gp-textarea-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-textarea-theme-background, #ffffff)',
        color: 'var(--gp-textarea-theme-color, #111827)',
        borderColor: 'var(--gp-textarea-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-textarea-theme-border-width, 1px)',
        radius: 'var(--gp-textarea-theme-radius, 0.375rem)',
        padding: 'var(--gp-textarea-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-textarea.gp-textarea-root {
          background-color: var(--gp-textarea-background);
          color: var(--gp-textarea-color);
          border: var(--gp-textarea-border-width) solid var(--gp-textarea-border-color);
          border-radius: var(--gp-textarea-radius);
          padding: var(--gp-textarea-padding);
        }

        @media (max-width: 600px) {
          gp-textarea.gp-textarea-root {
            width: var(--gp-textarea-theme-mobile-width, 100%);
          }
        }
      `,
    };
  }
}

export const TEXTAREA_STYLE_PROVIDER: Provider = {
  provide: TEXTAREA_STYLE,
  useClass: TextareaStyle,
};
