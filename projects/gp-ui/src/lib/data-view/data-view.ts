import { Component, inject } from '@angular/core'
import { Base } from '../base/base'
import { DATA_VIEW_STYLE, DATA_VIEW_STYLE_PROVIDER } from './style/data-view.style'

@Component({
  selector: 'gp-data-view',
  imports: [],
  templateUrl: './data-view.html',
  providers: [DATA_VIEW_STYLE_PROVIDER],
})
export class DataView extends Base {
  private readonly style = inject(DATA_VIEW_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }
}
