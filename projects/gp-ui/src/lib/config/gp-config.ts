import { Subject } from 'rxjs'
import { inject, Injectable, signal } from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { GpConfigType } from './gp-config.type'
import { Translations } from '../api/translations'
import { ComponentStyleConfig, ComponentThemeOverrides, mergeComponentVars } from '../base/style/base.style'

export type ThemeMode = 'auto' | 'light' | 'dark'

@Injectable({ providedIn: 'root' })
export class GpConfig {
  private readonly document = inject(DOCUMENT)

  public translations: Translations = {
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    weak: 'Weak',
    medium: 'Medium',
    strong: 'Strong',
    passwordPrompt: 'Enter a password',
    themeSwitcherLabel: 'Theme',
    themeDefaultLabel: 'Default',
    themeDeveloperLabel: 'Developer',
    themePrideLabel: 'Pride Month',
    themeModeLabel: 'Color mode',
    themeModeAutoLabel: 'Automatic',
    themeModeLightLabel: 'Light',
    themeModeDarkLabel: 'Dark',
  }

  csp = signal<{ nonce: string | undefined }>({ nonce: undefined })

  theme = signal<ComponentThemeOverrides>({})
  themeId = signal<string | undefined>(undefined)
  themeMode = signal<ThemeMode>('auto')

  private readonly translationSource = new Subject<any>()
  public translationObservable = this.translationSource.asObservable()

  private readonly themeSource = new Subject<ComponentThemeOverrides>()
  public themeObservable = this.themeSource.asObservable()

  private readonly themeIdSource = new Subject<string | undefined>()
  public themeIdObservable = this.themeIdSource.asObservable()

  private readonly themeModeSource = new Subject<ThemeMode>()
  public themeModeObservable = this.themeModeSource.asObservable()

  constructor() {
    this.applyThemeModeToDocument(this.themeMode())
  }

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

  replaceTheme(theme: ComponentThemeOverrides | undefined): void {
    const next: ComponentThemeOverrides = {}

    if (theme) {
      Object.entries(theme).forEach(([componentName, definition]) => {
        next[componentName] = mergeComponentStyleConfig(undefined, definition)
      })
    }

    this.theme.set(next)
    this.themeSource.next(this.theme())
  }

  setThemeId(themeId: string | undefined): void {
    this.themeId.set(themeId)
    this.themeIdSource.next(themeId)
  }

  setThemeMode(mode: ThemeMode): void {
    if (!mode) {
      return
    }

    this.themeMode.set(mode)
    this.themeModeSource.next(mode)
    this.applyThemeModeToDocument(mode)
  }

  setConfig(config: GpConfigType) {
    const { translations, theme, themeId, themeMode } = config || {}

    if (translations) {
      this.setTranslations(translations)
    }

    if (theme) {
      this.setTheme(theme)
    }

    if (themeId) {
      this.setThemeId(themeId)
    }

    if (themeMode) {
      this.setThemeMode(themeMode)
    }
  }

  private applyThemeModeToDocument(mode: ThemeMode): void {
    const doc = this.document

    if (!doc) {
      return
    }

    const root = doc.documentElement

    if (!root) {
      return
    }

    if (mode === 'auto') {
      root.removeAttribute('data-gp-theme-mode')
      root.style.removeProperty('color-scheme')
      return
    }

    root.setAttribute('data-gp-theme-mode', mode)
    root.style.setProperty('color-scheme', mode === 'dark' ? 'dark' : 'light')
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
