import {
  cloneComponentVars,
  ComponentStyleConfig,
  ComponentThemeOverrides,
  ComponentVarsDefinition,
  mergeComponentVars,
  StyleValue,
} from '../base/style/base.style';
import { GpComponentThemeDefinition, GpThemeDefinition } from '../interfaces';

type ModeKey = 'light' | 'dark';

type SemanticRecord = Record<string, any>;

type ComponentName = string;

export function resolveThemeComponents(definition: GpThemeDefinition): ComponentThemeOverrides {
  const semanticOverrides = mapSemanticToComponentOverrides(definition);
  const semanticComponentOverrides = extractSemanticComponentOverrides(definition);
  const componentOverrides = convertComponentDefinitions(definition.components);
  return mergeOverrides(
    mergeOverrides(semanticOverrides, semanticComponentOverrides),
    componentOverrides,
  );
}

function extractSemanticComponentOverrides(definition: GpThemeDefinition): ComponentThemeOverrides {
  const semantic = (definition.semantic ?? {}) as SemanticRecord;
  const overrides: ComponentThemeOverrides = {};

  const componentMap: Record<string, string> = {
    panel: 'gp-panel',
    inputText: 'gp-input-text',
    password: 'gp-password',
    tooltip: 'gp-tooltip',
    blockui: 'gp-blockui',
  };

  Object.entries(componentMap).forEach(([key, componentName]) => {
    const componentDef = semantic[key];
    if (componentDef && typeof componentDef === 'object') {
      const config: ComponentStyleConfig = {};

      if (componentDef.host) {
        config.host = { ...componentDef.host };
      }

      if (componentDef.vars) {
        config.vars = cloneComponentVars(componentDef.vars as ComponentVarsDefinition);
      }

      if (componentDef.css) {
        config.css = componentDef.css;
      }

      if (Object.keys(config).length > 0) {
        overrides[componentName] = config;
      }
    }
  });

  return overrides;
}

