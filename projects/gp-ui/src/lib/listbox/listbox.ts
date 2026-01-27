import { Component, inject } from '@angular/core'
import { BaseInput } from '../base-input/base-input'
import { LISTBOX_STYLE, LISTBOX_STYLE_PROVIDER } from './style/listbox.style'

@Component({
  selector: 'gp-listbox',
  imports: [],
  templateUrl: './listbox.html',
  providers: [LISTBOX_STYLE_PROVIDER],
})
export class Listbox extends BaseInput {
  private readonly style = inject(LISTBOX_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }
}
