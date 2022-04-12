import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  /* eslint-disable */
  selector: 'ng-template[type]',
})
export class DefaultTemplateDirective {
  @Input() type: string;

  constructor(public template: TemplateRef<any>) {}
}
