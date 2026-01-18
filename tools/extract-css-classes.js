#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const ts = require("typescript");
const { parseTemplate, BindingType } = require("@angular/compiler");

const DEFAULT_SRC_DIR = path.resolve(process.cwd(), "projects/gp-ui/src/lib");
const DEFAULT_OUTPUT = path.resolve(
  process.cwd(),
  "projects/gp-ui/css/generated-classes.css",
);
const CLASS_PREFIX = "gp-";
const CLASS_METHODS = new Set(["addClass", "removeClass", "toggleClass"]);
const CLASS_LIST_METHODS = new Set(["add", "remove", "toggle"]);
const SET_ATTRIBUTE_METHODS = new Set(["setAttribute", "setAttributeNS"]);
const CSS_CLASSES_NAME_REGEX = /(?=.*css)(?=.*class)/i;
const ARRAY_MUTATION_METHODS = new Set(["push", "unshift"]);
const CLASS_COLLECTION_MUTATORS = new Set(["push", "unshift"]);
const CLASS_COLLECTION_IDENTIFIERS = new Set([
  "class",
  "classes",
  "classList",
  "classNames",
]);

const SPACING_SCALE = {
  px: "1px",
  0: "0px",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  3.5: "0.875rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  11: "2.75rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  28: "7rem",
  32: "8rem",
  36: "9rem",
  40: "10rem",
  44: "11rem",
  48: "12rem",
  52: "13rem",
  56: "14rem",
  60: "15rem",
  64: "16rem",
  72: "18rem",
  80: "20rem",
  96: "24rem",
};

const FRACTION_SCALE = {
  "1/2": "50%",
  "1/3": "33.333333%",
  "2/3": "66.666667%",
  "1/4": "25%",
  "2/4": "50%",
  "3/4": "75%",
  "1/5": "20%",
  "2/5": "40%",
  "3/5": "60%",
  "4/5": "80%",
  "1/6": "16.666667%",
  "2/6": "33.333333%",
  "3/6": "50%",
  "4/6": "66.666667%",
  "5/6": "83.333333%",
  "1/12": "8.333333%",
  "2/12": "16.666667%",
  "3/12": "25%",
  "4/12": "33.333333%",
  "5/12": "41.666667%",
  "6/12": "50%",
  "7/12": "58.333333%",
  "8/12": "66.666667%",
  "9/12": "75%",
  "10/12": "83.333333%",
  "11/12": "91.666667%",
};

const COLOR_FAMILIES = [
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
];

const COLOR_SHADES = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
];

const COLOR_PALETTE = buildColorPalette();

const FONT_SIZE_SCALE = {
  xs: { size: "0.75rem", lineHeight: "1rem" },
  sm: { size: "0.875rem", lineHeight: "1.25rem" },
  base: { size: "1rem", lineHeight: "1.5rem" },
  lg: { size: "1.125rem", lineHeight: "1.75rem" },
  xl: { size: "1.25rem", lineHeight: "1.75rem" },
  "2xl": { size: "1.5rem", lineHeight: "2rem" },
  "3xl": { size: "1.875rem", lineHeight: "2.25rem" },
  "4xl": { size: "2.25rem", lineHeight: "2.5rem" },
  "5xl": { size: "3rem", lineHeight: "1em" },
  "6xl": { size: "3.75rem", lineHeight: "1em" },
  "7xl": { size: "4.5rem", lineHeight: "1em" },
  "8xl": { size: "6rem", lineHeight: "1em" },
  "9xl": { size: "8rem", lineHeight: "1em" },
};

const FONT_WEIGHT_SCALE = {
  thin: "100",
  extralight: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900",
};

const LETTER_SPACING_SCALE = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
};

const LINE_HEIGHT_SCALE = {
  none: "1",
  tight: "1.25",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625",
  loose: "2",
  3: ".75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
};

const BOX_SHADOW_SCALE = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  none: "none",
};

const OPACITY_SCALE = {
  0: "0",
  5: "0.05",
  10: "0.1",
  20: "0.2",
  25: "0.25",
  30: "0.3",
  40: "0.4",
  50: "0.5",
  60: "0.6",
  70: "0.7",
  75: "0.75",
  80: "0.8",
  90: "0.9",
  95: "0.95",
  100: "1",
};

const Z_INDEX_SCALE = {
  auto: "auto",
  0: "0",
  10: "10",
  20: "20",
  30: "30",
  40: "40",
  50: "50",
};

const FONT_FAMILY_SCALE = {
  sans: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
  serif: "ui-serif, Georgia, Cambria, 'Times New Roman', serif",
  mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
};

const BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

const TRANSITION_PROPERTY_SCALE = {
  none: "none",
  all: "all",
  DEFAULT:
    "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
  colors:
    "color, background-color, border-color, text-decoration-color, fill, stroke",
  opacity: "opacity",
  shadow: "box-shadow",
  transform: "transform",
};

const TRANSITION_DURATION_SCALE = {
  75: "75ms",
  100: "100ms",
  150: "150ms",
  200: "200ms",
  300: "300ms",
  500: "500ms",
  700: "700ms",
  1000: "1000ms",
};

const TRANSITION_TIMING_SCALE = {
  linear: "linear",
  in: "cubic-bezier(0.4, 0, 1, 1)",
  out: "cubic-bezier(0, 0, 0.2, 1)",
  "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
};

const BORDER_RADIUS_SCALE = {
  none: "0px",
  sm: "0.125rem",
  DEFAULT: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px",
};

const BORDER_WIDTH_SCALE = {
  DEFAULT: "1px",
  0: "0px",
  2: "2px",
  4: "4px",
  8: "8px",
};

const MAX_WIDTH_SCALE = {
  none: "none",
  xs: "20rem",
  sm: "24rem",
  md: "28rem",
  lg: "32rem",
  xl: "36rem",
  "2xl": "42rem",
  "3xl": "48rem",
  "4xl": "56rem",
  "5xl": "64rem",
  "6xl": "72rem",
  "7xl": "80rem",
  full: "100%",
  min: "min-content",
  max: "max-content",
  fit: "fit-content",
  prose: "65ch",
  "screen-sm": BREAKPOINTS.sm,
  "screen-md": BREAKPOINTS.md,
  "screen-lg": BREAKPOINTS.lg,
  "screen-xl": BREAKPOINTS.xl,
  "screen-2xl": BREAKPOINTS["2xl"],
};

const ARBITRARY_VALUE_REGEX = /^\[(.+)\]$/;

function main() {
  const options = parseArgs(process.argv.slice(2));
  const classStore = new ClassStore();

  const htmlFiles = [];
  const tsFiles = [];
  walkDirectory(options.srcDir, (filePath) => {
    if (filePath.endsWith(".html")) {
      htmlFiles.push(filePath);
    } else if (
      filePath.endsWith(".ts") &&
      !filePath.endsWith(".spec.ts") &&
      !filePath.endsWith(".stories.ts")
    ) {
      tsFiles.push(filePath);
    }
  });

  htmlFiles.forEach((file) =>
    processHtmlFile(file, classStore, options.verbose),
  );
  tsFiles.forEach((file) => processTsFile(file, classStore, options.verbose));

  const classes = classStore.getSorted();
  if (!classes.length) {
    if (options.verbose) {
      console.warn("No classes discovered. Skipping output.");
    }
    return;
  }

  const { css, unsupported } = buildCss(classes, options.bannerComment);
  ensureDirectory(path.dirname(options.outputFile));
  fs.writeFileSync(options.outputFile, css, "utf8");

  console.log(
    `Generated ${classes.length} utilities at ${path.relative(process.cwd(), options.outputFile)}`,
  );
  if (unsupported.length) {
    console.warn(
      `Unsupported class tokens (${unsupported.length}): ${unsupported.join(", ")}`,
    );
  }
}

class ClassStore {
  constructor() {
    this.names = new Set();
  }

  add(name) {
    const trimmed = (name || "").trim();
    if (!trimmed || /\s/.test(trimmed)) {
      trimmed
        .split(/\s+/)
        .map((item) => item.trim())
        .filter(Boolean)
        .forEach((item) => this.add(item));
      return;
    }
    this.names.add(trimmed);
  }

  getSorted() {
    return Array.from(this.names).sort(compareClassNames);
  }
}

