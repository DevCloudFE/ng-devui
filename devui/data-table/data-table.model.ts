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
  id: number | string;
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

export interface ColumnResizeEventArg {
  currentColumn: DataTableColumnTmplComponent;
  nextColumn: DataTableColumnTmplComponent;
}

export enum ColumnAdjustStrategy {
  disable = 0, // 不可调整
  mouseup = 1, // 列宽在鼠标松开时变化
  mousemove = 2 // 列宽随着鼠标移动变化
}
