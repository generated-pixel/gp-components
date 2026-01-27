import { Component, inject } from '@angular/core'
import { Base } from '../base/base'
import { DIVIDER_STYLE, DIVIDER_STYLE_PROVIDER } from './style/divider.style'

@Component({
  selector: 'gp-divider',
  imports: [],
  templateUrl: './divider.html',
  providers: [DIVIDER_STYLE_PROVIDER],
})
export class Divider extends Base {
  private readonly style = inject(DIVIDER_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }
}
