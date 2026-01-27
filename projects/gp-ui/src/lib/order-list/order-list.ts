import { Component, inject } from '@angular/core';
import { Base } from '../base/base';
import { ORDER_LIST_STYLE, ORDER_LIST_STYLE_PROVIDER } from './style/order-list.style';

@Component({
  selector: 'gp-order-list',
  imports: [],
  templateUrl: './order-list.html',
  providers: [ORDER_LIST_STYLE_PROVIDER],
})
export class OrderList extends Base {
  private readonly style = inject(ORDER_LIST_STYLE);

  onInit(): void {
    this.attachStyle(this.style);
  }
}
