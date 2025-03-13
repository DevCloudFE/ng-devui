import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    /* eslint-disable */
    selector: 'ng-template[position], ng-template[dPosition]',
    standalone: false
})
export class ProgressTemplateDirective {
  @Input() position: 'center' | 'outer';
  @Input() dPosition: 'center' | 'outer';

  constructor(public template: TemplateRef<any>) {}
}
