import {
  cloneComponentVars,
  ComponentStyleConfig,
  ComponentThemeOverrides,
  mergeComponentVars,
  StyleValue,
} from '../base/style/base.style'
import { GP_DEFAULT_THEME } from './default.theme'
import { GP_DEVELOPER_THEME } from './developer.theme'
import { GP_PRIDE_THEME } from './pride.theme'
import {
  CreateThemeFromJsonOptions,
  GpComponentThemeDefinition,
  GpThemeJson,
} from '../interfaces/theme-json.interfaces'

const BUILTIN_THEME_REGISTRY: Record<string, ComponentThemeOverrides> = {
  default: GP_DEFAULT_THEME,
  developer: GP_DEVELOPER_THEME,
  pride: GP_PRIDE_THEME,
}

export function createThemeFromJson(json: GpThemeJson, options?: CreateThemeFromJsonOptions): ComponentThemeOverrides {
  if (!json) {
    return {}
  }

  const registry = buildRegistry(options?.registry)

  const baseThemes = toArray(json.extends)
    .map(normalizeThemeKey)
    .map((key) => (key ? registry[key] : undefined))
    .filter(isComponentThemeOverrides)
  const base = mergeThemeOverrides(...baseThemes)

  const components = extractComponentDefinitions(json)

  const overrides: ComponentThemeOverrides = {}

  for (const [key, definition] of Object.entries(components)) {
    if (!definition) {
      continue
    }

    const componentName = toComponentName(key)

    if (!componentName) {
      continue
    }

    overrides[componentName] = mergeComponentStyleConfig(overrides[componentName], normalizeDefinition(definition))
  }

  return mergeThemeOverrides(base, overrides)
}

function extractComponentDefinitions(json: GpThemeJson): Record<string, GpComponentThemeDefinition | null | undefined> {
  const result: Record<string, GpComponentThemeDefinition | null | undefined> = {}

  if (json.components && typeof json.components === 'object') {
    Object.assign(result, json.components)
  }

  for (const [key, value] of Object.entries(json)) {
    if (['name', 'extends', 'components'].includes(key)) {
      continue
    }

    if (!value || typeof value !== 'object') {
      continue
    }

    result[key] = value as GpComponentThemeDefinition
  }

  return result
}

function toComponentName(key: string): string | undefined {
  if (!key) {
    return undefined
  }

  const trimmed = key.trim()

  if (!trimmed) {
    return undefined
  }

  if (trimmed.startsWith('gp-')) {
    return trimmed
  }

  const normalized = trimmed.replace(/[^a-z0-9]/gi, '').toLowerCase()

  switch (normalized) {
    case 'panel':
      return 'gp-panel'
    case 'inputtext':
    case 'input':
      return 'gp-input-text'
    case 'password':
      return 'gp-password'
    case 'label':
      return 'gp-label'
    case 'tooltip':
      return 'gp-tooltip'
    case 'blockui':
    case 'blocklayer':
      return 'gp-blockui'
    case 'themeswitcher':
    case 'themeswitch':
      return 'gp-theme-switcher'
    case 'iconbase':
    case 'icon':
    case 'icons':
      return 'gp-icon-base'
    default:
      return `gp-${normalized}`
  }
}

function normalizeDefinition(definition: GpComponentThemeDefinition): ComponentStyleConfig {
  const normalized: ComponentStyleConfig = {}

  if (definition.classes) {
    normalized.classes = definition.classes.filter((value): value is string => typeof value === 'string')
  }

  if (definition.host && typeof definition.host === 'object') {
    normalized.host = normalizeStyleRecord(definition.host)
  }

  if (definition.vars && typeof definition.vars === 'object') {
    const cloned = cloneComponentVars(definition.vars)

    if (cloned) {
      normalized.vars = cloned
    }
  }

  if (typeof definition.css === 'string') {
    normalized.css = definition.css
  }

  return normalized
}

function normalizeStyleRecord(styles: Record<string, StyleValue>): Record<string, StyleValue> {
  return Object.entries(styles).reduce<Record<string, StyleValue>>((accumulator, [name, value]) => {
    accumulator[normalizeStyleName(name)] = value
    return accumulator
  }, {})
}

function normalizeStyleName(name: string): string {
  const trimmed = name.trim()

  if (trimmed.startsWith('--')) {
    return trimmed
  }

  return trimmed
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .toLowerCase()
}

function mergeThemeOverrides(...overrides: Array<ComponentThemeOverrides | undefined>): ComponentThemeOverrides {
  return overrides.reduce<ComponentThemeOverrides>((accumulator, override) => {
    if (!override) {
      return accumulator
    }

    for (const [componentName, definition] of Object.entries(override)) {
      const existing = accumulator[componentName]
      accumulator[componentName] = mergeComponentStyleConfig(existing, definition)
    }

    return accumulator
  }, {})
}

function mergeComponentStyleConfig(
  existing: ComponentStyleConfig | undefined,
  incoming: ComponentStyleConfig | undefined
): ComponentStyleConfig {
  if (!existing) {
    return incoming ? { ...incoming } : {}
  }

  if (!incoming) {
    return { ...existing }
  }

  const merged: ComponentStyleConfig = {}

  const host = existing.host || incoming.host ? { ...(existing.host ?? {}), ...(incoming.host ?? {}) } : undefined
  const vars = mergeComponentVars(existing.vars, incoming.vars)

  const classes =
    existing.classes || incoming.classes
      ? Array.from(new Set([...(existing.classes ?? []), ...(incoming.classes ?? [])]))
      : undefined

  const css = [existing.css, incoming.css].filter(Boolean).join('\n')

  if (host && Object.keys(host).length) {
    merged.host = host
  }

  if (vars) {
    merged.vars = vars
  }

  if (classes && classes.length) {
    merged.classes = classes
  }

  if (css.trim()) {
    merged.css = css.trim()
  }

  return merged
}

function toArray<T>(value: T | T[] | null | undefined): T[] {
  if (!value) {
    return []
  }

  return Array.isArray(value) ? value : [value]
}

function isComponentThemeOverrides(value: unknown): value is ComponentThemeOverrides {
  return !!value && typeof value === 'object'
}

function buildRegistry(custom?: Record<string, ComponentThemeOverrides>): Record<string, ComponentThemeOverrides> {
  const entries = {
    ...BUILTIN_THEME_REGISTRY,
    ...(custom ?? {}),
  }

  return Object.entries(entries).reduce<Record<string, ComponentThemeOverrides>>((accumulator, [key, value]) => {
    const normalized = normalizeThemeKey(key)

    if (!normalized) {
      return accumulator
    }

    accumulator[normalized] = value
    return accumulator
  }, {})
}

function normalizeThemeKey(key: string | null | undefined): string | undefined {
  if (!key) {
    return undefined
  }

  const trimmed = key.trim().toLowerCase()

  if (!trimmed) {
    return undefined
  }

  const withoutPrefix = trimmed.startsWith('gp-') ? trimmed.slice(3) : trimmed
  const withoutSuffix = withoutPrefix.endsWith('-theme')
    ? withoutPrefix.slice(0, Math.max(0, withoutPrefix.length - 6))
    : withoutPrefix

  return withoutSuffix
}
