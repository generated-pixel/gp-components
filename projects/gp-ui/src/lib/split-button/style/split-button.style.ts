import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style'

export type SplitButtonTheme = ComponentStyleConfig

export const SPLIT_BUTTON_STYLE = new InjectionToken<BaseStyle<SplitButtonTheme>>('SPLIT_BUTTON_STYLE')

@Injectable()
export class SplitButtonStyle extends BaseStyle<SplitButtonTheme> {
  protected readonly componentName = 'gp-split-button'

  protected getDefaultTheme(): SplitButtonTheme {
    return {
      classes: ['gp-split-button-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-split-button-theme-background, #ffffff)',
        color: 'var(--gp-split-button-theme-color, #111827)',
        borderColor: 'var(--gp-split-button-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-split-button-theme-border-width, 1px)',
        radius: 'var(--gp-split-button-theme-radius, 0.375rem)',
        padding: 'var(--gp-split-button-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-split-button.gp-split-button-root {
          background-color: var(--gp-split-button-background);
          color: var(--gp-split-button-color);
          border: var(--gp-split-button-border-width) solid var(--gp-split-button-border-color);
          border-radius: var(--gp-split-button-radius);
          padding: var(--gp-split-button-padding);
        }

        @media (max-width: 600px) {
          gp-split-button.gp-split-button-root {
            width: var(--gp-split-button-theme-mobile-width, 100%);
          }
        }
      `,
    }
  }
}

export const SPLIT_BUTTON_STYLE_PROVIDER: Provider = {
  provide: SPLIT_BUTTON_STYLE,
  useClass: SplitButtonStyle,
}
