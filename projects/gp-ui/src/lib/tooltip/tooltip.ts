import { Component, inject } from '@angular/core'
import { Base } from '../base/base'
import { TOOLTIP_STYLE, TOOLTIP_STYLE_PROVIDER } from './style/tooltip.style'

@Component({
  selector: 'gp-tooltip',
  imports: [],
  templateUrl: './tooltip.html',
  providers: [TOOLTIP_STYLE_PROVIDER],
})
export class Tooltip extends Base {
  private readonly style = inject(TOOLTIP_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }
}
