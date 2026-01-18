import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseIconStyle, BaseIconTheme } from '../../base-icon/style/base-icon.style'

export type CircleXIconTheme = BaseIconTheme

export const CIRCLE_X_ICON_STYLE = new InjectionToken<BaseIconStyle>('CIRCLE_X_ICON_STYLE')

@Injectable()
export class CircleXIconStyle extends BaseIconStyle {
  protected readonly componentName = 'gp-icon-circle-x'

  protected getDefaultTheme(): CircleXIconTheme {
    const base = super.getDefaultTheme()

    return {
      ...base,
      classes: [...(base.classes ?? []), 'gp-icon-circle-x'],
      vars: {
        ...(base.vars ?? {}),
      },
    }
  }
}

export const CIRCLE_X_ICON_STYLE_PROVIDER: Provider = {
  provide: CIRCLE_X_ICON_STYLE,
  useClass: CircleXIconStyle,
}
