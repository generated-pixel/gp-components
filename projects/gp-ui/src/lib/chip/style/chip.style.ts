import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type ChipTheme = ComponentStyleConfig;

export const CHIP_STYLE = new InjectionToken<BaseStyle<ChipTheme>>('CHIP_STYLE');

@Injectable()
export class ChipStyle extends BaseStyle<ChipTheme> {
  protected readonly componentName = 'gp-chip';

  protected getDefaultTheme(): ChipTheme {
    return {
      classes: ['gp-chip-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-chip-theme-background, #ffffff)',
        color: 'var(--gp-chip-theme-color, #111827)',
        borderColor: 'var(--gp-chip-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-chip-theme-border-width, 1px)',
        radius: 'var(--gp-chip-theme-radius, 0.375rem)',
        padding: 'var(--gp-chip-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-chip.gp-chip-root {
          background-color: var(--gp-chip-background);
          color: var(--gp-chip-color);
          border: var(--gp-chip-border-width) solid var(--gp-chip-border-color);
          border-radius: var(--gp-chip-radius);
          padding: var(--gp-chip-padding);
        }

        @media (max-width: 600px) {
          gp-chip.gp-chip-root {
            width: var(--gp-chip-theme-mobile-width, 100%);
          }
        }
      `,
    };
  }
}

export const CHIP_STYLE_PROVIDER: Provider = {
  provide: CHIP_STYLE,
  useClass: ChipStyle,
};
