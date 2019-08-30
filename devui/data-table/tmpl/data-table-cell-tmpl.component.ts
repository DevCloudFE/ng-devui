import { Component, ChangeDetectionStrategy, ContentChild, Input } from '@angular/core';
import { DataTableCellViewTmplComponent } from './data-table-cell-view-tmpl.component';
import { DataTableCellEditTmplComponent } from './data-table-cell-edit-tmpl.component';
import { DataTableCellFilterTmplComponent } from './data-table-cell-filter-tmpl.component';

@Component({
  selector: 'd-cell-template',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableCellTmplComponent {
  @Input() type: string;
  @ContentChild(DataTableCellViewTmplComponent) view: DataTableCellViewTmplComponent;
  @ContentChild(DataTableCellEditTmplComponent) edit: DataTableCellEditTmplComponent;
  @ContentChild(DataTableCellFilterTmplComponent) filter: DataTableCellFilterTmplComponent;

}
