import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style'

export type TreeTheme = ComponentStyleConfig

export const TREE_STYLE = new InjectionToken<BaseStyle<TreeTheme>>('TREE_STYLE')

@Injectable()
export class TreeStyle extends BaseStyle<TreeTheme> {
  protected readonly componentName = 'gp-tree'

  protected getDefaultTheme(): TreeTheme {
    return {
      classes: ['gp-tree-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-tree-theme-background, #ffffff)',
        color: 'var(--gp-tree-theme-color, #111827)',
        borderColor: 'var(--gp-tree-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-tree-theme-border-width, 1px)',
        radius: 'var(--gp-tree-theme-radius, 0.375rem)',
        padding: 'var(--gp-tree-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-tree.gp-tree-root {
          background-color: var(--gp-tree-background);
          color: var(--gp-tree-color);
          border: var(--gp-tree-border-width) solid var(--gp-tree-border-color);
          border-radius: var(--gp-tree-radius);
          padding: var(--gp-tree-padding);
        }

        @media (max-width: 600px) {
          gp-tree.gp-tree-root {
            width: var(--gp-tree-theme-mobile-width, 100%);
          }
        }
      `,
    }
  }
}

export const TREE_STYLE_PROVIDER: Provider = {
  provide: TREE_STYLE,
  useClass: TreeStyle,
}
