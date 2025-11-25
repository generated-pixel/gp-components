import { Component } from '@angular/core';
import { Base } from '../base/base';
import { BlockableUI } from '../api/blockable-ui';

@Component({
  selector: 'gp-panel',
  imports: [],
  templateUrl: './panel.html',
  styleUrl: './panel.css',
})
export class Panel extends Base implements BlockableUI {
  findBlockableElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
