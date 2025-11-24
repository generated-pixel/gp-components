import { Subject } from 'rxjs';
import { Injectable, signal } from '@angular/core';
import { GpConfigType } from './gp-config.type';
import { Translations } from '../api/translations';

@Injectable({ providedIn: 'root' })
export class GpConfig {
  public translations: Translations = {
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    weak: 'Weak',
    medium: 'Medium',
    strong: 'Strong',
    passwordPrompt: 'Enter a password',
  };

  csp = signal<{ nonce: string | undefined }>({ nonce: undefined });

  private readonly translationSource = new Subject<any>();
  public translationObservable = this.translationSource.asObservable();

  getTranslation(key: string): any {
    return this.translations[key as keyof typeof this.translations];
  }

  setTranslations(translation: Translations): void {
    this.translations = { ...this.translations, ...translation };
    this.translationSource.next(this.translations);
  }

  setConfig(config: GpConfigType) {
    const { translations } = config || {};

    if (translations) {
      this.setTranslations(translations);
    }
  }
}
