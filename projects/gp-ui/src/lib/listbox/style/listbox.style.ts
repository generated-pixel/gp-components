import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type ListboxTheme = ComponentStyleConfig;

export const LISTBOX_STYLE = new InjectionToken<BaseStyle<ListboxTheme>>('LISTBOX_STYLE');

@Injectable()
export class ListboxStyle extends BaseStyle<ListboxTheme> {
  protected readonly componentName = 'gp-listbox';

  protected getDefaultTheme(): ListboxTheme {
    return {
      classes: ['gp-listbox-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-listbox-theme-background, #ffffff)',
        color: 'var(--gp-listbox-theme-color, #111827)',
        borderColor: 'var(--gp-listbox-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-listbox-theme-border-width, 1px)',
        radius: 'var(--gp-listbox-theme-radius, 0.375rem)',
        padding: 'var(--gp-listbox-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-listbox.gp-listbox-root {
          background-color: var(--gp-listbox-background);
          color: var(--gp-listbox-color);
          border: var(--gp-listbox-border-width) solid var(--gp-listbox-border-color);
          border-radius: var(--gp-listbox-radius);
          padding: var(--gp-listbox-padding);
        }

        @media (max-width: 600px) {
          gp-listbox.gp-listbox-root {
            width: var(--gp-listbox-theme-mobile-width, 100%);
          }
        }
      `,
    };
  }
}

export const LISTBOX_STYLE_PROVIDER: Provider = {
  provide: LISTBOX_STYLE,
  useClass: ListboxStyle,
};
