import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Base } from '../../base/base';

@Component({
  imports: [],
  template: ` <ng-content></ng-content> `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    width: '24',
    height: '24',
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
  },
})
export class BaseIcon extends Base {}
