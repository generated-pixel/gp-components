import { Injectable } from '@angular/core';
import { gpStyle as baseStyle } from '../styles/base';

const style = `
  ${baseStyle}
`;

@Injectable({ providedIn: 'root' })
export class BaseStyle {
  name = 'base';
  style: any = undefined;
}
