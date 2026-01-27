import { ComponentThemeOverrides } from '../base/style/base.style';
import {
  GpComponentThemeDefinition,
  GpThemeDefinition,
  GpThemePrimitiveDefinition,
  GpThemeSemanticDefinition,
} from '../interfaces';
import { resolveThemeComponents } from './theme-definition.utils';
import { GP_BASE_THEME_PRIMITIVES } from './palette';

const GP_PRIDE_THEME_PRIMITIVES: GpThemePrimitiveDefinition = {
  ...GP_BASE_THEME_PRIMITIVES,
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
    950: '#9d174d',
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
    950: '#020617',
  },
};

const P = GP_BASE_THEME_PRIMITIVES;

const GP_PRIDE_THEME_SEMANTIC: GpThemeSemanticDefinition = {
  colorSchema: {
    light: {
      backgroundColor: P.neutral[50],
      surfaceColor: P.amber[100],
      textColor: P.gray[900],
    },
    dark: {
      backgroundColor: P.gray[900],
      surfaceColor: P.slate[900],
      textColor: P.slate[50],
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
        light: P.violet[500],
        dark: P.pink[400],
      },
    },
    background: {
      light: P.neutral[50],
      dark: P.gray[900],
    },
    color: {
      light: P.gray[900],
      dark: P.slate[50],
    },
    placeholderColor: {
      light: P.gray[500],
      dark: P.gray[200],
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
      light: P.slate[900],
      dark: P.slate[50],
    },
    requiredColor: {
      light: P.orange[500],
      dark: P.yellow[400],
    },
  },
  themeSwitcher: {
    gap: '0.85rem',
    controlGap: '0.3rem',
    labelColor: {
      light: P.gray[900],
      dark: P.slate[50],
    },
    select: {
      radius: '0.5rem',
      padding: '0.45rem 0.75rem',
      background: {
        light: P.neutral[50],
        dark: P.slate[900],
      },
      border: {
        light: P.pink[400],
        dark: P.rose[500],
      },
      color: {
        light: P.gray[900],
        dark: P.slate[50],
      },
      focusBorder: {
        light: P.rose[500],
        dark: P.pink[400],
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
      light: P.rose[500],
      dark: P.yellow[400],
    },
    strokeWidth: {
      light: '1.5',
      dark: '1.6',
    },
  },
  panel: {
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
        themeMobileWidth: '100%',
        themeMobilePadding: '1.5rem',
      },
      light: {
        themeBackground: 'rgba(255, 255, 255, 0.92)',
        themeColor: P.gray[900],
        gradient: `linear-gradient(135deg, ${P.rose[400]} 0%, ${P.amber[500]} 25%, ${P.green[500]} 50%, ${P.blue[500]} 75%, ${P.violet[500]} 100%)`,
      },
      dark: {
        themeBackground: P.gray[900],
        themeColor: P.slate[50],
        gradient: `linear-gradient(135deg, ${P.indigo[800]} 0%, ${P.blue[900]} 25%, ${P.teal[800]} 50%, ${P.rose[800]} 75%, ${P.purple[700]} 100%)`,
        themeShadow: '0 32px 80px rgba(15, 23, 42, 0.55)',
      },
    },
  },
  inputText: {
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
        themeMobileWidth: '100%',
        themeMobilePadding: '0.5rem',
        themeMobileGap: '0.4rem',
      },
      light: {
        themeBackground: P.neutral[50],
        themeColor: P.gray[900],
        themeBorderColorFocus: P.violet[500],
        themeFocusRing: `0 0 0 2px ${'rgba(139, 92, 246, 0.45)'}`,
        themePlaceholderColor: P.gray[500],
        surface: `linear-gradient(${P.neutral[50]}, ${P.neutral[50]}) padding-box, linear-gradient(135deg, ${P.orange[500]}, ${P.cyan[400]}, ${P.violet[500]}) border-box`,
      },
      dark: {
        themeBackground: P.gray[900],
        themeColor: P.slate[50],
        themeBorderColorFocus: P.pink[400],
        themeFocusRing: `0 0 0 2px ${'rgba(244, 114, 182, 0.45)'}`,
        themePlaceholderColor: P.gray[200],
        surface: `linear-gradient(${P.gray[900]}, ${P.gray[900]}) padding-box, linear-gradient(135deg, ${P.cyan[400]}, ${P.indigo[500]}, ${P.rose[500]}) border-box`,
      },
    },
  },
  password: {
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
        themeMobileWidth: '100%',
        themeMobilePadding: '0.5rem',
        themeMobileGap: '0.4rem',
      },
      light: {
        themeBackground: P.neutral[50],
        themeColor: P.gray[900],
        themeFocusBorderColor: P.rose[500],
        themeFocusRing: `0 0 0 2px ${'rgba(236, 72, 153, 0.4)'}`,
        surface: `linear-gradient(${P.neutral[50]}, ${P.neutral[50]}) padding-box, linear-gradient(135deg, ${P.rose[500]}, ${P.indigo[500]}, ${P.cyan[400]}) border-box`,
      },
      dark: {
        themeBackground: P.gray[900],
        themeColor: P.slate[50],
        themeFocusBorderColor: P.pink[400],
        themeFocusRing: `0 0 0 2px ${'rgba(244, 114, 182, 0.45)'}`,
        surface: `linear-gradient(${P.gray[900]}, ${P.gray[900]}) padding-box, linear-gradient(135deg, ${P.rose[500]}, ${P.indigo[500]}, ${P.cyan[400]}) border-box`,
      },
    },
  },
  tooltip: {
    vars: {
      default: {
        surface: P.gray[900],
        borderGradient: `linear-gradient(135deg, ${P.red[400]}, ${P.yellow[400]}, ${P.green[400]}, ${P.blue[400]}, ${P.violet[400]})`,
        themeMobileVerticalOffset: 'calc(100% + 0.5rem)',
        themeMobileMaxWidth: 'min(18rem, 90vw)',
        themeMobileTextAlign: 'center',
      },
      light: {
        background: P.gray[900],
        color: P.slate[50],
        shadow: '0 28px 72px rgba(15, 23, 42, 0.35)',
      },
      dark: {
        background: P.gray[950],
        color: P.slate[50],
        shadow: '0 32px 80px rgba(15, 23, 42, 0.6)',
        surface: P.gray[950],
        borderGradient: `linear-gradient(135deg, ${P.green[400]}, ${P.blue[400]}, ${P.violet[400]}, ${P.orange[500]})`,
      },
    },
    css: `
      gp-tooltip.gp-tooltip-root .gp-tooltip-content {
        border: 2px solid transparent;
        background: linear-gradient(var(--gp-tooltip-surface, ${P.gray[900]}), var(--gp-tooltip-surface, ${P.gray[900]})) padding-box,
          var(--gp-tooltip-border-gradient, linear-gradient(135deg, ${P.red[400]}, ${P.yellow[400]}, ${P.green[400]}, ${P.blue[400]}, ${P.violet[400]})) border-box;
      }
    `,
  },
  blockui: {
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
};

