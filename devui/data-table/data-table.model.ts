import { TemplateRef } from '@angular/core';
import { DataTableCellComponent } from './data-table-cell.component';
import { DataTableRowComponent } from './data-table-row.component';
import { TableThComponent } from './table/head/th/th.component';
import { DataTableColumnTmplComponent } from './tmpl/data-table-column-tmpl.component';

export interface CellSelectedEventArg {
  rowIndex: number;
  colIndex: number;
  column: DataTableColumnTmplComponent;
  rowItem: any;
  cellComponent: DataTableCellComponent;
  rowComponent: DataTableRowComponent;
}

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
  default = ''
}

export interface RowSelectedEventArg {
  rowIndex: number;
  nestedIndex: string;
  rowItem: any;
  rowComponent: DataTableRowComponent;
}

export interface SortEventArg {
  field?: string;
  direction: SortDirection;
  column?: DataTableColumnTmplComponent;
  th?: TableThComponent;
}

export interface RowCheckChangeEventArg {
  rowIndex: number;
  nestedIndex: string;
  rowItem: any;
  checked: boolean;
}

export interface ColumnDefs {
  render: (data: any, row: any) => any;
  target: string;
}

export interface FilterConfig {
  id?: number | string;
  name: string;
  value: any;
  checked?: boolean; // for Multiple
  selected?: boolean; // for Radio
}

export interface CheckableRelation {
  upward: boolean;
  downward: boolean;
}

export interface TableExpandConfig {
  expand?: boolean;
  expandTemplateRef?: TemplateRef<any>;
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

export interface TableCheckStatusArg {
  pageAllChecked?: boolean;
  pageHalfChecked?: boolean;
}

export interface TableWidthConfig {
  field: string;
  width: string;
}

export enum EditableTip {
  hover = 'hover',
  btn = 'btn'
}

export interface RowToggleStatusEventArg {
  rowItem: any;
  open: boolean;
}

export interface TableCheckOptions {
  label: string;
  onChecked: Function;
}
