# Theme System Overview

This document describes how theming, translations, and runtime configuration work inside the gp-ui library. It covers the key building blocks, how themes are applied, and how to extend the system with new presets or component overrides.

## Core Building Blocks

- **GpConfig service (`projects/gp-ui/src/lib/config/gp-config.ts`)**
  - Stores global translations, theme overrides, the active theme id, and the active theme mode (`auto`, `light`, `dark`).
  - Exposes `signal` values for reactive consumption and `Observable` streams for non-signal contexts.
  - Provides helpers such as `setTheme`, `replaceTheme`, `setThemeId`, and `setThemeMode` so the application can dynamically update styling at runtime.
  - Applies the theme mode to the document root through the `data-gp-theme-mode` attribute and `color-scheme` CSS property.

- **BaseStyle class (`projects/gp-ui/src/lib/base/style/base.style.ts`)**
  - Every component style provider extends `BaseStyle`. It owns the logic that merges default theme values, global overrides, and per-instance overrides.
  - Handles attaching host element classes, inline styles, CSS variables, and any global CSS snippets needed for the component.
  - Watches the global theme stream so components react immediately when `GpConfig` publishes updates.

- **Component Style Providers**
  - Each component has a dedicated style class (for example, `InputTextStyle`, `PasswordStyle`, `PanelStyle`) that extends `BaseStyle`.
  - The provider defines default `classes`, `host` styles, local `vars`, and optional `css` blocks for pseudo selectors or media queries.
  - Default variable values always reference `--gp-<component>-theme-*` tokens so that presets can override them without touching component code.

## Theme Structure

- Theme presets live in `projects/gp-ui/src/lib/themes/*.theme.ts`.
- Every preset exports a `ComponentThemeOverrides` object keyed by component name (matching the `componentName` defined in the style provider).
- Within each component entry you can override:
  - `vars`: Supply concrete values for the `--gp-<component>-theme-*` tokens.
  - `host`: Add or override host-level styles (rare, usually only for gradient-heavy themes).
  - `css`: Append responsive rules, dark-mode adjustments, or additional selectors.
- Dark-mode handling uses two mechanisms:
  - `@media (prefers-color-scheme: dark)` for automatic mode when the config is set to `auto`.
  - `[data-gp-theme-mode='dark']` selectors so manual mode selection overrides the media query.
- For responsive tweaks, prefer `@media (max-width: 600px)` and set the theme-scoped variables (for example `--gp-input-text-theme-padding`) instead of direct host styling.

## Theme Switcher Component

- Located at `projects/gp-ui/src/lib/theme-switcher` and exposed via `ThemeSwitcher`.
- Accepts optional inputs for custom theme options and theme mode options, but falls back to built-in presets (`default`, `developer`, `pride`).
- Internally:
  - Uses `GpConfig` to read the current theme id and mode and keep the UI in sync.
  - Calls `replaceTheme` so only one preset is active at a time.
  - Persists selections back into `GpConfig` via `setThemeId` and `setThemeMode`.
- The template now uses Angular v17 `@for` block syntax for rendering select options.
- The style provider (`ThemeSwitcherStyle`) relies entirely on theme variables with defaults so presets can restyle the switcher itself.

## Adding a New Theme Preset

1. Create a new file inside `projects/gp-ui/src/lib/themes` (for example, `solarized.theme.ts`).
2. Export a `ComponentThemeOverrides` object following the existing presets as references.
3. Override only the `--gp-<component>-theme-*` tokens you need. Leave unspecified values to fall back to component defaults.
4. For dark mode support, mirror the pattern:
   - Use `@media (prefers-color-scheme: dark) { :root:not([data-gp-theme-mode]) ... }` for automatic mode.
   - Use `:root[data-gp-theme-mode='dark'] ...` for manual overrides.
5. Update the switcher’s built-in option list in `theme-switcher.ts` if you want the new preset selectable by default.
6. Rebuild with `pnpm run build gp-ui` to verify TypeScript and Angular packaging succeed.

## Creating Component-Level Overrides

- Consumers can call `gpConfig.setTheme` with a partial `ComponentThemeOverrides` object to override specific component variables at runtime.
- Use `gpConfig.replaceTheme` when you want to swap the entire active preset (the switcher uses this internally).
- Component instances may also pass overrides directly through the style provider (for example, `this.style.attach(host, renderer, overrides)`), though most usage flows through global configuration.

## Translation Keys

- Default strings live in `GpConfig.translations` (`projects/gp-ui/src/lib/config/gp-config.ts`).
- Consumers can supply additional translations through `gpConfig.setTranslations` or during config initialization.
- Theme-related keys currently include:
  - `themeSwitcherLabel`
  - `themeDefaultLabel`, `themeDeveloperLabel`, `themePrideLabel`
  - `themeModeLabel`, `themeModeAutoLabel`, `themeModeLightLabel`, `themeModeDarkLabel`
- The theme switcher resolves labels via `config.getTranslation`, falling back to sensible defaults when keys are missing.

## Extending Components

When adding a new component to the library:

1. Create a style provider extending `BaseStyle` and define default theme variables.
2. Pick a unique `componentName` (for example, `gp-alert`) so presets can target it.
3. Include the provider in the component’s `providers` array and call `this.attachStyle` in the component base class.
4. Add default theme entries to each preset (or at least to the primary `default` preset) to keep styling consistent.
5. If the component has interactive states, expose corresponding theme variables (for focus rings, borders, etc.) rather than hard-coding colors.

Following these conventions keeps the theming surface predictable, supports color-mode switching, and allows downstream applications to tailor appearances without forking component code.

## Component Reference

Detailed notes for each component are available in dedicated files under `docs/components`:

- [Panel](components/panel.md)
- [Input Text](components/input-text.md)
- [Password](components/password.md)
- [Label](components/label.md)
- [Tooltip](components/tooltip.md)
- [Block UI](components/blockui.md)
- [Theme Switcher](components/theme-switcher.md)
- [Icon Base](components/icon-base.md)

## Loading Themes from JSON

- The helper in [projects/gp-ui/src/lib/themes/theme-json.adapter.ts](projects/gp-ui/src/lib/themes/theme-json.adapter.ts) lets you turn plain JSON data into a `ComponentThemeOverrides` object.
- JSON follows the `GpThemeJson` shape exported from [projects/gp-ui/src/lib/interfaces/theme-json.interfaces.ts](projects/gp-ui/src/lib/interfaces/theme-json.interfaces.ts); component ids can be written as `panel`, `inputText`, `themeSwitcher`, etc.
- Use the built-in presets (`default`, `developer`, `pride`) as a base by setting `"extends": "default"` (case-insensitive). You can also register custom bases through the optional `registry` parameter.

Example usage:

```ts
import { createThemeFromJson, GpThemeJson } from 'gp-ui'

const jsonTheme: GpThemeJson = {
  name: 'My Portal Theme',
  extends: ['default'],
  components: {
    panel: {
      vars: {
        themeBackground: '#ffffff',
        themeShadow: '0 24px 48px rgba(15, 23, 42, 0.12)',
      },
    },
    inputText: {
      vars: {
        themeBorderColor: '#4f46e5',
        themeBorderColorFocus: '#6366f1',
      },
    },
  },
}

gpConfig.replaceTheme(createThemeFromJson(jsonTheme))
```

The helper normalizes component names, merges any extended themes, and returns an override map suitable for `gpConfig.setTheme` or `gpConfig.replaceTheme`.
