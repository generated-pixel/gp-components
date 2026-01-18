import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseIconStyle, BaseIconTheme } from '../../base-icon/style/base-icon.style'

export type EyeIconTheme = BaseIconTheme

export const EYE_ICON_STYLE = new InjectionToken<BaseIconStyle>('EYE_ICON_STYLE')

@Injectable()
export class EyeIconStyle extends BaseIconStyle {
  protected readonly componentName = 'gp-icon-eye'

  protected getDefaultTheme(): EyeIconTheme {
    const base = super.getDefaultTheme()

    return {
      ...base,
      classes: [...(base.classes ?? []), 'gp-icon-eye'],
      vars: {
        ...(base.vars ?? {}),
      },
    }
  }
}

export const EYE_ICON_STYLE_PROVIDER: Provider = {
  provide: EYE_ICON_STYLE,
  useClass: EyeIconStyle,
}
