import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type StepperTheme = ComponentStyleConfig;

export const STEPPER_STYLE = new InjectionToken<BaseStyle<StepperTheme>>('STEPPER_STYLE');

@Injectable()
export class StepperStyle extends BaseStyle<StepperTheme> {
  protected readonly componentName = 'gp-stepper';

  protected getDefaultTheme(): StepperTheme {
    return {
      classes: ['gp-stepper-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-stepper-theme-background, #ffffff)',
        color: 'var(--gp-stepper-theme-color, #111827)',
        borderColor: 'var(--gp-stepper-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-stepper-theme-border-width, 1px)',
        radius: 'var(--gp-stepper-theme-radius, 0.375rem)',
        padding: 'var(--gp-stepper-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-stepper.gp-stepper-root {
          background-color: var(--gp-stepper-background);
          color: var(--gp-stepper-color);
          border: var(--gp-stepper-border-width) solid var(--gp-stepper-border-color);
          border-radius: var(--gp-stepper-radius);
          padding: var(--gp-stepper-padding);
        }

        @media (max-width: 600px) {
          gp-stepper.gp-stepper-root {
            width: var(--gp-stepper-theme-mobile-width, 100%);
          }
        }
      `,
    };
  }
}

export const STEPPER_STYLE_PROVIDER: Provider = {
  provide: STEPPER_STYLE,
  useClass: StepperStyle,
};
