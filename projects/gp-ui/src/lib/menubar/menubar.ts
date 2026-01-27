import { Component, inject } from '@angular/core';
import { Base } from '../base/base';
import { MENUBAR_STYLE, MENUBAR_STYLE_PROVIDER } from './style/menubar.style';

@Component({
  selector: 'gp-menubar',
  imports: [],
  templateUrl: './menubar.html',
  providers: [MENUBAR_STYLE_PROVIDER],
})
export class Menubar extends Base {
  private readonly style = inject(MENUBAR_STYLE);

  onInit(): void {
    this.attachStyle(this.style);
  }
}
