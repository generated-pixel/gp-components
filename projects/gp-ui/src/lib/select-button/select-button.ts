import { Component, inject } from '@angular/core'
import { BaseEditable } from '../base-editable/base-editable'
import { SELECT_BUTTON_STYLE, SELECT_BUTTON_STYLE_PROVIDER } from './style/select-button.style'

@Component({
  selector: 'gp-select-button',
  imports: [],
  templateUrl: './select-button.html',
  providers: [SELECT_BUTTON_STYLE_PROVIDER],
})
export class SelectButton extends BaseEditable {
  private readonly style = inject(SELECT_BUTTON_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }
}
