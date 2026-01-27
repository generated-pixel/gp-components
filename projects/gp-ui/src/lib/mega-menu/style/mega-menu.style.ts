import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style'

export type MegaMenuTheme = ComponentStyleConfig

export const MEGA_MENU_STYLE = new InjectionToken<BaseStyle<MegaMenuTheme>>('MEGA_MENU_STYLE')

@Injectable()
export class MegaMenuStyle extends BaseStyle<MegaMenuTheme> {
  protected readonly componentName = 'gp-mega-menu'

  protected getDefaultTheme(): MegaMenuTheme {
    return {
      classes: ['gp-mega-menu-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-mega-menu-theme-background, #ffffff)',
        color: 'var(--gp-mega-menu-theme-color, #111827)',
        borderColor: 'var(--gp-mega-menu-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-mega-menu-theme-border-width, 1px)',
        radius: 'var(--gp-mega-menu-theme-radius, 0.375rem)',
        padding: 'var(--gp-mega-menu-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-mega-menu.gp-mega-menu-root {
          background-color: var(--gp-mega-menu-background);
          color: var(--gp-mega-menu-color);
          border: var(--gp-mega-menu-border-width) solid var(--gp-mega-menu-border-color);
          border-radius: var(--gp-mega-menu-radius);
          padding: var(--gp-mega-menu-padding);
        }

        @media (max-width: 600px) {
          gp-mega-menu.gp-mega-menu-root {
            width: var(--gp-mega-menu-theme-mobile-width, 100%);
          }
        }
      `,
    }
  }
}

export const MEGA_MENU_STYLE_PROVIDER: Provider = {
  provide: MEGA_MENU_STYLE,
  useClass: MegaMenuStyle,
}
