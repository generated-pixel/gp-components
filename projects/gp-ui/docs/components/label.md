# Label (`gp-label`)

## Purpose
Accessible label element that can render an optional required marker while respecting typography settings.

## Default Layout
- `display: inline-flex`
- Aligns content center with `--gp-label-gap` spacing between text and indicators.

## Theming Surface
- `--gp-label-theme-color`
- `--gp-label-theme-gap`
- `--gp-label-theme-font-size`
- `--gp-label-theme-font-weight`
- `--gp-label-theme-text-transform`
- `--gp-label-theme-letter-spacing`
- `--gp-label-theme-required-color`

## Notes
- The required marker is injected via CSS `::after` and reuses `--gp-label-gap` for consistent spacing.
- Typography settings allow preset-specific casing or tracking adjustments.
