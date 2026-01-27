import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style'

export type TieredMenuTheme = ComponentStyleConfig

export const TIERED_MENU_STYLE = new InjectionToken<BaseStyle<TieredMenuTheme>>('TIERED_MENU_STYLE')

@Injectable()
export class TieredMenuStyle extends BaseStyle<TieredMenuTheme> {
  protected readonly componentName = 'gp-tiered-menu'

  protected getDefaultTheme(): TieredMenuTheme {
    return {
      classes: ['gp-tiered-menu-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-tiered-menu-theme-background, #ffffff)',
        color: 'var(--gp-tiered-menu-theme-color, #111827)',
        borderColor: 'var(--gp-tiered-menu-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-tiered-menu-theme-border-width, 1px)',
        radius: 'var(--gp-tiered-menu-theme-radius, 0.375rem)',
        padding: 'var(--gp-tiered-menu-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-tiered-menu.gp-tiered-menu-root {
          background-color: var(--gp-tiered-menu-background);
          color: var(--gp-tiered-menu-color);
          border: var(--gp-tiered-menu-border-width) solid var(--gp-tiered-menu-border-color);
          border-radius: var(--gp-tiered-menu-radius);
          padding: var(--gp-tiered-menu-padding);
        }

        @media (max-width: 600px) {
          gp-tiered-menu.gp-tiered-menu-root {
            width: var(--gp-tiered-menu-theme-mobile-width, 100%);
          }
        }
      `,
    }
  }
}

export const TIERED_MENU_STYLE_PROVIDER: Provider = {
  provide: TIERED_MENU_STYLE,
  useClass: TieredMenuStyle,
}
