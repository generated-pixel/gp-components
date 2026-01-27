import { Component, inject } from '@angular/core'
import { Base } from '../base/base'
import { TOOLBAR_STYLE, TOOLBAR_STYLE_PROVIDER } from './style/toolbar.style'

@Component({
  selector: 'gp-toolbar',
  imports: [],
  templateUrl: './toolbar.html',
  providers: [TOOLBAR_STYLE_PROVIDER],
})
export class Toolbar extends Base {
  private readonly style = inject(TOOLBAR_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }
}
