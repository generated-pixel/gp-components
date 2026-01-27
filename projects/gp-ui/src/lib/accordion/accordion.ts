import { Component, inject } from '@angular/core';
import { Base } from '../base/base';
import { ACCORDION_STYLE, ACCORDION_STYLE_PROVIDER } from './style/accordion.style';

@Component({
  selector: 'gp-accordion',
  imports: [],
  templateUrl: './accordion.html',
  providers: [ACCORDION_STYLE_PROVIDER],
})
export class Accordion extends Base {
  private readonly style = inject(ACCORDION_STYLE);

  onInit(): void {
    this.attachStyle(this.style);
  }
}
