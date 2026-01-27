import { Component, inject } from '@angular/core'
import { Base } from '../base/base'
import { BADGE_STYLE, BADGE_STYLE_PROVIDER } from './style/badge.style'

@Component({
  selector: 'gp-badge',
  imports: [],
  templateUrl: './badge.html',
  providers: [BADGE_STYLE_PROVIDER],
})
export class Badge extends Base {
  private readonly style = inject(BADGE_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }
}
