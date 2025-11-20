import { Injectable } from '@angular/core';
import { BaseStyle } from '../base/base-style';
import { gpStyle as passwordStyle } from '../styles/password';

const style = `
  ${passwordStyle}


.toggle-password-holder {
  display: flex;
  flex: 1;
  margin-left: 0.125rem;
  align-self: center;
}

.clickable-icon {
  stroke-width: 0.0625rem;
  cursor: pointer;
}

.clickable-icon:hover {
  stroke-width: 0.125rem;
}

`;

@Injectable()
export class PasswordStyle extends BaseStyle {
  name = 'password';
  style = style;
}

export interface PasswordStyle extends BaseStyle {}
