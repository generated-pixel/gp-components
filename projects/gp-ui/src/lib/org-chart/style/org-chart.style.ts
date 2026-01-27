import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style'

export type OrgChartTheme = ComponentStyleConfig

export const ORG_CHART_STYLE = new InjectionToken<BaseStyle<OrgChartTheme>>('ORG_CHART_STYLE')

@Injectable()
export class OrgChartStyle extends BaseStyle<OrgChartTheme> {
  protected readonly componentName = 'gp-org-chart'

  protected getDefaultTheme(): OrgChartTheme {
    return {
      classes: ['gp-org-chart-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-org-chart-theme-background, #ffffff)',
        color: 'var(--gp-org-chart-theme-color, #111827)',
        borderColor: 'var(--gp-org-chart-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-org-chart-theme-border-width, 1px)',
        radius: 'var(--gp-org-chart-theme-radius, 0.375rem)',
        padding: 'var(--gp-org-chart-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-org-chart.gp-org-chart-root {
          background-color: var(--gp-org-chart-background);
          color: var(--gp-org-chart-color);
          border: var(--gp-org-chart-border-width) solid var(--gp-org-chart-border-color);
          border-radius: var(--gp-org-chart-radius);
          padding: var(--gp-org-chart-padding);
        }

        @media (max-width: 600px) {
          gp-org-chart.gp-org-chart-root {
            width: var(--gp-org-chart-theme-mobile-width, 100%);
          }
        }
      `,
    }
  }
}

export const ORG_CHART_STYLE_PROVIDER: Provider = {
  provide: ORG_CHART_STYLE,
  useClass: OrgChartStyle,
}
