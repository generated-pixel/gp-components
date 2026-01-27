import { Component, inject } from '@angular/core';
import { Base } from '../base/base';
import { CAROUSEL_STYLE, CAROUSEL_STYLE_PROVIDER } from './style/carousel.style';

@Component({
  selector: 'gp-carousel',
  imports: [],
  templateUrl: './carousel.html',
  providers: [CAROUSEL_STYLE_PROVIDER],
})
export class Carousel extends Base {
  private readonly style = inject(CAROUSEL_STYLE);

  onInit(): void {
    this.attachStyle(this.style);
  }
}
