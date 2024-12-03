import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { FilterConfig } from '../data-table.model';
import { DataTableCellEditTmplComponent } from './data-table-cell-edit-tmpl.component';
import { DataTableCellViewTmplComponent } from './data-table-cell-view-tmpl.component';
import { DataTableHeadCellTmplComponent } from './data-table-head-cell-tmpl.component';

@Component({
  selector: 'd-column',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableColumnTmplComponent implements OnChanges, OnDestroy {
  @Input() advancedHeader: Array<{
    header: string;
    rowspan: number;
    colspan: number;
    [prop: string]: any;
  }>;
  @Input() headCellApplyAll = false;
  @Input() maxWidth: string;
  @Input() minWidth: string;
  @Input() field: string;
  @Input() header: string;
  @Input() sortable: boolean;
  @Input() editable: boolean;
  @Input() filterable: boolean;
  @Input() closeFilterWhenScroll: boolean;
  @Input() cellClass: string;
  @Input() nestedColumnIndent = 16;
  @Input() width: string;
  // @Input() fixed?: boolean;
  @Input() fixedLeft?: string;
  @Input() fixedRight?: string;
  @Input() extraOptions: any;
  @Input() order: number = Number.MAX_VALUE;
  @Input() nestedColumn = false;
  /**
   * 传入筛选列表
   */
  @Input() filterList: Array<FilterConfig>;
  @Output() filterChange = new EventEmitter<FilterConfig[]>();
  @Output() filterToggle = new EventEmitter<{
    isOpen: boolean;
    checklist: FilterConfig[];
  }>();
  @Input() filterMultiple = true;
  @Input() filterIconActive: boolean;
  @Input() filterBoxWidth: any;
  @Input() filterBoxHeight: any;
  @Input() beforeFilter: (value) => boolean | Promise<boolean> | Observable<boolean>;
  @ContentChild(DataTableCellViewTmplComponent) cellCmp: DataTableCellViewTmplComponent;
  @ContentChild(DataTableCellEditTmplComponent) cellEditCmp: DataTableCellEditTmplComponent;
  @ContentChild(DataTableHeadCellTmplComponent) headCellTmpl: DataTableHeadCellTmplComponent;
  @Input() customFilterTemplate: TemplateRef<any>;
  @Input() extraFilterTemplate: TemplateRef<any>;
  @Input() searchFn: (term: string) => Observable<Array<any>>;
  orderChange = new EventEmitter<SimpleChanges>();
  widthChange = new EventEmitter<SimpleChanges>();
  _formatter: (item: any, row?: any) => string;

  // 鼠标是否移动到当前表头单元格
  selected = false;

  // @deprecated
  @Input() fieldType = 'text';

  ngOnChanges(changes: SimpleChanges): void {
    const { order, width } = changes;
    if (order) {
      this.orderChange.emit(order.currentValue);
    }
    if (width) {
      this.widthChange.emit(width.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.orderChange.unsubscribe();
  }

  emitFilterData(filterData) {
    this.filterChange.emit(filterData);
  }

  emitFilterToggle(data: { isOpen: boolean; checklist: FilterConfig[] }) {
    this.filterToggle.emit(data);
  }
}
