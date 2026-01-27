import { Component, inject } from '@angular/core'
import { BaseInput } from '../base-input/base-input'
import { CASCADE_SELECT_STYLE, CASCADE_SELECT_STYLE_PROVIDER } from './style/cascade-select.style'

@Component({
  selector: 'gp-cascade-select',
  imports: [],
  templateUrl: './cascade-select.html',
  providers: [CASCADE_SELECT_STYLE_PROVIDER],
})
export class CascadeSelect extends BaseInput {
  private readonly style = inject(CASCADE_SELECT_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }
}
