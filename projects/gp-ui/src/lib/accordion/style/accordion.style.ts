import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style'

export type AccordionTheme = ComponentStyleConfig

export const ACCORDION_STYLE = new InjectionToken<BaseStyle<AccordionTheme>>('ACCORDION_STYLE')

@Injectable()
export class AccordionStyle extends BaseStyle<AccordionTheme> {
  protected readonly componentName = 'gp-accordion'

  protected getDefaultTheme(): AccordionTheme {
    return {
      classes: ['gp-accordion-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-accordion-theme-background, #ffffff)',
        color: 'var(--gp-accordion-theme-color, #111827)',
        borderColor: 'var(--gp-accordion-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-accordion-theme-border-width, 1px)',
        radius: 'var(--gp-accordion-theme-radius, 0.375rem)',
        padding: 'var(--gp-accordion-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-accordion.gp-accordion-root {
          background-color: var(--gp-accordion-background);
          color: var(--gp-accordion-color);
          border: var(--gp-accordion-border-width) solid var(--gp-accordion-border-color);
          border-radius: var(--gp-accordion-radius);
          padding: var(--gp-accordion-padding);
        }

        @media (max-width: 600px) {
          gp-accordion.gp-accordion-root {
            width: var(--gp-accordion-theme-mobile-width, 100%);
          }
        }
      `,
    }
  }
}

export const ACCORDION_STYLE_PROVIDER: Provider = {
  provide: ACCORDION_STYLE,
  useClass: AccordionStyle,
}
