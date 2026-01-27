import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type TableTheme = ComponentStyleConfig;

export const TABLE_STYLE = new InjectionToken<BaseStyle<TableTheme>>('TABLE_STYLE');

@Injectable()
export class TableStyle extends BaseStyle<TableTheme> {
  protected readonly componentName = 'gp-table';

  protected getDefaultTheme(): TableTheme {
    return {
      classes: ['gp-table-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-table-theme-background, #ffffff)',
        color: 'var(--gp-table-theme-color, #111827)',
        borderColor: 'var(--gp-table-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-table-theme-border-width, 1px)',
        radius: 'var(--gp-table-theme-radius, 0.375rem)',
        padding: 'var(--gp-table-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-table.gp-table-root {
          background-color: var(--gp-table-background);
          color: var(--gp-table-color);
          border: var(--gp-table-border-width) solid var(--gp-table-border-color);
          border-radius: var(--gp-table-radius);
          padding: var(--gp-table-padding);
        }

        @media (max-width: 600px) {
          gp-table.gp-table-root {
            width: var(--gp-table-theme-mobile-width, 100%);
          }
        }
      `,
    };
  }
}

export const TABLE_STYLE_PROVIDER: Provider = {
  provide: TABLE_STYLE,
  useClass: TableStyle,
};
