import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  inject,
  Injector,
  input,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { NgEvents } from 'gp-components/api';
import { GpConfig } from 'gp-components/config';
import { BaseStyle } from './base-style';

@Directive({
  standalone: true,
  providers: [],
})
export class BaseComponent implements NgEvents {
  /**
   * The host element reference.
   */
  public el: ElementRef = inject(ElementRef);

  /**
   * The injector instance.
   */
  public readonly injector: Injector = inject(Injector);

  /**
   * The change detector reference.
   */
  public readonly cd: ChangeDetectorRef = inject(ChangeDetectorRef);

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

  public baseStyle: BaseStyle = inject(BaseStyle);

  /**
   * The component name.
   */
  get $name() {
    return this.constructor?.name?.replace(/^_/, '') || 'BaseComponent';
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
    this._loadCssAndStyles();
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

  private _loadCssAndStyles(): void {
    this.baseStyle.load(this.baseStyle.style, { componentName: this.$name });
  }
}
