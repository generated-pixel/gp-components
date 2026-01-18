import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseStyle, ComponentStyleConfig } from '../../../base/style/base.style'

export type BaseIconTheme = ComponentStyleConfig

export const BASE_ICON_STYLE = new InjectionToken<BaseStyle<BaseIconTheme>>('BASE_ICON_STYLE')

@Injectable()
export class BaseIconStyle extends BaseStyle<BaseIconTheme> {
  protected readonly componentName: string = 'gp-icon-base'

  protected getDefaultTheme(): BaseIconTheme {
    const sizeVar = `var(--${this.componentName}-size)`
    const colorVar = `var(--${this.componentName}-color)`
    const strokeWidthVar = `var(--${this.componentName}-stroke-width)`

    return {
      classes: ['gp-icon-root'],
      host: {
        display: 'inline-flex',
        'align-items': 'center',
        'justify-content': 'center',
        width: sizeVar,
        height: sizeVar,
        color: colorVar,
        'stroke-width': strokeWidthVar,
        'line-height': '1',
      },
      vars: {
        size: '1.5rem',
        color: 'currentColor',
        strokeWidth: '1.5',
      },
      css: `
        svg.gp-icon-root {
          flex: 0 0 auto;
        }

        svg.gp-icon-root path,
        svg.gp-icon-root circle,
        svg.gp-icon-root line,
        svg.gp-icon-root polyline,
        svg.gp-icon-root polygon {
          vector-effect: non-scaling-stroke;
        }
      `,
    }
  }
}

export const BASE_ICON_STYLE_PROVIDER: Provider = {
  provide: BASE_ICON_STYLE,
  useClass: BaseIconStyle,
}
