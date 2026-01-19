# Block UI (`gp-blockui`)

## Purpose
Overlay component that blocks user interactions while an operation is in progress.

## Default Layout
- The host remains `position: relative` and defines the minimum height.
- An `::after` pseudo-element covers the host when the `gp-blockui-active` class is present.

## Theming Surface
- `--gp-blockui-theme-overlay-background`
- `--gp-blockui-theme-overlay-blur`
- `--gp-blockui-theme-overlay-transition`

## Notes
- Adjust the background alpha to convey the severity of the blocking state.
- Increasing blur can help communicate modality without altering the primary content.
