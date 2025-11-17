import { Subject } from 'rxjs';
import { Translations } from '../public-api';
import { Injectable } from '@angular/core';
import { GPConfigType } from './gp-config.type';

@Injectable({ providedIn: 'root' })
export class GP {
  public translations: { [lang: string]: Translations } = {
    'en-US': {
      showPassword: 'Show password',
      hidePassword: 'Hide password',
      weak: 'Weak',
      medium: 'Medium',
      strong: 'Strong',
      passwordPrompt: 'Enter a password',
    },
  };

  private translationSource = new Subject<any>();

  public translationObservable = this.translationSource.asObservable();

  getTranslation(lang: string, key: string): any {
    let translation: string | undefined =
      this.translations[lang][key as keyof (typeof this.translations)['en-US']];

    if (!translation) {
      translation = this.translations['en-US'][key as keyof (typeof this.translations)['en-US']];
    }

    return translation;
  }

  setTranslations(lang: string, translation: Translations): void {
    if (!this.translations[lang]) {
      this.translations[lang] = this.translations['en-US'];
    }

    this.translations[lang] = translation;

    this.translationSource.next(this.translations);
  }

  setConfig(config: GPConfigType) {
    const { translations } = config || {};

    if (translations) {
      Object.keys(translations).forEach((lang) => {
        this.setTranslations(lang, translations[lang]);
      });
    }
  }
}
