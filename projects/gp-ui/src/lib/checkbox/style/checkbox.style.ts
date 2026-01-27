import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style'

export type CheckboxTheme = ComponentStyleConfig

export const CHECKBOX_STYLE = new InjectionToken<BaseStyle<CheckboxTheme>>('CHECKBOX_STYLE')

@Injectable()
export class CheckboxStyle extends BaseStyle<CheckboxTheme> {
  protected readonly componentName = 'gp-checkbox'

  protected getDefaultTheme(): CheckboxTheme {
    return {
      classes: ['gp-checkbox-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-checkbox-theme-background, #ffffff)',
        color: 'var(--gp-checkbox-theme-color, #111827)',
        borderColor: 'var(--gp-checkbox-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-checkbox-theme-border-width, 1px)',
        radius: 'var(--gp-checkbox-theme-radius, 0.375rem)',
        padding: 'var(--gp-checkbox-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-checkbox.gp-checkbox-root {
          background-color: var(--gp-checkbox-background);
          color: var(--gp-checkbox-color);
          border: var(--gp-checkbox-border-width) solid var(--gp-checkbox-border-color);
          border-radius: var(--gp-checkbox-radius);
          padding: var(--gp-checkbox-padding);
        }

        @media (max-width: 600px) {
          gp-checkbox.gp-checkbox-root {
            width: var(--gp-checkbox-theme-mobile-width, 100%);
          }
        }
      `,
    }
  }
}

export const CHECKBOX_STYLE_PROVIDER: Provider = {
  provide: CHECKBOX_STYLE,
  useClass: CheckboxStyle,
}
