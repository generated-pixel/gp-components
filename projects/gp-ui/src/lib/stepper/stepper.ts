import { Component, inject } from '@angular/core';
import { Base } from '../base/base';
import { STEPPER_STYLE, STEPPER_STYLE_PROVIDER } from './style/stepper.style';

@Component({
  selector: 'gp-stepper',
  imports: [],
  templateUrl: './stepper.html',
  providers: [STEPPER_STYLE_PROVIDER],
})
export class Stepper extends Base {
  private readonly style = inject(STEPPER_STYLE);

  onInit(): void {
    this.attachStyle(this.style);
  }
}
