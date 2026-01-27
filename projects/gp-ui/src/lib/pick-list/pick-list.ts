import { Component, inject } from '@angular/core'
import { Base } from '../base/base'
import { PICK_LIST_STYLE, PICK_LIST_STYLE_PROVIDER } from './style/pick-list.style'

@Component({
  selector: 'gp-pick-list',
  imports: [],
  templateUrl: './pick-list.html',
  providers: [PICK_LIST_STYLE_PROVIDER],
})
export class PickList extends Base {
  private readonly style = inject(PICK_LIST_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }
}
