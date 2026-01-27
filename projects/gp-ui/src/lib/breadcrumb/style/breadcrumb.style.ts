import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type BreadcrumbTheme = ComponentStyleConfig;

export const BREADCRUMB_STYLE = new InjectionToken<BaseStyle<BreadcrumbTheme>>('BREADCRUMB_STYLE');

@Injectable()
export class BreadcrumbStyle extends BaseStyle<BreadcrumbTheme> {
  protected readonly componentName = 'gp-breadcrumb';

  protected getDefaultTheme(): BreadcrumbTheme {
    return {
      classes: ['gp-breadcrumb-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-breadcrumb-theme-background, #ffffff)',
        color: 'var(--gp-breadcrumb-theme-color, #111827)',
        borderColor: 'var(--gp-breadcrumb-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-breadcrumb-theme-border-width, 1px)',
        radius: 'var(--gp-breadcrumb-theme-radius, 0.375rem)',
        padding: 'var(--gp-breadcrumb-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-breadcrumb.gp-breadcrumb-root {
          background-color: var(--gp-breadcrumb-background);
          color: var(--gp-breadcrumb-color);
          border: var(--gp-breadcrumb-border-width) solid var(--gp-breadcrumb-border-color);
          border-radius: var(--gp-breadcrumb-radius);
          padding: var(--gp-breadcrumb-padding);
        }

        @media (max-width: 600px) {
          gp-breadcrumb.gp-breadcrumb-root {
            width: var(--gp-breadcrumb-theme-mobile-width, 100%);
          }
        }
      `,
    };
  }
}

export const BREADCRUMB_STYLE_PROVIDER: Provider = {
  provide: BREADCRUMB_STYLE,
  useClass: BreadcrumbStyle,
};
