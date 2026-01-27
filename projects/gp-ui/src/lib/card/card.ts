import { Component, inject } from '@angular/core'
import { Base } from '../base/base'
import { CARD_STYLE, CARD_STYLE_PROVIDER } from './style/card.style'

@Component({
  selector: 'gp-card',
  imports: [],
  templateUrl: './card.html',
  providers: [CARD_STYLE_PROVIDER],
})
export class Card extends Base {
  private readonly style = inject(CARD_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }
}
