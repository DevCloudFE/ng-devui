import { Component, ChangeDetectionStrategy, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'ave-foot',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableFootTmplComponent {

  @ContentChild(TemplateRef) template: TemplateRef<any>;

}
