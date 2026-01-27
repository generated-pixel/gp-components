import { Component, inject } from '@angular/core';
import { Base } from '../base/base';
import { TIERED_MENU_STYLE, TIERED_MENU_STYLE_PROVIDER } from './style/tiered-menu.style';

@Component({
  selector: 'gp-tiered-menu',
  imports: [],
  templateUrl: './tiered-menu.html',
  providers: [TIERED_MENU_STYLE_PROVIDER],
})
export class TieredMenu extends Base {
  private readonly style = inject(TIERED_MENU_STYLE);

  onInit(): void {
    this.attachStyle(this.style);
  }
}