function processHtmlFile(filePath, classStore, verbose) {
  let content;
  try {
    content = fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.warn(`Failed to read ${filePath}: ${error.message}`);
    return;
  }

  const template = parseTemplate(content, filePath, {
    preserveWhitespaces: true,
    enableBlockSyntax: true,
    enableLetSyntax: true,
  });
  const visitNodes = (nodes) => {
    if (!Array.isArray(nodes)) {
      return;
    }
    for (const node of nodes) {
      if (node && typeof node === "object") {
        if (Array.isArray(node.attributes)) {
          node.attributes.forEach((attr) => {
            if (
              attr &&
              attr.name === "class" &&
              typeof attr.value === "string"
            ) {
              attr.value
                .split(/\s+/)
                .filter(Boolean)
                .forEach((item) => classStore.add(item));
            }
          });
        }
        if (Array.isArray(node.inputs)) {
          node.inputs.forEach((input) =>
            collectClassesFromBoundAttribute(input, classStore),
          );
        }
        if (Array.isArray(node.templateAttrs)) {
          node.templateAttrs.forEach((attr) => {
            if (
              attr &&
              attr.name === "class" &&
              typeof attr.value === "string"
            ) {
              attr.value
                .split(/\s+/)
                .filter(Boolean)
                .forEach((item) => classStore.add(item));
            }
            if (attr && attr.type === BindingType.Property) {
              collectClassesFromBoundAttribute(attr, classStore);
            }
          });
        }
        if (Array.isArray(node.children)) {
          visitNodes(node.children);
        }

        // Angular block syntax nodes (e.g. @if/@for/@switch) store their content under
        // `branches` / `cases` rather than `children`.
        if (Array.isArray(node.branches)) {
          node.branches.forEach((branch) => {
            if (branch && Array.isArray(branch.children)) {
              visitNodes(branch.children);
            }
          });
        }

        if (Array.isArray(node.cases)) {
          node.cases.forEach((caseNode) => {
            if (caseNode && Array.isArray(caseNode.children)) {
              visitNodes(caseNode.children);
            }
          });
        }

        // Other block containers seen with modern Angular control flow.
        // @for may have an `empty` block; @defer has `placeholder`/`loading`/`error`.
        ["empty", "placeholder", "loading", "error", "main"].forEach((key) => {
          const container = node[key];
          if (container && Array.isArray(container.children)) {
            visitNodes(container.children);
          }
        });
      }
    }
  };

  try {
    visitNodes(template.nodes);
  } catch (error) {
    console.warn(`Failed to parse ${filePath}: ${error.message}`);
  }

  if (verbose) {
    console.log(`Processed HTML: ${path.relative(process.cwd(), filePath)}`);
  }
}

function collectClassesFromBoundAttribute(binding, classStore) {
  if (!binding || binding.name == null) {
    return;
  }

  if (binding.type === BindingType.Class) {
    classStore.add(binding.name);
    return;
  }

  const bindingName = String(binding.name);
  if (
    binding.type === BindingType.Property &&
    (bindingName === "class" || bindingName === "ngClass")
  ) {
    const expression = binding.value && binding.value.ast;
    extractClassesFromAngularExpression(expression).forEach((item) =>
      classStore.add(item),
    );
  }
}

function extractClassesFromAngularExpression(ast) {
  if (!ast || typeof ast !== "object") {
    return [];
  }

  if (typeof ast.value === "string") {
    return ast.value.split(/\s+/).filter(Boolean);
  }

  if (Array.isArray(ast.expressions)) {
    return ast.expressions.flatMap((expr) =>
      extractClassesFromAngularExpression(expr),
    );
  }

  if (Array.isArray(ast.elements)) {
    return ast.elements.flatMap((expr) =>
      extractClassesFromAngularExpression(expr),
    );
  }

  if (Array.isArray(ast.keys) && Array.isArray(ast.values)) {
    return ast.keys
      .map((entry) =>
        entry && typeof entry.key === "string" ? entry.key : null,
      )
      .filter(Boolean);
  }

  if (ast && (ast.trueExp || ast.falseExp)) {
    const collected = [];
    if (ast.trueExp) {
      collected.push(...extractClassesFromAngularExpression(ast.trueExp));
    }
    if (ast.falseExp) {
      collected.push(...extractClassesFromAngularExpression(ast.falseExp));
    }
    return collected;
  }

  if (Array.isArray(ast.properties)) {
    return ast.properties.flatMap((prop) =>
      extractClassesFromAngularExpression(prop.value || prop.expression),
    );
  }

  return [];
}

function processTsFile(filePath, classStore, verbose) {
  let sourceText;
  try {
    sourceText = fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.warn(`Failed to read ${filePath}: ${error.message}`);
    return;
  }

  const sourceFile = ts.createSourceFile(
    filePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
  );
  const resolver = buildTsLiteralResolver(sourceFile);
  const visit = (node) => {
    collectCssClassesFromNamedArrays(node, classStore, resolver);
    if (ts.isStringLiteralLike(node)) {
      handleStringLiteral(node, classStore);
    }
    ts.forEachChild(node, visit);
  };

  visit(sourceFile);

  if (verbose) {
    console.log(`Processed TS: ${path.relative(process.cwd(), filePath)}`);
  }
}

function looksLikeCssClassesName(name) {
  return CSS_CLASSES_NAME_REGEX.test(String(name || ""));
}

function buildTsLiteralResolver(sourceFile) {
  const arrayLiteralsByName = new Map();
  const functionReturnsByName = new Map();

  const addToMapSet = (map, key, values) => {
    if (!key || !values || values.size === 0) {
      return;
    }
    let set = map.get(key);
    if (!set) {
      set = new Set();
      map.set(key, set);
    }
    values.forEach((v) => set.add(v));
  };

  const extractLiteralStrings = (expr) => {
    const out = new Set();
    const walk = (e) => {
      if (!e) {
        return;
      }
      if (ts.isStringLiteralLike(e)) {
        e.text
          .split(/\s+/)
          .filter(Boolean)
          .forEach((t) => out.add(t));
        return;
      }
      if (ts.isNoSubstitutionTemplateLiteral(e)) {
        e.text
          .split(/\s+/)
          .filter(Boolean)
          .forEach((t) => out.add(t));
        return;
      }
      if (ts.isTemplateExpression(e)) {
        // Ignore computed templates: e.g. `mr-${n}`
        return;
      }
      if (ts.isParenthesizedExpression(e)) {
        walk(e.expression);
        return;
      }
      if (ts.isArrayLiteralExpression(e)) {
        e.elements.forEach((el) => walk(el));
        return;
      }
      if (ts.isConditionalExpression(e)) {
        walk(e.whenTrue);
        walk(e.whenFalse);
        return;
      }
    };
    walk(expr);
    return out;
  };

  const getCallName = (callExpr) => {
    if (!callExpr || !ts.isCallExpression(callExpr)) {
      return null;
    }
    const expression = callExpr.expression;
    if (ts.isIdentifier(expression)) {
      return expression.text;
    }
    if (ts.isPropertyAccessExpression(expression)) {
      return expression.name.text;
    }
    return null;
  };

  const visit = (node) => {
    // Collect literal arrays assigned to variables.
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.initializer
    ) {
      const values = extractLiteralStrings(node.initializer);
      addToMapSet(arrayLiteralsByName, node.name.text, values);
    }

    // Collect literal arrays assigned via =
    if (
      ts.isBinaryExpression(node) &&
      node.operatorToken.kind === ts.SyntaxKind.EqualsToken
    ) {
      const left = node.left;
      const right = node.right;
      if (ts.isIdentifier(left)) {
        const values = extractLiteralStrings(right);
        addToMapSet(arrayLiteralsByName, left.text, values);
      }
      if (ts.isPropertyAccessExpression(left)) {
        const values = extractLiteralStrings(right);
        addToMapSet(arrayLiteralsByName, left.name.text, values);
      }
    }

    // Collect return values from functions/methods with css+class in the name.
    if (ts.isFunctionDeclaration(node) && node.name && node.body) {
      const fnName = node.name.text;
      if (looksLikeCssClassesName(fnName)) {
        const returns = new Set();
        const scan = (inner) => {
          if (ts.isReturnStatement(inner)) {
            const values = extractLiteralStrings(inner.expression);
            values.forEach((v) => returns.add(v));
          }
          ts.forEachChild(inner, scan);
        };
        scan(node.body);
        addToMapSet(functionReturnsByName, fnName, returns);
      }
    }

    if (ts.isMethodDeclaration(node) && node.name && node.body) {
      const methodName = getPropertyNameText(node.name);
      if (methodName && looksLikeCssClassesName(methodName)) {
        const returns = new Set();
        const scan = (inner) => {
          if (ts.isReturnStatement(inner)) {
            const values = extractLiteralStrings(inner.expression);
            values.forEach((v) => returns.add(v));
          }
          ts.forEachChild(inner, scan);
        };
        scan(node.body);
        addToMapSet(functionReturnsByName, methodName, returns);
      }
    }

    // Collect push/unshift literals into any array identifier/property.
    if (ts.isCallExpression(node)) {
      const calleeInfo = describeCallExpression(node.expression);
      if (calleeInfo && ARRAY_MUTATION_METHODS.has(calleeInfo.property)) {
        const arg = node.arguments && node.arguments[0];
        if (arg) {
          const values = extractLiteralStrings(arg);
          if (values.size) {
            if (calleeInfo.identifier) {
              addToMapSet(arrayLiteralsByName, calleeInfo.identifier, values);
            } else {
              // Try to attribute to the trailing identifier in the qualifier.
              const trailing = getTrailingIdentifier(calleeInfo.qualifier);
              if (trailing) {
                addToMapSet(arrayLiteralsByName, trailing, values);
              }
            }
          }
        }
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);

  const resolveIdentifier = (name) => arrayLiteralsByName.get(name) || null;
  const resolveCall = (callExpr) => {
    const callName = getCallName(callExpr);
    return callName ? functionReturnsByName.get(callName) || null : null;
  };

  return { resolveIdentifier, resolveCall };
}

function getTrailingIdentifier(text) {
  const match = String(text || "").match(/([A-Za-z_$][\w$]*)$/);
  return match ? match[1] : null;
}

function looksLikeCssClassesQualifier(qualifierText) {
  const trailing = getTrailingIdentifier(qualifierText);
  return trailing ? looksLikeCssClassesName(trailing) : false;
}

function addStringFromExpression(expr, classStore, resolver) {
  if (!expr) {
    return;
  }

  if (ts.isStringLiteralLike(expr)) {
    classStore.add(expr.text);
    return;
  }

  if (ts.isNoSubstitutionTemplateLiteral(expr)) {
    classStore.add(expr.text);
    return;
  }

  if (ts.isTemplateExpression(expr)) {
    // Ignore computed templates: e.g. `mr-${n}`
    return;
  }

  if (ts.isArrayLiteralExpression(expr)) {
    expr.elements.forEach((el) =>
      addStringFromExpression(el, classStore, resolver),
    );
    return;
  }

  if (ts.isConditionalExpression(expr)) {
    addStringFromExpression(expr.whenTrue, classStore, resolver);
    addStringFromExpression(expr.whenFalse, classStore, resolver);
    return;
  }

  if (ts.isParenthesizedExpression(expr)) {
    addStringFromExpression(expr.expression, classStore, resolver);
    return;
  }

  // Conservative aliasing: cssClasses = otherIdentifier
  if (resolver && ts.isIdentifier(expr)) {
    const resolved = resolver.resolveIdentifier(expr.text);
    if (resolved) {
      resolved.forEach((v) => classStore.add(v));
    }
    return;
  }

  // Conservative return inference: cssClasses = getCssClasses()
  if (resolver && ts.isCallExpression(expr)) {
    const resolved = resolver.resolveCall(expr);
    if (resolved) {
      resolved.forEach((v) => classStore.add(v));
    }
  }
}

function collectCssClassesFromNamedArrays(node, classStore, resolver) {
  // Collect string literals from arrays/assignments where the variable/property name contains both
  // "css" and "class" (e.g. cssClasses, buttonCssClassList, etc.).

  if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
    if (looksLikeCssClassesName(node.name.text) && node.initializer) {
      addStringFromExpression(node.initializer, classStore, resolver);
    }
    return;
  }

  if (ts.isPropertyDeclaration(node) && node.name) {
    const propName = getPropertyNameText(node.name);
    if (propName && looksLikeCssClassesName(propName) && node.initializer) {
      addStringFromExpression(node.initializer, classStore, resolver);
    }
    return;
  }

  if (
    ts.isBinaryExpression(node) &&
    node.operatorToken.kind === ts.SyntaxKind.EqualsToken
  ) {
    const left = node.left;
    const right = node.right;

    if (ts.isIdentifier(left) && looksLikeCssClassesName(left.text)) {
      addStringFromExpression(right, classStore, resolver);
      return;
    }

    if (
      ts.isPropertyAccessExpression(left) &&
      looksLikeCssClassesName(left.name.text)
    ) {
      addStringFromExpression(right, classStore, resolver);
      return;
    }
  }
}

