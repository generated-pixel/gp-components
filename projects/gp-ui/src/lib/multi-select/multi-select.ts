import { Component, inject } from '@angular/core'
import { BaseInput } from '../base-input/base-input'
import { MULTI_SELECT_STYLE, MULTI_SELECT_STYLE_PROVIDER } from './style/multi-select.style'

@Component({
  selector: 'gp-multi-select',
  imports: [],
  templateUrl: './multi-select.html',
  providers: [MULTI_SELECT_STYLE_PROVIDER],
})
export class MultiSelect extends BaseInput {
  private readonly style = inject(MULTI_SELECT_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }
}
