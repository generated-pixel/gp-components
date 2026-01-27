import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style'

export type SpeedDialTheme = ComponentStyleConfig

export const SPEED_DIAL_STYLE = new InjectionToken<BaseStyle<SpeedDialTheme>>('SPEED_DIAL_STYLE')

@Injectable()
export class SpeedDialStyle extends BaseStyle<SpeedDialTheme> {
  protected readonly componentName = 'gp-speed-dial'

  protected getDefaultTheme(): SpeedDialTheme {
    return {
      classes: ['gp-speed-dial-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-speed-dial-theme-background, #ffffff)',
        color: 'var(--gp-speed-dial-theme-color, #111827)',
        borderColor: 'var(--gp-speed-dial-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-speed-dial-theme-border-width, 1px)',
        radius: 'var(--gp-speed-dial-theme-radius, 0.375rem)',
        padding: 'var(--gp-speed-dial-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-speed-dial.gp-speed-dial-root {
          background-color: var(--gp-speed-dial-background);
          color: var(--gp-speed-dial-color);
          border: var(--gp-speed-dial-border-width) solid var(--gp-speed-dial-border-color);
          border-radius: var(--gp-speed-dial-radius);
          padding: var(--gp-speed-dial-padding);
        }

        @media (max-width: 600px) {
          gp-speed-dial.gp-speed-dial-root {
            width: var(--gp-speed-dial-theme-mobile-width, 100%);
          }
        }
      `,
    }
  }
}

export const SPEED_DIAL_STYLE_PROVIDER: Provider = {
  provide: SPEED_DIAL_STYLE,
  useClass: SpeedDialStyle,
}
