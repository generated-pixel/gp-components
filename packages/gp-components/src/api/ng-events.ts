import type {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

export interface NgEvents {
  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Define an `onInit` method to handle any additional initialization tasks.
   * @see {@link OnInit#ngOnInit}
   */
  onInit(): void;

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Define an `onChanges` method to handle any additional initialization tasks.
   * @see {@link OnChanges#ngOnChanges}
   *
   * @param changes - The changed properties.
   */

  onChanges(changes: SimpleChanges): void;
  /**
   * Lifecycle hook that is called once, after the first `onDoCheck`.
   * Define an `afterContentInit` method to handle any additional initialization tasks.
   * @see {@link DoCheck#ngDoCheck}
   */

  onDoCheck(): void;

  /**
   * Lifecycle hook that is called once, after the first `onAfterContentInit`.
   * Define an `afterViewInit` method to handle any additional initialization tasks.
   * @see {@link AfterContentInit#ngAfterContentInit}
   */
  onAfterContentInit(): void;

  /**
   * Lifecycle hook that is called after the default change detector has completed checking all content
   * of a directive.
   * Define an `afterContentChecked` method to handle any additional initialization tasks.
   * @see {@link AfterContentChecked#ngAfterContentChecked}
   */
  onAfterContentChecked(): void;

  /**
   * Lifecycle hook that is called just before the directive is destroyed.
   * Define an `onDestroy` method to handle any additional cleanup tasks.
   * @see {@link OnDestroy#ngOnDestroy}
   */
  onDestroy(): void;

  /**
   * Lifecycle hook that is called once, after the first `onAfterViewChecked`.
   * Define an `afterViewInit` method to handle any additional initialization tasks.
   * @see {@link AfterViewInit#ngAfterViewInit}
   */
  onAfterViewInit(): void;

  /**
   * Lifecycle hook that is called after the default change detector has completed checking the view
   * of a directive.
   * Define an `afterViewChecked` method to handle any additional initialization tasks.
   * @see {@link AfterViewChecked#ngAfterViewChecked}
   */
  onAfterViewChecked(): void;
}
