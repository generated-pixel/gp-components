import { Component, inject } from '@angular/core'
import { Base } from '../base/base'
import { PAGINATOR_STYLE, PAGINATOR_STYLE_PROVIDER } from './style/paginator.style'

@Component({
  selector: 'gp-paginator',
  imports: [],
  templateUrl: './paginator.html',
  providers: [PAGINATOR_STYLE_PROVIDER],
})
export class Paginator extends Base {
  private readonly style = inject(PAGINATOR_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }
}
