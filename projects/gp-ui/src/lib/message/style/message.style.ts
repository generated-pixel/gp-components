import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type MessageTheme = ComponentStyleConfig;

export const MESSAGE_STYLE = new InjectionToken<BaseStyle<MessageTheme>>('MESSAGE_STYLE');

@Injectable()
export class MessageStyle extends BaseStyle<MessageTheme> {
  protected readonly componentName = 'gp-message';

  protected getDefaultTheme(): MessageTheme {
    return {
      classes: ['gp-message-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-message-theme-background, #ffffff)',
        color: 'var(--gp-message-theme-color, #111827)',
        borderColor: 'var(--gp-message-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-message-theme-border-width, 1px)',
        radius: 'var(--gp-message-theme-radius, 0.375rem)',
        padding: 'var(--gp-message-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-message.gp-message-root {
          background-color: var(--gp-message-background);
          color: var(--gp-message-color);
          border: var(--gp-message-border-width) solid var(--gp-message-border-color);
          border-radius: var(--gp-message-radius);
          padding: var(--gp-message-padding);
        }

        @media (max-width: 600px) {
          gp-message.gp-message-root {
            width: var(--gp-message-theme-mobile-width, 100%);
          }
        }
      `,
    };
  }
}

export const MESSAGE_STYLE_PROVIDER: Provider = {
  provide: MESSAGE_STYLE,
  useClass: MessageStyle,
};
