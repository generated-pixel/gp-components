import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style'

export type TreeTableTheme = ComponentStyleConfig

export const TREE_TABLE_STYLE = new InjectionToken<BaseStyle<TreeTableTheme>>('TREE_TABLE_STYLE')

@Injectable()
export class TreeTableStyle extends BaseStyle<TreeTableTheme> {
  protected readonly componentName = 'gp-tree-table'

  protected getDefaultTheme(): TreeTableTheme {
    return {
      classes: ['gp-tree-table-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-tree-table-theme-background, #ffffff)',
        color: 'var(--gp-tree-table-theme-color, #111827)',
        borderColor: 'var(--gp-tree-table-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-tree-table-theme-border-width, 1px)',
        radius: 'var(--gp-tree-table-theme-radius, 0.375rem)',
        padding: 'var(--gp-tree-table-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-tree-table.gp-tree-table-root {
          background-color: var(--gp-tree-table-background);
          color: var(--gp-tree-table-color);
          border: var(--gp-tree-table-border-width) solid var(--gp-tree-table-border-color);
          border-radius: var(--gp-tree-table-radius);
          padding: var(--gp-tree-table-padding);
        }

        @media (max-width: 600px) {
          gp-tree-table.gp-tree-table-root {
            width: var(--gp-tree-table-theme-mobile-width, 100%);
          }
        }
      `,
    }
  }
}

export const TREE_TABLE_STYLE_PROVIDER: Provider = {
  provide: TREE_TABLE_STYLE,
  useClass: TreeTableStyle,
}
