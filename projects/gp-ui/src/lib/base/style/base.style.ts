import { DOCUMENT } from '@angular/common'
import { inject, Injectable, Renderer2 } from '@angular/core'
import { GpConfig } from '../../config/gp-config'

export type StyleValue = string | number

export interface ComponentStyleConfig {
  classes?: string[]
  host?: Record<string, StyleValue>
  vars?: ComponentVarsDefinition
  css?: string
}

export type ComponentThemeOverrides = Record<string, ComponentStyleConfig>

export interface ComponentStyleHandle {
  destroy(): void
}

export type ComponentThemeColorMode = 'light' | 'dark'

export interface ComponentVarsDefinition extends Partial<
  Record<'default' | 'light' | 'dark', Record<string, StyleValue>>
> {
  [key: string]: StyleValue | Record<string, StyleValue> | undefined
}

export interface NormalizedComponentVars {
  base: Record<string, StyleValue>
  default: Record<string, StyleValue>
  light: Record<string, StyleValue>
  dark: Record<string, StyleValue>
}

@Injectable()
export abstract class BaseStyle<TTheme extends ComponentStyleConfig = ComponentStyleConfig> {
  protected readonly document = inject(DOCUMENT)
  protected readonly config = inject(GpConfig)

  private readonly appliedClasses = new Set<string>()
  private readonly appliedHostStyles = new Map<string, string>()
  private readonly appliedVars = new Map<string, string>()
  private styleElement?: HTMLStyleElement
  private mediaQueryList?: MediaQueryList
  private mediaQueryListener?: (event: MediaQueryListEvent) => void

  protected abstract readonly componentName: string

  protected abstract getDefaultTheme(): TTheme

  protected getBaseTheme(): ComponentStyleConfig {
    return {
      host: {
        'box-sizing': 'border-box',
      },
    }
  }

  attach(host: HTMLElement, renderer: Renderer2, overrides?: Partial<TTheme>): ComponentStyleHandle {
    const applyTheme = () => this.apply(host, renderer, overrides, this.resolveEffectiveMode())
    const setupAutoModeListener = () => this.setupMediaQueryListener(applyTheme)

    applyTheme()
    setupAutoModeListener()

    const themeSubscription = this.config.themeObservable.subscribe(() => {
      applyTheme()
    })

    const modeSubscription = this.config.themeModeObservable.subscribe(() => {
      setupAutoModeListener()
      applyTheme()
    })

    return {
      destroy: () => {
        themeSubscription.unsubscribe()
        modeSubscription.unsubscribe()
        this.disposeMediaQueryListener()
      },
    }
  }

  private apply(
    host: HTMLElement,
    renderer: Renderer2,
    overrides: Partial<TTheme> | undefined,
    mode: ComponentThemeColorMode
  ): void {
    const theme = this.resolveTheme(overrides)

    this.applyClasses(host, renderer, theme.classes)
    this.applyHostStyles(host, renderer, theme.host)
    this.applyVars(host, theme.vars, mode)
    this.ensureGlobalCss(theme.css)
  }

