import { Component, input, NgModule } from '@angular/core';
import { BaseInput } from '../base-input/base-input';

@Component({
  selector: 'gp-password',
  imports: [],
  templateUrl: './password.html',
  styleUrl: './password.css',
})
export class Password extends BaseInput {
  placeholder = input<string | undefined>();
  togglePassword = input<boolean | undefined>();

  passwordVisible: boolean = false;

  onPasswordVisibleChange() {
    this.passwordVisible = !this.passwordVisible;
  }
}

@NgModule({
  imports: [Password],
  exports: [Password],
})
export class PasswordModule {}
