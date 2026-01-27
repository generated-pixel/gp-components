#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// Get the component name from dash-case
function getDashCase(name) {
  return name.replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`).substring(1)
}

// Component definitions
const components = [
  // Input components
  'AutoComplete',
  'CascadeSelect',
  'Checkbox',
  'DatePicker',
  'InputGroup',
  'InputMask',
  'InputNumber',
  'InputOtp',
  'Listbox',
  'MultiSelect',
  'RadioButton',
  'Select',
  'SelectButton',
  'Slider',
  'Textarea',
  'ToggleButton',
  'ToggleSwitch',
  // Button components
  'Button',
  'SpeedDial',
  'SplitButton',
  // Data display
  'DataView',
  'OrderList',
  'OrgChart',
  'Paginator',
  'PickList',
  'Table',
  'Timeline',
  'Tree',
  'TreeTable',
  // Layout
  'Accordion',
  'Card',
  'Divider',
  'Fieldset',
  'ScrollPanel',
  'Splitter',
  'Stepper',
  'Tabs',
  'Toolbar',
  // Navigation
  'Breadcrumb',
  'ContextMenu',
  'Menu',
  'Menubar',
  'MegaMenu',
  'PanelMenu',
  'TieredMenu',
  // Overlay
  'ConfirmPopup',
  'Dialog',
  'Drawer',
  // Messaging
  'Message',
  'Toast',
  'Upload',
  // Feedback
  'Avatar',
  'Badge',
  'Carousel',
  'Chip',
  'Image',
  'MeterGroup',
  'ProgressBar',
  'ProgressSpinner',
  'Rating',
  'Skeleton',
]

// Generate theme semantic entries for new components
function generateThemeSemanticEntries() {
  let entries = ''

  components.forEach((comp) => {
    const dashName = getDashCase(comp)
    const varName = dashName.replace(/-/g, '')

    entries += `  ${varName}: {
    vars: {
      default: {
        themeMobileWidth: '100%',
        themeMobilePadding: '0.5rem',
      },
    },
  },
`
  })

  return entries
}

// Update theme files
function updateThemeFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8')

  // Find the position to insert new component theme entries
  // Look for the last component in the semantic section before the closing brace
  const blockuiMatch = content.match(/blockui:\s*{[^}]*},/)

  if (!blockuiMatch) {
    console.log(`Could not find blockui entry in ${filePath}`)
    return
  }

  const newEntries = generateThemeSemanticEntries()
  const insertPosition = blockuiMatch.index + blockuiMatch[0].length

  const before = content.substring(0, insertPosition)
  const after = content.substring(insertPosition)

  const updatedContent = before + '\n' + newEntries + after

  fs.writeFileSync(filePath, updatedContent)
  console.log(`✓ Updated ${path.basename(filePath)}`)
}

// Main execution
function main() {
  const themesDir = path.join(__dirname, '..', 'projects', 'gp-ui', 'src', 'lib', 'themes')

  const themeFiles = ['default.theme.ts', 'developer.theme.ts', 'pride.theme.ts']

  themeFiles.forEach((file) => {
    const filePath = path.join(themesDir, file)
    if (fs.existsSync(filePath)) {
      updateThemeFile(filePath)
    }
  })

  console.log('\n✓ Theme files updated with new component variables!')
}

main()