function handleStringLiteral(node, classStore) {
  const text = node.text;
  const parent = node.parent;

  if (!parent) {
    return;
  }

  if (ts.isCallExpression(parent)) {
    const calleeInfo = describeCallExpression(parent.expression);
    if (!calleeInfo) {
      return;
    }

    const argIndex = parent.arguments.indexOf(node);
    if (argIndex === -1) {
      return;
    }

    if (CLASS_METHODS.has(calleeInfo.property) && argIndex >= 1) {
      classStore.add(text);
      return;
    }

    if (
      CLASS_LIST_METHODS.has(calleeInfo.property) &&
      calleeInfo.qualifier.endsWith(".classList")
    ) {
      classStore.add(text);
      return;
    }

    // Heuristic: arrays named like cssClasses/cssClassList/etc.
    // Examples:
    // - this.cssClasses.push('mr-2')
    // - cssClasses.unshift('p-4')
    if (
      ARRAY_MUTATION_METHODS.has(calleeInfo.property) &&
      looksLikeCssClassesQualifier(calleeInfo.qualifier)
    ) {
      classStore.add(text);
      return;
    }

    if (
      CLASS_COLLECTION_MUTATORS.has(calleeInfo.property) &&
      ts.isPropertyAccessExpression(parent.expression) &&
      isClassCollectionReference(parent.expression.expression)
    ) {
      classStore.add(text);
      return;
    }

    if (SET_ATTRIBUTE_METHODS.has(calleeInfo.property)) {
      if (calleeInfo.property === "setAttribute" && argIndex === 1) {
        const firstArg = parent.arguments[0];
        if (
          firstArg &&
          ts.isStringLiteralLike(firstArg) &&
          firstArg.text === "class"
        ) {
          classStore.add(text);
        }
        return;
      }

      if (calleeInfo.property === "setAttributeNS" && argIndex === 2) {
        const nameArg = parent.arguments[1];
        if (
          nameArg &&
          ts.isStringLiteralLike(nameArg) &&
          nameArg.text === "class"
        ) {
          classStore.add(text);
        }
        return;
      }
    }

    if (calleeInfo.identifier === "HostBinding" && argIndex === 0) {
      if (text.startsWith("class.")) {
        classStore.add(text.slice(6));
      }
      return;
    }
  }

  if (ts.isArrayLiteralExpression(parent)) {
    const grandparent = parent.parent;
    if (
      ts.isBinaryExpression(grandparent) &&
      grandparent.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
      isClassCollectionReference(grandparent.left)
    ) {
      classStore.add(text);
      return;
    }

    if (ts.isPropertyAssignment(grandparent)) {
      const propName = getPropertyNameText(grandparent.name);
      if (propName && CLASS_COLLECTION_IDENTIFIERS.has(propName)) {
        classStore.add(text);
        return;
      }
    }

    if (
      ts.isVariableDeclaration(grandparent) &&
      isClassCollectionReference(grandparent.name)
    ) {
      classStore.add(text);
      return;
    }
  }

  if (ts.isPropertyAssignment(parent) && parent.initializer === node) {
    const propName = getPropertyNameText(parent.name);
    if (!propName) {
      return;
    }
    if (propName === "class" && isWithinComponentHostObject(parent)) {
      text
        .split(/\s+/)
        .filter(Boolean)
        .forEach((item) => classStore.add(item));
    }
    if (propName.startsWith("class.") && isWithinComponentHostObject(parent)) {
      classStore.add(propName.slice(6));
    }
  }

  if (
    ts.isBinaryExpression(parent) &&
    parent.operatorToken.kind === ts.SyntaxKind.EqualsToken
  ) {
    if (
      ts.isPropertyAccessExpression(parent.left) &&
      parent.left.name &&
      parent.left.name.text === "className"
    ) {
      text
        .split(/\s+/)
        .filter(Boolean)
        .forEach((item) => classStore.add(item));
    }
  }
}

function describeCallExpression(expression) {
  if (ts.isPropertyAccessExpression(expression)) {
    const qualifierText = expression.expression.getText();
    return {
      property: expression.name.text,
      qualifier: qualifierText,
      identifier: null,
    };
  }
  if (ts.isIdentifier(expression)) {
    return {
      property: expression.text,
      qualifier: "",
      identifier: expression.text,
    };
  }
  return null;
}

function isClassCollectionReference(node) {
  if (!node) {
    return false;
  }

  if (ts.isIdentifier(node)) {
    return CLASS_COLLECTION_IDENTIFIERS.has(node.text);
  }

  if (ts.isPropertyAccessExpression(node)) {
    return CLASS_COLLECTION_IDENTIFIERS.has(node.name.text);
  }

  if (ts.isElementAccessExpression(node)) {
    const argument = node.argumentExpression;
    if (argument && ts.isStringLiteralLike(argument)) {
      return CLASS_COLLECTION_IDENTIFIERS.has(argument.text);
    }
    return false;
  }

  return false;
}

function getPropertyNameText(nameNode) {
  if (!nameNode) {
    return null;
  }
  if (ts.isIdentifier(nameNode) || ts.isPrivateIdentifier(nameNode)) {
    return nameNode.text;
  }
  if (ts.isStringLiteralLike(nameNode)) {
    return nameNode.text;
  }
  if (
    ts.isComputedPropertyName(nameNode) &&
    ts.isStringLiteralLike(nameNode.expression)
  ) {
    return nameNode.expression.text;
  }
  return null;
}

function isWithinComponentHostObject(propertyAssignment) {
  let current = propertyAssignment.parent;
  if (!ts.isObjectLiteralExpression(current)) {
    return false;
  }
  let parent = current.parent;
  if (!ts.isPropertyAssignment(parent)) {
    return false;
  }
  const name = getPropertyNameText(parent.name);
  if (name !== "host") {
    return false;
  }

  current = parent.parent;
  if (!ts.isObjectLiteralExpression(current)) {
    return false;
  }

  parent = current.parent;
  if (!parent) {
    return false;
  }

  if (
    ts.isCallExpression(parent) &&
    ts.isIdentifier(parent.expression) &&
    parent.expression.text === "Component"
  ) {
    return true;
  }

  if (
    ts.isPropertyAssignment(parent) ||
    ts.isShorthandPropertyAssignment(parent)
  ) {
    return isWithinComponentHostObject(parent);
  }

  return false;
}

function buildCss(classNames, bannerComment) {
  const { rules, unsupported } = generateCss(classNames);
  const lines = [];
  if (bannerComment) {
    lines.push(`/* ${bannerComment} */`);
  }
  lines.push("/* Auto-generated utility bundle */");
  lines.push("/* Do not edit manually */", "");
  lines.push(rules.join("\n\n"));
  if (unsupported.length) {
    lines.push("", "/* Unsupported class tokens */");
    lines.push(`/* ${unsupported.join(" ")} */`);
  }
  return { css: `${lines.join("\n").trim()}\n`, unsupported };
}

