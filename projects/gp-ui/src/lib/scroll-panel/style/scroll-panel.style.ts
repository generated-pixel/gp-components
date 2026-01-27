import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type ScrollPanelTheme = ComponentStyleConfig;

export const SCROLL_PANEL_STYLE = new InjectionToken<BaseStyle<ScrollPanelTheme>>(
  'SCROLL_PANEL_STYLE',
);

@Injectable()
export class ScrollPanelStyle extends BaseStyle<ScrollPanelTheme> {
  protected readonly componentName = 'gp-scroll-panel';

  protected getDefaultTheme(): ScrollPanelTheme {
    return {
      classes: ['gp-scroll-panel-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-scroll-panel-theme-background, #ffffff)',
        color: 'var(--gp-scroll-panel-theme-color, #111827)',
        borderColor: 'var(--gp-scroll-panel-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-scroll-panel-theme-border-width, 1px)',
        radius: 'var(--gp-scroll-panel-theme-radius, 0.375rem)',
        padding: 'var(--gp-scroll-panel-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-scroll-panel.gp-scroll-panel-root {
          background-color: var(--gp-scroll-panel-background);
          color: var(--gp-scroll-panel-color);
          border: var(--gp-scroll-panel-border-width) solid var(--gp-scroll-panel-border-color);
          border-radius: var(--gp-scroll-panel-radius);
          padding: var(--gp-scroll-panel-padding);
        }

        @media (max-width: 600px) {
          gp-scroll-panel.gp-scroll-panel-root {
            width: var(--gp-scroll-panel-theme-mobile-width, 100%);
          }
        }
      `,
    };
  }
}

export const SCROLL_PANEL_STYLE_PROVIDER: Provider = {
  provide: SCROLL_PANEL_STYLE,
  useClass: ScrollPanelStyle,
};
