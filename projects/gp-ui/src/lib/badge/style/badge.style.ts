import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type BadgeTheme = ComponentStyleConfig;

export const BADGE_STYLE = new InjectionToken<BaseStyle<BadgeTheme>>('BADGE_STYLE');

@Injectable()
export class BadgeStyle extends BaseStyle<BadgeTheme> {
  protected readonly componentName = 'gp-badge';

  protected getDefaultTheme(): BadgeTheme {
    return {
      classes: ['gp-badge-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-badge-theme-background, #ffffff)',
        color: 'var(--gp-badge-theme-color, #111827)',
        borderColor: 'var(--gp-badge-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-badge-theme-border-width, 1px)',
        radius: 'var(--gp-badge-theme-radius, 0.375rem)',
        padding: 'var(--gp-badge-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-badge.gp-badge-root {
          background-color: var(--gp-badge-background);
          color: var(--gp-badge-color);
          border: var(--gp-badge-border-width) solid var(--gp-badge-border-color);
          border-radius: var(--gp-badge-radius);
          padding: var(--gp-badge-padding);
        }

        @media (max-width: 600px) {
          gp-badge.gp-badge-root {
            width: var(--gp-badge-theme-mobile-width, 100%);
          }
        }
      `,
    };
  }
}

export const BADGE_STYLE_PROVIDER: Provider = {
  provide: BADGE_STYLE,
  useClass: BadgeStyle,
};
