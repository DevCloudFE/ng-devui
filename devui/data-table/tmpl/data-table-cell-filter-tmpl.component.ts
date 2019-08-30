import { Component, ChangeDetectionStrategy, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'd-cell-filter',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableCellFilterTmplComponent {

  @ContentChild(TemplateRef) template: TemplateRef<any>;

}
