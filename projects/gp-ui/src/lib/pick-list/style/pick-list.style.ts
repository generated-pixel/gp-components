import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type PickListTheme = ComponentStyleConfig;

export const PICK_LIST_STYLE = new InjectionToken<BaseStyle<PickListTheme>>('PICK_LIST_STYLE');

@Injectable()
export class PickListStyle extends BaseStyle<PickListTheme> {
  protected readonly componentName = 'gp-pick-list';

  protected getDefaultTheme(): PickListTheme {
    return {
      classes: ['gp-pick-list-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-pick-list-theme-background, #ffffff)',
        color: 'var(--gp-pick-list-theme-color, #111827)',
        borderColor: 'var(--gp-pick-list-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-pick-list-theme-border-width, 1px)',
        radius: 'var(--gp-pick-list-theme-radius, 0.375rem)',
        padding: 'var(--gp-pick-list-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-pick-list.gp-pick-list-root {
          background-color: var(--gp-pick-list-background);
          color: var(--gp-pick-list-color);
          border: var(--gp-pick-list-border-width) solid var(--gp-pick-list-border-color);
          border-radius: var(--gp-pick-list-radius);
          padding: var(--gp-pick-list-padding);
        }

        @media (max-width: 600px) {
          gp-pick-list.gp-pick-list-root {
            width: var(--gp-pick-list-theme-mobile-width, 100%);
          }
        }
      `,
    };
  }
}

export const PICK_LIST_STYLE_PROVIDER: Provider = {
  provide: PICK_LIST_STYLE,
  useClass: PickListStyle,
};
