import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type InputOtpTheme = ComponentStyleConfig;

export const INPUT_OTP_STYLE = new InjectionToken<BaseStyle<InputOtpTheme>>('INPUT_OTP_STYLE');

@Injectable()
export class InputOtpStyle extends BaseStyle<InputOtpTheme> {
  protected readonly componentName = 'gp-input-otp';

  protected getDefaultTheme(): InputOtpTheme {
    return {
      classes: ['gp-input-otp-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-input-otp-theme-background, #ffffff)',
        color: 'var(--gp-input-otp-theme-color, #111827)',
        borderColor: 'var(--gp-input-otp-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-input-otp-theme-border-width, 1px)',
        radius: 'var(--gp-input-otp-theme-radius, 0.375rem)',
        padding: 'var(--gp-input-otp-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-input-otp.gp-input-otp-root {
          background-color: var(--gp-input-otp-background);
          color: var(--gp-input-otp-color);
          border: var(--gp-input-otp-border-width) solid var(--gp-input-otp-border-color);
          border-radius: var(--gp-input-otp-radius);
          padding: var(--gp-input-otp-padding);
        }

        @media (max-width: 600px) {
          gp-input-otp.gp-input-otp-root {
            width: var(--gp-input-otp-theme-mobile-width, 100%);
          }
        }
      `,
    };
  }
}

export const INPUT_OTP_STYLE_PROVIDER: Provider = {
  provide: INPUT_OTP_STYLE,
  useClass: InputOtpStyle,
};
