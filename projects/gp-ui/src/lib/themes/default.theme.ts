import { ComponentThemeOverrides } from '../base/style/base.style'
import {
  GpComponentThemeDefinition,
  GpThemeDefinition,
  GpThemePrimitiveDefinition,
  GpThemeSemanticDefinition,
} from '../interfaces'
import { resolveThemeComponents } from './theme-definition.utils'

const GP_DEFAULT_THEME_PRIMITIVES: GpThemePrimitiveDefinition = {
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1f2937',
    900: '#0f172a',
  },
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
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
}

const GP_DEFAULT_THEME_SEMANTIC: GpThemeSemanticDefinition = {
  colorSchema: {
    light: {
      backgroundColor: '#ffffff',
      surfaceColor: '#f8fafc',
      textColor: '#0f172a',
    },
    dark: {
      backgroundColor: '#0f172a',
      surfaceColor: '#111827',
      textColor: '#e2e8f0',
    },
  },
  container: {
    padding: '1.75rem',
    border: {
      width: '1px',
      radius: '0.875rem',
      color: {
        light: '#e2e8f0',
        dark: '#1f2937',
      },
    },
    shadow: {
      light: '0 18px 36px rgba(15, 23, 42, 0.07)',
      dark: '0 22px 48px rgba(2, 6, 23, 0.6)',
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
        light: '#dbeafe',
        dark: '#1f2937',
      },
      focusColor: {
        light: '#6366f1',
        dark: '#38bdf8',
      },
    },
    background: {
      light: '#f8fafc',
      dark: '#0f172a',
    },
    color: {
      light: '#0f172a',
      dark: '#e2e8f0',
    },
    placeholderColor: {
      light: '#94a3b8',
      dark: '#64748b',
    },
    focusRing: {
      light: '0 0 0 2px rgba(99, 102, 241, 0.35)',
      dark: '0 0 0 2px rgba(56, 189, 248, 0.45)',
    },
  },
  label: {
    gap: '0.25rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    textTransform: 'none',
    letterSpacing: '0',
    color: {
      light: '#334155',
      dark: '#e2e8f0',
    },
    requiredColor: {
      light: '#f43f5e',
      dark: '#f97316',
    },
  },
  themeSwitcher: {
    gap: '0.75rem',
    controlGap: '0.25rem',
    labelColor: {
      light: '#1f2937',
      dark: '#e2e8f0',
    },
    select: {
      radius: '0.375rem',
      padding: '0.375rem 0.5rem',
      background: {
        light: '#ffffff',
        dark: '#0f172a',
      },
      border: {
        light: '#d1d5db',
        dark: '#1f2937',
      },
      color: {
        light: '#111827',
        dark: '#f8fafc',
      },
      focusBorder: {
        light: '#6366f1',
        dark: '#38bdf8',
      },
      focusRing: {
        light: '0 0 0 2px rgba(99, 102, 241, 0.35)',
        dark: '0 0 0 2px rgba(56, 189, 248, 0.45)',
      },
    },
  },
  icon: {
    size: '1.25rem',
    color: {
      light: '#4f46e5',
      dark: '#38bdf8',
    },
    strokeWidth: {
      light: '1.75',
      dark: '1.6',
    },
  },
  panel: {
    vars: {
      default: {
        themeMobileWidth: '100%',
        themeMobilePadding: '1.25rem',
      },
    },
  },
  inputText: {
    vars: {
      default: {
        themeMobileWidth: '100%',
        themeMobilePadding: '0.5rem',
        themeMobileGap: '0.4rem',
      },
    },
  },
  password: {
    vars: {
      default: {
        themeMobileWidth: '100%',
        themeMobilePadding: '0.5rem',
        themeMobileGap: '0.4rem',
      },
    },
  },
  tooltip: {
    vars: {
      default: {
        themeMobileVerticalOffset: 'calc(100% + 0.5rem)',
        themeMobileMaxWidth: 'min(18rem, 90vw)',
        themeMobileTextAlign: 'center',
      },
      light: {
        background: '#1f2937',
        color: '#f9fafb',
        shadow: '0 24px 48px rgba(15, 23, 42, 0.25)',
      },
      dark: {
        background: '#0f172a',
        color: '#f8fafc',
        shadow: '0 32px 72px rgba(2, 6, 23, 0.6)',
      },
    },
  },
  blockui: {
    vars: {
      default: {
        themeOverlayBlur: '6px',
        themeOverlayTransition: 'opacity 0.2s ease',
      },
      light: {
        themeOverlayBackground: 'rgba(15, 23, 42, 0.28)',
      },
      dark: {
        themeOverlayBackground: 'rgba(2, 6, 23, 0.55)',
      },
    },
  },
}

// Default-friendly theme tuned for light UI surfaces.
export const GP_DEFAULT_THEME_DEFINITION: GpThemeDefinition = {
  name: 'Default',
  primitives: GP_DEFAULT_THEME_PRIMITIVES,
  semantic: GP_DEFAULT_THEME_SEMANTIC,
}

export const GP_DEFAULT_THEME: ComponentThemeOverrides = resolveThemeComponents(GP_DEFAULT_THEME_DEFINITION)
