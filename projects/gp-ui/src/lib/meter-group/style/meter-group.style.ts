import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style'

export type MeterGroupTheme = ComponentStyleConfig

export const METER_GROUP_STYLE = new InjectionToken<BaseStyle<MeterGroupTheme>>('METER_GROUP_STYLE')

@Injectable()
export class MeterGroupStyle extends BaseStyle<MeterGroupTheme> {
  protected readonly componentName = 'gp-meter-group'

  protected getDefaultTheme(): MeterGroupTheme {
    return {
      classes: ['gp-meter-group-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-meter-group-theme-background, #ffffff)',
        color: 'var(--gp-meter-group-theme-color, #111827)',
        borderColor: 'var(--gp-meter-group-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-meter-group-theme-border-width, 1px)',
        radius: 'var(--gp-meter-group-theme-radius, 0.375rem)',
        padding: 'var(--gp-meter-group-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-meter-group.gp-meter-group-root {
          background-color: var(--gp-meter-group-background);
          color: var(--gp-meter-group-color);
          border: var(--gp-meter-group-border-width) solid var(--gp-meter-group-border-color);
          border-radius: var(--gp-meter-group-radius);
          padding: var(--gp-meter-group-padding);
        }

        @media (max-width: 600px) {
          gp-meter-group.gp-meter-group-root {
            width: var(--gp-meter-group-theme-mobile-width, 100%);
          }
        }
      `,
    }
  }
}

export const METER_GROUP_STYLE_PROVIDER: Provider = {
  provide: METER_GROUP_STYLE,
  useClass: MeterGroupStyle,
}
