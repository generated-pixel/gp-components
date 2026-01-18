import { DOCUMENT } from '@angular/common'
import { inject, Injectable, Renderer2 } from '@angular/core'
import { GpConfig } from '../../config/gp-config'

export type StyleValue = string | number

export interface ComponentStyleConfig {
  classes?: string[]
  host?: Record<string, StyleValue>
  vars?: Record<string, StyleValue>
  css?: string
}

export type ComponentThemeOverrides = Record<string, ComponentStyleConfig>

export interface ComponentStyleHandle {
  destroy(): void
}

@Injectable()
export abstract class BaseStyle<TTheme extends ComponentStyleConfig = ComponentStyleConfig> {
  protected readonly document = inject(DOCUMENT)
  protected readonly config = inject(GpConfig)

  private readonly appliedClasses = new Set<string>()
  private readonly appliedHostStyles = new Map<string, string>()
  private readonly appliedVars = new Map<string, string>()
  private styleElement?: HTMLStyleElement

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
    const applyTheme = () => this.apply(host, renderer, overrides)

    applyTheme()

    const subscription = this.config.themeObservable.subscribe(() => {
      applyTheme()
    })

    return {
      destroy: () => {
        subscription.unsubscribe()
      },
    }
  }

  private apply(host: HTMLElement, renderer: Renderer2, overrides?: Partial<TTheme>): void {
    const theme = this.resolveTheme(overrides)

    this.applyClasses(host, renderer, theme.classes)
    this.applyHostStyles(host, renderer, theme.host)
    this.applyVars(host, theme.vars)
    this.ensureGlobalCss(theme.css)
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

  private applyVars(host: HTMLElement, vars?: Record<string, StyleValue>): void {
    const variables = vars ?? {}
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

    if (theme.vars) {
      accumulator.vars = {
        ...(accumulator.vars ?? {}),
        ...theme.vars,
      }
    }

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
