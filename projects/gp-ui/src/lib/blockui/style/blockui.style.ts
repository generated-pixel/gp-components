import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style'

export type BlockuiTheme = ComponentStyleConfig

export const BLOCKUI_STYLE = new InjectionToken<BaseStyle<BlockuiTheme>>('BLOCKUI_STYLE')

@Injectable()
export class BlockuiStyle extends BaseStyle<BlockuiTheme> {
  protected readonly componentName = 'gp-blockui'

  protected getDefaultTheme(): BlockuiTheme {
    return {
      classes: ['gp-blockui-root'],
      host: {
        display: 'block',
        position: 'relative',
        'min-height': '3rem',
      },
      vars: {
        overlayBackground: 'var(--gp-blockui-theme-overlay-background, rgba(17, 24, 39, 0.35))',
        overlayBlur: 'var(--gp-blockui-theme-overlay-blur, 4px)',
        overlayTransition: 'var(--gp-blockui-theme-overlay-transition, opacity 0.2s ease)',
      },
      css: `
        gp-blockui.gp-blockui-root::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: var(--gp-blockui-overlay-background);
          backdrop-filter: blur(var(--gp-blockui-overlay-blur));
          opacity: 0;
          pointer-events: none;
          transition: var(--gp-blockui-overlay-transition);
        }

        gp-blockui.gp-blockui-root.gp-blockui-active::after {
          opacity: 1;
          pointer-events: all;
        }
      `,
    }
  }
}

export const BLOCKUI_STYLE_PROVIDER: Provider = {
  provide: BLOCKUI_STYLE,
  useClass: BlockuiStyle,
}
