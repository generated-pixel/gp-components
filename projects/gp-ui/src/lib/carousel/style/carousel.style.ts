import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style'

export type CarouselTheme = ComponentStyleConfig

export const CAROUSEL_STYLE = new InjectionToken<BaseStyle<CarouselTheme>>('CAROUSEL_STYLE')

@Injectable()
export class CarouselStyle extends BaseStyle<CarouselTheme> {
  protected readonly componentName = 'gp-carousel'

  protected getDefaultTheme(): CarouselTheme {
    return {
      classes: ['gp-carousel-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-carousel-theme-background, #ffffff)',
        color: 'var(--gp-carousel-theme-color, #111827)',
        borderColor: 'var(--gp-carousel-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-carousel-theme-border-width, 1px)',
        radius: 'var(--gp-carousel-theme-radius, 0.375rem)',
        padding: 'var(--gp-carousel-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-carousel.gp-carousel-root {
          background-color: var(--gp-carousel-background);
          color: var(--gp-carousel-color);
          border: var(--gp-carousel-border-width) solid var(--gp-carousel-border-color);
          border-radius: var(--gp-carousel-radius);
          padding: var(--gp-carousel-padding);
        }

        @media (max-width: 600px) {
          gp-carousel.gp-carousel-root {
            width: var(--gp-carousel-theme-mobile-width, 100%);
          }
        }
      `,
    }
  }
}

export const CAROUSEL_STYLE_PROVIDER: Provider = {
  provide: CAROUSEL_STYLE,
  useClass: CarouselStyle,
}
