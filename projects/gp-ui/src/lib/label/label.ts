import { Component, inject } from '@angular/core'
import { Base } from '../base/base'
import { LABEL_STYLE, LABEL_STYLE_PROVIDER } from './style/label.style'

@Component({
  selector: 'gp-label',
  imports: [],
  templateUrl: './label.html',
  providers: [LABEL_STYLE_PROVIDER],
})
export class Label extends Base {
  private readonly style = inject(LABEL_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }
}
