import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style'

export type TooltipTheme = ComponentStyleConfig

export const TOOLTIP_STYLE = new InjectionToken<BaseStyle<TooltipTheme>>('TOOLTIP_STYLE')

@Injectable()
export class TooltipStyle extends BaseStyle<TooltipTheme> {
  protected readonly componentName = 'gp-tooltip'

  protected getDefaultTheme(): TooltipTheme {
    return {
      classes: ['gp-tooltip-root'],
      host: {
        display: 'inline-block',
        position: 'relative',
      },
      vars: {
        background: '#111827',
        color: '#f9fafb',
        padding: '0.5rem 0.75rem',
        radius: '0.375rem',
        shadow: '0 4px 12px rgba(15, 23, 42, 0.15)',
        offset: '0.5rem',
        fontSize: '0.75rem',
      },
      css: `
        gp-tooltip.gp-tooltip-root .gp-tooltip-content {
          position: absolute;
          inset: auto auto calc(100% + var(--gp-tooltip-offset)) 50%;
          transform: translateX(-50%);
          background: var(--gp-tooltip-background);
          color: var(--gp-tooltip-color);
          padding: var(--gp-tooltip-padding);
          border-radius: var(--gp-tooltip-radius);
          box-shadow: var(--gp-tooltip-shadow);
          font-size: var(--gp-tooltip-font-size);
          line-height: 1.25;
          z-index: 50;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.15s ease, transform 0.15s ease;
        }

        gp-tooltip.gp-tooltip-root.gp-tooltip-open .gp-tooltip-content {
          opacity: 1;
          pointer-events: auto;
          transform: translate(-50%, -4px);
        }

        @media (max-width: 600px) {
          gp-tooltip.gp-tooltip-root .gp-tooltip-content {
            inset: auto auto var(--gp-tooltip-theme-mobile-vertical-offset) 50%;
            max-width: var(--gp-tooltip-theme-mobile-max-width);
            text-align: var(--gp-tooltip-theme-mobile-text-align);
          }
        }
      `,
    }
  }
}

export const TOOLTIP_STYLE_PROVIDER: Provider = {
  provide: TOOLTIP_STYLE,
  useClass: TooltipStyle,
}
