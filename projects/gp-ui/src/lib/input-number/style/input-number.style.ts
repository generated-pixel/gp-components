import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style'

export type InputNumberTheme = ComponentStyleConfig

export const INPUT_NUMBER_STYLE = new InjectionToken<BaseStyle<InputNumberTheme>>('INPUT_NUMBER_STYLE')

@Injectable()
export class InputNumberStyle extends BaseStyle<InputNumberTheme> {
  protected readonly componentName = 'gp-input-number'

  protected getDefaultTheme(): InputNumberTheme {
    return {
      classes: ['gp-input-number-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-input-number-theme-background, #ffffff)',
        color: 'var(--gp-input-number-theme-color, #111827)',
        borderColor: 'var(--gp-input-number-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-input-number-theme-border-width, 1px)',
        radius: 'var(--gp-input-number-theme-radius, 0.375rem)',
        padding: 'var(--gp-input-number-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-input-number.gp-input-number-root {
          background-color: var(--gp-input-number-background);
          color: var(--gp-input-number-color);
          border: var(--gp-input-number-border-width) solid var(--gp-input-number-border-color);
          border-radius: var(--gp-input-number-radius);
          padding: var(--gp-input-number-padding);
        }

        @media (max-width: 600px) {
          gp-input-number.gp-input-number-root {
            width: var(--gp-input-number-theme-mobile-width, 100%);
          }
        }
      `,
    }
  }
}

export const INPUT_NUMBER_STYLE_PROVIDER: Provider = {
  provide: INPUT_NUMBER_STYLE,
  useClass: InputNumberStyle,
}
