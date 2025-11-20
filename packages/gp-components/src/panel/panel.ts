import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'gp-panel',
  imports: [],
  templateUrl: './panel.html',
  styleUrl: './panel.css',
})
export class PanelComponent {}

@NgModule({
  imports: [PanelComponent],
  exports: [PanelComponent],
})
export class PanelModule {}
