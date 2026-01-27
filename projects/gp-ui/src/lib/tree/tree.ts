import { Component, inject } from '@angular/core'
import { Base } from '../base/base'
import { TREE_STYLE, TREE_STYLE_PROVIDER } from './style/tree.style'

@Component({
  selector: 'gp-tree',
  imports: [],
  templateUrl: './tree.html',
  providers: [TREE_STYLE_PROVIDER],
})
export class Tree extends Base {
  private readonly style = inject(TREE_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }
}
