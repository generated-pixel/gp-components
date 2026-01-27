import { Component, inject } from '@angular/core'
import { BaseEditable } from '../base-editable/base-editable'
import { RADIO_BUTTON_STYLE, RADIO_BUTTON_STYLE_PROVIDER } from './style/radio-button.style'

@Component({
  selector: 'gp-radio-button',
  imports: [],
  templateUrl: './radio-button.html',
  providers: [RADIO_BUTTON_STYLE_PROVIDER],
})
export class RadioButton extends BaseEditable {
  private readonly style = inject(RADIO_BUTTON_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }
}
