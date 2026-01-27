import { Component, inject } from '@angular/core';
import { BaseInput } from '../base-input/base-input';
import { SELECT_STYLE, SELECT_STYLE_PROVIDER } from './style/select.style';

@Component({
  selector: 'gp-select',
  imports: [],
  templateUrl: './select.html',
  providers: [SELECT_STYLE_PROVIDER],
})
export class Select extends BaseInput {
  private readonly style = inject(SELECT_STYLE);

  onInit(): void {
    this.attachStyle(this.style);
  }
}
