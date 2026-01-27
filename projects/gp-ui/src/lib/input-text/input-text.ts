import { Component, inject } from '@angular/core';
import { BaseInput } from '../base-input/base-input';
import { INPUT_TEXT_STYLE, INPUT_TEXT_STYLE_PROVIDER } from './style/input-text.style';

@Component({
  selector: 'gp-input-text',
  imports: [],
  templateUrl: './input-text.html',
  providers: [INPUT_TEXT_STYLE_PROVIDER],
})
export class InputText extends BaseInput {
  private readonly style = inject(INPUT_TEXT_STYLE);

  onInit(): void {
    this.attachStyle(this.style);
  }
}
