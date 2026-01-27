import { Component, inject } from '@angular/core';
import { Base } from '../base/base';
import {
  PROGRESS_SPINNER_STYLE,
  PROGRESS_SPINNER_STYLE_PROVIDER,
} from './style/progress-spinner.style';

@Component({
  selector: 'gp-progress-spinner',
  imports: [],
  templateUrl: './progress-spinner.html',
  providers: [PROGRESS_SPINNER_STYLE_PROVIDER],
})
export class ProgressSpinner extends Base {
  private readonly style = inject(PROGRESS_SPINNER_STYLE);

  onInit(): void {
    this.attachStyle(this.style);
  }
}
