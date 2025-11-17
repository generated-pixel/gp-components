# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1] - 2025-11-17

### Added

#### Components
- **InputComponent**: Versatile form input component
  - Support for multiple input types (text, email, password, number, tel, url)
  - Label and placeholder support
  - Required field indication with visual marker (*)
  - Disabled state handling
  - Form control integration via `ControlValueAccessor`
  - Works with both Template-driven and Reactive Forms
  - Tailwind CSS styling with focus states
  - Dark mode support
  - Full accessibility support

- **MenuComponent**: Interactive dropdown menu component
  - Configurable menu items with labels and values
  - Icon support for menu items (emoji or custom icons)
  - Disabled item states
  - Click-outside-to-close functionality
  - Selected item tracking
  - Event emission on item selection
  - Smooth open/close animations
  - Fully styled with Tailwind CSS
  - Dark mode support

- **BlockComponent**: Flexible container/card component
  - Optional title and subtitle
  - Customizable padding (none, sm, md, lg)
  - Customizable shadow (none, sm, md, lg, xl)
  - Customizable border radius (none, sm, md, lg, xl)
  - Optional border
  - Content projection support via `<ng-content>`
  - Dark mode support
  - Perfect for dashboard cards and content containers

#### Documentation
- Comprehensive README.md with installation and basic usage
- Detailed USAGE.md with advanced examples and best practices
- Inline code documentation
- TypeScript interfaces for type safety

#### Demo Application
- Fully functional demo application showcasing all components
- Responsive grid layout
- Professional gradient background
- Interactive examples
- Component feature highlights
- Dark mode support

#### Configuration
- Tailwind CSS v3 integration
- PostCSS configuration
- Angular 20 workspace setup
- Production-ready build configuration
- Tree-shakeable exports

### Technical Details
- Angular 20.3.10
- Standalone components architecture
- TypeScript with strict typing
- ES2022 module format
- Optimized bundle size
- Zero security vulnerabilities (verified with CodeQL)

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

[0.0.1]: https://github.com/generated-pixel/gp-components/releases/tag/v0.0.1
