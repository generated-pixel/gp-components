import { Component, inject } from '@angular/core'
import { BaseIcon } from '../base-icon/base-icon'
import { BASE_ICON_STYLE_PROVIDER } from '../base-icon/style/base-icon.style'
import { EYE_SLASH_ICON_STYLE, EYE_SLASH_ICON_STYLE_PROVIDER } from './style/eye-slash-icon.style'

@Component({
  selector: '[data-gp-icon="eye-slash"]',
  imports: [],
  template: ` <svg:path
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
  />`,
  standalone: true,
  providers: [BASE_ICON_STYLE_PROVIDER, EYE_SLASH_ICON_STYLE_PROVIDER],
})
export class EyeSlashIcon extends BaseIcon {
  private readonly eyeSlashStyle = inject(EYE_SLASH_ICON_STYLE)

  override onInit(): void {
    super.onInit()
    this.attachStyle(this.eyeSlashStyle)
  }
}
