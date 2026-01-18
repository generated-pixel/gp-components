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
        border: '1px solid var(--gp-password-border-color)',
        'background-color': 'var(--gp-password-background)',
        color: 'var(--gp-password-color)',
        transition: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease',
      },
      vars: {
        background: '#ffffff',
        borderColor: '#d1d5db',
        color: '#111827',
        gap: '0.5rem',
        padding: '0.5rem 0.75rem',
        radius: '0.375rem',
        focusRing: '0 0 0 2px rgba(59, 130, 246, 0.35)',
        focusBorderColor: '#2563eb',
      },
      css: `
        gp-password:focus-within {
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
