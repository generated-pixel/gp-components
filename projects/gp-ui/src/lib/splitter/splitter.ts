import { Component, inject } from '@angular/core'
import { Base } from '../base/base'
import { SPLITTER_STYLE, SPLITTER_STYLE_PROVIDER } from './style/splitter.style'

@Component({
  selector: 'gp-splitter',
  imports: [],
  templateUrl: './splitter.html',
  providers: [SPLITTER_STYLE_PROVIDER],
})
export class Splitter extends Base {
  private readonly style = inject(SPLITTER_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }
}
