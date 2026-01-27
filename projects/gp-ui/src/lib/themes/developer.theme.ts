import { ComponentThemeOverrides } from '../base/style/base.style';
import {
  GpComponentThemeDefinition,
  GpThemeDefinition,
  GpThemePrimitiveDefinition,
  GpThemeSemanticDefinition,
} from '../interfaces';
import { resolveThemeComponents } from './theme-definition.utils';
import { GP_BASE_THEME_PRIMITIVES } from './palette';

const GP_DEVELOPER_THEME_PRIMITIVES: GpThemePrimitiveDefinition = {
  ...GP_BASE_THEME_PRIMITIVES,
};

const P = GP_BASE_THEME_PRIMITIVES;

const GP_DEVELOPER_THEME_SEMANTIC: GpThemeSemanticDefinition = {
  colorSchema: {
    light: {
      backgroundColor: P.slate[50],
      surfaceColor: P.slate[200],
      textColor: P.slate[900],
    },
    dark: {
      backgroundColor: P.slate[900],
      surfaceColor: P.gray[900],
      textColor: P.slate[300],
    },
  },
  container: {
    padding: '1.5rem',
    border: {
      width: '1px',
      radius: '0.75rem',
      color: {
        light: P.indigo[100],
        dark: P.slate[800],
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
        light: P.slate[400],
        dark: P.gray[800],
      },
      focusColor: {
        light: P.blue[600],
        dark: P.sky[300],
      },
    },
    background: {
      light: P.slate[200],
      dark: P.gray[900],
    },
    color: {
      light: P.slate[900],
      dark: P.slate[200],
    },
    placeholderColor: {
      light: P.slate[600],
      dark: P.slate[400],
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
      light: P.slate[600],
      dark: P.indigo[200],
    },
    requiredColor: {
      light: P.red[600],
      dark: P.orange[500],
    },
  },
  themeSwitcher: {
    gap: '0.75rem',
    controlGap: '0.25rem',
    labelColor: {
      light: P.slate[900],
      dark: P.indigo[100],
    },
    select: {
      radius: '0.375rem',
      padding: '0.375rem 0.5rem',
      background: {
        light: P.slate[200],
        dark: P.gray[900],
      },
      border: {
        light: P.slate[400],
        dark: P.gray[800],
      },
      color: {
        light: P.slate[900],
        dark: P.slate[200],
      },
      focusBorder: {
        light: P.blue[600],
        dark: P.sky[300],
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
      },
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
  },
  blockui: {
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

// Developer theme with light and dark modes optimized for high-contrast UIs.
export const GP_DEVELOPER_THEME_DEFINITION: GpThemeDefinition = {
  name: 'Developer',
  primitives: GP_DEVELOPER_THEME_PRIMITIVES,
  semantic: GP_DEVELOPER_THEME_SEMANTIC,
};

export const GP_DEVELOPER_THEME: ComponentThemeOverrides = resolveThemeComponents(
  GP_DEVELOPER_THEME_DEFINITION,
);
