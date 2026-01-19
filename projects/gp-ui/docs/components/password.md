# Password (`gp-password`)

## Purpose
Password entry control that mirrors the text input layout and supports visibility toggles and strength indicators.

## Default Layout
- `display: inline-flex`
- Shares spacing rules with `gp-input-text` using `--gp-password-gap` and `--gp-password-padding`.

## Theming Surface
- `--gp-password-theme-background`
- `--gp-password-theme-color`
- `--gp-password-theme-border-color`
- `--gp-password-theme-border-width`
- `--gp-password-theme-gap`
- `--gp-password-theme-padding`
- `--gp-password-theme-radius`
- `--gp-password-theme-focus-border-color`
- `--gp-password-theme-focus-ring`

## Notes
- Focus styling also uses `:focus-within`; keep `--gp-password-theme-focus-ring` in sync with brand accessibility guidance.
- Visibility toggle icons inherit from the icon base theme.
