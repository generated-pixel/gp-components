import { Component, inject } from '@angular/core';
import { Base } from '../base/base';
import { TREE_TABLE_STYLE, TREE_TABLE_STYLE_PROVIDER } from './style/tree-table.style';

@Component({
  selector: 'gp-tree-table',
  imports: [],
  templateUrl: './tree-table.html',
  providers: [TREE_TABLE_STYLE_PROVIDER],
})
export class TreeTable extends Base {
  private readonly style = inject(TREE_TABLE_STYLE);

  onInit(): void {
    this.attachStyle(this.style);
  }
}
