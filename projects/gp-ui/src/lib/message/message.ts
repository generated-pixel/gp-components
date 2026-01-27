import { Component, inject } from '@angular/core'
import { Base } from '../base/base'
import { MESSAGE_STYLE, MESSAGE_STYLE_PROVIDER } from './style/message.style'

@Component({
  selector: 'gp-message',
  imports: [],
  templateUrl: './message.html',
  providers: [MESSAGE_STYLE_PROVIDER],
})
export class Message extends Base {
  private readonly style = inject(MESSAGE_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }
}
