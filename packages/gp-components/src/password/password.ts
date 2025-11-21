import { CommonModule } from '@angular/common';
import { Component, inject, InjectionToken, input, NgModule } from '@angular/core';
import { BaseInput } from 'gp-components/base-input';
import { EyeIcon, EyeSlashIcon } from 'gp-components/icons';
import { PasswordStyle } from './password-style';

const PASSWORD_INSTANCE = new InjectionToken<PasswordComponent>('PASSWORD_INSTANCE');

@Component({
  selector: 'gp-password',
  imports: [CommonModule, EyeSlashIcon, EyeIcon],
  templateUrl: './password.html',
  standalone: true,
  providers: [PasswordStyle, { provide: PASSWORD_INSTANCE, useExisting: PasswordComponent }],
})
export class PasswordComponent extends BaseInput {
  placeholder = input<string | undefined>();
  togglePassword = input<boolean | undefined>();

  passwordVisible: boolean = false;

  _componentStyle = inject(PasswordStyle);

  onPasswordVisibleChange() {
    this.passwordVisible = !this.passwordVisible;
  }
}

@NgModule({
  imports: [PasswordComponent],
  exports: [PasswordComponent],
})
export class PasswordModule {}
