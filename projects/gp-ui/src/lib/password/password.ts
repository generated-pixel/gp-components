import { Component, input, NgModule } from '@angular/core';
import { BaseInput } from '../base-input/base-input';
import { EyeIcon, EyeSlashIcon } from '../../public-api';

@Component({
  selector: 'gp-password',
  imports: [EyeIcon, EyeSlashIcon],
  templateUrl: './password.html',
  styleUrl: './password.css',
})
export class PasswordComponent extends BaseInput {
  placeholder = input<string | undefined>();
  togglePassword = input<boolean | undefined>();
  showClear = input<boolean | undefined>();

  passwordVisible: boolean = false;
  clearVisible: boolean = false;

  onPasswordVisibleChange() {
    this.passwordVisible = !this.passwordVisible;
  }
}

@NgModule({
  imports: [PasswordComponent],
  exports: [PasswordComponent],
})
export class PasswordModule {}
