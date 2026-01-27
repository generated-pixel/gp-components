import { Component, inject } from '@angular/core';
import { Base } from '../base/base';
import { MEGA_MENU_STYLE, MEGA_MENU_STYLE_PROVIDER } from './style/mega-menu.style';

@Component({
  selector: 'gp-mega-menu',
  imports: [],
  templateUrl: './mega-menu.html',
  providers: [MEGA_MENU_STYLE_PROVIDER],
})
export class MegaMenu extends Base {
  private readonly style = inject(MEGA_MENU_STYLE);

  onInit(): void {
    this.attachStyle(this.style);
  }
}
