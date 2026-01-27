import {
  cloneComponentVars,
  ComponentStyleConfig,
  ComponentThemeOverrides,
  mergeComponentVars,
  StyleValue,
} from '../base/style/base.style';
import { GP_DEFAULT_THEME } from './default.theme';
import { GP_DEVELOPER_THEME } from './developer.theme';
import { GP_PRIDE_THEME } from './pride.theme';
import { resolveThemeComponents } from './theme-definition.utils';
import {
  CreateThemeFromJsonOptions,
  GpComponentThemeDefinition,
  GpResolvedTheme,
  GpThemeDefinition,
  GpThemeJson,
  GpThemePrimitiveDefinition,
  GpThemeRegistryEntry,
  GpThemeSemanticDefinition,
} from '../interfaces';

type ResolvedThemeParts = {
  components: ComponentThemeOverrides;
  primitives: GpThemePrimitiveDefinition;
  semantic: GpThemeSemanticDefinition;
};

const BUILTIN_THEME_REGISTRY: Record<string, GpThemeRegistryEntry> = {
  default: GP_DEFAULT_THEME,
  developer: GP_DEVELOPER_THEME,
  pride: GP_PRIDE_THEME,
};

export function createThemeFromJson(
  json: GpThemeJson,
  options?: CreateThemeFromJsonOptions,
): ComponentThemeOverrides {
  if (!json) {
    return {};
  }

  const registry = buildRegistry(options?.registry);

  const baseParts = toArray(json.extends)
    .map(normalizeThemeKey)
    .map((key) => (key ? registry[key] : undefined))
    .filter((value): value is ResolvedThemeParts => !!value);

  const baseResolved = baseParts.reduce<ResolvedThemeParts>(
    mergeResolvedThemeParts,
    createEmptyResolvedTheme(),
  );

  const metadata = extractMetadata(json);
  const primitives = mergePrimitiveDefinitions(baseResolved.primitives, metadata.primitives);
  const semantic = mergeSemanticDefinitions(baseResolved.semantic, metadata.semantic);

  const overrides = convertComponentDefinitions(extractComponentDefinitions(json));
  const components = mergeThemeOverrides(baseResolved.components, overrides);

  const resolvedTheme: GpResolvedTheme = {
    name: json.name,
    primitives,
    semantic,
    components,
  };

  options?.onResolvedTheme?.(resolvedTheme);

  return components;
}

function extractComponentDefinitions(
  json: GpThemeJson,
): Record<string, GpComponentThemeDefinition | null | undefined> {
  const result: Record<string, GpComponentThemeDefinition | null | undefined> = {};

  if (json.components && typeof json.components === 'object') {
    Object.assign(result, json.components);
  }

  for (const [key, value] of Object.entries(json)) {
    if (
      ['name', 'extends', 'components', 'primitive', 'primitives', 'semantic', 'sematic'].includes(
        key,
      )
    ) {
      continue;
    }

    if (!isPlainObject(value)) {
      continue;
    }

    result[key] = value as GpComponentThemeDefinition;
  }

  return result;
}

function toComponentName(key: string): string | undefined {
  if (!key) {
    return undefined;
  }

  const trimmed = key.trim();

  if (!trimmed) {
    return undefined;
  }

  if (trimmed.startsWith('gp-')) {
    return trimmed;
  }

  const normalized = trimmed.replace(/[^a-z0-9]/gi, '').toLowerCase();

  switch (normalized) {
    case 'panel':
      return 'gp-panel';
    case 'inputtext':
    case 'input':
      return 'gp-input-text';
    case 'password':
      return 'gp-password';
    case 'label':
      return 'gp-label';
    case 'tooltip':
      return 'gp-tooltip';
    case 'blockui':
    case 'blocklayer':
      return 'gp-blockui';
    case 'themeswitcher':
    case 'themeswitch':
      return 'gp-theme-switcher';
    case 'iconbase':
    case 'icon':
    case 'icons':
      return 'gp-icon-base';
    default:
      return `gp-${normalized}`;
  }
}

function normalizeDefinition(definition: GpComponentThemeDefinition): ComponentStyleConfig {
  const normalized: ComponentStyleConfig = {};

  if (definition.classes) {
    normalized.classes = definition.classes.filter(
      (value): value is string => typeof value === 'string',
    );
  }

  if (definition.host && typeof definition.host === 'object') {
    normalized.host = normalizeStyleRecord(definition.host);
  }

  if (definition.vars && typeof definition.vars === 'object') {
    const cloned = cloneComponentVars(definition.vars);

    if (cloned) {
      normalized.vars = cloned;
    }
  }

  if (typeof definition.css === 'string') {
    normalized.css = definition.css;
  }

  return normalized;
}

function normalizeStyleRecord(styles: Record<string, StyleValue>): Record<string, StyleValue> {
  return Object.entries(styles).reduce<Record<string, StyleValue>>((accumulator, [name, value]) => {
    accumulator[normalizeStyleName(name)] = value;
    return accumulator;
  }, {});
}

