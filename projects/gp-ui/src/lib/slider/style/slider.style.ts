import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style'

export type SliderTheme = ComponentStyleConfig

export const SLIDER_STYLE = new InjectionToken<BaseStyle<SliderTheme>>('SLIDER_STYLE')

@Injectable()
export class SliderStyle extends BaseStyle<SliderTheme> {
  protected readonly componentName = 'gp-slider'

  protected getDefaultTheme(): SliderTheme {
    return {
      classes: ['gp-slider-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-slider-theme-background, #ffffff)',
        color: 'var(--gp-slider-theme-color, #111827)',
        borderColor: 'var(--gp-slider-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-slider-theme-border-width, 1px)',
        radius: 'var(--gp-slider-theme-radius, 0.375rem)',
        padding: 'var(--gp-slider-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-slider.gp-slider-root {
          background-color: var(--gp-slider-background);
          color: var(--gp-slider-color);
          border: var(--gp-slider-border-width) solid var(--gp-slider-border-color);
          border-radius: var(--gp-slider-radius);
          padding: var(--gp-slider-padding);
        }

        @media (max-width: 600px) {
          gp-slider.gp-slider-root {
            width: var(--gp-slider-theme-mobile-width, 100%);
          }
        }
      `,
    }
  }
}

export const SLIDER_STYLE_PROVIDER: Provider = {
  provide: SLIDER_STYLE,
  useClass: SliderStyle,
}
