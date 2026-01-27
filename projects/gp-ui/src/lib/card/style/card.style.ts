import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style'

export type CardTheme = ComponentStyleConfig

export const CARD_STYLE = new InjectionToken<BaseStyle<CardTheme>>('CARD_STYLE')

@Injectable()
export class CardStyle extends BaseStyle<CardTheme> {
  protected readonly componentName = 'gp-card'

  protected getDefaultTheme(): CardTheme {
    return {
      classes: ['gp-card-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-card-theme-background, #ffffff)',
        color: 'var(--gp-card-theme-color, #111827)',
        borderColor: 'var(--gp-card-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-card-theme-border-width, 1px)',
        radius: 'var(--gp-card-theme-radius, 0.375rem)',
        padding: 'var(--gp-card-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-card.gp-card-root {
          background-color: var(--gp-card-background);
          color: var(--gp-card-color);
          border: var(--gp-card-border-width) solid var(--gp-card-border-color);
          border-radius: var(--gp-card-radius);
          padding: var(--gp-card-padding);
        }

        @media (max-width: 600px) {
          gp-card.gp-card-root {
            width: var(--gp-card-theme-mobile-width, 100%);
          }
        }
      `,
    }
  }
}

export const CARD_STYLE_PROVIDER: Provider = {
  provide: CARD_STYLE,
  useClass: CardStyle,
}
