# GP Components - Usage Guide

This guide provides detailed examples and best practices for using the GP Components library.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Input Component](#input-component)
3. [Menu Component](#menu-component)
4. [Block Component](#block-component)
5. [Styling and Theming](#styling-and-theming)
6. [Best Practices](#best-practices)

## Getting Started

### Prerequisites

- Angular 20 or higher
- Node.js 18 or higher
- npm or yarn

### Installation

```bash
npm install gp-components
npm install -D tailwindcss postcss autoprefixer
```

### Configuration

1. Create or update `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/gp-components/**/*.{html,ts,js,mjs}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

2. Create or update `postcss.config.js`:

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

3. Add Tailwind directives to your `styles.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Input Component

### Basic Usage

```typescript
import { Component } from '@angular/core';
import { InputComponent } from 'gp-components';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [InputComponent],
  template: `
    <gp-input 
      label="Username" 
      placeholder="Enter username..."
      type="text"
      id="username"
    ></gp-input>
  `
})
export class ExampleComponent {}
```

### With Angular Forms

#### Template-Driven Forms

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputComponent } from 'gp-components';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, InputComponent],
  template: `
    <form #form="ngForm" (ngSubmit)="onSubmit()">
      <gp-input 
        label="Email" 
        type="email"
        id="email"
        name="email"
        [(ngModel)]="email"
        [required]="true"
      ></gp-input>
      
      <button type="submit" [disabled]="!form.valid">
        Submit
      </button>
    </form>
  `
})
export class FormComponent {
  email = '';

  onSubmit() {
    console.log('Email:', this.email);
  }
}
```

#### Reactive Forms

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from 'gp-components';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <gp-input 
        label="Email" 
        type="email"
        id="email"
        formControlName="email"
        [required]="true"
      ></gp-input>
      
      <gp-input 
        label="Password" 
        type="password"
        id="password"
        formControlName="password"
        [required]="true"
      ></gp-input>
      
      <button type="submit" [disabled]="!form.valid">
        Submit
      </button>
    </form>
  `
})
export class ReactiveFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form data:', this.form.value);
    }
  }
}
```

### Input Types

```typescript
// Text input
<gp-input type="text" label="Name"></gp-input>

// Email input
<gp-input type="email" label="Email"></gp-input>

// Password input
<gp-input type="password" label="Password"></gp-input>

// Number input
<gp-input type="number" label="Age"></gp-input>

// Telephone input
<gp-input type="tel" label="Phone"></gp-input>

// URL input
<gp-input type="url" label="Website"></gp-input>
```

## Menu Component

### Basic Usage

```typescript
import { Component } from '@angular/core';
import { MenuComponent, MenuItem } from 'gp-components';

@Component({
  selector: 'app-menu-example',
  standalone: true,
  imports: [MenuComponent],
  template: `
    <gp-menu 
      label="Choose a Color"
      placeholder="Select color..."
      [items]="colors"
      (itemSelected)="onColorSelected($event)"
    ></gp-menu>
  `
})
export class MenuExampleComponent {
  colors: MenuItem[] = [
    { label: 'Red', value: '#FF0000', icon: '🔴' },
    { label: 'Green', value: '#00FF00', icon: '🟢' },
    { label: 'Blue', value: '#0000FF', icon: '🔵' },
  ];

  onColorSelected(item: MenuItem) {
    console.log('Selected color:', item.label, item.value);
  }
}
```

### With Icons

```typescript
menuItems: MenuItem[] = [
  { label: 'Dashboard', value: 'dashboard', icon: '📊' },
  { label: 'Settings', value: 'settings', icon: '⚙️' },
  { label: 'Profile', value: 'profile', icon: '👤' },
  { label: 'Logout', value: 'logout', icon: '🚪' },
];
```

### With Disabled Items

```typescript
menuItems: MenuItem[] = [
  { label: 'Active Item', value: '1' },
  { label: 'Another Active', value: '2' },
  { label: 'Disabled Item', value: '3', disabled: true },
  { label: 'Coming Soon', value: '4', disabled: true },
];
```

### Dynamic Menu

```typescript
import { Component } from '@angular/core';
import { MenuComponent, MenuItem } from 'gp-components';

@Component({
  selector: 'app-dynamic-menu',
  standalone: true,
  imports: [MenuComponent],
  template: `
    <gp-menu 
      label="Select Country"
      [items]="countries"
      (itemSelected)="onCountrySelected($event)"
    ></gp-menu>
    
    <div *ngIf="selectedCountry">
      Selected: {{ selectedCountry.label }}
    </div>
  `
})
export class DynamicMenuComponent {
  countries: MenuItem[] = [];
  selectedCountry: MenuItem | null = null;

  ngOnInit() {
    // Simulate loading from API
    this.loadCountries();
  }

  loadCountries() {
    // This could be from an API call
    this.countries = [
      { label: 'United States', value: 'US', icon: '🇺🇸' },
      { label: 'Canada', value: 'CA', icon: '🇨🇦' },
      { label: 'United Kingdom', value: 'UK', icon: '🇬🇧' },
      { label: 'Germany', value: 'DE', icon: '🇩🇪' },
    ];
  }

