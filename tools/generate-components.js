#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// Component definitions grouped by category
const components = {
  inputs: [
    { name: 'AutoComplete', selector: 'gp-auto-complete', extends: 'BaseInput', category: 'form' },
    { name: 'CascadeSelect', selector: 'gp-cascade-select', extends: 'BaseInput', category: 'form' },
    { name: 'Checkbox', selector: 'gp-checkbox', extends: 'BaseEditable', category: 'form' },
    { name: 'DatePicker', selector: 'gp-date-picker', extends: 'BaseInput', category: 'form' },
    { name: 'InputGroup', selector: 'gp-input-group', extends: 'Base', category: 'layout' },
    { name: 'InputMask', selector: 'gp-input-mask', extends: 'BaseInput', category: 'form' },
    { name: 'InputNumber', selector: 'gp-input-number', extends: 'BaseInput', category: 'form' },
    { name: 'InputOtp', selector: 'gp-input-otp', extends: 'BaseInput', category: 'form' },
    { name: 'Listbox', selector: 'gp-listbox', extends: 'BaseInput', category: 'form' },
    { name: 'MultiSelect', selector: 'gp-multi-select', extends: 'BaseInput', category: 'form' },
    { name: 'RadioButton', selector: 'gp-radio-button', extends: 'BaseEditable', category: 'form' },
    { name: 'Select', selector: 'gp-select', extends: 'BaseInput', category: 'form' },
    { name: 'SelectButton', selector: 'gp-select-button', extends: 'BaseEditable', category: 'form' },
    { name: 'Slider', selector: 'gp-slider', extends: 'BaseInput', category: 'form' },
    { name: 'Textarea', selector: 'gp-textarea', extends: 'BaseInput', category: 'form' },
    { name: 'ToggleButton', selector: 'gp-toggle-button', extends: 'BaseEditable', category: 'form' },
    { name: 'ToggleSwitch', selector: 'gp-toggle-switch', extends: 'BaseEditable', category: 'form' },
  ],
  buttons: [
    { name: 'Button', selector: 'gp-button', extends: 'Base', category: 'action' },
    { name: 'SpeedDial', selector: 'gp-speed-dial', extends: 'Base', category: 'action' },
    { name: 'SplitButton', selector: 'gp-split-button', extends: 'Base', category: 'action' },
  ],
  dataDisplay: [
    { name: 'DataView', selector: 'gp-data-view', extends: 'Base', category: 'display' },
    { name: 'OrderList', selector: 'gp-order-list', extends: 'Base', category: 'display' },
    { name: 'OrgChart', selector: 'gp-org-chart', extends: 'Base', category: 'display' },
    { name: 'Paginator', selector: 'gp-paginator', extends: 'Base', category: 'display' },
    { name: 'PickList', selector: 'gp-pick-list', extends: 'Base', category: 'display' },
    { name: 'Table', selector: 'gp-table', extends: 'Base', category: 'display' },
    { name: 'Timeline', selector: 'gp-timeline', extends: 'Base', category: 'display' },
    { name: 'Tree', selector: 'gp-tree', extends: 'Base', category: 'display' },
    { name: 'TreeTable', selector: 'gp-tree-table', extends: 'Base', category: 'display' },
  ],
  layout: [
    { name: 'Accordion', selector: 'gp-accordion', extends: 'Base', category: 'layout' },
    { name: 'Card', selector: 'gp-card', extends: 'Base', category: 'layout' },
    { name: 'Divider', selector: 'gp-divider', extends: 'Base', category: 'layout' },
    { name: 'Fieldset', selector: 'gp-fieldset', extends: 'Base', category: 'layout' },
    { name: 'ScrollPanel', selector: 'gp-scroll-panel', extends: 'Base', category: 'layout' },
    { name: 'Splitter', selector: 'gp-splitter', extends: 'Base', category: 'layout' },
    { name: 'Stepper', selector: 'gp-stepper', extends: 'Base', category: 'layout' },
    { name: 'Tabs', selector: 'gp-tabs', extends: 'Base', category: 'layout' },
    { name: 'Toolbar', selector: 'gp-toolbar', extends: 'Base', category: 'layout' },
  ],
  navigation: [
    { name: 'Breadcrumb', selector: 'gp-breadcrumb', extends: 'Base', category: 'navigation' },
    { name: 'ContextMenu', selector: 'gp-context-menu', extends: 'Base', category: 'navigation' },
    { name: 'Menu', selector: 'gp-menu', extends: 'Base', category: 'navigation' },
    { name: 'Menubar', selector: 'gp-menubar', extends: 'Base', category: 'navigation' },
    { name: 'MegaMenu', selector: 'gp-mega-menu', extends: 'Base', category: 'navigation' },
    { name: 'PanelMenu', selector: 'gp-panel-menu', extends: 'Base', category: 'navigation' },
    { name: 'TieredMenu', selector: 'gp-tiered-menu', extends: 'Base', category: 'navigation' },
  ],
  overlay: [
    { name: 'ConfirmPopup', selector: 'gp-confirm-popup', extends: 'Base', category: 'overlay' },
    { name: 'Dialog', selector: 'gp-dialog', extends: 'Base', category: 'overlay' },
    { name: 'Drawer', selector: 'gp-drawer', extends: 'Base', category: 'overlay' },
  ],
  messaging: [
    { name: 'Message', selector: 'gp-message', extends: 'Base', category: 'messaging' },
    { name: 'Toast', selector: 'gp-toast', extends: 'Base', category: 'messaging' },
    { name: 'Upload', selector: 'gp-upload', extends: 'BaseInput', category: 'form' },
  ],
  feedback: [
    { name: 'Avatar', selector: 'gp-avatar', extends: 'Base', category: 'media' },
    { name: 'Badge', selector: 'gp-badge', extends: 'Base', category: 'media' },
    { name: 'Carousel', selector: 'gp-carousel', extends: 'Base', category: 'media' },
    { name: 'Chip', selector: 'gp-chip', extends: 'Base', category: 'media' },
    { name: 'Image', selector: 'gp-image', extends: 'Base', category: 'media' },
    { name: 'MeterGroup', selector: 'gp-meter-group', extends: 'Base', category: 'feedback' },
    { name: 'ProgressBar', selector: 'gp-progress-bar', extends: 'Base', category: 'feedback' },
    { name: 'ProgressSpinner', selector: 'gp-progress-spinner', extends: 'Base', category: 'feedback' },
    { name: 'Rating', selector: 'gp-rating', extends: 'BaseEditable', category: 'form' },
    { name: 'Skeleton', selector: 'gp-skeleton', extends: 'Base', category: 'feedback' },
  ],
}

