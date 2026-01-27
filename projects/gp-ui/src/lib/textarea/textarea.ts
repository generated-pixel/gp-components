import { Component, inject } from '@angular/core';
import { BaseInput } from '../base-input/base-input';
import { TEXTAREA_STYLE, TEXTAREA_STYLE_PROVIDER } from './style/textarea.style';

@Component({
  selector: 'gp-textarea',
  imports: [],
  templateUrl: './textarea.html',
  providers: [TEXTAREA_STYLE_PROVIDER],
})
export class Textarea extends BaseInput {
  private readonly style = inject(TEXTAREA_STYLE);

  onInit(): void {
    this.attachStyle(this.style);
  }
}
