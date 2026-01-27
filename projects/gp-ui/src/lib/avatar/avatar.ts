import { Component, inject } from '@angular/core'
import { Base } from '../base/base'
import { AVATAR_STYLE, AVATAR_STYLE_PROVIDER } from './style/avatar.style'

@Component({
  selector: 'gp-avatar',
  imports: [],
  templateUrl: './avatar.html',
  providers: [AVATAR_STYLE_PROVIDER],
})
export class Avatar extends Base {
  private readonly style = inject(AVATAR_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }
}
