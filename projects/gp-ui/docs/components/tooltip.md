# Tooltip (`gp-tooltip`)

## Purpose
Contextual popup used to provide supplemental information on hover or focus.

## Default Layout
- Positions content via absolute coordinates driven by the component controller.
- Styling relies on theme variables for background, text color, and elevation.

## Theming Surface
- `--gp-tooltip-background`
- `--gp-tooltip-color`
- `--gp-tooltip-shadow`
- Additional metrics (padding, border radius) can be introduced through theme overrides when needed.

## Notes
- Presets may override the `css` block to apply gradient borders or adjust placement for mobile.
- Responsive rules typically reposition the tooltip for small viewports (for example, centered above the trigger).
