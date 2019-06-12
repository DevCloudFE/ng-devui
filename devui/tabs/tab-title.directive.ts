import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[aveTabTitle]',
})
export class TabTitleDirective {
  constructor(public templateRef: TemplateRef<any>) {
  }
}