// Flatten all components
const allComponents = Object.values(components).flat()

// Get the component name from dash-case
function getDashCase(name) {
  return name.replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`).substring(1)
}

// Generate component TypeScript file
function generateComponentTS(component) {
  const dashName = getDashCase(component.name)
  const importPath = `../${component.extends === 'Base' ? 'base' : 'base-' + component.extends.toLowerCase().replace('base', '')}/`
  // Convert dash-case to SCREAMING_SNAKE_CASE for the token name
  const styleConstName = dashName.toUpperCase().replace(/-/g, '_') + '_STYLE'
  const styleProvider = dashName.toUpperCase().replace(/-/g, '_') + '_STYLE_PROVIDER'

  return `import { Component, inject } from '@angular/core'
import { ${component.extends} } from '${importPath}${component.extends === 'Base' ? 'base' : component.extends.replace(/([A-Z])/g, (m) => '-' + m.toLowerCase()).substring(1)}'
import { ${styleConstName}, ${styleProvider} } from './style/${dashName}.style'

@Component({
  selector: '${component.selector}',
  imports: [],
  templateUrl: './${dashName}.html',
  providers: [${styleProvider}],
})
export class ${component.name} extends ${component.extends} {
  private readonly style = inject(${styleConstName})

  onInit(): void {
    this.attachStyle(this.style)
  }
}
`
}

// Generate component HTML file
function generateComponentHTML(component) {
  return `<!-- ${component.name} component -->
<div class="gp-${getDashCase(component.name)}-root">
  <!-- Component content -->
</div>
`
}

// Generate component style file
function generateComponentStyle(component) {
  const dashName = getDashCase(component.name)
  // Convert dash-case to SCREAMING_SNAKE_CASE for the token name
  const styleConstName = dashName.toUpperCase().replace(/-/g, '_') + '_STYLE'
  const styleProvider = dashName.toUpperCase().replace(/-/g, '_') + '_STYLE_PROVIDER'

  return `import { Injectable, InjectionToken, Provider } from '@angular/core'
import { BaseStyle, ComponentStyleConfig } from '../../base/style/base.style'

export type ${component.name}Theme = ComponentStyleConfig

export const ${styleConstName} = new InjectionToken<BaseStyle<${component.name}Theme>>('${styleConstName}')

@Injectable()
export class ${component.name}Style extends BaseStyle<${component.name}Theme> {
  protected readonly componentName = 'gp-${dashName}'

  protected getDefaultTheme(): ${component.name}Theme {
    return {
      classes: ['gp-${dashName}-root'],
      host: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
      },
      vars: {
        background: 'var(--gp-${dashName}-theme-background, #ffffff)',
        color: 'var(--gp-${dashName}-theme-color, #111827)',
        borderColor: 'var(--gp-${dashName}-theme-border-color, #d1d5db)',
        borderWidth: 'var(--gp-${dashName}-theme-border-width, 1px)',
        radius: 'var(--gp-${dashName}-theme-radius, 0.375rem)',
        padding: 'var(--gp-${dashName}-theme-padding, 0.5rem 0.75rem)',
      },
      css: \`
        gp-${dashName}.gp-${dashName}-root {
          background-color: var(--gp-${dashName}-background);
          color: var(--gp-${dashName}-color);
          border: var(--gp-${dashName}-border-width) solid var(--gp-${dashName}-border-color);
          border-radius: var(--gp-${dashName}-radius);
          padding: var(--gp-${dashName}-padding);
        }

        @media (max-width: 600px) {
          gp-${dashName}.gp-${dashName}-root {
            width: var(--gp-${dashName}-theme-mobile-width, 100%);
          }
        }
      \`,
    }
  }
}

export const ${styleProvider}: Provider = {
  provide: ${styleConstName},
  useClass: ${component.name}Style,
}
`
}

// Generate component spec file
function generateComponentSpec(component) {
  const dashName = getDashCase(component.name)

  return `import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ${component.name} } from './${dashName}';

describe('${component.name}', () => {
  let component: ${component.name};
  let fixture: ComponentFixture<${component.name}>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [${component.name}],
    }).compileComponents();

    fixture = TestBed.createComponent(${component.name});
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
`
}

// Create directory structure for a component
function createComponent(baseDir, component) {
  const dashName = getDashCase(component.name)
  const componentDir = path.join(baseDir, dashName)
  const styleDir = path.join(componentDir, 'style')

  // Create directories
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true })
  }
  if (!fs.existsSync(styleDir)) {
    fs.mkdirSync(styleDir, { recursive: true })
  }

  // Create files
  fs.writeFileSync(path.join(componentDir, `${dashName}.ts`), generateComponentTS(component))
  fs.writeFileSync(path.join(componentDir, `${dashName}.html`), generateComponentHTML(component))
  fs.writeFileSync(path.join(componentDir, `${dashName}.spec.ts`), generateComponentSpec(component))
  fs.writeFileSync(path.join(styleDir, `${dashName}.style.ts`), generateComponentStyle(component))

  console.log(`✓ Created ${component.name}`)
}