function generateCss(classNames) {
  const rules = [];
  const unsupported = [];

  classNames.forEach((className) => {
    const translation = translateClassName(className);
    if (!translation) {
      unsupported.push(className);
      return;
    }
    rules.push(renderCssRule(translation));
  });

  return { rules, unsupported };
}

function translateClassName(rawName) {
  const parts = dissectClassName(rawName);
  if (CLASS_PREFIX && !parts.prefixed) {
    return null;
  }
  const translation = translateBaseUtility(parts.base, {
    negative: parts.negative,
    important: parts.important,
  });

  if (!translation) {
    return null;
  }

  const selectorInfo = buildSelector(rawName, parts.variants);
  const declarations = translation.declarations.map((decl) => ({
    prop: decl.prop,
    value: parts.important ? `${decl.value} !important` : decl.value,
  }));

  return {
    selector: selectorInfo.selector,
    wrappers: selectorInfo.wrappers,
    declarations,
  };
}

function dissectClassName(raw) {
  const tokens = raw.split(":");
  const baseToken = tokens[tokens.length - 1];
  const variants = tokens.slice(0, -1);

  let base = baseToken;
  let important = false;
  let negative = false;
  let prefixed = false;

  if (base.startsWith("!")) {
    important = true;
    base = base.slice(1);
  }

  if (base.startsWith("-")) {
    negative = true;
    base = base.slice(1);
  }

  if (CLASS_PREFIX && base.startsWith(CLASS_PREFIX)) {
    base = base.slice(CLASS_PREFIX.length);
    prefixed = true;
  }

  return { base, variants, important, negative, prefixed };
}

const RESPONSIVE_VARIANT_ORDER = {
  base: 0,
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5,
  "2xl": 6,
};

function compareClassNames(a, b) {
  if (a === b) {
    return 0;
  }

  const aParts = dissectClassName(a);
  const bParts = dissectClassName(b);

  const aResponsiveRank = getResponsiveRank(aParts.variants);
  const bResponsiveRank = getResponsiveRank(bParts.variants);
  if (aResponsiveRank !== bResponsiveRank) {
    return aResponsiveRank - bResponsiveRank;
  }

  if (aParts.variants.length !== bParts.variants.length) {
    return aParts.variants.length - bParts.variants.length;
  }

  return a.localeCompare(b);
}

function getResponsiveRank(variants) {
  let rank = RESPONSIVE_VARIANT_ORDER.base;
  variants.forEach((variant) => {
    const normalized = String(variant || "").toLowerCase();
    const responsiveRank = RESPONSIVE_VARIANT_ORDER[normalized];
    if (typeof responsiveRank === "number") {
      if (responsiveRank > rank) {
        rank = responsiveRank;
      }
    }
  });
  return rank;
}

function translateBaseUtility(base, context) {
  return (
    translateStaticUtility(base) ||
    translateSpacingUtility(base, context) ||
    translateSizingUtility(base, context) ||
    translateFlexUtility(base, context) ||
    translateGridUtility(base) ||
    translateAlignmentUtility(base) ||
    translateTypographyUtility(base) ||
    translateColorUtility(base) ||
    translateBorderUtility(base, context) ||
    translateRadiusUtility(base) ||
    translateShadowUtility(base) ||
    translateOpacityUtility(base) ||
    translateBackgroundUtility(base) ||
    translatePositionUtility(base, context) ||
    translateZIndexUtility(base) ||
    translateTransitionUtility(base) ||
    translateMiscUtility(base)
  );
}

function translateStaticUtility(base) {
  const map = {
    block: { display: "block" },
    "inline-block": { display: "inline-block" },
    inline: { display: "inline" },
    flex: { display: "flex" },
    "inline-flex": { display: "inline-flex" },
    grid: { display: "grid" },
    "inline-grid": { display: "inline-grid" },
    hidden: { display: "none" },
    contents: { display: "contents" },
    "table-auto": { width: "auto" },
    "overflow-x-hidden": { "overflow-x": "hidden" },
    "overflow-y-hidden": { "overflow-y": "hidden" },
    "overflow-x-auto": { "overflow-x": "auto" },
    "overflow-y-auto": { "overflow-y": "auto" },
    "overflow-x-scroll": { "overflow-x": "scroll" },
    "overflow-y-scroll": { "overflow-y": "scroll" },
    truncate: {
      overflow: "hidden",
      "text-overflow": "ellipsis",
      "white-space": "nowrap",
    },
    "text-ellipsis": { "text-overflow": "ellipsis" },
    "text-clip": { "text-overflow": "clip" },
    "whitespace-normal": { "white-space": "normal" },
    "whitespace-nowrap": { "white-space": "nowrap" },
    "whitespace-pre": { "white-space": "pre" },
    "whitespace-pre-line": { "white-space": "pre-line" },
    "whitespace-pre-wrap": { "white-space": "pre-wrap" },
    "break-words": { "overflow-wrap": "break-word" },
    "break-all": { "word-break": "break-all" },
    "bg-fixed": { "background-attachment": "fixed" },
    "bg-local": { "background-attachment": "local" },
    "bg-scroll": { "background-attachment": "scroll" },
    "bg-cover": { "background-size": "cover" },
    "bg-contain": { "background-size": "contain" },
    "bg-repeat": { "background-repeat": "repeat" },
    "bg-no-repeat": { "background-repeat": "no-repeat" },
    "bg-repeat-x": { "background-repeat": "repeat-x" },
    "bg-repeat-y": { "background-repeat": "repeat-y" },
    "bg-center": { "background-position": "center" },
    "bg-top": { "background-position": "top" },
    "bg-bottom": { "background-position": "bottom" },
    "bg-left": { "background-position": "left" },
    "bg-right": { "background-position": "right" },
    "bg-origin-border": { "background-origin": "border-box" },
    "bg-origin-padding": { "background-origin": "padding-box" },
    "bg-origin-content": { "background-origin": "content-box" },
    "bg-clip-border": { "background-clip": "border-box" },
    "bg-clip-padding": { "background-clip": "padding-box" },
    "bg-clip-content": { "background-clip": "content-box" },
    "bg-clip-text": { "background-clip": "text", color: "transparent" },
    uppercase: { "text-transform": "uppercase" },
    lowercase: { "text-transform": "lowercase" },
    capitalize: { "text-transform": "capitalize" },
    "normal-case": { "text-transform": "none" },
    bold: { "font-weight": "700" },
    italic: { "font-style": "italic" },
    "not-italic": { "font-style": "normal" },
    underline: { "text-decoration-line": "underline" },
    "line-through": { "text-decoration-line": "line-through" },
    "no-underline": { "text-decoration-line": "none" },
    antialiased: {
      "-webkit-font-smoothing": "antialiased",
      "-moz-osx-font-smoothing": "grayscale",
    },
    "subpixel-antialiased": {
      "-webkit-font-smoothing": "auto",
      "-moz-osx-font-smoothing": "auto",
    },
    "align-baseline": { "vertical-align": "baseline" },
    "align-top": { "vertical-align": "top" },
    "align-middle": { "vertical-align": "middle" },
    "align-bottom": { "vertical-align": "bottom" },
    "align-text-top": { "vertical-align": "text-top" },
    "align-text-bottom": { "vertical-align": "text-bottom" },
    "visibility-visible": { visibility: "visible" },
    "visibility-invisible": { visibility: "hidden" },
    "sr-only": {
      position: "absolute",
      width: "1px",
      height: "1px",
      padding: "0",
      margin: "-1px",
      overflow: "hidden",
      clip: "rect(0, 0, 0, 0)",
      "white-space": "nowrap",
      border: "0",
    },
    "not-sr-only": {
      position: "static",
      width: "auto",
      height: "auto",
      padding: "0",
      margin: "0",
      overflow: "visible",
      clip: "auto",
      "white-space": "normal",
    },
  };

  const entry = map[base];
  if (!entry) {
    return null;
  }

  return { declarations: objectToDeclarations(entry) };
}

