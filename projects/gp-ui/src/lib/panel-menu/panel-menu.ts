import { Component, inject } from '@angular/core';
import { Base } from '../base/base';
import { PANEL_MENU_STYLE, PANEL_MENU_STYLE_PROVIDER } from './style/panel-menu.style';

@Component({
  selector: 'gp-panel-menu',
  imports: [],
  templateUrl: './panel-menu.html',
  providers: [PANEL_MENU_STYLE_PROVIDER],
})
export class PanelMenu extends Base {
  private readonly style = inject(PANEL_MENU_STYLE);

  onInit(): void {
    this.attachStyle(this.style);
  }
}
