import { Component, inject } from '@angular/core'
import { Base } from '../base/base'
import { IMAGE_STYLE, IMAGE_STYLE_PROVIDER } from './style/image.style'

@Component({
  selector: 'gp-image',
  imports: [],
  templateUrl: './image.html',
  providers: [IMAGE_STYLE_PROVIDER],
})
export class Image extends Base {
  private readonly style = inject(IMAGE_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }
}
