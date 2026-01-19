# Panel (`gp-panel`)

## Purpose
Container component used to group content while providing consistent padding, elevation, and border treatment.

## Default Layout
- `display: block`
- Inherits padding, radius, border, and shadow from component theme variables.

## Theming Surface
- `--gp-panel-theme-background`
- `--gp-panel-theme-color`
- `--gp-panel-theme-border-color`
- `--gp-panel-theme-border-width`
- `--gp-panel-theme-radius`
- `--gp-panel-theme-padding`
- `--gp-panel-theme-shadow`

## Notes
- Responsive presets often decrease `--gp-panel-theme-padding` on small screens.
- Dark mode presets typically adjust border and shadow to maintain contrast.
