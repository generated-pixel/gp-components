import { Component, inject } from '@angular/core';
import { Base } from '../base/base';
import { TABLE_STYLE, TABLE_STYLE_PROVIDER } from './style/table.style';

@Component({
  selector: 'gp-table',
  imports: [],
  templateUrl: './table.html',
  providers: [TABLE_STYLE_PROVIDER],
})
export class Table extends Base {
  private readonly style = inject(TABLE_STYLE);

  onInit(): void {
    this.attachStyle(this.style);
  }
}
