export interface BlockableUI {
  /**
   * Finds the HTML element that should be blocked.
   * @return The blockable HTML element.
   */
  findBlockableElement(): HTMLElement;
}