// Main execution
function main() {
  const libDir = path.join(__dirname, '..', 'projects', 'gp-ui', 'src', 'lib')

  console.log(`Generating ${allComponents.length} components...`)

  allComponents.forEach((component) => {
    try {
      createComponent(libDir, component)
    } catch (error) {
      console.error(`✗ Failed to create ${component.name}:`, error.message)
    }
  })

  // Generate public API exports
  generatePublicApiExports(libDir, allComponents)

  console.log(`\n✓ All ${allComponents.length} components generated successfully!`)
  console.log('Next steps:')
  console.log('1. Update theme presets with new component variables')
  console.log('2. Add translations for new components if needed')
  console.log('3. Run: npm run build gp-ui')
}

// Generate public API exports content
function generatePublicApiExports(libDir, components) {
  const publicApiPath = path.join(libDir, '..', 'public-api.ts')
  let content = fs.readFileSync(publicApiPath, 'utf-8')

  // Group components by category
  const byCategory = {}
  components.forEach((comp) => {
    if (!byCategory[comp.category]) {
      byCategory[comp.category] = []
    }
    byCategory[comp.category].push(comp)
  })

  // Generate exports organized by category
  let newExports = ''

  for (const [category, comps] of Object.entries(byCategory)) {
    newExports += `\n/**\n * ${category.charAt(0).toUpperCase() + category.slice(1)} Components\n */\n`
    comps.forEach((comp) => {
      const dashName = getDashCase(comp.name)
      newExports += `export * from './lib/${dashName}/${dashName}'\n`
      newExports += `export * from './lib/${dashName}/style/${dashName}.style'\n`
    })
  }

  // Add to the end of the file
  if (!content.includes('Auto-generated components')) {
    content += '\n// Auto-generated components\n' + newExports
    fs.writeFileSync(publicApiPath, content)
    console.log('✓ Updated public-api.ts')
  }
}

main()
