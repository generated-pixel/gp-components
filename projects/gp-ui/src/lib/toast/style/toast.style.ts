import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type ToastTheme = ComponentStyleConfig;

export const TOAST_STYLE = new InjectionToken<BaseStyle<ToastTheme>>('TOAST_STYLE');

@Injectable()
export class ToastStyle extends BaseStyle<ToastTheme> {
  protected readonly componentName = 'gp-toast';

  protected getDefaultTheme(): ToastTheme {
    return {
      classes: ['gp-toast-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-toast-theme-background, #ffffff)',
        color: 'var(--gp-toast-theme-color, #111827)',
        borderColor: 'var(--gp-toast-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-toast-theme-border-width, 1px)',
        radius: 'var(--gp-toast-theme-radius, 0.375rem)',
        padding: 'var(--gp-toast-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-toast.gp-toast-root {
          background-color: var(--gp-toast-background);
          color: var(--gp-toast-color);
          border: var(--gp-toast-border-width) solid var(--gp-toast-border-color);
          border-radius: var(--gp-toast-radius);
          padding: var(--gp-toast-padding);
        }

        @media (max-width: 600px) {
          gp-toast.gp-toast-root {
            width: var(--gp-toast-theme-mobile-width, 100%);
          }
        }
      `,
    };
  }
}

export const TOAST_STYLE_PROVIDER: Provider = {
  provide: TOAST_STYLE,
  useClass: ToastStyle,
};
