export interface GpThemeModeDictionary<T> {
  light?: T;
  dark?: T;
  [mode: string]: T | undefined;
}
