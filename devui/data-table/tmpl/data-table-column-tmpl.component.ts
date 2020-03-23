import {
  ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, OnChanges,
  OnDestroy, OnInit, Output, SimpleChanges, TemplateRef
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { FilterConfig } from '../data-table.model';
import { DataTableCellEditTmplComponent } from './data-table-cell-edit-tmpl.component';
import { DataTableCellViewTmplComponent } from './data-table-cell-view-tmpl.component';
import { DataTableHeadCellTmplComponent } from './data-table-head-cell-tmpl.component';

@Component({
  selector: 'd-column',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableColumnTmplComponent implements OnChanges, OnDestroy, OnInit {
  @Input() advancedHeader: Array<{
    header: string;
    rowspan: number;
    colspan: number;
    [prop: string]: any;
  }>;
  @Input() fieldType = 'text';
  @Input() maxWidth: string;
  @Input() minWidth: string;
  @Input() field: string;
  @Input() header: string;
  @Input() sortable: boolean;
  @Input() editable: boolean;
  @Input() unresizable: boolean;
  @Input() filterable: boolean;
  @Input() cellClass: string;
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
  @Input() filterMultiple = true;
  @Input() filterIconActive: boolean;
  @Input() filterBoxWidth: any;
  @Input() filterBoxHeight: any;
  @Input() beforeFilter: (value) => boolean | Promise<boolean> | Observable<boolean>;
  @ContentChild(DataTableCellViewTmplComponent, { static: false }) cellCmp: DataTableCellViewTmplComponent;
  @ContentChild(DataTableCellEditTmplComponent, { static: false }) cellEditCmp: DataTableCellEditTmplComponent;
  @ContentChild(DataTableHeadCellTmplComponent, { static: false }) headCellTmpl: DataTableHeadCellTmplComponent;
  @Input() customFilterTemplate: TemplateRef<any>;
  @Input() searchFn: (term: string) => Observable<Array<any>>;
  orderChange = new EventEmitter<SimpleChanges>();
  _formatter: (item: any, row?: any) => string;

  // 鼠标是否移动到当前表头单元格
  selected = false;
  filterIconActiveInner = false;
  constructor() {

  }
  ngOnInit(): void {
    if (this.filterable) {
      if (this.filterList) {
        if (!this.searchFn) {
          this.searchFn = (item) => {
            return of(
              (this.filterList ? this.filterList : [])
                .filter(value => value.name.toLowerCase().includes(item.toLowerCase()))
            );
          };
        }
      }
    }

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['order']) {
      this.orderChange.emit(changes['order'].currentValue);
    }
    if (changes['filterList']) {
      if (this.filterIconActive !== undefined) { return; }
      const checkedList = this.filterList.filter(item => item.checked);
      if (checkedList.length && (checkedList.length < this.filterList.length)) {
        this.filterIconActiveInner = true;
      } else {
        this.filterIconActiveInner = false;
      }
    }
  }

  ngOnDestroy(): void {
    this.orderChange.unsubscribe();
  }

  // column.extraOptions?.dateFormat

  emitFilterData(filterData) {
    this.filterChange.emit(filterData);
  }
  canFilter(isOpen) {
    let changeResult = Promise.resolve(true);

    if (this.beforeFilter) {
      const result: any = this.beforeFilter(isOpen);
      if (typeof result !== 'undefined') {
        if (result.then) {
          changeResult = result;
        } else if (result.subscribe) {
          changeResult = (result as Observable<boolean>).toPromise();
        } else {
          changeResult = Promise.resolve(result);
        }
      }
    }

    return changeResult;
  }
}
