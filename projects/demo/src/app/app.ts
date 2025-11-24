import { Component, signal } from '@angular/core';
import { PasswordModule } from 'gp-ui';

@Component({
  selector: 'app-root',
  imports: [PasswordModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('demo');
}
