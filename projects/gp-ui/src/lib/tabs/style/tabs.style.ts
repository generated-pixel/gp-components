import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style'

export type TabsTheme = ComponentStyleConfig

export const TABS_STYLE = new InjectionToken<BaseStyle<TabsTheme>>('TABS_STYLE')

@Injectable()
export class TabsStyle extends BaseStyle<TabsTheme> {
  protected readonly componentName = 'gp-tabs'

  protected getDefaultTheme(): TabsTheme {
    return {
      classes: ['gp-tabs-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-tabs-theme-background, #ffffff)',
        color: 'var(--gp-tabs-theme-color, #111827)',
        borderColor: 'var(--gp-tabs-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-tabs-theme-border-width, 1px)',
        radius: 'var(--gp-tabs-theme-radius, 0.375rem)',
        padding: 'var(--gp-tabs-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-tabs.gp-tabs-root {
          background-color: var(--gp-tabs-background);
          color: var(--gp-tabs-color);
          border: var(--gp-tabs-border-width) solid var(--gp-tabs-border-color);
          border-radius: var(--gp-tabs-radius);
          padding: var(--gp-tabs-padding);
        }

        @media (max-width: 600px) {
          gp-tabs.gp-tabs-root {
            width: var(--gp-tabs-theme-mobile-width, 100%);
          }
        }
      `,
    }
  }
}

export const TABS_STYLE_PROVIDER: Provider = {
  provide: TABS_STYLE,
  useClass: TabsStyle,
}
