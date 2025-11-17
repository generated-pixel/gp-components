import { Component, Input } from '@angular/core';

@Component({
  selector: 'gp-block',
  imports: [],
  templateUrl: './block.html',
  styleUrl: './block.css',
})
export class BlockComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() padding: 'none' | 'sm' | 'md' | 'lg' = 'md';
  @Input() shadow: 'none' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() rounded: 'none' | 'sm' | 'md' | 'lg' | 'xl' = 'lg';
  @Input() border = true;

  get paddingClass(): string {
    const paddingMap = {
      'none': 'p-0',
      'sm': 'p-2',
      'md': 'p-4',
      'lg': 'p-6'
    };
    return paddingMap[this.padding];
  }

  get shadowClass(): string {
    const shadowMap = {
      'none': 'shadow-none',
      'sm': 'shadow-sm',
      'md': 'shadow-md',
      'lg': 'shadow-lg',
      'xl': 'shadow-xl'
    };
    return shadowMap[this.shadow];
  }

  get roundedClass(): string {
    const roundedMap = {
      'none': 'rounded-none',
      'sm': 'rounded-sm',
      'md': 'rounded-md',
      'lg': 'rounded-lg',
      'xl': 'rounded-xl'
    };
    return roundedMap[this.rounded];
  }
}