function translateSpacingUtility(base, context) {
  const spacingMatch = base.match(/^(p[trblxyse]?|m[trblxyse]?|gap)-(.*)$/);
  if (spacingMatch) {
    let prefix = spacingMatch[1];
    let valueToken = spacingMatch[2];
    const isMargin = prefix.startsWith("m");

    if (prefix === "gap" && valueToken.startsWith("x-")) {
      prefix = "gapx";
      valueToken = valueToken.slice(2);
    } else if (prefix === "gap" && valueToken.startsWith("y-")) {
      prefix = "gapy";
      valueToken = valueToken.slice(2);
    }

    const properties = {
      p: ["padding"],
      px: ["padding-left", "padding-right"],
      py: ["padding-top", "padding-bottom"],
      ps: ["padding-inline-start"],
      pe: ["padding-inline-end"],
      pt: ["padding-top"],
      pr: ["padding-right"],
      pb: ["padding-bottom"],
      pl: ["padding-left"],
      m: ["margin"],
      mx: ["margin-left", "margin-right"],
      my: ["margin-top", "margin-bottom"],
      ms: ["margin-inline-start"],
      me: ["margin-inline-end"],
      mt: ["margin-top"],
      mr: ["margin-right"],
      mb: ["margin-bottom"],
      ml: ["margin-left"],
      gap: ["gap"],
      gapx: ["column-gap"],
      gapy: ["row-gap"],
    };

    const targetProps = properties[prefix];
    if (!targetProps) {
      return null;
    }

    const value = resolveSpacingValue(valueToken, {
      negative: context.negative && isMargin,
      allowAuto: isMargin,
      allowZero: true,
    });

    if (!value) {
      return null;
    }

    return { declarations: targetProps.map((prop) => ({ prop, value })) };
  }

  const insetMatch = base.match(
    /^(inset[xytrbl]?|top|right|bottom|left)-(.*)$/,
  );
  if (insetMatch) {
    const prefix = insetMatch[1];
    const token = insetMatch[2];
    const map = {
      inset: ["top", "right", "bottom", "left"],
      insetx: ["left", "right"],
      insety: ["top", "bottom"],
      insett: ["top"],
      insetr: ["right"],
      insetb: ["bottom"],
      insetl: ["left"],
      top: ["top"],
      right: ["right"],
      bottom: ["bottom"],
      left: ["left"],
    };

    const propKey = prefix.replace("-", "");
    const targets = map[propKey];
    if (!targets) {
      return null;
    }

    const value = resolveSpacingValue(token, {
      negative: context.negative,
      allowAuto: true,
    });

    if (!value) {
      return null;
    }

    return { declarations: targets.map((prop) => ({ prop, value })) };
  }

  return null;
}

function translateSizingUtility(base, context) {
  const widthMatch = base.match(/^w-(.*)$/);
  if (widthMatch) {
    const token = widthMatch[1];
    const value = resolveSizeValue(token, {
      axis: "width",
      negative: context.negative,
    });
    if (!value) {
      return null;
    }
    return { declarations: [{ prop: "width", value }] };
  }

  const heightMatch = base.match(/^h-(.*)$/);
  if (heightMatch) {
    const token = heightMatch[1];
    const value = resolveSizeValue(token, {
      axis: "height",
      negative: context.negative,
    });
    if (!value) {
      return null;
    }
    return { declarations: [{ prop: "height", value }] };
  }

  const minWidthMatch = base.match(/^min-w-(.*)$/);
  if (minWidthMatch) {
    const token = minWidthMatch[1];
    const value = resolveMinSizeValue(token, "width");
    if (!value) {
      return null;
    }
    return { declarations: [{ prop: "min-width", value }] };
  }

  const maxWidthMatch = base.match(/^max-w-(.*)$/);
  if (maxWidthMatch) {
    const token = maxWidthMatch[1];
    const value = resolveMaxWidthValue(token);
    if (!value) {
      return null;
    }
    return { declarations: [{ prop: "max-width", value }] };
  }

  const minHeightMatch = base.match(/^min-h-(.*)$/);
  if (minHeightMatch) {
    const token = minHeightMatch[1];
    const value = resolveMinSizeValue(token, "height");
    if (!value) {
      return null;
    }
    return { declarations: [{ prop: "min-height", value }] };
  }

  const maxHeightMatch = base.match(/^max-h-(.*)$/);
  if (maxHeightMatch) {
    const token = maxHeightMatch[1];
    const value = resolveMaxHeightValue(token);
    if (!value) {
      return null;
    }
    return { declarations: [{ prop: "max-height", value }] };
  }

  const aspectMatch = base.match(/^aspect-(.*)$/);
  if (aspectMatch) {
    const token = aspectMatch[1];
    const map = {
      square: "1 / 1",
      video: "16 / 9",
    };
    let value = map[token];
    if (!value) {
      value = resolveFraction(token) || parseArbitraryValue(token);
      if (value && !value.includes("/")) {
        value = value.replace(":", "/");
      }
    }
    if (!value) {
      return null;
    }
    return { declarations: [{ prop: "aspect-ratio", value }] };
  }

  return null;
}

function translateFlexUtility(base, context) {
  const map = {
    "flex-row": { "flex-direction": "row" },
    "flex-row-reverse": { "flex-direction": "row-reverse" },
    "flex-col": { "flex-direction": "column" },
    "flex-col-reverse": { "flex-direction": "column-reverse" },
    "flex-wrap": { "flex-wrap": "wrap" },
    "flex-wrap-reverse": { "flex-wrap": "wrap-reverse" },
    "flex-nowrap": { "flex-wrap": "nowrap" },

    "items-start": { "align-items": "flex-start" },
    "items-end": { "align-items": "flex-end" },
    "items-center": { "align-items": "center" },
    "items-baseline": { "align-items": "baseline" },
    "items-stretch": { "align-items": "stretch" },

    "justify-start": { "justify-content": "flex-start" },
    "justify-end": { "justify-content": "flex-end" },
    "justify-center": { "justify-content": "center" },
    "justify-between": { "justify-content": "space-between" },
    "justify-around": { "justify-content": "space-around" },
    "justify-evenly": { "justify-content": "space-evenly" },

    "justify-items-start": { "justify-items": "start" },
    "justify-items-end": { "justify-items": "end" },
    "justify-items-center": { "justify-items": "center" },
    "justify-items-stretch": { "justify-items": "stretch" },

    "justify-self-auto": { "justify-self": "auto" },
    "justify-self-start": { "justify-self": "start" },
    "justify-self-end": { "justify-self": "end" },
    "justify-self-center": { "justify-self": "center" },
    "justify-self-stretch": { "justify-self": "stretch" },

    "content-center": { "align-content": "center" },
    "content-start": { "align-content": "flex-start" },
    "content-end": { "align-content": "flex-end" },
    "content-between": { "align-content": "space-between" },
    "content-around": { "align-content": "space-around" },
    "content-stretch": { "align-content": "stretch" },

    "self-auto": { "align-self": "auto" },
    "self-start": { "align-self": "flex-start" },
    "self-end": { "align-self": "flex-end" },
    "self-center": { "align-self": "center" },
    "self-stretch": { "align-self": "stretch" },
    "self-baseline": { "align-self": "baseline" },

    grow: { "flex-grow": "1" },
    "grow-0": { "flex-grow": "0" },
    shrink: { "flex-shrink": "1" },
    "shrink-0": { "flex-shrink": "0" },
    "flex-1": { flex: "1 1 0%" },
    "flex-auto": { flex: "1 1 auto" },
    "flex-initial": { flex: "0 1 auto" },
    "flex-none": { flex: "none" },
    "place-items-start": { "place-items": "start" },
    "place-items-end": { "place-items": "end" },
    "place-items-center": { "place-items": "center" },
    "place-items-stretch": { "place-items": "stretch" },
    "place-content-center": { "place-content": "center" },
    "place-content-start": { "place-content": "start" },
    "place-content-end": { "place-content": "end" },
    "place-content-between": { "place-content": "space-between" },
    "place-content-around": { "place-content": "space-around" },
    "place-content-evenly": { "place-content": "space-evenly" },
    "place-content-stretch": { "place-content": "stretch" },
  };

  if (map[base]) {
    return { declarations: objectToDeclarations(map[base]) };
  }

  const basisMatch = base.match(/^basis-(.*)$/);
  if (basisMatch) {
    const token = basisMatch[1];
    const value = resolveSizeValue(token, {
      axis: "width",
      negative: context.negative,
    });
    if (!value) {
      return null;
    }
    return { declarations: [{ prop: "flex-basis", value }] };
  }

  const orderMatch = base.match(/^order-(-?\d+)$/);
  if (orderMatch) {
    return { declarations: [{ prop: "order", value: orderMatch[1] }] };
  }

  if (base === "order-first") {
    return { declarations: [{ prop: "order", value: "-9999" }] };
  }

  if (base === "order-last") {
    return { declarations: [{ prop: "order", value: "9999" }] };
  }

  return null;
}

