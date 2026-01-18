import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core'
import { Base } from '../../base/base'
import { BASE_ICON_STYLE, BASE_ICON_STYLE_PROVIDER } from './style/base-icon.style'

@Component({
  imports: [],
  template: ` <ng-content></ng-content> `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [BASE_ICON_STYLE_PROVIDER],
  host: {
    width: '24',
    height: '24',
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
  },
})
export class BaseIcon extends Base {
  private readonly style = inject(BASE_ICON_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }
}
