import { CommonModule } from '@angular/common';
import { Component, Input, input, NgModule } from '@angular/core';
import { BaseInput } from '../base-input/base-input';

@Component({
  selector: 'gp-password',
  imports: [CommonModule],
  templateUrl: './password.html',
  styleUrl: './password.css',
  standalone: true,
})
export class PasswordComponent extends BaseInput {
  @Input() placeholder?: string = '';
}

@NgModule({
  imports: [PasswordComponent],
  exports: [PasswordComponent],
})
export class GpPasswordModule {}
