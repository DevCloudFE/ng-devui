import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef
} from '@angular/core';
import { DataTableComponent } from './data-table.component';
import { DataTableColumnTmplComponent } from './tmpl/data-table-column-tmpl.component';
import { DataTableTmplsComponent } from './tmpl/data-table-tmpls.component';

@Component({
  selector: 'ave-data-table-body, [aveDataTableBody]',
  templateUrl: './data-table-body.component.html',
  styleUrls: ['./data-table-body.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableBodyComponent {
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

  constructor(public dt: DataTableComponent) {

  }

  trackByFn(index, item) {
    return index;
  }
}