const GP_PRIDE_THEME_COMPONENTS: Record<string, GpComponentThemeDefinition> = {
  'gp-theme-switcher': {
    vars: {
      default: {
        themeGap: '0.85rem',
        themeControlGap: '0.3rem',
        themeSelectRadius: '0.5rem',
        themeSelectPadding: '0.45rem 0.75rem',
        surface: `linear-gradient(${P.neutral[50]}, ${P.neutral[50]}) padding-box, linear-gradient(135deg, ${P.red[400]}, ${P.yellow[400]}, ${P.green[400]}, ${P.blue[400]}, ${P.violet[400]}) border-box`,
        themeMobileWidth: '100%',
        themeMobileTemplate: '1fr',
      },
      light: {
        themeLabelColor: P.gray[900],
        themeSelectBackground: P.neutral[50],
        themeSelectBorder: P.pink[400],
        themeSelectColor: P.gray[900],
        themeSelectFocusBorder: P.rose[500],
        themeSelectFocusRing: `0 0 0 2px ${'rgba(236, 72, 153, 0.4)'}`,
      },
      dark: {
        themeLabelColor: P.slate[50],
        themeSelectBackground: P.slate[900],
        themeSelectBorder: P.rose[500],
        themeSelectColor: P.slate[50],
        themeSelectFocusBorder: P.pink[400],
        themeSelectFocusRing: `0 0 0 2px ${'rgba(244, 114, 182, 0.45)'}`,
        surface: `linear-gradient(${P.slate[900]}, ${P.slate[900]}) padding-box, linear-gradient(135deg, ${P.green[400]}, ${P.blue[400]}, ${P.violet[400]}, ${P.orange[500]}) border-box`,
      },
    },
    css: `
      gp-theme-switcher.gp-theme-switcher-root .gp-theme-switcher__select {
        border-width: 2px;
        background: var(--gp-theme-switcher-surface);
      }
    `,
  },
  'gp-icon-base': {
    vars: {
      default: {
        size: '1.5rem',
      },
      light: {
        color: P.rose[500],
        strokeWidth: '1.5',
      },
      dark: {
        color: P.yellow[400],
        strokeWidth: '1.6',
      },
    },
  },
  autocomplete: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  cascadeselect: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  checkbox: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  datepicker: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  inputgroup: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  inputmask: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  inputnumber: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  inputotp: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  listbox: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  multiselect: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  radiobutton: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  select: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  selectbutton: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  slider: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  textarea: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  togglebutton: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  toggleswitch: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  button: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  speeddial: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  splitbutton: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  dataview: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  orderlist: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  orgchart: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  paginator: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  picklist: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  table: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  timeline: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  tree: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  treetable: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  accordion: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  card: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  divider: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  fieldset: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  scrollpanel: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  splitter: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  stepper: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  tabs: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  toolbar: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  breadcrumb: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  contextmenu: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  menu: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  menubar: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  megamenu: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  panelmenu: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  tieredmenu: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  confirmpopup: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  dialog: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  drawer: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  message: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  toast: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  upload: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  avatar: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  badge: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  carousel: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  chip: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  image: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  metergroup: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  progressbar: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  progressspinner: {
    vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } },
  },
  rating: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
  skeleton: { vars: { default: { themeMobileWidth: '100%', themeMobilePadding: '0.5rem' } } },
};

// Vibrant theme celebrating Pride Month with saturated accents.
export const GP_PRIDE_THEME_DEFINITION: GpThemeDefinition = {
  name: 'Pride',
  primitives: GP_PRIDE_THEME_PRIMITIVES,
  semantic: GP_PRIDE_THEME_SEMANTIC,
  components: GP_PRIDE_THEME_COMPONENTS,
};

export const GP_PRIDE_THEME: ComponentThemeOverrides =
  resolveThemeComponents(GP_PRIDE_THEME_DEFINITION);
