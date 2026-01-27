import { Component, inject } from '@angular/core';
import { Base } from '../base/base';
import { TIMELINE_STYLE, TIMELINE_STYLE_PROVIDER } from './style/timeline.style';

@Component({
  selector: 'gp-timeline',
  imports: [],
  templateUrl: './timeline.html',
  providers: [TIMELINE_STYLE_PROVIDER],
})
export class Timeline extends Base {
  private readonly style = inject(TIMELINE_STYLE);

  onInit(): void {
    this.attachStyle(this.style);
  }
}
