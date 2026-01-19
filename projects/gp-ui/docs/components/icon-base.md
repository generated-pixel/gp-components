# Icon Base (`gp-icon-base` and derivatives)

## Purpose
Provides shared size, color, and stroke configuration for SVG icons used throughout the library. Individual icon components extend this base styling.

## Default Layout
- Icons inherit `display: inline-flex` from consuming components and rely on the base CSS variables for sizing and stroke consistency.

## Theming Surface
- `--gp-icon-base-color`
- `--gp-icon-base-stroke-width`
- `--gp-icon-base-size`

## Notes
- Dark-mode presets typically adjust the color for better contrast (for example, blue in light mode versus cyan in dark mode).
- When creating new icons, ensure they consume the base variables so theme presets can manage the full icon set uniformly.