function translateGridUtility(base) {
  const map = {
    "grid-flow-row": { "grid-auto-flow": "row" },
    "grid-flow-col": { "grid-auto-flow": "column" },
    "grid-flow-dense": { "grid-auto-flow": "row dense" },
    "auto-rows-auto": { "grid-auto-rows": "auto" },
    "auto-cols-auto": { "grid-auto-columns": "auto" },
    "auto-rows-min": { "grid-auto-rows": "min-content" },
    "auto-cols-min": { "grid-auto-columns": "min-content" },
    "auto-rows-max": { "grid-auto-rows": "max-content" },
    "auto-cols-max": { "grid-auto-columns": "max-content" },
    "auto-rows-fr": { "grid-auto-rows": "minmax(0, 1fr)" },
    "auto-cols-fr": { "grid-auto-columns": "minmax(0, 1fr)" },
  };

  if (map[base]) {
    return { declarations: objectToDeclarations(map[base]) };
  }

  const colsMatch = base.match(/^grid-cols-(.*)$/);
  if (colsMatch) {
    const token = colsMatch[1];
    if (token === "none") {
      return {
        declarations: [{ prop: "grid-template-columns", value: "none" }],
      };
    }
    const count = Number.parseInt(token, 10);
    if (!Number.isNaN(count)) {
      return {
        declarations: [
          {
            prop: "grid-template-columns",
            value: `repeat(${count}, minmax(0, 1fr))`,
          },
        ],
      };
    }
    const arbitrary = parseArbitraryValue(token);
    if (arbitrary) {
      return {
        declarations: [{ prop: "grid-template-columns", value: arbitrary }],
      };
    }
  }

  const rowsMatch = base.match(/^grid-rows-(.*)$/);
  if (rowsMatch) {
    const token = rowsMatch[1];
    if (token === "none") {
      return { declarations: [{ prop: "grid-template-rows", value: "none" }] };
    }
    const count = Number.parseInt(token, 10);
    if (!Number.isNaN(count)) {
      return {
        declarations: [
          {
            prop: "grid-template-rows",
            value: `repeat(${count}, minmax(0, 1fr))`,
          },
        ],
      };
    }
    const arbitrary = parseArbitraryValue(token);
    if (arbitrary) {
      return {
        declarations: [{ prop: "grid-template-rows", value: arbitrary }],
      };
    }
  }

  const colSpanMatch = base.match(/^col-span-(.*)$/);
  if (colSpanMatch) {
    const token = colSpanMatch[1];
    if (token === "full") {
      return { declarations: [{ prop: "grid-column", value: "1 / -1" }] };
    }
    const span = Number.parseInt(token, 10);
    if (!Number.isNaN(span)) {
      return {
        declarations: [
          { prop: "grid-column", value: `span ${span} / span ${span}` },
        ],
      };
    }
  }

  const rowSpanMatch = base.match(/^row-span-(.*)$/);
  if (rowSpanMatch) {
    const token = rowSpanMatch[1];
    if (token === "full") {
      return { declarations: [{ prop: "grid-row", value: "1 / -1" }] };
    }
    const span = Number.parseInt(token, 10);
    if (!Number.isNaN(span)) {
      return {
        declarations: [
          { prop: "grid-row", value: `span ${span} / span ${span}` },
        ],
      };
    }
  }

  const colStartMatch = base.match(/^col-start-(.*)$/);
  if (colStartMatch) {
    const token = colStartMatch[1];
    if (token === "auto") {
      return { declarations: [{ prop: "grid-column-start", value: "auto" }] };
    }
    const value = Number.parseInt(token, 10);
    if (!Number.isNaN(value)) {
      return {
        declarations: [{ prop: "grid-column-start", value: String(value) }],
      };
    }
  }

  const colEndMatch = base.match(/^col-end-(.*)$/);
  if (colEndMatch) {
    const token = colEndMatch[1];
    if (token === "auto") {
      return { declarations: [{ prop: "grid-column-end", value: "auto" }] };
    }
    const value = Number.parseInt(token, 10);
    if (!Number.isNaN(value)) {
      return {
        declarations: [{ prop: "grid-column-end", value: String(value) }],
      };
    }
  }

  const rowStartMatch = base.match(/^row-start-(.*)$/);
  if (rowStartMatch) {
    const token = rowStartMatch[1];
    if (token === "auto") {
      return { declarations: [{ prop: "grid-row-start", value: "auto" }] };
    }
    const value = Number.parseInt(token, 10);
    if (!Number.isNaN(value)) {
      return {
        declarations: [{ prop: "grid-row-start", value: String(value) }],
      };
    }
  }

  const rowEndMatch = base.match(/^row-end-(.*)$/);
  if (rowEndMatch) {
    const token = rowEndMatch[1];
    if (token === "auto") {
      return { declarations: [{ prop: "grid-row-end", value: "auto" }] };
    }
    const value = Number.parseInt(token, 10);
    if (!Number.isNaN(value)) {
      return { declarations: [{ prop: "grid-row-end", value: String(value) }] };
    }
  }

  return null;
}

function translateAlignmentUtility(base) {
  const map = {
    "text-left": { "text-align": "left" },
    "text-right": { "text-align": "right" },
    "text-center": { "text-align": "center" },
    "text-justify": { "text-align": "justify" },
    "text-start": { "text-align": "start" },
    "text-end": { "text-align": "end" },
  };

  if (map[base]) {
    return { declarations: objectToDeclarations(map[base]) };
  }

  return null;
}

function translateTypographyUtility(base) {
  const fontMatch = base.match(/^font-(.*)$/);
  if (fontMatch) {
    const token = fontMatch[1];
    if (FONT_WEIGHT_SCALE[token]) {
      return {
        declarations: [
          { prop: "font-weight", value: FONT_WEIGHT_SCALE[token] },
        ],
      };
    }
    if (FONT_FAMILY_SCALE[token]) {
      return {
        declarations: [
          { prop: "font-family", value: FONT_FAMILY_SCALE[token] },
        ],
      };
    }
  }

  const textSizeMatch = base.match(/^text-(.*)$/);
  if (textSizeMatch) {
    const token = textSizeMatch[1];
    if (FONT_SIZE_SCALE[token]) {
      const entry = FONT_SIZE_SCALE[token];
      return {
        declarations: [
          { prop: "font-size", value: entry.size },
          { prop: "line-height", value: entry.lineHeight },
        ],
      };
    }
  }

  const leadingMatch = base.match(/^leading-(.*)$/);
  if (leadingMatch) {
    const token = leadingMatch[1];
    if (LINE_HEIGHT_SCALE[token]) {
      return {
        declarations: [
          { prop: "line-height", value: LINE_HEIGHT_SCALE[token] },
        ],
      };
    }
    const arbitrary = parseArbitraryValue(token);
    if (arbitrary) {
      return { declarations: [{ prop: "line-height", value: arbitrary }] };
    }
  }

  const trackingMatch = base.match(/^tracking-(.*)$/);
  if (trackingMatch) {
    const token = trackingMatch[1];
    if (LETTER_SPACING_SCALE[token]) {
      return {
        declarations: [
          { prop: "letter-spacing", value: LETTER_SPACING_SCALE[token] },
        ],
      };
    }
    const arbitrary = parseArbitraryValue(token);
    if (arbitrary) {
      return { declarations: [{ prop: "letter-spacing", value: arbitrary }] };
    }
  }

  const listMatch = base.match(/^list-(.*)$/);
  if (listMatch) {
    const token = listMatch[1];
    const map = {
      none: "none",
      disc: "disc",
      decimal: "decimal",
    };
    if (map[token]) {
      return { declarations: [{ prop: "list-style-type", value: map[token] }] };
    }
  }

  const decorationMatch = base.match(/^decoration-(.*)$/);
  if (decorationMatch) {
    const token = decorationMatch[1];
    const value = resolveColorValue(token);
    if (value) {
      return { declarations: [{ prop: "text-decoration-color", value }] };
    }
  }

  return null;
}

function translateColorUtility(base) {
  const colorMatch = base.match(/^(bg|text|border|outline|fill|stroke)-(.*)$/);
  if (!colorMatch) {
    return null;
  }

  const prefix = colorMatch[1];
  const token = colorMatch[2];
  const value = resolveColorValue(token);
  if (!value) {
    return null;
  }

  const propertyMap = {
    bg: "background-color",
    text: "color",
    border: "border-color",
    outline: "outline-color",
    fill: "fill",
    stroke: "stroke",
  };

  return { declarations: [{ prop: propertyMap[prefix], value }] };
}

function buildColorPalette() {
  const palette = {
    transparent: "transparent",
    current: "currentColor",
    black: "var(--color-black)",
    white: "var(--color-white)",
  };

  COLOR_FAMILIES.forEach((family) => {
    const entry = { DEFAULT: `var(--color-${family}-500)` };
    COLOR_SHADES.forEach((shade) => {
      entry[shade] = `var(--color-${family}-${shade})`;
    });
    palette[family] = entry;
  });

  return palette;
}

function translateBorderUtility(base) {
  if (base === "border") {
    return {
      declarations: [
        { prop: "border-width", value: BORDER_WIDTH_SCALE.DEFAULT },
      ],
    };
  }

  const widthMatch = base.match(/^border(?:-([trblxy]))?-(\d+)$/);
  if (widthMatch) {
    const position = widthMatch[1];
    const widthKey = widthMatch[2];
    const value = BORDER_WIDTH_SCALE[widthKey];
    if (!value) {
      return null;
    }
    const map = {
      undefined: ["border-width"],
      t: ["border-top-width"],
      r: ["border-right-width"],
      b: ["border-bottom-width"],
      l: ["border-left-width"],
      x: ["border-left-width", "border-right-width"],
      y: ["border-top-width", "border-bottom-width"],
    };
    const props = map[position];
    if (!props) {
      return null;
    }
    return { declarations: props.map((prop) => ({ prop, value })) };
  }

  const styleMatch = base.match(/^border-(solid|dashed|dotted|double|none)$/);
  if (styleMatch) {
    return { declarations: [{ prop: "border-style", value: styleMatch[1] }] };
  }

  if (base === "border-0") {
    return { declarations: [{ prop: "border-width", value: "0px" }] };
  }

  if (base === "border-collapse") {
    return { declarations: [{ prop: "border-collapse", value: "collapse" }] };
  }

  if (base === "border-separate") {
    return { declarations: [{ prop: "border-collapse", value: "separate" }] };
  }

  return null;
}

