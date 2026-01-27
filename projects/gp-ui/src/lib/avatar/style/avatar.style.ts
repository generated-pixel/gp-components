import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type AvatarTheme = ComponentStyleConfig;

export const AVATAR_STYLE = new InjectionToken<BaseStyle<AvatarTheme>>('AVATAR_STYLE');

@Injectable()
export class AvatarStyle extends BaseStyle<AvatarTheme> {
  protected readonly componentName = 'gp-avatar';

  protected getDefaultTheme(): AvatarTheme {
    return {
      classes: ['gp-avatar-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-avatar-theme-background, #ffffff)',
        color: 'var(--gp-avatar-theme-color, #111827)',
        borderColor: 'var(--gp-avatar-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-avatar-theme-border-width, 1px)',
        radius: 'var(--gp-avatar-theme-radius, 0.375rem)',
        padding: 'var(--gp-avatar-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-avatar.gp-avatar-root {
          background-color: var(--gp-avatar-background);
          color: var(--gp-avatar-color);
          border: var(--gp-avatar-border-width) solid var(--gp-avatar-border-color);
          border-radius: var(--gp-avatar-radius);
          padding: var(--gp-avatar-padding);
        }

        @media (max-width: 600px) {
          gp-avatar.gp-avatar-root {
            width: var(--gp-avatar-theme-mobile-width, 100%);
          }
        }
      `,
    };
  }
}

export const AVATAR_STYLE_PROVIDER: Provider = {
  provide: AVATAR_STYLE,
  useClass: AvatarStyle,
};
