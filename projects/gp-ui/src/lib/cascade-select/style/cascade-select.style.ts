import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style'

export type CascadeSelectTheme = ComponentStyleConfig

export const CASCADE_SELECT_STYLE = new InjectionToken<BaseStyle<CascadeSelectTheme>>('CASCADE_SELECT_STYLE')

@Injectable()
export class CascadeSelectStyle extends BaseStyle<CascadeSelectTheme> {
  protected readonly componentName = 'gp-cascade-select'

  protected getDefaultTheme(): CascadeSelectTheme {
    return {
      classes: ['gp-cascade-select-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-cascade-select-theme-background, #ffffff)',
        color: 'var(--gp-cascade-select-theme-color, #111827)',
        borderColor: 'var(--gp-cascade-select-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-cascade-select-theme-border-width, 1px)',
        radius: 'var(--gp-cascade-select-theme-radius, 0.375rem)',
        padding: 'var(--gp-cascade-select-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-cascade-select.gp-cascade-select-root {
          background-color: var(--gp-cascade-select-background);
          color: var(--gp-cascade-select-color);
          border: var(--gp-cascade-select-border-width) solid var(--gp-cascade-select-border-color);
          border-radius: var(--gp-cascade-select-radius);
          padding: var(--gp-cascade-select-padding);
        }

        @media (max-width: 600px) {
          gp-cascade-select.gp-cascade-select-root {
            width: var(--gp-cascade-select-theme-mobile-width, 100%);
          }
        }
      `,
    }
  }
}

export const CASCADE_SELECT_STYLE_PROVIDER: Provider = {
  provide: CASCADE_SELECT_STYLE,
  useClass: CascadeSelectStyle,
}
