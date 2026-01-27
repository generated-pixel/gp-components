import { Component, inject } from '@angular/core'
import { Base } from '../base/base'
import { METER_GROUP_STYLE, METER_GROUP_STYLE_PROVIDER } from './style/meter-group.style'

@Component({
  selector: 'gp-meter-group',
  imports: [],
  templateUrl: './meter-group.html',
  providers: [METER_GROUP_STYLE_PROVIDER],
})
export class MeterGroup extends Base {
  private readonly style = inject(METER_GROUP_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }
}
