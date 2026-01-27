import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type DialogTheme = ComponentStyleConfig;

export const DIALOG_STYLE = new InjectionToken<BaseStyle<DialogTheme>>('DIALOG_STYLE');

@Injectable()
export class DialogStyle extends BaseStyle<DialogTheme> {
  protected readonly componentName = 'gp-dialog';

  protected getDefaultTheme(): DialogTheme {
    return {
      classes: ['gp-dialog-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-dialog-theme-background, #ffffff)',
        color: 'var(--gp-dialog-theme-color, #111827)',
        borderColor: 'var(--gp-dialog-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-dialog-theme-border-width, 1px)',
        radius: 'var(--gp-dialog-theme-radius, 0.375rem)',
        padding: 'var(--gp-dialog-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-dialog.gp-dialog-root {
          background-color: var(--gp-dialog-background);
          color: var(--gp-dialog-color);
          border: var(--gp-dialog-border-width) solid var(--gp-dialog-border-color);
          border-radius: var(--gp-dialog-radius);
          padding: var(--gp-dialog-padding);
        }

        @media (max-width: 600px) {
          gp-dialog.gp-dialog-root {
            width: var(--gp-dialog-theme-mobile-width, 100%);
          }
        }
      `,
    };
  }
}

export const DIALOG_STYLE_PROVIDER: Provider = {
  provide: DIALOG_STYLE,
  useClass: DialogStyle,
};
