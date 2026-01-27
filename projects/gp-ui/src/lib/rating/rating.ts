import { Component, inject } from '@angular/core'
import { BaseEditable } from '../base-editable/base-editable'
import { RATING_STYLE, RATING_STYLE_PROVIDER } from './style/rating.style'

@Component({
  selector: 'gp-rating',
  imports: [],
  templateUrl: './rating.html',
  providers: [RATING_STYLE_PROVIDER],
})
export class Rating extends BaseEditable {
  private readonly style = inject(RATING_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }
}
