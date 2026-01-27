import { Component, inject } from '@angular/core';
import { BaseEditable } from '../base-editable/base-editable';
import { TOGGLE_BUTTON_STYLE, TOGGLE_BUTTON_STYLE_PROVIDER } from './style/toggle-button.style';

@Component({
  selector: 'gp-toggle-button',
  imports: [],
  templateUrl: './toggle-button.html',
  providers: [TOGGLE_BUTTON_STYLE_PROVIDER],
})
export class ToggleButton extends BaseEditable {
  private readonly style = inject(TOGGLE_BUTTON_STYLE);

  onInit(): void {
    this.attachStyle(this.style);
  }
}