  onCountrySelected(item: MenuItem) {
    this.selectedCountry = item;
  }
}
```

## Block Component

### Basic Usage

```typescript
import { Component } from '@angular/core';
import { BlockComponent } from 'gp-components';

@Component({
  selector: 'app-block-example',
  standalone: true,
  imports: [BlockComponent],
  template: `
    <gp-block 
      title="Welcome" 
      subtitle="Get started with our platform"
    >
      <p>This is the content inside the block.</p>
    </gp-block>
  `
})
export class BlockExampleComponent {}
```

### Card with Different Styles

```typescript
// Minimal card
<gp-block padding="sm" shadow="sm" rounded="md">
  <p>Minimal card content</p>
</gp-block>

// Default card
<gp-block title="Title" padding="md" shadow="md" rounded="lg">
  <p>Default card content</p>
</gp-block>

// Prominent card
<gp-block 
  title="Important" 
  subtitle="This stands out"
  padding="lg" 
  shadow="xl" 
  rounded="xl"
>
  <p>Prominent card content</p>
</gp-block>

// Borderless card
<gp-block [border]="false" shadow="md">
  <p>Card without border</p>
</gp-block>
```

### Nested Blocks

```typescript
<gp-block title="Parent Block" padding="lg" shadow="lg">
  <div class="space-y-4">
    <gp-block title="Child Block 1" padding="sm" shadow="sm">
      <p>Nested content 1</p>
    </gp-block>
    
    <gp-block title="Child Block 2" padding="sm" shadow="sm">
      <p>Nested content 2</p>
    </gp-block>
  </div>
</gp-block>
```

### Dashboard Layout

```typescript
import { Component } from '@angular/core';
import { BlockComponent } from 'gp-components';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BlockComponent],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <gp-block title="Total Users" padding="md" shadow="md">
        <div class="text-3xl font-bold">1,234</div>
        <div class="text-sm text-gray-600">+12% from last month</div>
      </gp-block>
      
      <gp-block title="Revenue" padding="md" shadow="md">
        <div class="text-3xl font-bold">$12,345</div>
        <div class="text-sm text-gray-600">+8% from last month</div>
      </gp-block>
      
      <gp-block title="Active Sessions" padding="md" shadow="md">
        <div class="text-3xl font-bold">567</div>
        <div class="text-sm text-gray-600">+15% from last hour</div>
      </gp-block>
    </div>
  `
})
export class DashboardComponent {}
```

## Styling and Theming

### Dark Mode

All components support dark mode automatically when you have Tailwind's dark mode configured:

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class', // or 'media'
  // ... rest of config
}
```

Toggle dark mode:

```typescript
// In your component or service
document.documentElement.classList.toggle('dark');
```

### Custom Colors

You can extend Tailwind's theme to use custom colors:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          // ... more shades
          900: '#0c4a6e',
        }
      }
    }
  }
}
```

Then use in your templates:

```html
<div class="text-primary-600 bg-primary-50">
  Custom colored content
</div>
```

## Best Practices

### 1. Component Organization

Group related components together:

```typescript
import { Component } from '@angular/core';
import { InputComponent, MenuComponent, BlockComponent } from 'gp-components';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [InputComponent, MenuComponent, BlockComponent],
  // ... rest
})
```

### 2. Form Validation

Always provide user feedback for validation:

```typescript
<gp-input 
  label="Email"
  type="email"
  [required]="true"
  formControlName="email"
></gp-input>

<div *ngIf="form.get('email')?.invalid && form.get('email')?.touched">
  <span class="text-red-500 text-sm">Please enter a valid email</span>
</div>
```

### 3. Accessibility

Always provide labels and IDs:

```typescript
<gp-input 
  label="Username"
  id="username"
  placeholder="Enter username"
></gp-input>
```

### 4. Responsive Design

Use Tailwind's responsive classes with blocks:

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <gp-block>Content 1</gp-block>
  <gp-block>Content 2</gp-block>
  <gp-block>Content 3</gp-block>
</div>
```

### 5. Performance

When dealing with large lists in menus, consider implementing virtual scrolling:

```typescript
// For large datasets, consider pagination or search functionality
menuItems = this.largeDataset.slice(0, 50); // Limit initial items
```

## Troubleshooting

### Styles Not Applying

1. Ensure Tailwind CSS is properly configured
2. Check that your `tailwind.config.js` includes the library path
3. Verify PostCSS configuration is correct

### Dark Mode Not Working

1. Ensure `darkMode` is configured in `tailwind.config.js`
2. Add the `dark` class to your HTML element
3. Check that dark mode variants are included in your content paths

### Form Controls Not Working

1. Ensure you're importing the correct Angular forms module
2. Verify that `ControlValueAccessor` is properly implemented
3. Check that `formControlName` or `ngModel` is correctly set

## Support

For issues, questions, or contributions, please visit:
https://github.com/generated-pixel/gp-components
