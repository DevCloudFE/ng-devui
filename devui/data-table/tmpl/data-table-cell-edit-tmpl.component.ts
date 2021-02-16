import { ChangeDetectionStrategy, Component, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'd-cell-edit',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableCellEditTmplComponent {

  @ContentChild(TemplateRef) template: TemplateRef<any>;

  dataPicker;
}
