import { Component, Inject, Input, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { TableExpandConfig, TableWidthConfig } from './data-table.model';
import { DATA_TABLE } from './data-table.token';
import { DataTableColumnTmplComponent } from './tmpl/data-table-column-tmpl.component';

@Component({
  selector: 'd-data-table-body, [dDataTableBody]',
  templateUrl: './data-table-body.component.html',
  styleUrls: ['./data-table-body.component.scss'],
  preserveWhitespaces: false,
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

  constructor(@Inject(DATA_TABLE) public dt: any) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.columns && this.columns) {
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
