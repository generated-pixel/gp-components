import { inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class StyleInjector {
  document: Document = inject(DOCUMENT);

  injectStyle(style: string, options: any = {}): void {
    if (!this.document) {
      return;
    }

    const { id = undefined, props = {}, firstHeadElement = false, name = '' } = options;

    const styleElement = ((id && this.document.getElementById(id)) ||
      this.document.createElement('style')) as HTMLStyleElement;

    if (!styleElement) {
      return;
    }

    if (styleElement.isConnected) {
      return;
    }

    const head = this.document.head;

    firstHeadElement && head.firstChild
      ? head.insertBefore(styleElement, head.firstChild)
      : head.appendChild(styleElement);

    styleElement.setAttribute('type', 'text/css');
    styleElement.dataset['gpStyle'] = name;
    styleElement.textContent = style;
  }
}
