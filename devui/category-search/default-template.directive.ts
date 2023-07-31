import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  /* eslint-disable */
  selector: 'ng-template[type], ng-template[dType]',
})
export class DefaultTemplateDirective {
  @Input() type: string;
  @Input() dType: string;

  constructor(public template: TemplateRef<any>) {}
}
