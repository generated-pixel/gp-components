import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style'

export type PanelTheme = ComponentStyleConfig

export const PANEL_STYLE = new InjectionToken<BaseStyle<PanelTheme>>('PANEL_STYLE')

@Injectable()
export class PanelStyle extends BaseStyle<PanelTheme> {
  protected readonly componentName = 'gp-panel'

  protected getDefaultTheme(): PanelTheme {
    return {
      classes: ['gp-panel-root'],
      host: {
        display: 'block',
        padding: 'var(--gp-panel-padding)',
        'background-color': 'var(--gp-panel-background)',
        color: 'var(--gp-panel-color)',
        border: 'var(--gp-panel-border-width) solid var(--gp-panel-border-color)',
        'border-radius': 'var(--gp-panel-radius)',
        'box-shadow': 'var(--gp-panel-shadow)',
      },
      vars: {
        background: 'var(--gp-panel-theme-background, #ffffff)',
        color: 'var(--gp-panel-theme-color, #111827)',
        borderColor: 'var(--gp-panel-theme-border-color, #e5e7eb)',
        borderWidth: 'var(--gp-panel-theme-border-width, 1px)',
        radius: 'var(--gp-panel-theme-radius, 0.75rem)',
        padding: 'var(--gp-panel-theme-padding, 1.5rem)',
        shadow: 'var(--gp-panel-theme-shadow, 0 1px 2px rgba(15, 23, 42, 0.08))',
      },
    }
  }
}

export const PANEL_STYLE_PROVIDER: Provider = {
  provide: PANEL_STYLE,
  useClass: PanelStyle,
}
