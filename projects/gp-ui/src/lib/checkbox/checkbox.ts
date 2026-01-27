import { Component, inject } from '@angular/core';
import { BaseEditable } from '../base-editable/base-editable';
import { CHECKBOX_STYLE, CHECKBOX_STYLE_PROVIDER } from './style/checkbox.style';

@Component({
  selector: 'gp-checkbox',
  imports: [],
  templateUrl: './checkbox.html',
  providers: [CHECKBOX_STYLE_PROVIDER],
})
export class Checkbox extends BaseEditable {
  private readonly style = inject(CHECKBOX_STYLE);

  onInit(): void {
    this.attachStyle(this.style);
  }
}
