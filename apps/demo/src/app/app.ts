import { Component } from '@angular/core';
import { InputComponent, MenuComponent, BlockComponent } from 'gp-components';

@Component({
  selector: 'app-root',
  imports: [InputComponent, MenuComponent, BlockComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  title = 'GP Components Demo';
}
