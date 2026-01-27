import { Component, inject } from '@angular/core'
import { BaseInput } from '../base-input/base-input'
import { INPUT_OTP_STYLE, INPUT_OTP_STYLE_PROVIDER } from './style/input-otp.style'

@Component({
  selector: 'gp-input-otp',
  imports: [],
  templateUrl: './input-otp.html',
  providers: [INPUT_OTP_STYLE_PROVIDER],
})
export class InputOtp extends BaseInput {
  private readonly style = inject(INPUT_OTP_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }
}
