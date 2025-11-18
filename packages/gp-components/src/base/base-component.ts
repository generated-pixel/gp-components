import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  inject,
  Injector,
  input,
  Renderer2,
} from '@angular/core';
import { GpConfig } from '../public-api';

@Directive({
  standalone: true,
  providers: [],
})
export class BaseComponent<T = any> {
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
}
