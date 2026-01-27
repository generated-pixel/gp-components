import { Component, inject } from '@angular/core';
import { Base } from '../base/base';
import { CHIP_STYLE, CHIP_STYLE_PROVIDER } from './style/chip.style';

@Component({
  selector: 'gp-chip',
  imports: [],
  templateUrl: './chip.html',
  providers: [CHIP_STYLE_PROVIDER],
})
export class Chip extends Base {
  private readonly style = inject(CHIP_STYLE);

  onInit(): void {
    this.attachStyle(this.style);
  }
}
