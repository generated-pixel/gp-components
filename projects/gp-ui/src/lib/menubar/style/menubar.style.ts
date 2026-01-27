import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type MenubarTheme = ComponentStyleConfig;

export const MENUBAR_STYLE = new InjectionToken<BaseStyle<MenubarTheme>>('MENUBAR_STYLE');

@Injectable()
export class MenubarStyle extends BaseStyle<MenubarTheme> {
  protected readonly componentName = 'gp-menubar';

  protected getDefaultTheme(): MenubarTheme {
    return {
      classes: ['gp-menubar-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-menubar-theme-background, #ffffff)',
        color: 'var(--gp-menubar-theme-color, #111827)',
        borderColor: 'var(--gp-menubar-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-menubar-theme-border-width, 1px)',
        radius: 'var(--gp-menubar-theme-radius, 0.375rem)',
        padding: 'var(--gp-menubar-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-menubar.gp-menubar-root {
          background-color: var(--gp-menubar-background);
          color: var(--gp-menubar-color);
          border: var(--gp-menubar-border-width) solid var(--gp-menubar-border-color);
          border-radius: var(--gp-menubar-radius);
          padding: var(--gp-menubar-padding);
        }

        @media (max-width: 600px) {
          gp-menubar.gp-menubar-root {
            width: var(--gp-menubar-theme-mobile-width, 100%);
          }
        }
      `,
    };
  }
}

export const MENUBAR_STYLE_PROVIDER: Provider = {
  provide: MENUBAR_STYLE,
  useClass: MenubarStyle,
};
