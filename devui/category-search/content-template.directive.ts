import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  /* eslint-disable */
  selector: 'ng-template[field], ng-template[dField]',
})
export class ContentTemplateDirective {
  @Input() field: string;
  @Input() dField: string;

  constructor(public template: TemplateRef<any>) {}
}
