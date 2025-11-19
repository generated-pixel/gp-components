import { CommonModule } from '@angular/common';
import { Component, input, NgModule } from '@angular/core';
import { BaseInput } from 'gp-components/base-input';

@Component({
  selector: 'gp-password',
  imports: [CommonModule],
  templateUrl: './password.html',
  styleUrl: './password.css',
  standalone: true,
})
export class PasswordComponent extends BaseInput {
  placeholder = input<string | undefined>();
  togglePassword = input<boolean | undefined>();
}

@NgModule({
  imports: [PasswordComponent],
  exports: [PasswordComponent],
})
export class PasswordModule {}
