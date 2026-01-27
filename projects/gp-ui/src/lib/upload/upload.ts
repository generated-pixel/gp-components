import { Component, inject } from '@angular/core'
import { BaseInput } from '../base-input/base-input'
import { UPLOAD_STYLE, UPLOAD_STYLE_PROVIDER } from './style/upload.style'

@Component({
  selector: 'gp-upload',
  imports: [],
  templateUrl: './upload.html',
  providers: [UPLOAD_STYLE_PROVIDER],
})
export class Upload extends BaseInput {
  private readonly style = inject(UPLOAD_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }
}
