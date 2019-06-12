import { Component, ChangeDetectionStrategy, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'ave-cell-filter',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableCellFilterTmplComponent {

  @ContentChild(TemplateRef) template: TemplateRef<any>;

}
