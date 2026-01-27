import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style'

export type ConfirmPopupTheme = ComponentStyleConfig

export const CONFIRM_POPUP_STYLE = new InjectionToken<BaseStyle<ConfirmPopupTheme>>('CONFIRM_POPUP_STYLE')

@Injectable()
export class ConfirmPopupStyle extends BaseStyle<ConfirmPopupTheme> {
  protected readonly componentName = 'gp-confirm-popup'

  protected getDefaultTheme(): ConfirmPopupTheme {
    return {
      classes: ['gp-confirm-popup-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-confirm-popup-theme-background, #ffffff)',
        color: 'var(--gp-confirm-popup-theme-color, #111827)',
        borderColor: 'var(--gp-confirm-popup-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-confirm-popup-theme-border-width, 1px)',
        radius: 'var(--gp-confirm-popup-theme-radius, 0.375rem)',
        padding: 'var(--gp-confirm-popup-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-confirm-popup.gp-confirm-popup-root {
          background-color: var(--gp-confirm-popup-background);
          color: var(--gp-confirm-popup-color);
          border: var(--gp-confirm-popup-border-width) solid var(--gp-confirm-popup-border-color);
          border-radius: var(--gp-confirm-popup-radius);
          padding: var(--gp-confirm-popup-padding);
        }

        @media (max-width: 600px) {
          gp-confirm-popup.gp-confirm-popup-root {
            width: var(--gp-confirm-popup-theme-mobile-width, 100%);
          }
        }
      `,
    }
  }
}

export const CONFIRM_POPUP_STYLE_PROVIDER: Provider = {
  provide: CONFIRM_POPUP_STYLE,
  useClass: ConfirmPopupStyle,
}
