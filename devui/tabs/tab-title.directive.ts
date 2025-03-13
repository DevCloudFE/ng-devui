import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[dTabTitle]',
    standalone: false
})
export class TabTitleDirective {
  constructor(public templateRef: TemplateRef<any>) {
  }
}
