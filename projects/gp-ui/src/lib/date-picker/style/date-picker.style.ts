import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type DatePickerTheme = ComponentStyleConfig;

export const DATE_PICKER_STYLE = new InjectionToken<BaseStyle<DatePickerTheme>>(
  'DATE_PICKER_STYLE',
);

@Injectable()
export class DatePickerStyle extends BaseStyle<DatePickerTheme> {
  protected readonly componentName = 'gp-date-picker';

  protected getDefaultTheme(): DatePickerTheme {
    return {
      classes: ['gp-date-picker-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-date-picker-theme-background, #ffffff)',
        color: 'var(--gp-date-picker-theme-color, #111827)',
        borderColor: 'var(--gp-date-picker-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-date-picker-theme-border-width, 1px)',
        radius: 'var(--gp-date-picker-theme-radius, 0.375rem)',
        padding: 'var(--gp-date-picker-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-date-picker.gp-date-picker-root {
          background-color: var(--gp-date-picker-background);
          color: var(--gp-date-picker-color);
          border: var(--gp-date-picker-border-width) solid var(--gp-date-picker-border-color);
          border-radius: var(--gp-date-picker-radius);
          padding: var(--gp-date-picker-padding);
        }

        @media (max-width: 600px) {
          gp-date-picker.gp-date-picker-root {
            width: var(--gp-date-picker-theme-mobile-width, 100%);
          }
        }
      `,
    };
  }
}

export const DATE_PICKER_STYLE_PROVIDER: Provider = {
  provide: DATE_PICKER_STYLE,
  useClass: DatePickerStyle,
};
