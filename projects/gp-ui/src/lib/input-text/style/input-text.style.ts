import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style'

export type InputTextTheme = ComponentStyleConfig

export const INPUT_TEXT_STYLE = new InjectionToken<BaseStyle<InputTextTheme>>('INPUT_TEXT_STYLE')

@Injectable()
export class InputTextStyle extends BaseStyle<InputTextTheme> {
  protected readonly componentName = 'gp-input-text'

  protected getDefaultTheme(): InputTextTheme {
    return {
      classes: ['gp-input-text-root'],
      host: {
        display: 'inline-flex',
        'align-items': 'center',
        width: '100%',
        gap: 'var(--gp-input-text-gap)',
        padding: 'var(--gp-input-text-padding)',
        'background-color': 'var(--gp-input-text-background)',
        color: 'var(--gp-input-text-color)',
        border: '1px solid var(--gp-input-text-border-color)',
        'border-radius': 'var(--gp-input-text-radius)',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
      },
      vars: {
        background: '#ffffff',
        color: '#111827',
        borderColor: '#d1d5db',
        borderColorFocus: '#2563eb',
        radius: '0.375rem',
        padding: '0.5rem 0.75rem',
        gap: '0.5rem',
        focusRing: '0 0 0 2px rgba(59, 130, 246, 0.35)',
        placeholderColor: '#9ca3af',
      },
      css: `
        gp-input-text.gp-input-text-root:focus-within {
          border-color: var(--gp-input-text-border-color-focus);
          box-shadow: var(--gp-input-text-focus-ring);
        }

        gp-input-text.gp-input-text-root input {
          flex: 1 1 auto;
          width: 100%;
          border: none;
          background: transparent;
          color: inherit;
          font: inherit;
          outline: none;
        }

        gp-input-text.gp-input-text-root input::placeholder {
          color: var(--gp-input-text-placeholder-color);
        }
      `,
    }
  }
}

export const INPUT_TEXT_STYLE_PROVIDER: Provider = {
  provide: INPUT_TEXT_STYLE,
  useClass: InputTextStyle,
}
