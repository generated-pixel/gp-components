import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type MenuTheme = ComponentStyleConfig;

export const MENU_STYLE = new InjectionToken<BaseStyle<MenuTheme>>('MENU_STYLE');

@Injectable()
export class MenuStyle extends BaseStyle<MenuTheme> {
  protected readonly componentName = 'gp-menu';

  protected getDefaultTheme(): MenuTheme {
    return {
      classes: ['gp-menu-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-menu-theme-background, #ffffff)',
        color: 'var(--gp-menu-theme-color, #111827)',
        borderColor: 'var(--gp-menu-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-menu-theme-border-width, 1px)',
        radius: 'var(--gp-menu-theme-radius, 0.375rem)',
        padding: 'var(--gp-menu-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-menu.gp-menu-root {
          background-color: var(--gp-menu-background);
          color: var(--gp-menu-color);
          border: var(--gp-menu-border-width) solid var(--gp-menu-border-color);
          border-radius: var(--gp-menu-radius);
          padding: var(--gp-menu-padding);
        }

        @media (max-width: 600px) {
          gp-menu.gp-menu-root {
            width: var(--gp-menu-theme-mobile-width, 100%);
          }
        }
      `,
    };
  }
}

export const MENU_STYLE_PROVIDER: Provider = {
  provide: MENU_STYLE,
  useClass: MenuStyle,
};
