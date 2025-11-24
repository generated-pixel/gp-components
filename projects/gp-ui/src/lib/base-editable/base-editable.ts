import { booleanAttribute, computed, Directive, input, signal } from '@angular/core';
import { Base } from '../base/base';

@Directive({
  standalone: true,
})
export class BaseEditable extends Base {
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

  /**
   * Whether the input is read-only.
   */
  readonly = input(undefined, { transform: booleanAttribute });

  /**
   * The input name.
   */
  name = input<string | undefined>();

  value: string | number | boolean | undefined | Array<any> | null = undefined;

  _disabled = signal<boolean>(false);
  $disabled = computed(() => this.disabled() || this._disabled());

  onModelChanged: Function = () => {};
  onModelTouched: Function = () => {};

  updateDisabledState(isDisabled: boolean) {
    this._disabled.set(isDisabled);
  }

  /**
   * Writes a value to the input.
   * @param obj
   */
  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }

  /**
   * Registers a callback function that should be called when the control's value changes in the UI.
   * @param fn
   */
  registerOnChange(fn: any): void {
    this.onModelChanged = fn;
  }

  /**
   * Registers a callback function that should be called when the control is touched.
   * @param fn
   */
  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }

  /**
   * Sets the disabled state of the control.
   * @param isDisabled
   */
  setDisabledState?(isDisabled: boolean): void {
    this.updateDisabledState(isDisabled);
    this.cd.markForCheck();
  }
}
