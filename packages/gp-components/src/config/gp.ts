import { Subject } from 'rxjs';
import { Translations } from '../public-api';
import { Injectable } from '@angular/core';
import { GPConfigType } from './gp-config.type';

@Injectable({ providedIn: 'root' })
export class GP {
  public translations: Translations = {
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    weak: 'Weak',
    medium: 'Medium',
    strong: 'Strong',
    passwordPrompt: 'Enter a password',
  };

  private translationSource = new Subject<any>();

  public translationObservable = this.translationSource.asObservable();

  getTranslation(key: string): any {
    return this.translations[key as keyof typeof this.translations];
  }

  setTranslations(translation: Translations): void {
    this.translations = { ...this.translations, ...translation };
    this.translationSource.next(this.translations);
  }

  setConfig(config: GPConfigType) {
    const { translations } = config || {};

    if (translations) {
      this.setTranslations(translations);
    }
  }
}
