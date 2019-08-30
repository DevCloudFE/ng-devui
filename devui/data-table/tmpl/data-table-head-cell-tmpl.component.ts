import { Component, ChangeDetectionStrategy, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'd-head-cell',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableHeadCellTmplComponent {

  @ContentChild(TemplateRef) template: TemplateRef<any>;

}
