import { StyleValue } from '../base/style/base.style';

export type GpThemePrimitiveScale = Record<string, StyleValue>;

export type GpThemePrimitiveDefinition = Record<string, GpThemePrimitiveScale | StyleValue>;
