import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style'

export type PasswordTheme = ComponentStyleConfig

export const PASSWORD_STYLE = new InjectionToken<BaseStyle<PasswordTheme>>('PASSWORD_STYLE')

@Injectable()
export class PasswordStyle extends BaseStyle<PasswordTheme> {
  protected readonly componentName = 'gp-password'

  protected getDefaultTheme(): PasswordTheme {
    return {
      classes: ['gp-password-root'],
      host: {
        display: 'inline-flex',
        'align-items': 'center',
        gap: 'var(--gp-password-gap)',
        padding: 'var(--gp-password-padding)',
        'border-radius': 'var(--gp-password-radius)',
        border: 'var(--gp-password-border-width) solid var(--gp-password-border-color)',
        'background-color': 'var(--gp-password-background)',
        color: 'var(--gp-password-color)',
        transition: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease',
      },
      vars: {
        background: 'var(--gp-password-theme-background, #ffffff)',
        borderColor: 'var(--gp-password-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-password-theme-border-width, 1px)',
        color: 'var(--gp-password-theme-color, #111827)',
        gap: 'var(--gp-password-theme-gap, 0.5rem)',
        padding: 'var(--gp-password-theme-padding, 0.5rem 0.75rem)',
        radius: 'var(--gp-password-theme-radius, 0.375rem)',
        focusRing: 'var(--gp-password-theme-focus-ring, 0 0 0 2px rgba(59, 130, 246, 0.35))',
        focusBorderColor: 'var(--gp-password-theme-focus-border-color, #2563eb)',
      },
      css: `
        gp-password.gp-password-root:focus-within {
          box-shadow: var(--gp-password-focus-ring);
          border-color: var(--gp-password-focus-border-color);
        }
      `,
    }
  }
}

export const PASSWORD_STYLE_PROVIDER: Provider = {
  provide: PASSWORD_STYLE,
  useClass: PasswordStyle,
}
