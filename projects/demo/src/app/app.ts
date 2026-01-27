import { Component, signal } from '@angular/core';
import {
  PasswordModule,
  GpConfig,
  ThemeSwitcher,
  ThemeSwitchOption,
  GP_DEFAULT_THEME,
  GP_DEVELOPER_THEME,
  GP_PRIDE_THEME,
} from 'gp-ui';

@Component({
  selector: 'app-root',
  imports: [PasswordModule, ThemeSwitcher],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('demo');
  protected readonly themeOptions = signal<ThemeSwitchOption[]>([
    { id: 'default', translationKey: 'themeDefaultLabel', theme: GP_DEFAULT_THEME },
    { id: 'developer', translationKey: 'themeDeveloperLabel', theme: GP_DEVELOPER_THEME },
    { id: 'pride', translationKey: 'themePrideLabel', theme: GP_PRIDE_THEME },
  ]);

  constructor(private readonly gpConfig: GpConfig) {
    /*
    this.gpConfig.setConfig({
      translations: {
        showPassword: 'Mostrar contraseña',
        hidePassword: 'Ocultar contraseña',
        weak: 'Débil',
        medium: 'Media',
        strong: 'Fuerte',
        passwordPrompt: 'Introduzca una contraseña',
        themeSwitcherLabel: 'Tema',
        themeDefaultLabel: 'Predeterminado',
        themeDeveloperLabel: 'Desarrollador',
        themePrideLabel: 'Orgullo',
      },
      themeId: 'developer',
    })

    */
  }
}
