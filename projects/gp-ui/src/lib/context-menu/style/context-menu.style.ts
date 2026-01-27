import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type ContextMenuTheme = ComponentStyleConfig;

export const CONTEXT_MENU_STYLE = new InjectionToken<BaseStyle<ContextMenuTheme>>(
  'CONTEXT_MENU_STYLE',
);

@Injectable()
export class ContextMenuStyle extends BaseStyle<ContextMenuTheme> {
  protected readonly componentName = 'gp-context-menu';

  protected getDefaultTheme(): ContextMenuTheme {
    return {
      classes: ['gp-context-menu-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-context-menu-theme-background, #ffffff)',
        color: 'var(--gp-context-menu-theme-color, #111827)',
        borderColor: 'var(--gp-context-menu-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-context-menu-theme-border-width, 1px)',
        radius: 'var(--gp-context-menu-theme-radius, 0.375rem)',
        padding: 'var(--gp-context-menu-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-context-menu.gp-context-menu-root {
          background-color: var(--gp-context-menu-background);
          color: var(--gp-context-menu-color);
          border: var(--gp-context-menu-border-width) solid var(--gp-context-menu-border-color);
          border-radius: var(--gp-context-menu-radius);
          padding: var(--gp-context-menu-padding);
        }

        @media (max-width: 600px) {
          gp-context-menu.gp-context-menu-root {
            width: var(--gp-context-menu-theme-mobile-width, 100%);
          }
        }
      `,
    };
  }
}

export const CONTEXT_MENU_STYLE_PROVIDER: Provider = {
  provide: CONTEXT_MENU_STYLE,
  useClass: ContextMenuStyle,
};
