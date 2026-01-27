import { Component, inject } from '@angular/core';
import { BaseInput } from '../base-input/base-input';
import { AUTO_COMPLETE_STYLE, AUTO_COMPLETE_STYLE_PROVIDER } from './style/auto-complete.style';

@Component({
  selector: 'gp-auto-complete',
  imports: [],
  templateUrl: './auto-complete.html',
  providers: [AUTO_COMPLETE_STYLE_PROVIDER],
})
export class AutoComplete extends BaseInput {
  private readonly style = inject(AUTO_COMPLETE_STYLE);

  onInit(): void {
    this.attachStyle(this.style);
  }
}
