import { DataTableColumnTmplComponent } from './tmpl/data-table-column-tmpl.component';
import { DataTableRowComponent } from './data-table-row.component';
import { DataTableCellComponent } from './data-table-cell.component';

export interface CellSelectedEventArg {
  rowIndex: number;
  colIndex: number;
  column: DataTableColumnTmplComponent;
  rowItem: any;
  cellComponent: DataTableCellComponent;
  rowComponent: DataTableRowComponent;
}

export interface RowSelectedEventArg {
  rowIndex: number;
  rowItem: any;
  rowComponent: DataTableRowComponent;
}

export interface SortEventArg {
  field: string;
  direction: 'ASC' | 'DESC' | '';
  column?: DataTableColumnTmplComponent;
}

export interface RowCheckChangeEventArg {
  rowIndex: number;
  rowItem: any;
  checked: boolean;
}

export interface DataTablePager {
  total: number;
  pageIndex: number;
  pageSize: number;
  maxItems?: number;
  componentSize?: '' | 'sm' | 'lg';
  selectDirection: 'auto' | 'down' | 'up';
}

export interface ColumnDefs {
  render: (data: any, row: any) => any;
  target: string;
}
