import { Component, inject } from '@angular/core';
import { Base } from '../base/base';
import { CONFIRM_POPUP_STYLE, CONFIRM_POPUP_STYLE_PROVIDER } from './style/confirm-popup.style';

@Component({
  selector: 'gp-confirm-popup',
  imports: [],
  templateUrl: './confirm-popup.html',
  providers: [CONFIRM_POPUP_STYLE_PROVIDER],
})
export class ConfirmPopup extends Base {
  private readonly style = inject(CONFIRM_POPUP_STYLE);

  onInit(): void {
    this.attachStyle(this.style);
  }
}
