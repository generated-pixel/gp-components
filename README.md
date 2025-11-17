# GP Components

Angular 20 component library for all sorts of inputs, menus, and blocks. Built with Tailwind CSS.

## Overview

GP Components is a modern, lightweight Angular component library that provides reusable UI components styled with Tailwind CSS. The library includes:

- **Input Components**: Various input types (text, email, password, number, tel, url) with built-in styling and form control support
- **Menu Components**: Dropdown menus with icons, disabled states, and customizable options
- **Block Components**: Container/card components with customizable padding, shadows, and borders

## Screenshots

### Main Demo
![GP Components Demo](https://github.com/user-attachments/assets/4fffa968-3841-4bef-b3b5-ec5d7f708f88)

### Menu Dropdown
![Menu Component in Action](https://github.com/user-attachments/assets/a898516b-ffbd-4c71-b0a2-af7486d4a6f7)

## Installation

1. Install the library:
```bash
npm install gp-components
```

2. Install Tailwind CSS dependencies:
```bash
npm install -D tailwindcss postcss autoprefixer
```

3. Configure Tailwind CSS in your `tailwind.config.js`:
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

4. Add Tailwind directives to your global styles:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Usage

### Input Component

```typescript
import { InputComponent } from 'gp-components';

@Component({
  selector: 'app-example',
  imports: [InputComponent],
  template: `
    <gp-input 
      label="Email Address" 
      placeholder="your@email.com" 
      type="email"
      id="email-input"
      [required]="true"
    ></gp-input>
  `
})
export class ExampleComponent {}
```

**Properties:**
- `type`: Input type (text, email, password, number, tel, url)
- `label`: Label text for the input
- `placeholder`: Placeholder text
- `id`: Input ID attribute
- `required`: Whether the field is required
- `disabled`: Whether the input is disabled

The input component implements `ControlValueAccessor` and works with Angular Forms.

### Menu Component

```typescript
import { MenuComponent, MenuItem } from 'gp-components';

@Component({
  selector: 'app-example',
  imports: [MenuComponent],
  template: `
    <gp-menu 
      label="Select an Option"
      placeholder="Choose from menu..."
      [items]="menuItems"
      (itemSelected)="onItemSelected($event)"
    ></gp-menu>
  `
})
export class ExampleComponent {
  menuItems: MenuItem[] = [
    { label: 'Option 1', value: '1', icon: '📄' },
    { label: 'Option 2', value: '2', icon: '📁' },
    { label: 'Disabled', value: '3', disabled: true }
  ];

  onItemSelected(item: MenuItem) {
    console.log('Selected:', item);
  }
}
```

**Properties:**
- `items`: Array of menu items
- `label`: Label text for the menu
- `placeholder`: Placeholder text when no item is selected
- `itemSelected`: Event emitter when an item is selected

**MenuItem Interface:**
```typescript
interface MenuItem {
  label: string;
  value: any;
  icon?: string;
  disabled?: boolean;
}
```

### Block Component

```typescript
import { BlockComponent } from 'gp-components';

@Component({
  selector: 'app-example',
  imports: [BlockComponent],
  template: `
    <gp-block 
      title="Card Title" 
      subtitle="Card subtitle"
      padding="lg"
      shadow="md"
      rounded="lg"
      [border]="true"
    >
      <p>Your content here</p>
    </gp-block>
  `
})
export class ExampleComponent {}
```

**Properties:**
- `title`: Block title
- `subtitle`: Block subtitle
- `padding`: Padding size (none, sm, md, lg)
- `shadow`: Shadow size (none, sm, md, lg, xl)
- `rounded`: Border radius (none, sm, md, lg, xl)
- `border`: Whether to show border (default: true)

## Development

### Build the Library

```bash
ng build gp-components
```

### Run Demo Application

```bash
ng serve demo
```

Navigate to `http://localhost:4200/` to see the demo.

### Run Tests

```bash
ng test gp-components
```

## Features

- ✅ Angular 20 compatible
- ✅ Standalone components
- ✅ Tailwind CSS styling
- ✅ Dark mode support
- ✅ Responsive design
- ✅ TypeScript support
- ✅ Form control integration
- ✅ Accessibility features

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
