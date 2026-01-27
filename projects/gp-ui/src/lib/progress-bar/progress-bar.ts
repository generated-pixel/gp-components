import { Component, inject } from '@angular/core';
import { Base } from '../base/base';
import { PROGRESS_BAR_STYLE, PROGRESS_BAR_STYLE_PROVIDER } from './style/progress-bar.style';

@Component({
  selector: 'gp-progress-bar',
  imports: [],
  templateUrl: './progress-bar.html',
  providers: [PROGRESS_BAR_STYLE_PROVIDER],
})
export class ProgressBar extends Base {
  private readonly style = inject(PROGRESS_BAR_STYLE);

  onInit(): void {
    this.attachStyle(this.style);
  }
}
