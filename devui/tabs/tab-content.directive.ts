import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[dTabContent]',
    standalone: false
})
export class TabContentDirective {
  constructor(public templateRef: TemplateRef<any>) {
  }
}
