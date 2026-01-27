import { Component, inject } from '@angular/core'
import { Base } from '../base/base'
import { DRAWER_STYLE, DRAWER_STYLE_PROVIDER } from './style/drawer.style'

@Component({
  selector: 'gp-drawer',
  imports: [],
  templateUrl: './drawer.html',
  providers: [DRAWER_STYLE_PROVIDER],
})
export class Drawer extends Base {
  private readonly style = inject(DRAWER_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }
}
