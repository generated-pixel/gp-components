import { Component, inject } from '@angular/core';
import { BaseInput } from '../base-input/base-input';
import { DATE_PICKER_STYLE, DATE_PICKER_STYLE_PROVIDER } from './style/date-picker.style';

@Component({
  selector: 'gp-date-picker',
  imports: [],
  templateUrl: './date-picker.html',
  providers: [DATE_PICKER_STYLE_PROVIDER],
})
export class DatePicker extends BaseInput {
  private readonly style = inject(DATE_PICKER_STYLE);

  onInit(): void {
    this.attachStyle(this.style);
  }
}
