import { Component, inject } from '@angular/core';
import { Base } from '../base/base';
import { SPEED_DIAL_STYLE, SPEED_DIAL_STYLE_PROVIDER } from './style/speed-dial.style';

@Component({
  selector: 'gp-speed-dial',
  imports: [],
  templateUrl: './speed-dial.html',
  providers: [SPEED_DIAL_STYLE_PROVIDER],
})
export class SpeedDial extends Base {
  private readonly style = inject(SPEED_DIAL_STYLE);

  onInit(): void {
    this.attachStyle(this.style);
  }
}
