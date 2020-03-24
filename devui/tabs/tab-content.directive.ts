import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[dTabContent]',
})
export class TabContentDirective {
  constructor(public templateRef: TemplateRef<any>) {
  }
}
