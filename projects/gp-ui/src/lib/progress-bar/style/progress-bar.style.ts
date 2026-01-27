import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type ProgressBarTheme = ComponentStyleConfig;

export const PROGRESS_BAR_STYLE = new InjectionToken<BaseStyle<ProgressBarTheme>>(
  'PROGRESS_BAR_STYLE',
);

@Injectable()
export class ProgressBarStyle extends BaseStyle<ProgressBarTheme> {
  protected readonly componentName = 'gp-progress-bar';

  protected getDefaultTheme(): ProgressBarTheme {
    return {
      classes: ['gp-progress-bar-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-progress-bar-theme-background, #ffffff)',
        color: 'var(--gp-progress-bar-theme-color, #111827)',
        borderColor: 'var(--gp-progress-bar-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-progress-bar-theme-border-width, 1px)',
        radius: 'var(--gp-progress-bar-theme-radius, 0.375rem)',
        padding: 'var(--gp-progress-bar-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-progress-bar.gp-progress-bar-root {
          background-color: var(--gp-progress-bar-background);
          color: var(--gp-progress-bar-color);
          border: var(--gp-progress-bar-border-width) solid var(--gp-progress-bar-border-color);
          border-radius: var(--gp-progress-bar-radius);
          padding: var(--gp-progress-bar-padding);
        }

        @media (max-width: 600px) {
          gp-progress-bar.gp-progress-bar-root {
            width: var(--gp-progress-bar-theme-mobile-width, 100%);
          }
        }
      `,
    };
  }
}

export const PROGRESS_BAR_STYLE_PROVIDER: Provider = {
  provide: PROGRESS_BAR_STYLE,
  useClass: ProgressBarStyle,
};