function translateRadiusUtility(base) {
  if (!base.startsWith("border-rounded") && !base.startsWith("rounded")) {
    return null;
  }

  const tokens = base.split("-");
  tokens.shift();
  if (tokens.length > 1) {
    tokens.shift();
  }

  let cornerToken = null;
  let sizeToken = "DEFAULT";

  if (tokens.length === 1) {
    if (BORDER_RADIUS_SCALE[tokens[0]]) {
      sizeToken = tokens[0];
    } else {
      cornerToken = tokens[0];
    }
  } else if (tokens.length >= 2) {
    cornerToken = tokens[0];
    sizeToken = tokens[1];
  }

  if (!BORDER_RADIUS_SCALE[sizeToken]) {
    return null;
  }
  const value = BORDER_RADIUS_SCALE[sizeToken];

  const cornerMap = {
    null: ["border-radius"],
    undefined: ["border-radius"],
    "": ["border-radius"],
    t: ["border-top-left-radius", "border-top-right-radius"],
    r: ["border-top-right-radius", "border-bottom-right-radius"],
    b: ["border-bottom-left-radius", "border-bottom-right-radius"],
    l: ["border-top-left-radius", "border-bottom-left-radius"],
    tl: ["border-top-left-radius"],
    tr: ["border-top-right-radius"],
    br: ["border-bottom-right-radius"],
    bl: ["border-bottom-left-radius"],
    ts: ["border-top-left-radius", "border-top-right-radius"],
    te: ["border-top-right-radius", "border-bottom-right-radius"],
    bs: ["border-bottom-left-radius", "border-bottom-right-radius"],
    be: ["border-bottom-right-radius", "border-top-right-radius"],
    ss: ["border-top-left-radius"],
    se: ["border-top-right-radius"],
    es: ["border-bottom-left-radius"],
    ee: ["border-bottom-right-radius"],
  };

  const key = cornerToken == null ? null : cornerToken;
  const props = cornerMap[key];
  if (!props) {
    return null;
  }

  return { declarations: props.map((prop) => ({ prop, value })) };
}

function translateShadowUtility(base) {
  const token = base.replace("shadow", "").replace("-", "") || "DEFAULT";
  if (BOX_SHADOW_SCALE[token] === undefined) {
    return null;
  }
  return {
    declarations: [{ prop: "box-shadow", value: BOX_SHADOW_SCALE[token] }],
  };
}

function translateOpacityUtility(base) {
  const match = base.match(/^opacity-(\d{1,3})$/);
  if (!match) {
    return null;
  }
  const value = OPACITY_SCALE[match[1]];
  if (!value) {
    return null;
  }
  return { declarations: [{ prop: "opacity", value }] };
}

function translateBackgroundUtility(base) {
  const gradientMatch = base.match(/^bg-gradient-to-([tblr]{1,2})$/);
  if (gradientMatch) {
    const map = {
      t: "to top",
      tr: "to top right",
      r: "to right",
      br: "to bottom right",
      b: "to bottom",
      bl: "to bottom left",
      l: "to left",
      tl: "to top left",
    };
    return {
      declarations: [
        {
          prop: "background-image",
          value: `linear-gradient(${map[gradientMatch[1]]}, var(--gp-gradient-stops))`,
        },
      ],
    };
  }

  if (base === "from-transparent") {
    return {
      declarations: [{ prop: "--gp-gradient-from", value: "transparent" }],
    };
  }

  if (base === "via-transparent") {
    return {
      declarations: [
        {
          prop: "--gp-gradient-stops",
          value:
            "var(--gp-gradient-from), transparent, var(--gp-gradient-to, rgba(255,255,255,0))",
        },
      ],
    };
  }

  if (base.startsWith("from-")) {
    const value = resolveColorValue(base.slice(5));
    if (!value) {
      return null;
    }
    return {
      declarations: [
        { prop: "--gp-gradient-from", value },
        {
          prop: "--gp-gradient-stops",
          value:
            "var(--gp-gradient-from), var(--gp-gradient-to, rgba(255,255,255,0))",
        },
      ],
    };
  }

  if (base.startsWith("via-")) {
    const value = resolveColorValue(base.slice(4));
    if (!value) {
      return null;
    }
    return {
      declarations: [
        {
          prop: "--gp-gradient-stops",
          value: `var(--gp-gradient-from), ${value}, var(--gp-gradient-to, rgba(255,255,255,0))`,
        },
      ],
    };
  }

  if (base.startsWith("to-")) {
    const value = resolveColorValue(base.slice(3));
    if (!value) {
      return null;
    }
    return { declarations: [{ prop: "--gp-gradient-to", value }] };
  }

  return null;
}

function translatePositionUtility(base, context) {
  const positionMap = {
    static: "static",
    relative: "relative",
    absolute: "absolute",
    fixed: "fixed",
    sticky: "sticky",
  };

  if (positionMap[base]) {
    return { declarations: [{ prop: "position", value: positionMap[base] }] };
  }

  if (base === "isolate") {
    return { declarations: [{ prop: "isolation", value: "isolate" }] };
  }

  if (base === "isolation-auto") {
    return { declarations: [{ prop: "isolation", value: "auto" }] };
  }

  return null;
}

function translateZIndexUtility(base) {
  const match = base.match(/^z-(-?\d+|auto)$/);
  if (!match) {
    return null;
  }
  const token = match[1];
  const value = Z_INDEX_SCALE[token] || token;
  return { declarations: [{ prop: "z-index", value }] };
}

function translateTransitionUtility(base) {
  if (base === "transition") {
    return {
      declarations: [
        {
          prop: "transition-property",
          value: TRANSITION_PROPERTY_SCALE.DEFAULT,
        },
        { prop: "transition-duration", value: "150ms" },
        {
          prop: "transition-timing-function",
          value: TRANSITION_TIMING_SCALE["in-out"],
        },
      ],
    };
  }

  const propMatch = base.match(/^transition-(.*)$/);
  if (propMatch) {
    const token = propMatch[1];
    const property = TRANSITION_PROPERTY_SCALE[token];
    if (!property) {
      return null;
    }
    return { declarations: [{ prop: "transition-property", value: property }] };
  }

  const durationMatch = base.match(/^duration-(\d+)$/);
  if (durationMatch) {
    const value = TRANSITION_DURATION_SCALE[durationMatch[1]];
    if (!value) {
      return null;
    }
    return { declarations: [{ prop: "transition-duration", value }] };
  }

  const delayMatch = base.match(/^delay-(\d+)$/);
  if (delayMatch) {
    const value = TRANSITION_DURATION_SCALE[delayMatch[1]];
    if (!value) {
      return null;
    }
    return { declarations: [{ prop: "transition-delay", value }] };
  }

  const easeMatch = base.match(/^ease-(.*)$/);
  if (easeMatch) {
    const token = easeMatch[1];
    const value = TRANSITION_TIMING_SCALE[token];
    if (!value) {
      return null;
    }
    return { declarations: [{ prop: "transition-timing-function", value }] };
  }

  return null;
}

function translateMiscUtility(base) {
  if (base === "pointer-events-none") {
    return { declarations: [{ prop: "pointer-events", value: "none" }] };
  }

  if (base === "pointer-events-auto") {
    return { declarations: [{ prop: "pointer-events", value: "auto" }] };
  }

  if (base === "select-none") {
    return { declarations: [{ prop: "user-select", value: "none" }] };
  }

  if (base === "select-text") {
    return { declarations: [{ prop: "user-select", value: "text" }] };
  }

  if (base === "select-all") {
    return { declarations: [{ prop: "user-select", value: "all" }] };
  }

  if (base === "select-auto") {
    return { declarations: [{ prop: "user-select", value: "auto" }] };
  }

  if (base === "shadow-none") {
    return { declarations: [{ prop: "box-shadow", value: "none" }] };
  }

  if (base === "outline-none") {
    return {
      declarations: [
        { prop: "outline", value: "2px solid transparent" },
        { prop: "outline-offset", value: "2px" },
      ],
    };
  }

  if (base === "outline") {
    return { declarations: [{ prop: "outline-style", value: "solid" }] };
  }

  const cursorMatch = base.match(/^cursor-(.*)$/);
  if (cursorMatch) {
    return { declarations: [{ prop: "cursor", value: cursorMatch[1] }] };
  }

  const blendMatch = base.match(/^mix-blend-(.*)$/);
  if (blendMatch) {
    return { declarations: [{ prop: "mix-blend-mode", value: blendMatch[1] }] };
  }

  return null;
}

function resolveSpacingValue(token, options) {
  options = options || {};
  if (token === "auto" && options.allowAuto) {
    return "auto";
  }

  if (FRACTION_SCALE[token]) {
    let value = FRACTION_SCALE[token];
    if (options.negative) {
      value = negateValue(value);
    }
    return value;
  }

  if (SPACING_SCALE[token] !== undefined) {
    let value = SPACING_SCALE[token];
    if (options.negative && value !== "0px") {
      value = negateValue(value);
    }
    return value;
  }

  const arbitrary = parseArbitraryValue(token);
  if (arbitrary) {
    return options.negative ? negateValue(arbitrary) : arbitrary;
  }

  if (/^-?\d+(?:\.\d+)?(rem|em|px|%)$/.test(token)) {
    return options.negative ? negateValue(token) : token;
  }

  return null;
}

