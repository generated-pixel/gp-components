import { Directive, input } from '@angular/core';

@Directive({
  standalone: true,
})
export class BaseInput {
  /**
   * The minimum length of the input value.
   */
  minLength = input<number | null | undefined>();

  /**
   * The maximum length of the input value.
   */
  maxLength = input<number | null | undefined>();
}
