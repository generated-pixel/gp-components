import { Component, inject } from '@angular/core'
import { Base } from '../base/base'
import { TOAST_STYLE, TOAST_STYLE_PROVIDER } from './style/toast.style'

@Component({
  selector: 'gp-toast',
  imports: [],
  templateUrl: './toast.html',
  providers: [TOAST_STYLE_PROVIDER],
})
export class Toast extends Base {
  private readonly style = inject(TOAST_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }
}
