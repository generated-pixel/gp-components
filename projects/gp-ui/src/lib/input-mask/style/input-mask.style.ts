import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style'

export type InputMaskTheme = ComponentStyleConfig

export const INPUT_MASK_STYLE = new InjectionToken<BaseStyle<InputMaskTheme>>('INPUT_MASK_STYLE')

@Injectable()
export class InputMaskStyle extends BaseStyle<InputMaskTheme> {
  protected readonly componentName = 'gp-input-mask'

  protected getDefaultTheme(): InputMaskTheme {
    return {
      classes: ['gp-input-mask-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-input-mask-theme-background, #ffffff)',
        color: 'var(--gp-input-mask-theme-color, #111827)',
        borderColor: 'var(--gp-input-mask-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-input-mask-theme-border-width, 1px)',
        radius: 'var(--gp-input-mask-theme-radius, 0.375rem)',
        padding: 'var(--gp-input-mask-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-input-mask.gp-input-mask-root {
          background-color: var(--gp-input-mask-background);
          color: var(--gp-input-mask-color);
          border: var(--gp-input-mask-border-width) solid var(--gp-input-mask-border-color);
          border-radius: var(--gp-input-mask-radius);
          padding: var(--gp-input-mask-padding);
        }

        @media (max-width: 600px) {
          gp-input-mask.gp-input-mask-root {
            width: var(--gp-input-mask-theme-mobile-width, 100%);
          }
        }
      `,
    }
  }
}

export const INPUT_MASK_STYLE_PROVIDER: Provider = {
  provide: INPUT_MASK_STYLE,
  useClass: InputMaskStyle,
}
