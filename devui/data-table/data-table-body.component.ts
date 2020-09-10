import { Component, Input, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { DataTableComponent } from './data-table.component';
import { DataTableColumnTmplComponent } from './tmpl/data-table-column-tmpl.component';
import { TableWidthConfig, TableExpandConfig } from './data-table.model';

@Component({
  selector: 'd-data-table-body, [dDataTableBody]',
  templateUrl: './data-table-body.component.html',
  styleUrls: ['./data-table-body.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableBodyComponent implements OnChanges {
  @Input() checkable: boolean;
  @Input() showExpandToggle: boolean;
  @Input() allChecked: boolean;
  @Input() selectable: boolean;
  @Input() editModel: string;
  @Input() editRowItem: any;
  @Input() dataSource: any[] = [];
  @Input() resizeable: boolean;
  @Input() columns: DataTableColumnTmplComponent[];
  @Input() detailTemplateRef: TemplateRef<any>;
  @Input() timeout: number;
  @Input() type: string;
  @Input() rowHoveredHighlight: boolean;
  @Input() tableLevel: number;
  @Input() nestedIndex = '-1';
  @Input() virtualScroll;
  @Input() tableWidthConfig: TableWidthConfig[];
  @Input() headerExpandConfig: TableExpandConfig;
  @Input() generalRowHoveredData: boolean;
  childTdColspan: number;
  constructor(public dt: DataTableComponent) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns'] && this.columns) {
      let columnSpan = this.columns.length;
      if (this.showExpandToggle) {
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
