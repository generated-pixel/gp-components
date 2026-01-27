import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type PanelMenuTheme = ComponentStyleConfig;

export const PANEL_MENU_STYLE = new InjectionToken<BaseStyle<PanelMenuTheme>>('PANEL_MENU_STYLE');

@Injectable()
export class PanelMenuStyle extends BaseStyle<PanelMenuTheme> {
  protected readonly componentName = 'gp-panel-menu';

  protected getDefaultTheme(): PanelMenuTheme {
    return {
      classes: ['gp-panel-menu-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-panel-menu-theme-background, #ffffff)',
        color: 'var(--gp-panel-menu-theme-color, #111827)',
        borderColor: 'var(--gp-panel-menu-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-panel-menu-theme-border-width, 1px)',
        radius: 'var(--gp-panel-menu-theme-radius, 0.375rem)',
        padding: 'var(--gp-panel-menu-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-panel-menu.gp-panel-menu-root {
          background-color: var(--gp-panel-menu-background);
          color: var(--gp-panel-menu-color);
          border: var(--gp-panel-menu-border-width) solid var(--gp-panel-menu-border-color);
          border-radius: var(--gp-panel-menu-radius);
          padding: var(--gp-panel-menu-padding);
        }

        @media (max-width: 600px) {
          gp-panel-menu.gp-panel-menu-root {
            width: var(--gp-panel-menu-theme-mobile-width, 100%);
          }
        }
      `,
    };
  }
}

export const PANEL_MENU_STYLE_PROVIDER: Provider = {
  provide: PANEL_MENU_STYLE,
  useClass: PanelMenuStyle,
};
