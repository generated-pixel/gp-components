import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type LabelTheme = ComponentStyleConfig;

export const LABEL_STYLE = new InjectionToken<BaseStyle<LabelTheme>>('LABEL_STYLE');

@Injectable()
export class LabelStyle extends BaseStyle<LabelTheme> {
  protected readonly componentName = 'gp-label';

  protected getDefaultTheme(): LabelTheme {
    return {
      classes: ['gp-label-root'],
      host: {
        display: 'inline-flex',
        'align-items': 'center',
        gap: 'var(--gp-label-gap)',
        'font-size': 'var(--gp-label-font-size)',
        'font-weight': 'var(--gp-label-font-weight)',
        color: 'var(--gp-label-color)',
        'text-transform': 'var(--gp-label-text-transform)',
        'letter-spacing': 'var(--gp-label-letter-spacing)',
      },
      vars: {
        color: 'var(--gp-label-theme-color, #374151)',
        gap: 'var(--gp-label-theme-gap, 0.25rem)',
        fontSize: 'var(--gp-label-theme-font-size, 0.875rem)',
        fontWeight: 'var(--gp-label-theme-font-weight, 600)',
        textTransform: 'var(--gp-label-theme-text-transform, none)',
        letterSpacing: 'var(--gp-label-theme-letter-spacing, 0)',
        requiredColor: 'var(--gp-label-theme-required-color, #dc2626)',
      },
      css: `
        gp-label.gp-label-root[aria-required='true']::after {
          content: '*';
          margin-left: var(--gp-label-gap);
          color: var(--gp-label-required-color);
          font-weight: inherit;
        }
      `,
    };
  }
}

export const LABEL_STYLE_PROVIDER: Provider = {
  provide: LABEL_STYLE,
  useClass: LabelStyle,
};
