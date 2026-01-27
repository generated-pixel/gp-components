import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style'

export type ButtonTheme = ComponentStyleConfig

export const BUTTON_STYLE = new InjectionToken<BaseStyle<ButtonTheme>>('BUTTON_STYLE')

@Injectable()
export class ButtonStyle extends BaseStyle<ButtonTheme> {
  protected readonly componentName = 'gp-button'

  protected getDefaultTheme(): ButtonTheme {
    return {
      classes: ['gp-button-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-button-theme-background, #ffffff)',
        color: 'var(--gp-button-theme-color, #111827)',
        borderColor: 'var(--gp-button-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-button-theme-border-width, 1px)',
        radius: 'var(--gp-button-theme-radius, 0.375rem)',
        padding: 'var(--gp-button-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-button.gp-button-root {
          background-color: var(--gp-button-background);
          color: var(--gp-button-color);
          border: var(--gp-button-border-width) solid var(--gp-button-border-color);
          border-radius: var(--gp-button-radius);
          padding: var(--gp-button-padding);
        }

        @media (max-width: 600px) {
          gp-button.gp-button-root {
            width: var(--gp-button-theme-mobile-width, 100%);
          }
        }
      `,
    }
  }
}

export const BUTTON_STYLE_PROVIDER: Provider = {
  provide: BUTTON_STYLE,
  useClass: ButtonStyle,
}
