import { Component, inject } from '@angular/core'
import { BaseInput } from '../base-input/base-input'
import { INPUT_MASK_STYLE, INPUT_MASK_STYLE_PROVIDER } from './style/input-mask.style'

@Component({
  selector: 'gp-input-mask',
  imports: [],
  templateUrl: './input-mask.html',
  providers: [INPUT_MASK_STYLE_PROVIDER],
})
export class InputMask extends BaseInput {
  private readonly style = inject(INPUT_MASK_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }
}
