import { ChangeDetectionStrategy, Component, ContentChild, Input } from '@angular/core';
import { DataTableCellEditTmplComponent } from './data-table-cell-edit-tmpl.component';
import { DataTableCellViewTmplComponent } from './data-table-cell-view-tmpl.component';

@Component({
  selector: 'd-cell-template',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableCellTmplComponent {
  @Input() type: string;
  @ContentChild(DataTableCellViewTmplComponent) view: DataTableCellViewTmplComponent;
  @ContentChild(DataTableCellEditTmplComponent) edit: DataTableCellEditTmplComponent;

}
