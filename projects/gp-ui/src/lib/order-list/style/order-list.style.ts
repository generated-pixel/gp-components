import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type OrderListTheme = ComponentStyleConfig;

export const ORDER_LIST_STYLE = new InjectionToken<BaseStyle<OrderListTheme>>('ORDER_LIST_STYLE');

@Injectable()
export class OrderListStyle extends BaseStyle<OrderListTheme> {
  protected readonly componentName = 'gp-order-list';

  protected getDefaultTheme(): OrderListTheme {
    return {
      classes: ['gp-order-list-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-order-list-theme-background, #ffffff)',
        color: 'var(--gp-order-list-theme-color, #111827)',
        borderColor: 'var(--gp-order-list-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-order-list-theme-border-width, 1px)',
        radius: 'var(--gp-order-list-theme-radius, 0.375rem)',
        padding: 'var(--gp-order-list-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-order-list.gp-order-list-root {
          background-color: var(--gp-order-list-background);
          color: var(--gp-order-list-color);
          border: var(--gp-order-list-border-width) solid var(--gp-order-list-border-color);
          border-radius: var(--gp-order-list-radius);
          padding: var(--gp-order-list-padding);
        }

        @media (max-width: 600px) {
          gp-order-list.gp-order-list-root {
            width: var(--gp-order-list-theme-mobile-width, 100%);
          }
        }
      `,
    };
  }
}

export const ORDER_LIST_STYLE_PROVIDER: Provider = {
  provide: ORDER_LIST_STYLE,
  useClass: OrderListStyle,
};
