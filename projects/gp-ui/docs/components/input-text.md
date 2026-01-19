# Input Text (`gp-input-text`)

## Purpose
Single-line text input wrapper that aligns icons, buttons, and user text while providing consistent focus styling.

## Default Layout
- `display: inline-flex`
- `align-items: center`
- Uses `--gp-input-text-gap` for spacing and `--gp-input-text-padding` for inner padding.

## Theming Surface
- `--gp-input-text-theme-background`
- `--gp-input-text-theme-color`
- `--gp-input-text-theme-border-color`
- `--gp-input-text-theme-border-width`
- `--gp-input-text-theme-border-color-focus`
- `--gp-input-text-theme-focus-ring`
- `--gp-input-text-theme-placeholder-color`
- `--gp-input-text-theme-radius`
- `--gp-input-text-theme-padding`
- `--gp-input-text-theme-gap`

## Notes
- Focus handling relies on `:focus-within`; overrides should adjust `--gp-input-text-theme-focus-ring` for accessibility.
- Presets can swap solid borders for gradients by overriding the component `host` or `css` block.
