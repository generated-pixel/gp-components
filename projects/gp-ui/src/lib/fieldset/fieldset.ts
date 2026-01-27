import { Component, inject } from '@angular/core';
import { Base } from '../base/base';
import { FIELDSET_STYLE, FIELDSET_STYLE_PROVIDER } from './style/fieldset.style';

@Component({
  selector: 'gp-fieldset',
  imports: [],
  templateUrl: './fieldset.html',
  providers: [FIELDSET_STYLE_PROVIDER],
})
export class Fieldset extends Base {
  private readonly style = inject(FIELDSET_STYLE);

  onInit(): void {
    this.attachStyle(this.style);
  }
}
