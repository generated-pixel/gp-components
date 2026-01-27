import { Component, inject } from '@angular/core';
import { Base } from '../base/base';
import { BLOCKUI_STYLE, BLOCKUI_STYLE_PROVIDER } from './style/blockui.style';

@Component({
  selector: 'gp-blockui',
  imports: [],
  templateUrl: './blockui.html',
  standalone: true,
  providers: [BLOCKUI_STYLE_PROVIDER],
})
export class Blockui extends Base {
  private readonly style = inject(BLOCKUI_STYLE);

  onInit(): void {
    this.attachStyle(this.style);
  }
}
