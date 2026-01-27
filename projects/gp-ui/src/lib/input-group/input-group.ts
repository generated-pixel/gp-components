import { Component, inject } from '@angular/core';
import { Base } from '../base/base';
import { INPUT_GROUP_STYLE, INPUT_GROUP_STYLE_PROVIDER } from './style/input-group.style';

@Component({
  selector: 'gp-input-group',
  imports: [],
  templateUrl: './input-group.html',
  providers: [INPUT_GROUP_STYLE_PROVIDER],
})
export class InputGroup extends Base {
  private readonly style = inject(INPUT_GROUP_STYLE);

  onInit(): void {
    this.attachStyle(this.style);
  }
}
