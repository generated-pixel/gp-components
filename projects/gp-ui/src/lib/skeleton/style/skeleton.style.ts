import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type SkeletonTheme = ComponentStyleConfig;

export const SKELETON_STYLE = new InjectionToken<BaseStyle<SkeletonTheme>>('SKELETON_STYLE');

@Injectable()
export class SkeletonStyle extends BaseStyle<SkeletonTheme> {
  protected readonly componentName = 'gp-skeleton';

  protected getDefaultTheme(): SkeletonTheme {
    return {
      classes: ['gp-skeleton-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-skeleton-theme-background, #ffffff)',
        color: 'var(--gp-skeleton-theme-color, #111827)',
        borderColor: 'var(--gp-skeleton-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-skeleton-theme-border-width, 1px)',
        radius: 'var(--gp-skeleton-theme-radius, 0.375rem)',
        padding: 'var(--gp-skeleton-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-skeleton.gp-skeleton-root {
          background-color: var(--gp-skeleton-background);
          color: var(--gp-skeleton-color);
          border: var(--gp-skeleton-border-width) solid var(--gp-skeleton-border-color);
          border-radius: var(--gp-skeleton-radius);
          padding: var(--gp-skeleton-padding);
        }

        @media (max-width: 600px) {
          gp-skeleton.gp-skeleton-root {
            width: var(--gp-skeleton-theme-mobile-width, 100%);
          }
        }
      `,
    };
  }
}

export const SKELETON_STYLE_PROVIDER: Provider = {
  provide: SKELETON_STYLE,
  useClass: SkeletonStyle,
};