function normalizeStyleName(name: string): string {
  const trimmed = name.trim();

  if (trimmed.startsWith('--')) {
    return trimmed;
  }

  return trimmed
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .toLowerCase();
}

function mergeThemeOverrides(
  ...overrides: Array<ComponentThemeOverrides | undefined>
): ComponentThemeOverrides {
  return overrides.reduce<ComponentThemeOverrides>((accumulator, override) => {
    if (!override) {
      return accumulator;
    }

    for (const [componentName, definition] of Object.entries(override)) {
      const existing = accumulator[componentName];
      accumulator[componentName] = mergeComponentStyleConfig(existing, definition);
    }

    return accumulator;
  }, {});
}

function mergeComponentStyleConfig(
  existing: ComponentStyleConfig | undefined,
  incoming: ComponentStyleConfig | undefined,
): ComponentStyleConfig {
  if (!existing) {
    return incoming ? cloneComponentStyleConfig(incoming) : {};
  }

  if (!incoming) {
    return cloneComponentStyleConfig(existing);
  }

  const merged: ComponentStyleConfig = {};

  const host =
    existing.host || incoming.host
      ? { ...(existing.host ?? {}), ...(incoming.host ?? {}) }
      : undefined;
  const vars = mergeComponentVars(existing.vars, incoming.vars);

  const classes =
    existing.classes || incoming.classes
      ? Array.from(new Set([...(existing.classes ?? []), ...(incoming.classes ?? [])]))
      : undefined;

  const css = [existing.css, incoming.css].filter(Boolean).join('\n');

  if (host && Object.keys(host).length) {
    merged.host = host;
  }

  if (vars) {
    merged.vars = vars;
  }

  if (classes && classes.length) {
    merged.classes = classes;
  }

  if (css.trim()) {
    merged.css = css.trim();
  }

  return merged;
}

