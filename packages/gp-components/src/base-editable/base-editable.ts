import { booleanAttribute, Component, Directive, input } from '@angular/core';

@Directive({
  standalone: true,
})
export class BaseEditable {
  /**
   *  Whether the input is required.
   */
  required = input(undefined, { transform: booleanAttribute });

  /**
   * Whether the input is invalid.
   */
  invalid = input(undefined, { transform: booleanAttribute });

  /**
   * Whether the input is disabled.
   */
  disabled = input(undefined, { transform: booleanAttribute });
}
