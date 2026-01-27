import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style'

export type PaginatorTheme = ComponentStyleConfig

export const PAGINATOR_STYLE = new InjectionToken<BaseStyle<PaginatorTheme>>('PAGINATOR_STYLE')

@Injectable()
export class PaginatorStyle extends BaseStyle<PaginatorTheme> {
  protected readonly componentName = 'gp-paginator'

  protected getDefaultTheme(): PaginatorTheme {
    return {
      classes: ['gp-paginator-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-paginator-theme-background, #ffffff)',
        color: 'var(--gp-paginator-theme-color, #111827)',
        borderColor: 'var(--gp-paginator-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-paginator-theme-border-width, 1px)',
        radius: 'var(--gp-paginator-theme-radius, 0.375rem)',
        padding: 'var(--gp-paginator-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-paginator.gp-paginator-root {
          background-color: var(--gp-paginator-background);
          color: var(--gp-paginator-color);
          border: var(--gp-paginator-border-width) solid var(--gp-paginator-border-color);
          border-radius: var(--gp-paginator-radius);
          padding: var(--gp-paginator-padding);
        }

        @media (max-width: 600px) {
          gp-paginator.gp-paginator-root {
            width: var(--gp-paginator-theme-mobile-width, 100%);
          }
        }
      `,
    }
  }
}

export const PAGINATOR_STYLE_PROVIDER: Provider = {
  provide: PAGINATOR_STYLE,
  useClass: PaginatorStyle,
}
