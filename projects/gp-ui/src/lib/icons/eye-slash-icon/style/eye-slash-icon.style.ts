import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseIconStyle, BaseIconTheme } from '../../base-icon/style/base-icon.style'

export type EyeSlashIconTheme = BaseIconTheme

export const EYE_SLASH_ICON_STYLE = new InjectionToken<BaseIconStyle>('EYE_SLASH_ICON_STYLE')

@Injectable()
export class EyeSlashIconStyle extends BaseIconStyle {
  protected readonly componentName = 'gp-icon-eye-slash'

  protected getDefaultTheme(): EyeSlashIconTheme {
    const base = super.getDefaultTheme()

    return {
      ...base,
      classes: [...(base.classes ?? []), 'gp-icon-eye-slash'],
      vars: {
        ...(base.vars ?? {}),
      },
    }
  }
}

export const EYE_SLASH_ICON_STYLE_PROVIDER: Provider = {
  provide: EYE_SLASH_ICON_STYLE,
  useClass: EyeSlashIconStyle,
}
