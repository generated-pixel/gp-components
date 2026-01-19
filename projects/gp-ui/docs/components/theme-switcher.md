# Theme Switcher (`gp-theme-switcher`)

## Purpose
Interactive control that lets consumers change the active theme preset and color mode at runtime.

## Default Layout
- Responsive grid layout with two stacked select controls (theme and color mode) on small screens, two columns on larger viewports.
- Uses gap variables to space controls and typography consistent with the design system.

## Theming Surface
- `--gp-theme-switcher-theme-gap`
- `--gp-theme-switcher-theme-control-gap`
- `--gp-theme-switcher-theme-label-color`
- `--gp-theme-switcher-theme-select-background`
- `--gp-theme-switcher-theme-select-border`
- `--gp-theme-switcher-theme-select-color`
- `--gp-theme-switcher-theme-select-radius`
- `--gp-theme-switcher-theme-select-padding`
- `--gp-theme-switcher-theme-select-focus-border`
- `--gp-theme-switcher-theme-select-focus-ring`

## Notes
- Template uses Angular `@for` syntax; each option must provide a stable `id` for tracking.
- The component calls `GpConfig.replaceTheme` and `GpConfig.setThemeMode`, so global styles update immediately after selection changes.