  private resolveEffectiveMode(): ComponentThemeColorMode {
    const mode = this.config.themeMode()

    if (mode === 'dark' || mode === 'light') {
      return mode
    }

    const view = this.document.defaultView

    if (view?.matchMedia) {
      return view.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    return 'light'
  }

  private setupMediaQueryListener(onChange: () => void): void {
    this.disposeMediaQueryListener()

    if (this.config.themeMode() !== 'auto') {
      return
    }

    const view = this.document.defaultView

    if (!view?.matchMedia) {
      return
    }

    const query = view.matchMedia('(prefers-color-scheme: dark)')
    const listener = () => onChange()

    if (typeof query.addEventListener === 'function') {
      query.addEventListener('change', listener)
    } else if (typeof query.addListener === 'function') {
      query.addListener(listener)
    }

    this.mediaQueryList = query
    this.mediaQueryListener = listener
  }

  private disposeMediaQueryListener(): void {
    if (!this.mediaQueryList || !this.mediaQueryListener) {
      return
    }

    const query = this.mediaQueryList
    const listener = this.mediaQueryListener

    if (typeof query.removeEventListener === 'function') {
      query.removeEventListener('change', listener)
    } else if (typeof query.removeListener === 'function') {
      query.removeListener(listener)
    }

    this.mediaQueryList = undefined
    this.mediaQueryListener = undefined
  }

  private resolveTheme(overrides?: Partial<TTheme>): ComponentStyleConfig {
    return mergeThemes(
      this.getBaseTheme(),
      this.getDefaultTheme(),
      this.config.getComponentTheme<TTheme>(this.componentName),
      overrides
    )
  }

  private applyClasses(host: HTMLElement, renderer: Renderer2, classes?: string[]): void {
    const next = new Set(classes ?? [])

    for (const existing of Array.from(this.appliedClasses)) {
      if (!next.has(existing)) {
        renderer.removeClass(host, existing)
        this.appliedClasses.delete(existing)
      }
    }

    next.forEach((className) => {
      if (!this.appliedClasses.has(className)) {
        renderer.addClass(host, className)
        this.appliedClasses.add(className)
      }
    })
  }

  private applyHostStyles(host: HTMLElement, renderer: Renderer2, hostStyles?: Record<string, StyleValue>): void {
    const styles = hostStyles ?? {}
    const entries = Object.entries(styles)
    const nextKeys = new Set(entries.map(([key]) => key))

    for (const [key] of Array.from(this.appliedHostStyles.entries())) {
      if (!nextKeys.has(key)) {
        renderer.removeStyle(host, key)
        this.appliedHostStyles.delete(key)
      }
    }

    entries.forEach(([key, value]) => {
      const name = normalizeStyleName(key)
      const valueAsString = String(value)

      if (this.appliedHostStyles.get(name) === valueAsString) {
        return
      }

      renderer.setStyle(host, name, valueAsString)
      this.appliedHostStyles.set(name, valueAsString)
    })
  }

  private applyVars(host: HTMLElement, vars: ComponentVarsDefinition | undefined, mode: ComponentThemeColorMode): void {
    const variables = resolveComponentVarsForMode(vars, mode)
    const entries = Object.entries(variables).map(([key, value]) => [this.toCssVarName(key), value] as const)
    const nextKeys = new Set(entries.map(([key]) => key))

    for (const [key] of Array.from(this.appliedVars.entries())) {
      if (!nextKeys.has(key)) {
        host.style.removeProperty(key)
        this.appliedVars.delete(key)
      }
    }

    entries.forEach(([name, value]) => {
      const valueAsString = String(value)

      if (this.appliedVars.get(name) === valueAsString) {
        return
      }

      host.style.setProperty(name, valueAsString)
      this.appliedVars.set(name, valueAsString)
    })
  }

  private ensureGlobalCss(css?: string): void {
    const nextCss = css?.trim()

    if (!nextCss) {
      this.removeStyleElement()
      return
    }

    if (!this.styleElement) {
      this.styleElement = this.document.head.querySelector(
        `style[data-gp-style="${this.componentName}"]`
      ) as HTMLStyleElement | null

      if (!this.styleElement) {
        this.styleElement = this.document.createElement('style')
        this.styleElement.setAttribute('data-gp-style', this.componentName)
        this.document.head.appendChild(this.styleElement)
      }
    }

    if (this.styleElement.textContent === nextCss) {
      return
    }

    this.styleElement.textContent = nextCss
  }

  private removeStyleElement(): void {
    if (!this.styleElement) {
      return
    }

    this.styleElement.remove()
    this.styleElement = undefined
  }

  private toCssVarName(key: string): string {
    const trimmed = key.trim()

    if (trimmed.startsWith('--')) {
      return trimmed
    }

    return `--${this.componentName}-${toKebabCase(trimmed)}`
  }
}

function mergeThemes(...themes: Array<ComponentStyleConfig | undefined>): ComponentStyleConfig {
  return themes.reduce<ComponentStyleConfig>((accumulator, theme) => {
    if (!theme) {
      return accumulator
    }

    if (theme.host) {
      accumulator.host = {
        ...(accumulator.host ?? {}),
        ...normalizeStyleRecord(theme.host),
      }
    }

    accumulator.vars = mergeComponentVars(accumulator.vars, theme.vars)

    if (theme.classes) {
      const classes = new Set(accumulator.classes ?? [])
      theme.classes.forEach((className) => classes.add(className))
      accumulator.classes = Array.from(classes)
    }

    if (theme.css) {
      accumulator.css = accumulator.css ? `${accumulator.css}\n${theme.css}` : theme.css
    }

    return accumulator
  }, {})
}

export function mergeComponentVars(
  existing?: ComponentVarsDefinition,
  incoming?: ComponentVarsDefinition
): ComponentVarsDefinition | undefined {
  if (!existing) {
    return cloneComponentVars(incoming)
  }

  if (!incoming) {
    return cloneComponentVars(existing)
  }

  const existingNormalized = normalizeComponentVars(existing)
  const incomingNormalized = normalizeComponentVars(incoming)

  return denormalizeComponentVars({
    base: { ...existingNormalized.base, ...incomingNormalized.base },
    default: { ...existingNormalized.default, ...incomingNormalized.default },
    light: { ...existingNormalized.light, ...incomingNormalized.light },
    dark: { ...existingNormalized.dark, ...incomingNormalized.dark },
  })
}

export function cloneComponentVars(vars?: ComponentVarsDefinition): ComponentVarsDefinition | undefined {
  if (!vars) {
    return undefined
  }

  return denormalizeComponentVars(normalizeComponentVars(vars))
}

export function normalizeComponentVars(vars?: ComponentVarsDefinition): NormalizedComponentVars {
  const normalized: NormalizedComponentVars = {
    base: {},
    default: {},
    light: {},
    dark: {},
  }

  if (!vars || typeof vars !== 'object') {
    return normalized
  }

  Object.entries(vars).forEach(([key, value]) => {
    if (key === 'default' || key === 'light' || key === 'dark') {
      if (isStyleRecord(value)) {
        normalized[key] = { ...normalized[key], ...value }
      }

      return
    }

    if (isStyleValuePrimitive(value)) {
      normalized.base[key] = value
    }
  })

  return normalized
}

export function denormalizeComponentVars(vars: NormalizedComponentVars): ComponentVarsDefinition | undefined {
  const result: ComponentVarsDefinition = {}

  Object.entries(vars.base).forEach(([key, value]) => {
    result[key] = value
  })

  if (Object.keys(vars.default).length) {
    result.default = { ...vars.default }
  }

  if (Object.keys(vars.light).length) {
    result.light = { ...vars.light }
  }

  if (Object.keys(vars.dark).length) {
    result.dark = { ...vars.dark }
  }

  return Object.keys(result).length ? result : undefined
}

function resolveComponentVarsForMode(
  vars: ComponentVarsDefinition | undefined,
  mode: ComponentThemeColorMode
): Record<string, StyleValue> {
  const normalized = normalizeComponentVars(vars)

  const modeValues = mode === 'dark' ? normalized.dark : normalized.light

  return {
    ...normalized.base,
    ...normalized.default,
    ...modeValues,
  }
}

function normalizeStyleRecord(styles: Record<string, StyleValue>): Record<string, StyleValue> {
  return Object.entries(styles).reduce<Record<string, StyleValue>>((accumulator, [key, value]) => {
    accumulator[normalizeStyleName(key)] = value
    return accumulator
  }, {})
}

function normalizeStyleName(name: string): string {
  const trimmed = name.trim()

  if (trimmed.startsWith('--')) {
    return trimmed
  }

  return toKebabCase(trimmed)
}

function toKebabCase(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .toLowerCase()
}

function isStyleRecord(value: unknown): value is Record<string, StyleValue> {
  return !!value && typeof value === 'object' && !Array.isArray(value)
}

function isStyleValuePrimitive(value: unknown): value is StyleValue {
  return typeof value === 'string' || typeof value === 'number'
}