function toArray<T>(value: T | T[] | null | undefined): T[] {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

function buildRegistry(
  custom?: Record<string, GpThemeRegistryEntry>,
): Record<string, ResolvedThemeParts> {
  const entries = {
    ...BUILTIN_THEME_REGISTRY,
    ...(custom ?? {}),
  };

  return Object.entries(entries).reduce<Record<string, ResolvedThemeParts>>(
    (accumulator, [key, value]) => {
      const normalized = normalizeThemeKey(key);

      if (!normalized) {
        return accumulator;
      }

      const resolved = resolveRegistryEntry(value);

      if (!resolved) {
        return accumulator;
      }

      accumulator[normalized] = resolved;
      return accumulator;
    },
    {},
  );
}

function normalizeThemeKey(key: string | null | undefined): string | undefined {
  if (!key) {
    return undefined;
  }

  const trimmed = key.trim().toLowerCase();

  if (!trimmed) {
    return undefined;
  }

  const withoutPrefix = trimmed.startsWith('gp-') ? trimmed.slice(3) : trimmed;
  const withoutSuffix = withoutPrefix.endsWith('-theme')
    ? withoutPrefix.slice(0, Math.max(0, withoutPrefix.length - 6))
    : withoutPrefix;

  return withoutSuffix;
}

function resolveRegistryEntry(
  entry: GpThemeRegistryEntry | undefined,
): ResolvedThemeParts | undefined {
  if (!entry) {
    return undefined;
  }

  if (isLikelyThemeDefinition(entry)) {
    const metadata = extractMetadata(entry);
    return {
      components: resolveThemeComponents(entry as GpThemeDefinition),
      primitives: metadata.primitives,
      semantic: metadata.semantic,
    };
  }

  if (isComponentThemeOverrides(entry)) {
    return {
      components: cloneComponentThemeOverrides(entry),
      primitives: {},
      semantic: {},
    };
  }

  return undefined;
}

function mergeResolvedThemeParts(
  base: ResolvedThemeParts,
  incoming: ResolvedThemeParts,
): ResolvedThemeParts {
  return {
    components: mergeThemeOverrides(base.components, incoming.components),
    primitives: mergePrimitiveDefinitions(base.primitives, incoming.primitives),
    semantic: mergeSemanticDefinitions(base.semantic, incoming.semantic),
  };
}

function createEmptyResolvedTheme(): ResolvedThemeParts {
  return {
    components: {},
    primitives: {},
    semantic: {},
  };
}

function extractMetadata(
  source:
    | {
        primitive?: GpThemePrimitiveDefinition | null;
        primitives?: GpThemePrimitiveDefinition | null;
        semantic?: GpThemeSemanticDefinition | null;
        sematic?: GpThemeSemanticDefinition | null;
      }
    | null
    | undefined,
): { primitives: GpThemePrimitiveDefinition; semantic: GpThemeSemanticDefinition } {
  const primitivesSource = source?.primitives ?? source?.primitive ?? null;
  const semanticSource = source?.semantic ?? source?.sematic ?? null;

  return {
    primitives: clonePrimitiveDefinition(primitivesSource),
    semantic: cloneSemanticDefinition(semanticSource),
  };
}

function mergePrimitiveDefinitions(
  base?: GpThemePrimitiveDefinition | null,
  incoming?: GpThemePrimitiveDefinition | null,
): GpThemePrimitiveDefinition {
  const result = clonePrimitiveDefinition(base);

  if (!incoming) {
    return result;
  }

  Object.entries(incoming).forEach(([key, value]) => {
    const existing = result[key];

    if (isPlainObject(existing) && isPlainObject(value)) {
      result[key] = deepMergeObjects(
        existing as Record<string, unknown>,
        value as Record<string, unknown>,
      ) as GpThemePrimitiveDefinition[string];
    } else {
      result[key] = clonePrimitiveValue(value);
    }
  });

  return result;
}

function mergeSemanticDefinitions(
  base?: GpThemeSemanticDefinition | null,
  incoming?: GpThemeSemanticDefinition | null,
): GpThemeSemanticDefinition {
  const result = cloneSemanticDefinition(base);

  if (!incoming) {
    return result;
  }

  return deepMergeObjects(result, incoming);
}

function deepMergeObjects<T extends Record<string, unknown>>(
  base: T,
  incoming: Record<string, unknown>,
): T {
  const result: Record<string, unknown> = { ...base };

  Object.entries(incoming).forEach(([key, value]) => {
    const existing = result[key];

    if (isPlainObject(existing) && isPlainObject(value)) {
      result[key] = deepMergeObjects(
        existing as Record<string, unknown>,
        value as Record<string, unknown>,
      );
      return;
    }

    if (Array.isArray(value)) {
      result[key] = [...value];
      return;
    }

    if (isPlainObject(value)) {
      result[key] = deepMergeObjects({}, value as Record<string, unknown>);
      return;
    }

    result[key] = value;
  });

  return result as T;
}

function clonePrimitiveDefinition(
  definition?: GpThemePrimitiveDefinition | null,
): GpThemePrimitiveDefinition {
  if (!definition) {
    return {};
  }

  const result: GpThemePrimitiveDefinition = {};

  Object.entries(definition).forEach(([key, value]) => {
    result[key] = clonePrimitiveValue(value);
  });

  return result;
}

function clonePrimitiveValue(
  value: GpThemePrimitiveDefinition[string],
): GpThemePrimitiveDefinition[string] {
  if (isPlainObject(value)) {
    return deepMergeObjects(
      {},
      value as Record<string, unknown>,
    ) as GpThemePrimitiveDefinition[string];
  }

  if (Array.isArray(value)) {
    return [...value] as unknown as GpThemePrimitiveDefinition[string];
  }

  return value;
}

function cloneSemanticDefinition(
  definition?: GpThemeSemanticDefinition | null,
): GpThemeSemanticDefinition {
  if (!definition) {
    return {};
  }

  return deepMergeObjects({}, definition);
}

function convertComponentDefinitions(
  components: Record<string, GpComponentThemeDefinition | null | undefined>,
): ComponentThemeOverrides {
  return Object.entries(components).reduce<ComponentThemeOverrides>(
    (accumulator, [componentName, definition]) => {
      if (!definition) {
        return accumulator;
      }

      const normalizedName = toComponentName(componentName);

      if (!normalizedName) {
        return accumulator;
      }

      accumulator[normalizedName] = mergeComponentStyleConfig(
        accumulator[normalizedName],
        normalizeDefinition(definition),
      );

      return accumulator;
    },
    {},
  );
}

function cloneComponentThemeOverrides(overrides: ComponentThemeOverrides): ComponentThemeOverrides {
  return Object.entries(overrides).reduce<ComponentThemeOverrides>(
    (accumulator, [name, config]) => {
      accumulator[name] = cloneComponentStyleConfig(config);
      return accumulator;
    },
    {},
  );
}

function cloneComponentStyleConfig(config: ComponentStyleConfig): ComponentStyleConfig {
  return {
    host: config.host ? { ...config.host } : undefined,
    vars: config.vars ? cloneComponentVars(config.vars) : undefined,
    classes: config.classes ? [...config.classes] : undefined,
    css: config.css,
  };
}

function isComponentThemeOverrides(value: unknown): value is ComponentThemeOverrides {
  if (!isPlainObject(value)) {
    return false;
  }

  return Object.values(value).every((entry) => isComponentStyleConfig(entry));
}

function isComponentStyleConfig(value: unknown): value is ComponentStyleConfig {
  if (!isPlainObject(value)) {
    return false;
  }

  const allowedKeys = new Set(['host', 'vars', 'classes', 'css']);

  return Object.keys(value as Record<string, unknown>).every((key) => allowedKeys.has(key));
}

function isLikelyThemeDefinition(value: unknown): value is GpThemeDefinition {
  if (!isPlainObject(value)) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    'components' in candidate ||
    'primitive' in candidate ||
    'primitives' in candidate ||
    'semantic' in candidate ||
    'sematic' in candidate ||
    'extends' in candidate ||
    'name' in candidate
  );
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}
