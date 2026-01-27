import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type RatingTheme = ComponentStyleConfig;

export const RATING_STYLE = new InjectionToken<BaseStyle<RatingTheme>>('RATING_STYLE');

@Injectable()
export class RatingStyle extends BaseStyle<RatingTheme> {
  protected readonly componentName = 'gp-rating';

  protected getDefaultTheme(): RatingTheme {
    return {
      classes: ['gp-rating-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-rating-theme-background, #ffffff)',
        color: 'var(--gp-rating-theme-color, #111827)',
        borderColor: 'var(--gp-rating-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-rating-theme-border-width, 1px)',
        radius: 'var(--gp-rating-theme-radius, 0.375rem)',
        padding: 'var(--gp-rating-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-rating.gp-rating-root {
          background-color: var(--gp-rating-background);
          color: var(--gp-rating-color);
          border: var(--gp-rating-border-width) solid var(--gp-rating-border-color);
          border-radius: var(--gp-rating-radius);
          padding: var(--gp-rating-padding);
        }

        @media (max-width: 600px) {
          gp-rating.gp-rating-root {
            width: var(--gp-rating-theme-mobile-width, 100%);
          }
        }
      `,
    };
  }
}

export const RATING_STYLE_PROVIDER: Provider = {
  provide: RATING_STYLE,
  useClass: RatingStyle,
};
