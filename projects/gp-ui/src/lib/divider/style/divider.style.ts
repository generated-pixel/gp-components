import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style'

export type DividerTheme = ComponentStyleConfig

export const DIVIDER_STYLE = new InjectionToken<BaseStyle<DividerTheme>>('DIVIDER_STYLE')

@Injectable()
export class DividerStyle extends BaseStyle<DividerTheme> {
  protected readonly componentName = 'gp-divider'

  protected getDefaultTheme(): DividerTheme {
    return {
      classes: ['gp-divider-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-divider-theme-background, #ffffff)',
        color: 'var(--gp-divider-theme-color, #111827)',
        borderColor: 'var(--gp-divider-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-divider-theme-border-width, 1px)',
        radius: 'var(--gp-divider-theme-radius, 0.375rem)',
        padding: 'var(--gp-divider-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-divider.gp-divider-root {
          background-color: var(--gp-divider-background);
          color: var(--gp-divider-color);
          border: var(--gp-divider-border-width) solid var(--gp-divider-border-color);
          border-radius: var(--gp-divider-radius);
          padding: var(--gp-divider-padding);
        }

        @media (max-width: 600px) {
          gp-divider.gp-divider-root {
            width: var(--gp-divider-theme-mobile-width, 100%);
          }
        }
      `,
    }
  }
}

export const DIVIDER_STYLE_PROVIDER: Provider = {
  provide: DIVIDER_STYLE,
  useClass: DividerStyle,
}