function mapSemanticToComponentOverrides(definition: GpThemeDefinition): ComponentThemeOverrides {
  const semantic = (definition.semantic ?? {}) as SemanticRecord;
  const colorSchema = (semantic.colorSchema ?? {}) as SemanticRecord;
  const container = (semantic.container ?? {}) as SemanticRecord;
  const formField = (semantic.formField ?? {}) as SemanticRecord;
  const label = (semantic.label ?? {}) as SemanticRecord;
  const themeSwitcher = (semantic.themeSwitcher ?? {}) as SemanticRecord;
  const icon = (semantic.icon ?? {}) as SemanticRecord;

  const overrides: ComponentThemeOverrides = {};

  const panelVars: ComponentVarsDefinition = {};
  setBaseVar(panelVars, 'themeBorderWidth', container?.border?.width);
  setBaseVar(panelVars, 'themePadding', container?.padding);
  setBaseVar(panelVars, 'themeRadius', container?.border?.radius);
  setModeVar(panelVars, 'light', 'themeBorderColor', container?.border?.color?.light);
  setModeVar(panelVars, 'dark', 'themeBorderColor', container?.border?.color?.dark);
  setModeVar(panelVars, 'light', 'themeShadow', container?.shadow?.light);
  setModeVar(panelVars, 'dark', 'themeShadow', container?.shadow?.dark);
  setModeVar(panelVars, 'light', 'themeBackground', resolveSurfaceColor(colorSchema?.light));
  setModeVar(panelVars, 'dark', 'themeBackground', resolveSurfaceColor(colorSchema?.dark));
  setModeVar(panelVars, 'light', 'themeColor', colorSchema?.light?.textColor);
  setModeVar(panelVars, 'dark', 'themeColor', colorSchema?.dark?.textColor);

  if (hasVars(panelVars)) {
    overrides['gp-panel'] = { vars: panelVars };
  }

  const formBackgroundLight =
    formField?.background?.light ?? resolveSurfaceColor(colorSchema?.light);
  const formBackgroundDark = formField?.background?.dark ?? resolveSurfaceColor(colorSchema?.dark);
  const formTextLight = formField?.color?.light ?? colorSchema?.light?.textColor;
  const formTextDark = formField?.color?.dark ?? colorSchema?.dark?.textColor;

  const inputVars: ComponentVarsDefinition = {};
  setBaseVar(inputVars, 'themeBorderWidth', formField?.border?.width);
  setBaseVar(inputVars, 'themeRadius', formField?.border?.radius);
  setBaseVar(inputVars, 'themePadding', formField?.padding);
  setBaseVar(inputVars, 'themeGap', formField?.gap);
  setModeVar(inputVars, 'light', 'themeBackground', formBackgroundLight);
  setModeVar(inputVars, 'dark', 'themeBackground', formBackgroundDark);
  setModeVar(inputVars, 'light', 'themeColor', formTextLight);
  setModeVar(inputVars, 'dark', 'themeColor', formTextDark);
  setModeVar(inputVars, 'light', 'themeBorderColor', formField?.border?.color?.light);
  setModeVar(inputVars, 'dark', 'themeBorderColor', formField?.border?.color?.dark);
  setModeVar(inputVars, 'light', 'themeBorderColorFocus', formField?.border?.focusColor?.light);
  setModeVar(inputVars, 'dark', 'themeBorderColorFocus', formField?.border?.focusColor?.dark);
  setModeVar(inputVars, 'light', 'themeFocusRing', formField?.focusRing?.light);
  setModeVar(inputVars, 'dark', 'themeFocusRing', formField?.focusRing?.dark);
  setModeVar(inputVars, 'light', 'themePlaceholderColor', formField?.placeholderColor?.light);
  setModeVar(inputVars, 'dark', 'themePlaceholderColor', formField?.placeholderColor?.dark);

  if (hasVars(inputVars)) {
    overrides['gp-input-text'] = { vars: inputVars };
  }

  const passwordVars: ComponentVarsDefinition = {};
  setBaseVar(passwordVars, 'themeBorderWidth', formField?.border?.width);
  setBaseVar(passwordVars, 'themeGap', formField?.gap);
  setBaseVar(passwordVars, 'themePadding', formField?.padding);
  setBaseVar(passwordVars, 'themeRadius', formField?.border?.radius);
  setModeVar(passwordVars, 'light', 'themeBackground', formBackgroundLight);
  setModeVar(passwordVars, 'dark', 'themeBackground', formBackgroundDark);
  setModeVar(passwordVars, 'light', 'themeColor', formTextLight);
  setModeVar(passwordVars, 'dark', 'themeColor', formTextDark);
  setModeVar(passwordVars, 'light', 'themeBorderColor', formField?.border?.color?.light);
  setModeVar(passwordVars, 'dark', 'themeBorderColor', formField?.border?.color?.dark);
  setModeVar(passwordVars, 'light', 'themeFocusBorderColor', formField?.border?.focusColor?.light);
  setModeVar(passwordVars, 'dark', 'themeFocusBorderColor', formField?.border?.focusColor?.dark);
  setModeVar(passwordVars, 'light', 'themeFocusRing', formField?.focusRing?.light);
  setModeVar(passwordVars, 'dark', 'themeFocusRing', formField?.focusRing?.dark);

  if (hasVars(passwordVars)) {
    overrides['gp-password'] = { vars: passwordVars };
  }

  const labelVars: ComponentVarsDefinition = {};
  setBaseVar(labelVars, 'themeGap', label?.gap);
  setBaseVar(labelVars, 'themeFontSize', label?.fontSize);
  setBaseVar(labelVars, 'themeFontWeight', label?.fontWeight);
  setBaseVar(labelVars, 'themeTextTransform', label?.textTransform);
  setBaseVar(labelVars, 'themeLetterSpacing', label?.letterSpacing);
  setModeVar(labelVars, 'light', 'themeColor', label?.color?.light);
  setModeVar(labelVars, 'dark', 'themeColor', label?.color?.dark);
  setModeVar(labelVars, 'light', 'themeRequiredColor', label?.requiredColor?.light);
  setModeVar(labelVars, 'dark', 'themeRequiredColor', label?.requiredColor?.dark);

  if (hasVars(labelVars)) {
    overrides['gp-label'] = { vars: labelVars };
  }

  const themeSwitcherVars: ComponentVarsDefinition = {};
  setBaseVar(themeSwitcherVars, 'themeGap', themeSwitcher?.gap);
  setBaseVar(themeSwitcherVars, 'themeControlGap', themeSwitcher?.controlGap);
  setModeVar(themeSwitcherVars, 'light', 'themeLabelColor', themeSwitcher?.labelColor?.light);
  setModeVar(themeSwitcherVars, 'dark', 'themeLabelColor', themeSwitcher?.labelColor?.dark);
  setBaseVar(themeSwitcherVars, 'themeSelectRadius', themeSwitcher?.select?.radius);
  setBaseVar(themeSwitcherVars, 'themeSelectPadding', themeSwitcher?.select?.padding);
  setModeVar(
    themeSwitcherVars,
    'light',
    'themeSelectBackground',
    themeSwitcher?.select?.background?.light,
  );
  setModeVar(
    themeSwitcherVars,
    'dark',
    'themeSelectBackground',
    themeSwitcher?.select?.background?.dark,
  );
  setModeVar(themeSwitcherVars, 'light', 'themeSelectBorder', themeSwitcher?.select?.border?.light);
  setModeVar(themeSwitcherVars, 'dark', 'themeSelectBorder', themeSwitcher?.select?.border?.dark);
  setModeVar(themeSwitcherVars, 'light', 'themeSelectColor', themeSwitcher?.select?.color?.light);
  setModeVar(themeSwitcherVars, 'dark', 'themeSelectColor', themeSwitcher?.select?.color?.dark);
  setModeVar(
    themeSwitcherVars,
    'light',
    'themeSelectFocusBorder',
    themeSwitcher?.select?.focusBorder?.light,
  );
  setModeVar(
    themeSwitcherVars,
    'dark',
    'themeSelectFocusBorder',
    themeSwitcher?.select?.focusBorder?.dark,
  );
  setModeVar(
    themeSwitcherVars,
    'light',
    'themeSelectFocusRing',
    themeSwitcher?.select?.focusRing?.light,
  );
  setModeVar(
    themeSwitcherVars,
    'dark',
    'themeSelectFocusRing',
    themeSwitcher?.select?.focusRing?.dark,
  );

  if (hasVars(themeSwitcherVars)) {
    overrides['gp-theme-switcher'] = { vars: themeSwitcherVars };
  }

  const iconVars: ComponentVarsDefinition = {};
  setBaseVar(iconVars, 'size', icon?.size);
  setBaseVar(iconVars, 'strokeWidth', icon?.strokeWidth?.default);
  setModeVar(iconVars, 'light', 'color', icon?.color?.light);
  setModeVar(iconVars, 'dark', 'color', icon?.color?.dark);
  setModeVar(iconVars, 'light', 'strokeWidth', icon?.strokeWidth?.light);
  setModeVar(iconVars, 'dark', 'strokeWidth', icon?.strokeWidth?.dark);

  if (hasVars(iconVars)) {
    overrides['gp-icon-base'] = { vars: iconVars };
  }

  return overrides;
}

