import { Component, inject } from '@angular/core'
import { Base } from '../base/base'
import { SCROLL_PANEL_STYLE, SCROLL_PANEL_STYLE_PROVIDER } from './style/scroll-panel.style'

@Component({
  selector: 'gp-scroll-panel',
  imports: [],
  templateUrl: './scroll-panel.html',
  providers: [SCROLL_PANEL_STYLE_PROVIDER],
})
export class ScrollPanel extends Base {
  private readonly style = inject(SCROLL_PANEL_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }
}
