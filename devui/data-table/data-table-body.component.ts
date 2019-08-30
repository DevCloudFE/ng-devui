import {
  Component,
  Input,
  TemplateRef,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { DataTableComponent } from './data-table.component';
import { DataTableColumnTmplComponent } from './tmpl/data-table-column-tmpl.component';
import { DataTableTmplsComponent } from './tmpl/data-table-tmpls.component';

@Component({
  selector: 'd-data-table-body, [dDataTableBody]',
  templateUrl: './data-table-body.component.html',
  styleUrls: ['./data-table-body.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableBodyComponent implements OnChanges {
  @Input() checkable: boolean;
  @Input() showDetail: boolean;
  @Input() allChecked: boolean;
  @Input() selectable: boolean;
  @Input() editModel: string;
  @Input() editRowItem: any;
  @Input() dataSource: any[] = [];
  @Input() resizeable: boolean;
  @Input() columns: DataTableColumnTmplComponent[];
  @Input() checkableColumn: DataTableColumnTmplComponent;
  @Input() showDetailColumn: DataTableColumnTmplComponent;
  @Input() dataTableTemplates: DataTableTmplsComponent;
  @Input() detailTemplateRef: TemplateRef<any>;
  @Input() timeout: number;
  @Input() type: string;
  @Input() hover: boolean;
  @Input() tableLevel: number;
  @Input() nestedIndex = '-1';
  @Input() virtualScroll;
  childTdColspan: number;
  constructor(public dt: DataTableComponent) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.columns) {
      let columnSpan = this.columns.length;
      if (this.showDetail) {
        columnSpan += 1;
      }
      if (this.checkable) {
        columnSpan += 1;
      }
      this.childTdColspan = columnSpan;
    }
  }

  trackByFn(index, item) {
    return index;
  }
}
