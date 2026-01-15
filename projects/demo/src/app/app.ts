import { Component, signal } from '@angular/core';
import { PasswordModule, GpConfig } from 'gp-ui';

@Component({
  selector: 'app-root',
  imports: [PasswordModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('demo');

  constructor(private readonly gpConfig: GpConfig) {
    this.gpConfig.setTranslations({
      showPassword: 'Mostrar contraseña',
      hidePassword: 'Ocultar contraseña',
      weak: 'Débil',
      medium: 'Media',
      strong: 'Fuerte',
      passwordPrompt: 'Introduzca una contraseña',
    });
  }
}
