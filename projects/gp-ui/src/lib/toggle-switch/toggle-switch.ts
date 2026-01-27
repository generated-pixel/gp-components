import { Component, inject } from '@angular/core';
import { BaseEditable } from '../base-editable/base-editable';
import { TOGGLE_SWITCH_STYLE, TOGGLE_SWITCH_STYLE_PROVIDER } from './style/toggle-switch.style';

@Component({
  selector: 'gp-toggle-switch',
  imports: [],
  templateUrl: './toggle-switch.html',
  providers: [TOGGLE_SWITCH_STYLE_PROVIDER],
})
export class ToggleSwitch extends BaseEditable {
  private readonly style = inject(TOGGLE_SWITCH_STYLE);

  onInit(): void {
    this.attachStyle(this.style);
  }
}
