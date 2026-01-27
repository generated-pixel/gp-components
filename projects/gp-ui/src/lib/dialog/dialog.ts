import { Component, inject } from '@angular/core';
import { Base } from '../base/base';
import { DIALOG_STYLE, DIALOG_STYLE_PROVIDER } from './style/dialog.style';

@Component({
  selector: 'gp-dialog',
  imports: [],
  templateUrl: './dialog.html',
  providers: [DIALOG_STYLE_PROVIDER],
})
export class Dialog extends Base {
  private readonly style = inject(DIALOG_STYLE);

  onInit(): void {
    this.attachStyle(this.style);
  }
}