function resolveSurfaceColor(schema: SemanticRecord | undefined): StyleValue | undefined {
  if (!schema) {
    return undefined;
  }

  return schema.surfaceColor ?? schema.backgroundColor ?? schema.color;
}

function mergeOverrides(
  ...overrides: Array<ComponentThemeOverrides | undefined>
): ComponentThemeOverrides {
  return overrides.reduce<ComponentThemeOverrides>((accumulator, override) => {
    if (!override) {
      return accumulator;
    }

    Object.entries(override).forEach(([componentName, definition]) => {
      const existing = accumulator[componentName];
      accumulator[componentName] = mergeComponentStyleConfig(existing, definition);
    });

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

  if (existing.host || incoming.host) {
    merged.host = {
      ...(existing.host ?? {}),
      ...(incoming.host ?? {}),
    };
  }

  const mergedVars = mergeComponentVars(existing.vars, incoming.vars);
  if (mergedVars) {
    merged.vars = mergedVars;
  }

  if (existing.classes || incoming.classes) {
    const classes = new Set<string>([...(existing.classes ?? []), ...(incoming.classes ?? [])]);
    merged.classes = Array.from(classes);
  }

  const cssSegments = [existing.css, incoming.css].filter(Boolean);
  if (cssSegments.length) {
    merged.css = cssSegments.join('\n');
  }

  return merged;
}

function cloneComponentStyleConfig(config: ComponentStyleConfig): ComponentStyleConfig {
  return {
    host: config.host ? { ...config.host } : undefined,
    vars: config.vars ? cloneComponentVars(config.vars) : undefined,
    classes: config.classes ? [...config.classes] : undefined,
    css: config.css,
  };
}

function convertComponentDefinitions(
  components: Record<ComponentName, GpComponentThemeDefinition | undefined> | undefined,
): ComponentThemeOverrides {
  if (!components) {
    return {};
  }

  return Object.entries(components).reduce<ComponentThemeOverrides>(
    (accumulator, [componentName, definition]) => {
      if (!definition) {
        return accumulator;
      }

      accumulator[componentName] = {
        host: definition.host ? { ...definition.host } : undefined,
        vars: definition.vars ? cloneComponentVars(definition.vars) : undefined,
        classes: definition.classes ? [...definition.classes] : undefined,
        css: definition.css,
      };

      return accumulator;
    },
    {},
  );
}

function setBaseVar(
  vars: ComponentVarsDefinition,
  key: string,
  value: StyleValue | undefined,
): void {
  if (value === undefined || value === null) {
    return;
  }

  vars[key] = value;
}

function setModeVar(
  vars: ComponentVarsDefinition,
  mode: ModeKey,
  key: string,
  value: StyleValue | undefined,
): void {
  if (value === undefined || value === null) {
    return;
  }

  const bucket = (vars[mode] as Record<string, StyleValue>) ?? {};
  bucket[key] = value;
  vars[mode] = bucket;
}

function hasVars(vars: ComponentVarsDefinition): boolean {
  return Object.entries(vars).some(([key, value]) => {
    if (value === undefined || value === null) {
      return false;
    }

    if (key === 'default' || key === 'light' || key === 'dark') {
      return Object.keys(value as Record<string, StyleValue>).length > 0;
    }

    return true;
  });
}
