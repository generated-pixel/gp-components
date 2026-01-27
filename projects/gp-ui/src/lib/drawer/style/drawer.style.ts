import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style'

export type DrawerTheme = ComponentStyleConfig

export const DRAWER_STYLE = new InjectionToken<BaseStyle<DrawerTheme>>('DRAWER_STYLE')

@Injectable()
export class DrawerStyle extends BaseStyle<DrawerTheme> {
  protected readonly componentName = 'gp-drawer'

  protected getDefaultTheme(): DrawerTheme {
    return {
      classes: ['gp-drawer-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-drawer-theme-background, #ffffff)',
        color: 'var(--gp-drawer-theme-color, #111827)',
        borderColor: 'var(--gp-drawer-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-drawer-theme-border-width, 1px)',
        radius: 'var(--gp-drawer-theme-radius, 0.375rem)',
        padding: 'var(--gp-drawer-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-drawer.gp-drawer-root {
          background-color: var(--gp-drawer-background);
          color: var(--gp-drawer-color);
          border: var(--gp-drawer-border-width) solid var(--gp-drawer-border-color);
          border-radius: var(--gp-drawer-radius);
          padding: var(--gp-drawer-padding);
        }

        @media (max-width: 600px) {
          gp-drawer.gp-drawer-root {
            width: var(--gp-drawer-theme-mobile-width, 100%);
          }
        }
      `,
    }
  }
}

export const DRAWER_STYLE_PROVIDER: Provider = {
  provide: DRAWER_STYLE,
  useClass: DrawerStyle,
}
