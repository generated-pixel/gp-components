import { Directive } from "@angular/core";

@Directive({
  standalone: true,
  providers: [],
})
export class BaseComponent<T = any> {}
