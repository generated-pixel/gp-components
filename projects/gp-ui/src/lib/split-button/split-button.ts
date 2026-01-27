import { Component, inject } from '@angular/core';
import { Base } from '../base/base';
import { SPLIT_BUTTON_STYLE, SPLIT_BUTTON_STYLE_PROVIDER } from './style/split-button.style';

@Component({
  selector: 'gp-split-button',
  imports: [],
  templateUrl: './split-button.html',
  providers: [SPLIT_BUTTON_STYLE_PROVIDER],
})
export class SplitButton extends Base {
  private readonly style = inject(SPLIT_BUTTON_STYLE);

  onInit(): void {
    this.attachStyle(this.style);
  }
}
