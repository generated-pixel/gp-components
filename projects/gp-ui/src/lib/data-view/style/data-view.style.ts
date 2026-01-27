import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type DataViewTheme = ComponentStyleConfig;

export const DATA_VIEW_STYLE = new InjectionToken<BaseStyle<DataViewTheme>>('DATA_VIEW_STYLE');

@Injectable()
export class DataViewStyle extends BaseStyle<DataViewTheme> {
  protected readonly componentName = 'gp-data-view';

  protected getDefaultTheme(): DataViewTheme {
    return {
      classes: ['gp-data-view-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-data-view-theme-background, #ffffff)',
        color: 'var(--gp-data-view-theme-color, #111827)',
        borderColor: 'var(--gp-data-view-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-data-view-theme-border-width, 1px)',
        radius: 'var(--gp-data-view-theme-radius, 0.375rem)',
        padding: 'var(--gp-data-view-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-data-view.gp-data-view-root {
          background-color: var(--gp-data-view-background);
          color: var(--gp-data-view-color);
          border: var(--gp-data-view-border-width) solid var(--gp-data-view-border-color);
          border-radius: var(--gp-data-view-radius);
          padding: var(--gp-data-view-padding);
        }

        @media (max-width: 600px) {
          gp-data-view.gp-data-view-root {
            width: var(--gp-data-view-theme-mobile-width, 100%);
          }
        }
      `,
    };
  }
}

export const DATA_VIEW_STYLE_PROVIDER: Provider = {
  provide: DATA_VIEW_STYLE,
  useClass: DataViewStyle,
};
