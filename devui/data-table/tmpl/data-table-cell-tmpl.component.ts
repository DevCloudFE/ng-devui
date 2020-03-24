import { Component, ChangeDetectionStrategy, ContentChild, Input } from '@angular/core';
import { DataTableCellViewTmplComponent } from './data-table-cell-view-tmpl.component';
import { DataTableCellEditTmplComponent } from './data-table-cell-edit-tmpl.component';

@Component({
  selector: 'd-cell-template',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableCellTmplComponent {
  @Input() type: string;
  @ContentChild(DataTableCellViewTmplComponent, { static: false }) view: DataTableCellViewTmplComponent;
  @ContentChild(DataTableCellEditTmplComponent, { static: false }) edit: DataTableCellEditTmplComponent;

}
