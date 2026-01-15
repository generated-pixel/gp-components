import { Component } from '@angular/core';
import { BaseIcon } from '../base-icon/base-icon';

@Component({
  selector: '[data-gp-icon="circle-x"]',
  imports: [],
  template: ` <svg:path
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  />`,
})
export class CircleXIcon extends BaseIcon {}
