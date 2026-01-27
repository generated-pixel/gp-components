import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style'

export type SelectTheme = ComponentStyleConfig

export const SELECT_STYLE = new InjectionToken<BaseStyle<SelectTheme>>('SELECT_STYLE')

@Injectable()
export class SelectStyle extends BaseStyle<SelectTheme> {
  protected readonly componentName = 'gp-select'

  protected getDefaultTheme(): SelectTheme {
    return {
      classes: ['gp-select-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-select-theme-background, #ffffff)',
        color: 'var(--gp-select-theme-color, #111827)',
        borderColor: 'var(--gp-select-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-select-theme-border-width, 1px)',
        radius: 'var(--gp-select-theme-radius, 0.375rem)',
        padding: 'var(--gp-select-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-select.gp-select-root {
          background-color: var(--gp-select-background);
          color: var(--gp-select-color);
          border: var(--gp-select-border-width) solid var(--gp-select-border-color);
          border-radius: var(--gp-select-radius);
          padding: var(--gp-select-padding);
        }

        @media (max-width: 600px) {
          gp-select.gp-select-root {
            width: var(--gp-select-theme-mobile-width, 100%);
          }
        }
      `,
    }
  }
}

export const SELECT_STYLE_PROVIDER: Provider = {
  provide: SELECT_STYLE,
  useClass: SelectStyle,
}
