import {
  ChangeDetectorRef,
  Directive,
  DOCUMENT,
  ElementRef,
  inject,
  Injector,
  input,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { GpConfig } from '../config/gp-config';

@Directive({
  standalone: true,
})
export class Base {
  public document: Document = inject(DOCUMENT);

  /**
   * The host element reference.
   */
  public elementRef: ElementRef = inject(ElementRef);

  /**
   * The injector instance.
   */
  public readonly injector: Injector = inject(Injector);

  /**
   * The change detector reference.
   */
  public readonly changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);

  /**
   * The renderer instance.
   */
  public renderer: Renderer2 = inject(Renderer2);

  /**
   * The global configuration service.
   */
  public config: GpConfig = inject(GpConfig);

  /**
   * The component Id.
   */
  public readonly id = input<string | undefined>(undefined);

  /**
   * The component name.
   */
  get $name() {
    return this.constructor?.name?.replace(/^_/, '') || 'BaseComponent';
  }

  private get $hostName() {
    return this['hostName'];
  }

  /*
    should add some methods here to do ngOnInit, ngOnChanges, ngOnDestroy, ngAfterViewInit, etc.
    need to figure out how we can code it up so we don't have to use super.ngOnInit() in the child components
    or have people override these by mistake, so like if we have OnInit then we call ngOnInit and the dev
    will just use OnInit (I think that makes sense)
  */
  onInit(): void {
    // implement in child classes
  }

  onChanges(changes: SimpleChanges): void {
    // implement in child classes
  }

  onDoCheck(): void {
    // implement in child classes
  }

  onAfterContentInit(): void {
    // implement in child classes
  }

  onAfterContentChecked(): void {
    // implement in child classes
  }

  onDestroy(): void {
    // implement in child classes
  }

  onAfterViewInit(): void {
    // implement in child classes
  }

  onAfterViewChecked(): void {
    // implement in child classes
  }

  ngOnInit(): void {
    this.onInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onChanges(changes);
  }

  ngDoCheck(): void {
    this.onDoCheck();
  }

  ngAfterContentInit(): void {
    this.onAfterContentInit();
  }

  ngAfterContentChecked(): void {
    this.onAfterContentChecked();
  }

  ngOnDestroy(): void {
    this.onDestroy();
  }

  ngAfterViewInit(): void {
    this.onAfterViewInit();
  }

  ngAfterViewChecked(): void {
    this.onAfterViewChecked();
  }
}
