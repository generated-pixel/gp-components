import { Component, input, NgModule } from '@angular/core';
import { BaseInput } from '../base-input/base-input';
import { EyeIcon, EyeSlashIcon } from '../../public-api';
import { TranslationKeys } from '../api';

@Component({
  selector: 'gp-password',
  imports: [EyeIcon, EyeSlashIcon],
  templateUrl: './password.html',
  styleUrl: './password.css',
  standalone: true,
  host: { class: 'gp-password-container gp-flex gp-w-fit gp-max-w-fit gp-border gp-rounded-md' },
})
export class PasswordComponent extends BaseInput {
  placeholder = input<string | undefined>();
  togglePassword = input<boolean | undefined>();
  showClear = input<boolean | undefined>();

  passwordVisible: boolean = false;
  clearVisible: boolean = false;
  showPasswordText: string = undefined;
  hidePasswordText: string = undefined;

  onInit(): void {
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
