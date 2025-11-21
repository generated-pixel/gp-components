import { Injectable, inject } from '@angular/core';
import { StyleInjector } from 'gp-components/style-injector';
import { gpStyle as baseStyle } from 'gp-components/styles';

const style = `
  ${baseStyle}
`;

@Injectable({ providedIn: 'root' })
export class BaseStyle {
  name = 'base';

  style: any = undefined;

  styleInjector: StyleInjector = inject(StyleInjector);

  load = (style: any, options = {}) => {
    this.styleInjector.injectStyle(style, options);
  };
}
