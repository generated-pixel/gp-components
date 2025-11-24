import { Component, input, NgModule } from '@angular/core';
import { BaseInput } from '../base-input/base-input';

@Component({
  selector: 'gp-text',
  imports: [],
  templateUrl: './text.html',
  styleUrl: './text.css',
})
export class TextComponent extends BaseInput {
  placeholder = input<string | undefined>();
  togglePassword = input<boolean | undefined>();

  passwordVisible: boolean = false;

  onPasswordVisibleChange() {
    this.passwordVisible = !this.passwordVisible;
  }
}

@NgModule({
  imports: [TextComponent],
  exports: [TextComponent],
})
export class TextModule {}
