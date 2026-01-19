import { ComponentThemeOverrides } from '../base/style/base.style'
import { GpThemeDefinition } from '../interfaces/theme-json.interfaces'
import { resolveThemeComponents } from './theme-definition.utils'

// Vibrant theme celebrating Pride Month with saturated accents.
export const GP_PRIDE_THEME_DEFINITION: GpThemeDefinition = {
  name: 'Pride',
  primitive: {
    rainbow: {
      50: '#fff1f2',
      100: '#ffe4e6',
      200: '#fecdd3',
      300: '#fca5a5',
      400: '#f97316',
      500: '#f59e0b',
      600: '#10b981',
      700: '#3b82f6',
      800: '#8b5cf6',
      900: '#ec4899',
    },
    midnight: {
      50: '#f8fafc',
      100: '#e2e8f0',
      200: '#cbd5f5',
      300: '#94a3b8',
      400: '#64748b',
      500: '#475569',
      600: '#334155',
      700: '#1f2937',
      800: '#111827',
      900: '#0b1120',
    },
  },
  semantic: {
    colorSchema: {
      light: {
        backgroundColor: '#ffffff',
        surfaceColor: '#fef3c7',
        textColor: '#111827',
      },
      dark: {
        backgroundColor: '#111827',
        surfaceColor: '#0f172a',
        textColor: '#f8fafc',
      },
    },
    container: {
      padding: '2rem',
      border: {
        width: '0px',
        radius: '1rem',
        color: {
          light: 'transparent',
          dark: 'transparent',
        },
      },
      shadow: {
        light: '0 24px 64px rgba(15, 23, 42, 0.25)',
        dark: '0 32px 80px rgba(15, 23, 42, 0.55)',
      },
    },
    formField: {
      gap: '0.6rem',
      padding: '0.6rem 0.9rem',
      border: {
        width: '2px',
        focusWidth: '2px',
        radius: '0.75rem',
        color: {
          light: 'transparent',
          dark: 'transparent',
        },
        focusColor: {
          light: '#8b5cf6',
          dark: '#f472b6',
        },
      },
      background: {
        light: '#ffffff',
        dark: '#111827',
      },
      color: {
        light: '#111827',
        dark: '#f8fafc',
      },
      placeholderColor: {
        light: '#6b7280',
        dark: '#d1d5db',
      },
      focusRing: {
        light: '0 0 0 2px rgba(139, 92, 246, 0.45)',
        dark: '0 0 0 2px rgba(244, 114, 182, 0.45)',
      },
    },
    label: {
      gap: '0.3rem',
      fontSize: '0.85rem',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
      color: {
        light: '#0f172a',
        dark: '#f8fafc',
      },
      requiredColor: {
        light: '#f97316',
        dark: '#facc15',
      },
    },
    themeSwitcher: {
      gap: '0.85rem',
      controlGap: '0.3rem',
      labelColor: {
        light: '#111827',
        dark: '#f8fafc',
      },
      select: {
        radius: '0.5rem',
        padding: '0.45rem 0.75rem',
        background: {
          light: '#ffffff',
          dark: '#0f172a',
        },
        border: {
          light: '#f472b6',
          dark: '#ec4899',
        },
        color: {
          light: '#111827',
          dark: '#f8fafc',
        },
        focusBorder: {
          light: '#ec4899',
          dark: '#f472b6',
        },
        focusRing: {
          light: '0 0 0 2px rgba(236, 72, 153, 0.4)',
          dark: '0 0 0 2px rgba(244, 114, 182, 0.45)',
        },
      },
    },
    icon: {
      size: '1.5rem',
      color: {
        light: '#ec4899',
        dark: '#facc15',
      },
      strokeWidth: {
        light: '1.5',
        dark: '1.6',
      },
    },
  },
  components: {
    'gp-panel': {
      host: {
        background: 'var(--gp-panel-gradient, var(--gp-panel-background))',
        'background-color': 'transparent',
        border: 'none',
        color: 'var(--gp-panel-color)',
      },
      vars: {
        default: {
          themeBorderColor: 'transparent',
          themeBorderWidth: '0px',
          themePadding: '2rem',
          themeRadius: '1rem',
          themeShadow: '0 24px 64px rgba(15, 23, 42, 0.25)',
        },
        light: {
          themeBackground: 'rgba(255, 255, 255, 0.92)',
          themeColor: '#111827',
          gradient: 'linear-gradient(135deg, #ff6b6b 0%, #f59e0b 25%, #10b981 50%, #3b82f6 75%, #8b5cf6 100%)',
        },
        dark: {
          themeBackground: '#111827',
          themeColor: '#f8fafc',
          gradient: 'linear-gradient(135deg, #312e81 0%, #1e3a8a 25%, #0f766e 50%, #9d174d 75%, #7e22ce 100%)',
          themeShadow: '0 32px 80px rgba(15, 23, 42, 0.55)',
        },
      },
      css: `
        @media (max-width: 600px) {
          gp-panel.gp-panel-root {
            width: 100%;
            --gp-panel-theme-padding: 1.5rem;
          }
        }
      `,
    },
    'gp-input-text': {
      host: {
        border: '2px solid transparent',
        background: 'var(--gp-input-text-surface)',
        'background-color': 'transparent',
      },
      vars: {
        default: {
          themeBorderWidth: '2px',
          themeBorderColor: 'transparent',
          themeRadius: '0.75rem',
          themePadding: '0.6rem 0.9rem',
          themeGap: '0.6rem',
        },
        light: {
          themeBackground: '#ffffff',
          themeColor: '#111827',
          themeBorderColorFocus: '#8b5cf6',
          themeFocusRing: '0 0 0 2px rgba(139, 92, 246, 0.45)',
          themePlaceholderColor: '#6b7280',
          surface:
            'linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(135deg, #f97316, #22d3ee, #8b5cf6) border-box',
        },
        dark: {
          themeBackground: '#111827',
          themeColor: '#f8fafc',
          themeBorderColorFocus: '#f472b6',
          themeFocusRing: '0 0 0 2px rgba(244, 114, 182, 0.45)',
          themePlaceholderColor: '#d1d5db',
          surface:
            'linear-gradient(#111827, #111827) padding-box, linear-gradient(135deg, #22d3ee, #6366f1, #ec4899) border-box',
        },
      },
      css: `
        @media (max-width: 600px) {
          gp-input-text.gp-input-text-root {
            width: 100%;
            --gp-input-text-theme-padding: 0.5rem;
            --gp-input-text-theme-gap: 0.4rem;
          }
        }
      `,
    },
    'gp-password': {
      host: {
        border: '2px solid transparent',
        background: 'var(--gp-password-surface)',
        'background-color': 'transparent',
      },
      vars: {
        default: {
          themeBorderWidth: '0px',
          themeGap: '0.6rem',
          themePadding: '0.6rem 0.9rem',
          themeRadius: '0.75rem',
        },
        light: {
          themeBackground: '#ffffff',
          themeColor: '#111827',
          themeFocusBorderColor: '#ec4899',
          themeFocusRing: '0 0 0 2px rgba(236, 72, 153, 0.4)',
          surface:
            'linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(135deg, #ec4899, #6366f1, #22d3ee) border-box',
        },
        dark: {
          themeBackground: '#111827',
          themeColor: '#f8fafc',
          themeFocusBorderColor: '#f472b6',
          themeFocusRing: '0 0 0 2px rgba(244, 114, 182, 0.45)',
          surface:
            'linear-gradient(#111827, #111827) padding-box, linear-gradient(135deg, #ec4899, #6366f1, #22d3ee) border-box',
        },
      },
      css: `
        @media (max-width: 600px) {
          gp-password.gp-password-root {
            width: 100%;
            --gp-password-theme-padding: 0.5rem;
            --gp-password-theme-gap: 0.4rem;
          }
        }
      `,
    },
    'gp-label': {
      vars: {
        default: {
          themeGap: '0.3rem',
          themeFontSize: '0.85rem',
          themeFontWeight: '700',
          themeTextTransform: 'uppercase',
          themeLetterSpacing: '0.04em',
        },
        light: {
          themeColor: '#0f172a',
          themeRequiredColor: '#f97316',
        },
        dark: {
          themeColor: '#f8fafc',
          themeRequiredColor: '#facc15',
        },
      },
    },
    'gp-tooltip': {
      vars: {
        default: {
          surface: '#111827',
          borderGradient: 'linear-gradient(135deg, #f87171, #facc15, #34d399, #60a5fa, #a855f7)',
        },
        light: {
          background: '#111827',
          color: '#f8fafc',
          shadow: '0 28px 72px rgba(15, 23, 42, 0.35)',
        },
        dark: {
          background: '#0b1120',
          color: '#f8fafc',
          shadow: '0 32px 80px rgba(15, 23, 42, 0.6)',
          surface: '#0b1120',
          borderGradient: 'linear-gradient(135deg, #34d399, #60a5fa, #a855f7, #f97316)',
        },
      },
      css: `
        gp-tooltip.gp-tooltip-root .gp-tooltip-content {
          border: 2px solid transparent;
          background: linear-gradient(var(--gp-tooltip-surface, #111827), var(--gp-tooltip-surface, #111827)) padding-box,
            var(--gp-tooltip-border-gradient, linear-gradient(135deg, #f87171, #facc15, #34d399, #60a5fa, #a855f7)) border-box;
        }

        @media (max-width: 600px) {
          gp-tooltip.gp-tooltip-root .gp-tooltip-content {
            inset: auto auto calc(100% + 0.5rem) 50%;
            max-width: min(18rem, 90vw);
            text-align: center;
          }
        }
      `,
    },
    'gp-blockui': {
      vars: {
        default: {
          themeOverlayBlur: '10px',
          themeOverlayTransition: 'opacity 0.2s ease',
        },
        light: {
          themeOverlayBackground: 'rgba(99, 102, 241, 0.4)',
        },
        dark: {
          themeOverlayBackground: 'rgba(88, 28, 135, 0.5)',
        },
      },
    },
    'gp-theme-switcher': {
      vars: {
        default: {
          themeGap: '0.85rem',
          themeControlGap: '0.3rem',
          themeSelectRadius: '0.5rem',
          themeSelectPadding: '0.45rem 0.75rem',
          surface:
            'linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(135deg, #f87171, #facc15, #34d399, #60a5fa, #a855f7) border-box',
        },
        light: {
          themeLabelColor: '#111827',
          themeSelectBackground: '#ffffff',
          themeSelectBorder: '#f472b6',
          themeSelectColor: '#111827',
          themeSelectFocusBorder: '#ec4899',
          themeSelectFocusRing: '0 0 0 2px rgba(236, 72, 153, 0.4)',
        },
        dark: {
          themeLabelColor: '#f8fafc',
          themeSelectBackground: '#0f172a',
          themeSelectBorder: '#ec4899',
          themeSelectColor: '#f8fafc',
          themeSelectFocusBorder: '#f472b6',
          themeSelectFocusRing: '0 0 0 2px rgba(244, 114, 182, 0.45)',
          surface:
            'linear-gradient(#0f172a, #0f172a) padding-box, linear-gradient(135deg, #34d399, #60a5fa, #a855f7, #f97316) border-box',
        },
      },
      css: `
        gp-theme-switcher.gp-theme-switcher-root .gp-theme-switcher__select {
          border-width: 2px;
          background: var(--gp-theme-switcher-surface);
        }

        @media (max-width: 600px) {
          gp-theme-switcher.gp-theme-switcher-root .gp-theme-switcher {
            width: 100%;
            grid-template-columns: 1fr;
          }
        }
      `,
    },
    'gp-icon-base': {
      vars: {
        default: {
          size: '1.5rem',
        },
        light: {
          color: '#ec4899',
          strokeWidth: '1.5',
        },
        dark: {
          color: '#facc15',
          strokeWidth: '1.6',
        },
      },
    },
  },
}

export const GP_PRIDE_THEME: ComponentThemeOverrides = resolveThemeComponents(GP_PRIDE_THEME_DEFINITION)
