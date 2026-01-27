import { Component, inject, input, NgModule } from '@angular/core';
import { BaseInput } from '../base-input/base-input';
import { EyeIcon, EyeSlashIcon } from '../../public-api';
import { TranslationKeys } from '../api';
import { PASSWORD_STYLE, PASSWORD_STYLE_PROVIDER } from './style/password.style';

@Component({
  selector: 'gp-password',
  imports: [EyeIcon, EyeSlashIcon],
  templateUrl: './password.html',
  standalone: true,
  providers: [PASSWORD_STYLE_PROVIDER],
})
export class PasswordComponent extends BaseInput {
  private readonly style = inject(PASSWORD_STYLE);

  placeholder = input<string | undefined>();
  togglePassword = input<boolean | undefined>();
  showClear = input<boolean | undefined>();

  passwordVisible: boolean = false;
  clearVisible: boolean = false;
  showPasswordText: string = undefined;
  hidePasswordText: string = undefined;

  onInit(): void {
    this.attachStyle(this.style);
    this.showPasswordText = this.config.getTranslation(TranslationKeys.SHOW_PASSWORD);
    this.hidePasswordText = this.config.getTranslation(TranslationKeys.HIDE_PASSWORD);
  }

  onPasswordVisibleChange() {
    this.passwordVisible = !this.passwordVisible;
  }
}

@NgModule({
  imports: [PasswordComponent],
  exports: [PasswordComponent],
})
export class PasswordModule {}
