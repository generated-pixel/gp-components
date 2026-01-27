import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style'

export type UploadTheme = ComponentStyleConfig

export const UPLOAD_STYLE = new InjectionToken<BaseStyle<UploadTheme>>('UPLOAD_STYLE')

@Injectable()
export class UploadStyle extends BaseStyle<UploadTheme> {
  protected readonly componentName = 'gp-upload'

  protected getDefaultTheme(): UploadTheme {
    return {
      classes: ['gp-upload-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-upload-theme-background, #ffffff)',
        color: 'var(--gp-upload-theme-color, #111827)',
        borderColor: 'var(--gp-upload-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-upload-theme-border-width, 1px)',
        radius: 'var(--gp-upload-theme-radius, 0.375rem)',
        padding: 'var(--gp-upload-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-upload.gp-upload-root {
          background-color: var(--gp-upload-background);
          color: var(--gp-upload-color);
          border: var(--gp-upload-border-width) solid var(--gp-upload-border-color);
          border-radius: var(--gp-upload-radius);
          padding: var(--gp-upload-padding);
        }

        @media (max-width: 600px) {
          gp-upload.gp-upload-root {
            width: var(--gp-upload-theme-mobile-width, 100%);
          }
        }
      `,
    }
  }
}

export const UPLOAD_STYLE_PROVIDER: Provider = {
  provide: UPLOAD_STYLE,
  useClass: UploadStyle,
}
