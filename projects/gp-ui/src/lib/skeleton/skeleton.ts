import { Component, inject } from '@angular/core'
import { Base } from '../base/base'
import { SKELETON_STYLE, SKELETON_STYLE_PROVIDER } from './style/skeleton.style'

@Component({
  selector: 'gp-skeleton',
  imports: [],
  templateUrl: './skeleton.html',
  providers: [SKELETON_STYLE_PROVIDER],
})
export class Skeleton extends Base {
  private readonly style = inject(SKELETON_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }
}
