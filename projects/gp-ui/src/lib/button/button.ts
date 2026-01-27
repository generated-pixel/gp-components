import { Component, inject } from '@angular/core'
import { Base } from '../base/base'
import { BUTTON_STYLE, BUTTON_STYLE_PROVIDER } from './style/button.style'

@Component({
  selector: 'gp-button',
  imports: [],
  templateUrl: './button.html',
  providers: [BUTTON_STYLE_PROVIDER],
})
export class Button extends Base {
  private readonly style = inject(BUTTON_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }
}
