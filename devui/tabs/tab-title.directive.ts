import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[dTabTitle]',
})
export class TabTitleDirective {
  constructor(public templateRef: TemplateRef<any>) {
  }
}
