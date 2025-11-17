import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MenuItem {
  label: string;
  value: any;
  icon?: string;
  disabled?: boolean;
}

@Component({
  selector: 'gp-menu',
  imports: [CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class MenuComponent {
  @Input() items: MenuItem[] = [];
  @Input() label = 'Select an option';
  @Input() placeholder = 'Choose...';
  @Output() itemSelected = new EventEmitter<MenuItem>();

  isOpen = false;
  selectedItem: MenuItem | null = null;

  constructor(private elementRef: ElementRef) {}

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  selectItem(item: MenuItem): void {
    if (item.disabled) return;
    this.selectedItem = item;
    this.isOpen = false;
    this.itemSelected.emit(item);
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
