import { Component, inject } from '@angular/core'
import { Base } from '../base/base'
import { ORG_CHART_STYLE, ORG_CHART_STYLE_PROVIDER } from './style/org-chart.style'

@Component({
  selector: 'gp-org-chart',
  imports: [],
  templateUrl: './org-chart.html',
  providers: [ORG_CHART_STYLE_PROVIDER],
})
export class OrgChart extends Base {
  private readonly style = inject(ORG_CHART_STYLE)

  onInit(): void {
    this.attachStyle(this.style)
  }
}
