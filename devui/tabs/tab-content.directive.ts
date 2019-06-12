import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[aveTabContent]',
})
export class TabContentDirective {
  constructor(public templateRef: TemplateRef<any>) {
  }
}
