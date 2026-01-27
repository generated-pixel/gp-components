import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style';

export type TimelineTheme = ComponentStyleConfig;

export const TIMELINE_STYLE = new InjectionToken<BaseStyle<TimelineTheme>>('TIMELINE_STYLE');

@Injectable()
export class TimelineStyle extends BaseStyle<TimelineTheme> {
  protected readonly componentName = 'gp-timeline';

  protected getDefaultTheme(): TimelineTheme {
    return {
      classes: ['gp-timeline-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-timeline-theme-background, #ffffff)',
        color: 'var(--gp-timeline-theme-color, #111827)',
        borderColor: 'var(--gp-timeline-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-timeline-theme-border-width, 1px)',
        radius: 'var(--gp-timeline-theme-radius, 0.375rem)',
        padding: 'var(--gp-timeline-theme-padding, 0.5rem 0.75rem)',
      },
      css: `
        gp-timeline.gp-timeline-root {
          background-color: var(--gp-timeline-background);
          color: var(--gp-timeline-color);
          border: var(--gp-timeline-border-width) solid var(--gp-timeline-border-color);
          border-radius: var(--gp-timeline-radius);
          padding: var(--gp-timeline-padding);
        }

        @media (max-width: 600px) {
          gp-timeline.gp-timeline-root {
            width: var(--gp-timeline-theme-mobile-width, 100%);
          }
        }
      `,
    };
  }
}

export const TIMELINE_STYLE_PROVIDER: Provider = {
  provide: TIMELINE_STYLE,
  useClass: TimelineStyle,
};
