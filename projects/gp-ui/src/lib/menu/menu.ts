import { Component, inject } from '@angular/core'
import { Base } from '../base/base'
import { MENU_STYLE, MENU_STYLE_PROVIDER } from './style/menu.style'

@Component({
  selector: 'gp-menu',
  imports: [],
  templateUrl: './menu.html',
  providers: [MENU_STYLE_PROVIDER],
})
export class Menu extends Base {
  private readonly style = inject(MENU_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }
}