function resolveSizeValue(token, options) {
  options = options || {};
  if (token === "auto") {
    return "auto";
  }
  if (token === "full") {
    return "100%";
  }
  if (token === "screen") {
    return options.axis === "width" ? "100vw" : "100vh";
  }
  if (token === "fit") {
    return "fit-content";
  }
  if (token === "min") {
    return "min-content";
  }
  if (token === "max") {
    return "max-content";
  }

  if (FRACTION_SCALE[token]) {
    let value = FRACTION_SCALE[token];
    if (options.negative) {
      value = negateValue(value);
    }
    return value;
  }

  if (SPACING_SCALE[token] !== undefined) {
    let value = SPACING_SCALE[token];
    if (options.negative && value !== "0px") {
      value = negateValue(value);
    }
    return value;
  }

  const arbitrary = parseArbitraryValue(token);
  if (arbitrary) {
    return options.negative ? negateValue(arbitrary) : arbitrary;
  }

  if (/^-?\d+(?:\.\d+)?(rem|em|px|%)$/.test(token)) {
    return options.negative ? negateValue(token) : token;
  }

  return null;
}

function resolveMinSizeValue(token, axis) {
  if (token === "0") {
    return "0px";
  }
  if (token === "full") {
    return "100%";
  }
  if (token === "screen") {
    return axis === "width" ? "100vw" : "100vh";
  }
  const arbitrary = parseArbitraryValue(token);
  if (arbitrary) {
    return arbitrary;
  }
  if (SPACING_SCALE[token] !== undefined) {
    return SPACING_SCALE[token];
  }
  return null;
}

function resolveMaxWidthValue(token) {
  if (MAX_WIDTH_SCALE[token]) {
    return MAX_WIDTH_SCALE[token];
  }
  const arbitrary = parseArbitraryValue(token);
  if (arbitrary) {
    return arbitrary;
  }
  if (SPACING_SCALE[token] !== undefined) {
    return SPACING_SCALE[token];
  }
  return null;
}

function resolveMaxHeightValue(token) {
  if (token === "full") {
    return "100%";
  }
  if (token === "screen") {
    return "100vh";
  }
  const arbitrary = parseArbitraryValue(token);
  if (arbitrary) {
    return arbitrary;
  }
  if (SPACING_SCALE[token] !== undefined) {
    return SPACING_SCALE[token];
  }
  return null;
}

function resolveColorValue(token) {
  if (COLOR_PALETTE[token]) {
    const entry = COLOR_PALETTE[token];
    if (typeof entry === "string") {
      return entry;
    }
    if (entry.DEFAULT) {
      return entry.DEFAULT;
    }
  }

  const parts = token.split("-");
  if (parts.length >= 2) {
    const family = parts[0];
    const shade = parts.slice(1).join("-");
    const palette = COLOR_PALETTE[family];
    if (palette && palette[shade] !== undefined) {
      return palette[shade];
    }
  }

  const arbitrary = parseArbitraryValue(token);
  if (arbitrary) {
    return arbitrary;
  }

  return null;
}

function negateValue(value) {
  if (value.startsWith("-")) {
    return value.slice(1);
  }
  if (value === "0") {
    return "0";
  }
  if (value === "0px") {
    return "0px";
  }
  return `-${value}`;
}

function parseArbitraryValue(token) {
  const match = token.match(ARBITRARY_VALUE_REGEX);
  if (!match) {
    return null;
  }
  return match[1].replace(/_/g, " ");
}

function resolveFraction(token) {
  if (!token.includes("/")) {
    return null;
  }
  const [numerator, denominator] = token.split("/").map(Number.parseFloat);
  if (
    !Number.isFinite(numerator) ||
    !Number.isFinite(denominator) ||
    denominator === 0
  ) {
    return null;
  }
  return `${((numerator / denominator) * 100).toFixed(6)}%`;
}

function buildSelector(rawName, variants) {
  const wrappers = [];
  let selector = `.${escapeClassName(rawName)}`;
  let prefix = "";
  let suffix = "";

  const pseudoElements = [];

  variants.forEach((variant) => {
    const normalizedVariant = String(variant || "").toLowerCase();

    if (BREAKPOINTS[variant]) {
      wrappers.push({
        type: "media",
        params: `(min-width: ${BREAKPOINTS[variant]})`,
      });
      return;
    }

    const pseudoMap = {
      hover: ":hover",
      focus: ":focus",
      active: ":active",
      visited: ":visited",
      disabled: ":disabled",
      enabled: ":enabled",
      target: ":target",
      checked: ":checked",
      required: ":required",
      optional: ":optional",
      valid: ":valid",
      invalid: ":invalid",
      "in-range": ":in-range",
      "out-of-range": ":out-of-range",
      "read-only": ":read-only",
      readonly: ":read-only",
      "read-write": ":read-write",
      "placeholder-shown": ":placeholder-shown",
      placeholder: "::placeholder",
      selection: "::selection",
      marker: "::marker",
      backdrop: "::backdrop",
      before: "::before",
      after: "::after",
      file: "::file-selector-button",
      focuswithin: ":focus-within",
      "focus-within": ":focus-within",
      focusvisible: ":focus-visible",
      "focus-visible": ":focus-visible",
      first: ":first-child",
      "first-child": ":first-child",
      "first-of-type": ":first-of-type",
      last: ":last-child",
      "last-child": ":last-child",
      "last-of-type": ":last-of-type",
      even: ":nth-child(even)",
      odd: ":nth-child(odd)",
      "only-child": ":only-child",
      "only-of-type": ":only-of-type",
      empty: ":empty",
    };

    const pseudo = pseudoMap[variant] || pseudoMap[normalizedVariant];
    if (pseudo) {
      if (pseudo.startsWith("::")) {
        pseudoElements.push(pseudo);
      } else {
        suffix += pseudo;
      }
      return;
    }

    if (normalizedVariant === "dark") {
      prefix = combineSelectorPrefix(prefix, ".dark");
      return;
    }

    if (normalizedVariant === "group-hover") {
      prefix = combineSelectorPrefix(prefix, ".group:hover");
      return;
    }

    if (normalizedVariant === "group-focus") {
      prefix = combineSelectorPrefix(prefix, ".group:focus");
      return;
    }

    if (normalizedVariant === "motion-safe") {
      wrappers.push({
        type: "media",
        params: "(prefers-reduced-motion: no-preference)",
      });
      return;
    }

    if (normalizedVariant === "motion-reduce") {
      wrappers.push({
        type: "media",
        params: "(prefers-reduced-motion: reduce)",
      });
      return;
    }

    if (normalizedVariant === "print") {
      wrappers.push({ type: "media", params: "print" });
      return;
    }
  });

  if (pseudoElements.length) {
    suffix += pseudoElements.join("");
  }

  if (prefix) {
    selector = `${prefix} ${selector}`;
  }
  if (suffix) {
    selector += suffix;
  }

  return { selector, wrappers };
}

function combineSelectorPrefix(existing, addition) {
  if (!existing) {
    return addition;
  }
  return `${existing} ${addition}`;
}

function renderCssRule(rule) {
  const declarations = rule.declarations
    .map((decl) => `  ${decl.prop}: ${decl.value};`)
    .join("\n");
  let block = `${rule.selector} {\n${declarations}\n}`;

  rule.wrappers
    .slice()
    .reverse()
    .forEach((wrapper) => {
      if (wrapper.type === "media") {
        block = `@media ${wrapper.params} {\n${indentBlock(block)}\n}`;
      } else if (wrapper.type === "supports") {
        block = `@supports ${wrapper.params} {\n${indentBlock(block)}\n}`;
      }
    });

  return block;
}

function indentBlock(block) {
  return block
    .split("\n")
    .map((line) => (line ? `  ${line}` : line))
    .join("\n");
}

function escapeClassName(className) {
  return className
    .replace(/\\/g, "\\\\")
    .replace(/([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g, "\\$1");
}

function objectToDeclarations(record) {
  return Object.entries(record).map(([prop, value]) => ({ prop, value }));
}

function ensureDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function walkDirectory(dir, onFile) {
  if (!fs.existsSync(dir)) {
    return;
  }
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  entries.forEach((entry) => {
    if (entry.name.startsWith(".")) {
      return;
    }
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDirectory(fullPath, onFile);
    } else if (entry.isFile()) {
      onFile(fullPath);
    }
  });
}

function parseArgs(args) {
  let srcDir = DEFAULT_SRC_DIR;
  let outputFile = DEFAULT_OUTPUT;
  let verbose = false;
  let bannerComment = "";

  for (let i = 0; i < args.length; i += 1) {
    const token = args[i];
    switch (token) {
      case "--src":
        srcDir = path.resolve(process.cwd(), args[++i]);
        break;
      case "--out":
        outputFile = path.resolve(process.cwd(), args[++i]);
        break;
      case "--verbose":
        verbose = true;
        break;
      case "--banner":
        bannerComment = args[++i] || "";
        break;
      case "--help":
      case "-h":
        printHelp();
        process.exit(0);
      default:
        if (token.startsWith("-")) {
          console.error(`Unknown option: ${token}`);
          printHelp();
          process.exit(1);
        }
        break;
    }
  }

  return { srcDir, outputFile, verbose, bannerComment };
}

function printHelp() {
  console.log("Usage: node tools/extract-css-classes.js [options]");
  console.log("");
  console.log("Options:");
  console.log("  --src <dir>      Root directory to scan (default: src)");
  console.log(
    "  --out <file>     Output CSS file path (default: src/css/generated-classes.css)",
  );
  console.log(
    "  --banner <text>  Optional banner comment for the generated CSS",
  );
  console.log("  --verbose        Print processed files");
  console.log("  --help           Display this help message");
}

main();
