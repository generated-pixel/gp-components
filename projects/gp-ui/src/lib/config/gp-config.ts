import { Subject } from 'rxjs'
import { Injectable, signal } from '@angular/core'
import { GpConfigType } from './gp-config.type'
import { Translations } from '../api/translations'
import type { ComponentStyleConfig, ComponentThemeOverrides } from '../base/style/base.style'

@Injectable({ providedIn: 'root' })
export class GpConfig {
  public translations: Translations = {
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    weak: 'Weak',
    medium: 'Medium',
    strong: 'Strong',
    passwordPrompt: 'Enter a password',
  }

  csp = signal<{ nonce: string | undefined }>({ nonce: undefined })

  theme = signal<ComponentThemeOverrides>({})

  private readonly translationSource = new Subject<any>()
  public translationObservable = this.translationSource.asObservable()

  private readonly themeSource = new Subject<ComponentThemeOverrides>()
  public themeObservable = this.themeSource.asObservable()

  getTranslation(key: string): any {
    return this.translations[key as keyof typeof this.translations]
  }

  setTranslations(translation: Translations): void {
    this.translations = { ...this.translations, ...translation }
    this.translationSource.next(this.translations)
  }

  getComponentTheme<T extends ComponentStyleConfig>(componentName: string): Partial<T> {
    const theme = this.theme()[componentName]
    return theme ? ({ ...theme } as Partial<T>) : {}
  }

  setTheme(theme: ComponentThemeOverrides): void {
    if (!theme) {
      return
    }

    const current = this.theme()
    const next = { ...current } as ComponentThemeOverrides

    Object.entries(theme).forEach(([componentName, definition]) => {
      const existing = current[componentName]
      next[componentName] = mergeComponentStyleConfig(existing, definition)
    })

    this.theme.set(next)
    this.themeSource.next(this.theme())
  }

  setConfig(config: GpConfigType) {
    const { translations, theme } = config || {}

    if (translations) {
      this.setTranslations(translations)
    }

    if (theme) {
      this.setTheme(theme)
    }
  }
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
  const vars = existing.vars || incoming.vars ? { ...(existing.vars ?? {}), ...(incoming.vars ?? {}) } : undefined

  const classes =
    existing.classes || incoming.classes
      ? Array.from(new Set([...(existing.classes ?? []), ...(incoming.classes ?? [])]))
      : undefined

  const css = [existing.css, incoming.css].filter(Boolean).join('\n')

  if (host && Object.keys(host).length) {
    merged.host = host
  }

  if (vars && Object.keys(vars).length) {
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
