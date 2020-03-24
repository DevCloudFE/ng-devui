import { Component, ChangeDetectionStrategy, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'd-foot',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableFootTmplComponent {

  @ContentChild(TemplateRef, { static: false }) template: TemplateRef<any>;

}
