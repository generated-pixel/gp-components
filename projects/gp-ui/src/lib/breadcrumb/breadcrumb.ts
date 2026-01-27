import { Component, inject } from '@angular/core'
import { Base } from '../base/base'
import { BREADCRUMB_STYLE, BREADCRUMB_STYLE_PROVIDER } from './style/breadcrumb.style'

@Component({
  selector: 'gp-breadcrumb',
  imports: [],
  templateUrl: './breadcrumb.html',
  providers: [BREADCRUMB_STYLE_PROVIDER],
})
export class Breadcrumb extends Base {
  private readonly style = inject(BREADCRUMB_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }
}
