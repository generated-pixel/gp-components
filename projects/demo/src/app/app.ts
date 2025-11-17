import { Component } from '@angular/core';
import { InputComponent, MenuComponent, BlockComponent, MenuItem } from 'gp-components';

@Component({
  selector: 'app-root',
  imports: [InputComponent, MenuComponent, BlockComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'GP Components Demo';
  
  menuItems: MenuItem[] = [
    { label: 'Option 1', value: '1', icon: '📄' },
    { label: 'Option 2', value: '2', icon: '📁' },
    { label: 'Option 3', value: '3', icon: '📋' },
    { label: 'Disabled Option', value: '4', icon: '🚫', disabled: true },
  ];

  onMenuItemSelected(item: MenuItem): void {
    console.log('Selected item:', item);
  }
}
