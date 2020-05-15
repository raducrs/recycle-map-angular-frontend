import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[detailsContainer]'
})
export class DetailContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
