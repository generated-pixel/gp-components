import { Directive, input, numberAttribute } from '@angular/core';
import { BaseEditable } from '../base-editable/base-editable';

@Directive({
  standalone: true,
})
export class BaseInput extends BaseEditable {
  /**
   * The input element ID.
   */
  inputId = input<string | undefined>();

  /**
   * The minimum length of the input value.
   */
  minLength = input<number | null | undefined>();

  /**
   * The maximum length of the input value.
   */
  maxLength = input<number | null | undefined>();

  /**
   * The input's tabindex.
   */
  readonly tabIndex = input<number, unknown>(undefined, {
    transform: numberAttribute,
  });
}
