import { Component, inject } from '@angular/core';
import { BaseInput } from '../base-input/base-input';
import { INPUT_NUMBER_STYLE, INPUT_NUMBER_STYLE_PROVIDER } from './style/input-number.style';

@Component({
  selector: 'gp-input-number',
  imports: [],
  templateUrl: './input-number.html',
  providers: [INPUT_NUMBER_STYLE_PROVIDER],
})
export class InputNumber extends BaseInput {
  private readonly style = inject(INPUT_NUMBER_STYLE);

  onInit(): void {
    this.attachStyle(this.style);
  }
}
