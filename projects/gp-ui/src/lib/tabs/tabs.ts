import { Component, inject } from '@angular/core'
import { Base } from '../base/base'
import { TABS_STYLE, TABS_STYLE_PROVIDER } from './style/tabs.style'

@Component({
  selector: 'gp-tabs',
  imports: [],
  templateUrl: './tabs.html',
  providers: [TABS_STYLE_PROVIDER],
})
export class Tabs extends Base {
  private readonly style = inject(TABS_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }
}
