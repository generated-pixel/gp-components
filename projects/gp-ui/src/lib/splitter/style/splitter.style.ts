import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style'

export type SplitterTheme = ComponentStyleConfig

export const SPLITTER_STYLE = new InjectionToken<BaseStyle<SplitterTheme>>('SPLITTER_STYLE')

@Injectable()
export class SplitterStyle extends BaseStyle<SplitterTheme> {
  protected readonly componentName = 'gp-splitter'

  protected getDefaultTheme(): SplitterTheme {
    return {
      classes: ['gp-splitter-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-splitter-theme-background, #ffffff)',
        color: 'var(--gp-splitter-theme-color, #111827)',
        borderColor: 'var(--gp-splitter-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-splitter-theme-border-width, 1px)',
        radius: 'var(--gp-splitter-theme-radius, 0.375rem)',
        padding: 'var(--gp-splitter-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-splitter.gp-splitter-root {
          background-color: var(--gp-splitter-background);
          color: var(--gp-splitter-color);
          border: var(--gp-splitter-border-width) solid var(--gp-splitter-border-color);
          border-radius: var(--gp-splitter-radius);
          padding: var(--gp-splitter-padding);
        }

        @media (max-width: 600px) {
          gp-splitter.gp-splitter-root {
            width: var(--gp-splitter-theme-mobile-width, 100%);
          }
        }
      `,
    }
  }
}

export const SPLITTER_STYLE_PROVIDER: Provider = {
  provide: SPLITTER_STYLE,
  useClass: SplitterStyle,
}
