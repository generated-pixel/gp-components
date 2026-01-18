import { Component, inject } from '@angular/core'
import { Base } from '../base/base'
import { BlockableUI } from '../api/blockable-ui'
import { PANEL_STYLE, PANEL_STYLE_PROVIDER } from './style/panel.style'

@Component({
  selector: 'gp-panel',
  imports: [],
  templateUrl: './panel.html',
  standalone: true,
  providers: [PANEL_STYLE_PROVIDER],
})
export class Panel extends Base implements BlockableUI {
  private readonly style = inject(PANEL_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }

  findBlockableElement(): HTMLElement {
    return this.elementRef.nativeElement
  }
}
