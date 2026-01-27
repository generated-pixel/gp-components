import { Component, inject } from '@angular/core'
import { BaseInput } from '../base-input/base-input'
import { SLIDER_STYLE, SLIDER_STYLE_PROVIDER } from './style/slider.style'

@Component({
  selector: 'gp-slider',
  imports: [],
  templateUrl: './slider.html',
  providers: [SLIDER_STYLE_PROVIDER],
})
export class Slider extends BaseInput {
  private readonly style = inject(SLIDER_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }
}
