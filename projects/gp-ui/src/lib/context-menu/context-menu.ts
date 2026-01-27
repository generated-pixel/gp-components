import { Component, inject } from '@angular/core';
import { Base } from '../base/base';
import { CONTEXT_MENU_STYLE, CONTEXT_MENU_STYLE_PROVIDER } from './style/context-menu.style';

@Component({
  selector: 'gp-context-menu',
  imports: [],
  templateUrl: './context-menu.html',
  providers: [CONTEXT_MENU_STYLE_PROVIDER],
})
export class ContextMenu extends Base {
  private readonly style = inject(CONTEXT_MENU_STYLE);

  onInit(): void {
    this.attachStyle(this.style);
  }
}
