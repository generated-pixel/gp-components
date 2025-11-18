import { Component } from '@angular/core';
import { PasswordModule } from 'gp-components';

@Component({
  selector: 'app-root',
  imports: [PasswordModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  title = 'GP Components Demo';
}
