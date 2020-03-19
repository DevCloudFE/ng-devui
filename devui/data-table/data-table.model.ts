import { DataTableColumnTmplComponent } from './tmpl/data-table-column-tmpl.component';
import { DataTableRowComponent } from './data-table-row.component';
import { DataTableCellComponent } from './data-table-cell.component';
import { ElementRef } from '@angular/core';

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
  nestedIndex: string;
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
  nestedIndex: string;
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

export interface FilterConfig {
   name: string;
   value: any;
   checked?: boolean;
}

export interface CheckableRelation {
  upward: boolean;
  downward: boolean;
}

export interface TableExpandConfig {
  expand?: boolean;
  expandTemplateRef?: ElementRef;
  description?: string;
}
