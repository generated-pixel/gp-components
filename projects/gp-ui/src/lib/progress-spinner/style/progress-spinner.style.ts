import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style'

export type ProgressSpinnerTheme = ComponentStyleConfig

export const PROGRESS_SPINNER_STYLE = new InjectionToken<BaseStyle<ProgressSpinnerTheme>>('PROGRESS_SPINNER_STYLE')

@Injectable()
export class ProgressSpinnerStyle extends BaseStyle<ProgressSpinnerTheme> {
  protected readonly componentName = 'gp-progress-spinner'

  protected getDefaultTheme(): ProgressSpinnerTheme {
    return {
      classes: ['gp-progress-spinner-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-progress-spinner-theme-background, #ffffff)',
        color: 'var(--gp-progress-spinner-theme-color, #111827)',
        borderColor: 'var(--gp-progress-spinner-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-progress-spinner-theme-border-width, 1px)',
        radius: 'var(--gp-progress-spinner-theme-radius, 0.375rem)',
        padding: 'var(--gp-progress-spinner-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-progress-spinner.gp-progress-spinner-root {
          background-color: var(--gp-progress-spinner-background);
          color: var(--gp-progress-spinner-color);
          border: var(--gp-progress-spinner-border-width) solid var(--gp-progress-spinner-border-color);
          border-radius: var(--gp-progress-spinner-radius);
          padding: var(--gp-progress-spinner-padding);
        }

        @media (max-width: 600px) {
          gp-progress-spinner.gp-progress-spinner-root {
            width: var(--gp-progress-spinner-theme-mobile-width, 100%);
          }
        }
      `,
    }
  }
}

export const PROGRESS_SPINNER_STYLE_PROVIDER: Provider = {
  provide: PROGRESS_SPINNER_STYLE,
  useClass: ProgressSpinnerStyle,
}
