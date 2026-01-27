import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type ImageTheme = ComponentStyleConfig;

export const IMAGE_STYLE = new InjectionToken<BaseStyle<ImageTheme>>('IMAGE_STYLE');

@Injectable()
export class ImageStyle extends BaseStyle<ImageTheme> {
  protected readonly componentName = 'gp-image';

  protected getDefaultTheme(): ImageTheme {
    return {
      classes: ['gp-image-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-image-theme-background, #ffffff)',
        color: 'var(--gp-image-theme-color, #111827)',
        borderColor: 'var(--gp-image-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-image-theme-border-width, 1px)',
        radius: 'var(--gp-image-theme-radius, 0.375rem)',
        padding: 'var(--gp-image-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-image.gp-image-root {
          background-color: var(--gp-image-background);
          color: var(--gp-image-color);
          border: var(--gp-image-border-width) solid var(--gp-image-border-color);
          border-radius: var(--gp-image-radius);
          padding: var(--gp-image-padding);
        }

        @media (max-width: 600px) {
          gp-image.gp-image-root {
            width: var(--gp-image-theme-mobile-width, 100%);
          }
        }
      `,
    };
  }
}

export const IMAGE_STYLE_PROVIDER: Provider = {
  provide: IMAGE_STYLE,
  useClass: ImageStyle,
};
