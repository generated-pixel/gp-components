import { ComponentThemeOverrides } from '../base/style/base.style'
import { GpThemeDefinition } from '../interfaces/theme-json.interfaces'
import { resolveThemeComponents } from './theme-definition.utils'

// Developer theme with light and dark modes optimized for high-contrast UIs.
export const GP_DEVELOPER_THEME_DEFINITION: GpThemeDefinition = {
  name: 'Developer',
  primitive: {
    slate: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5f5',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0b1120',
    },
    blue: {
      50: '#e0f2fe',
      100: '#bae6fd',
      200: '#7dd3fc',
      300: '#38bdf8',
      400: '#0ea5e9',
      500: '#0284c7',
      600: '#0369a1',
      700: '#075985',
      800: '#0c4a6e',
      900: '#082f49',
    },
    indigo: {
      50: '#eef2ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81',
    },
  },
  semantic: {
    colorSchema: {
      light: {
        backgroundColor: '#f8fafc',
        surfaceColor: '#e2e8f0',
        textColor: '#0f172a',
      },
      dark: {
        backgroundColor: '#0b1120',
        surfaceColor: '#111827',
        textColor: '#cbd5f5',
      },
    },
    container: {
      padding: '1.5rem',
      border: {
        width: '1px',
        radius: '0.75rem',
        color: {
          light: '#cbd5f5',
          dark: '#1e293b',
        },
      },
      shadow: {
        light: '0 20px 44px rgba(15, 23, 42, 0.16)',
        dark: '0 28px 64px rgba(8, 47, 73, 0.65)',
      },
    },
    formField: {
      gap: '0.5rem',
      padding: '0.5rem 0.75rem',
      border: {
        width: '1px',
        focusWidth: '2px',
        radius: '0.375rem',
        color: {
          light: '#94a3b8',
          dark: '#1f2937',
        },
        focusColor: {
          light: '#2563eb',
          dark: '#38bdf8',
        },
      },
      background: {
        light: '#e2e8f0',
        dark: '#111827',
      },
      color: {
        light: '#0f172a',
        dark: '#e2e8f0',
      },
      placeholderColor: {
        light: '#475569',
        dark: '#94a3b8',
      },
      focusRing: {
        light: '0 0 0 2px rgba(37, 99, 235, 0.35)',
        dark: '0 0 0 2px rgba(56, 189, 248, 0.35)',
      },
    },
    label: {
      gap: '0.25rem',
      fontSize: '0.875rem',
      fontWeight: '600',
      textTransform: 'none',
      letterSpacing: '0',
      color: {
        light: '#475569',
        dark: '#a5b4fc',
      },
      requiredColor: {
        light: '#dc2626',
        dark: '#f97316',
      },
    },
    themeSwitcher: {
      gap: '0.75rem',
      controlGap: '0.25rem',
      labelColor: {
        light: '#0f172a',
        dark: '#cbd5f5',
      },
      select: {
        radius: '0.375rem',
        padding: '0.375rem 0.5rem',
        background: {
          light: '#e2e8f0',
          dark: '#111827',
        },
        border: {
          light: '#94a3b8',
          dark: '#1f2937',
        },
        color: {
          light: '#0f172a',
          dark: '#e2e8f0',
        },
        focusBorder: {
          light: '#2563eb',
          dark: '#38bdf8',
        },
        focusRing: {
          light: '0 0 0 2px rgba(37, 99, 235, 0.35)',
          dark: '0 0 0 2px rgba(56, 189, 248, 0.35)',
        },
      },
    },
    icon: {
      size: '1.3rem',
      color: {
        light: '#2563eb',
        dark: '#38bdf8',
      },
      strokeWidth: {
        light: '1.5',
        dark: '1.4',
      },
    },
  },
  components: {
    'gp-panel': {
      css: `
        @media (max-width: 600px) {
          gp-panel.gp-panel-root {
            width: 100%;
            --gp-panel-theme-padding: 1.25rem;
          }
        }
      `,
    },
    'gp-input-text': {
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
    'gp-tooltip': {
      vars: {
        light: {
          background: '#1e293b',
          color: '#f8fafc',
          shadow: '0 28px 64px rgba(15, 23, 42, 0.25)',
        },
        dark: {
          background: '#0f172a',
          color: '#e2e8f0',
          shadow: '0 32px 80px rgba(8, 47, 73, 0.75)',
        },
      },
      css: `
        @media (max-width: 600px) {
          gp-tooltip.gp-tooltip-root .gp-tooltip-content {
            inset: auto auto calc(100% + 0.5rem) 50%;
            max-width: min(18rem, 90vw);
          }
        }
      `,
    },
    'gp-blockui': {
      vars: {
        default: {
          themeOverlayBlur: '6px',
          themeOverlayTransition: 'opacity 0.2s ease',
        },
        light: {
          themeOverlayBackground: 'rgba(37, 99, 235, 0.18)',
        },
        dark: {
          themeOverlayBackground: 'rgba(8, 47, 73, 0.55)',
          themeOverlayBlur: '12px',
        },
      },
    },
    'gp-theme-switcher': {
      css: `
        @media (max-width: 600px) {
          gp-theme-switcher.gp-theme-switcher-root .gp-theme-switcher {
            width: 100%;
            grid-template-columns: 1fr;
          }
        }
      `,
    },
  },
}

export const GP_DEVELOPER_THEME: ComponentThemeOverrides = resolveThemeComponents(GP_DEVELOPER_THEME_DEFINITION)
