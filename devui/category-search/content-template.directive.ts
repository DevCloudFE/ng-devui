import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  /* eslint-disable */
  selector: 'ng-template[field]',
})
export class ContentTemplateDirective {
  @Input() field: string;

  constructor(public template: TemplateRef<any>) {}
}
