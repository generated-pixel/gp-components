import { Component, inject } from '@angular/core'
import { BaseIcon } from '../base-icon/base-icon'
import { BASE_ICON_STYLE_PROVIDER } from '../base-icon/style/base-icon.style'
import { CIRCLE_X_ICON_STYLE, CIRCLE_X_ICON_STYLE_PROVIDER } from './style/circle-x-icon.style'

@Component({
  selector: '[data-gp-icon="circle-x"]',
  imports: [],
  template: ` <svg:path
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  />`,
  providers: [BASE_ICON_STYLE_PROVIDER, CIRCLE_X_ICON_STYLE_PROVIDER],
})
export class CircleXIcon extends BaseIcon {
  private readonly circleStyle = inject(CIRCLE_X_ICON_STYLE)

  override onInit(): void {
    super.onInit()
    this.attachStyle(this.circleStyle)
  }
}
