import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type ToolbarTheme = ComponentStyleConfig;

export const TOOLBAR_STYLE = new InjectionToken<BaseStyle<ToolbarTheme>>('TOOLBAR_STYLE');

@Injectable()
export class ToolbarStyle extends BaseStyle<ToolbarTheme> {
  protected readonly componentName = 'gp-toolbar';

  protected getDefaultTheme(): ToolbarTheme {
    return {
      classes: ['gp-toolbar-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-toolbar-theme-background, #ffffff)',
        color: 'var(--gp-toolbar-theme-color, #111827)',
        borderColor: 'var(--gp-toolbar-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-toolbar-theme-border-width, 1px)',
        radius: 'var(--gp-toolbar-theme-radius, 0.375rem)',
        padding: 'var(--gp-toolbar-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-toolbar.gp-toolbar-root {
          background-color: var(--gp-toolbar-background);
          color: var(--gp-toolbar-color);
          border: var(--gp-toolbar-border-width) solid var(--gp-toolbar-border-color);
          border-radius: var(--gp-toolbar-radius);
          padding: var(--gp-toolbar-padding);
        }

        @media (max-width: 600px) {
          gp-toolbar.gp-toolbar-root {
            width: var(--gp-toolbar-theme-mobile-width, 100%);
          }
        }
      `,
    };
  }
}

export const TOOLBAR_STYLE_PROVIDER: Provider = {
  provide: TOOLBAR_STYLE,
  useClass: ToolbarStyle,
};
