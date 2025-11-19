import { Component } from '@angular/core';
import { GpPasswordModule } from 'gp-components';

@Component({
  selector: 'app-root',
  imports: [GpPasswordModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  title = 'GP Components Demo';
}
