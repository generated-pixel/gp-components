import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style'

export type ThemeSwitcherTheme = ComponentStyleConfig

export const THEME_SWITCHER_STYLE = new InjectionToken<BaseStyle<ThemeSwitcherTheme>>('THEME_SWITCHER_STYLE')

@Injectable()
export class ThemeSwitcherStyle extends BaseStyle<ThemeSwitcherTheme> {
  protected readonly componentName = 'gp-theme-switcher'

  protected getDefaultTheme(): ThemeSwitcherTheme {
    return {
      classes: ['gp-theme-switcher-root'],
      host: {
        display: 'inline-flex',
      },
      vars: {
        gap: 'var(--gp-theme-switcher-theme-gap, 0.5rem)',
        controlGap: 'var(--gp-theme-switcher-theme-control-gap, 0.375rem)',
        labelColor: 'var(--gp-theme-switcher-theme-label-color, currentColor)',
        selectBackground: 'var(--gp-theme-switcher-theme-select-background, #ffffff)',
        selectBorder: 'var(--gp-theme-switcher-theme-select-border, #d1d5db)',
        selectColor: 'var(--gp-theme-switcher-theme-select-color, #111827)',
        selectRadius: 'var(--gp-theme-switcher-theme-select-radius, 0.375rem)',
        selectPadding: 'var(--gp-theme-switcher-theme-select-padding, 0.375rem 0.5rem)',
        selectFocusRing: 'var(--gp-theme-switcher-theme-select-focus-ring, 0 0 0 2px rgba(99, 102, 241, 0.35))',
        selectFocusBorder: 'var(--gp-theme-switcher-theme-select-focus-border, #6366f1)',
      },
      css: `
        gp-theme-switcher.gp-theme-switcher-root {
          display: inline-flex;
          width: 100%;
        }

        gp-theme-switcher.gp-theme-switcher-root .gp-theme-switcher {
          display: grid;
          gap: var(--gp-theme-switcher-gap);
          width: min(100%, 20rem);
        }

        gp-theme-switcher.gp-theme-switcher-root .gp-theme-switcher__control {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: var(--gp-theme-switcher-control-gap);
          color: var(--gp-theme-switcher-label-color);
          font-size: 0.75rem;
          font-weight: 600;
          line-height: 1.2;
        }

        gp-theme-switcher.gp-theme-switcher-root .gp-theme-switcher__label {
          display: inline-flex;
          align-items: center;
        }

        gp-theme-switcher.gp-theme-switcher-root .gp-theme-switcher__select {
          width: 100%;
          background: var(--gp-theme-switcher-select-background);
          border: 1px solid var(--gp-theme-switcher-select-border);
          color: var(--gp-theme-switcher-select-color);
          border-radius: var(--gp-theme-switcher-select-radius);
          padding: var(--gp-theme-switcher-select-padding);
          font: inherit;
          line-height: 1.25;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        gp-theme-switcher.gp-theme-switcher-root .gp-theme-switcher__select:focus-visible {
          border-color: var(--gp-theme-switcher-select-focus-border);
          box-shadow: var(--gp-theme-switcher-select-focus-ring);
        }

        @media (min-width: 640px) {
          gp-theme-switcher.gp-theme-switcher-root .gp-theme-switcher {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `,
    }
  }
}

export const THEME_SWITCHER_STYLE_PROVIDER: Provider = {
  provide: THEME_SWITCHER_STYLE,
  useClass: ThemeSwitcherStyle,
}
