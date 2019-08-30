import {
  Component,
  ChangeDetectionStrategy,
  ContentChild,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  OnDestroy,
  TemplateRef
} from '@angular/core';
import { DataTableCellViewTmplComponent } from './data-table-cell-view-tmpl.component';
import { DataTableCellEditTmplComponent } from './data-table-cell-edit-tmpl.component';
import { DataTableCellFilterTmplComponent } from './data-table-cell-filter-tmpl.component';
import { formatDate } from 'ng-devui/utils';
import { DevUIConfig } from 'ng-devui/devui.config';
import { DataTableHeadCellTmplComponent } from './data-table-head-cell-tmpl.component';
import { FilterConfig } from '../data-table.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'd-column',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableColumnTmplComponent implements OnChanges, OnDestroy {
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
  @Input() filterable: boolean;
  @Input() width: string;
  @Input() style?: any;
  @Input() extraOptions: any;
  @Input() order: number = Number.MAX_VALUE;
  @Input() nestedColumn = false;
     /**
   * 传入筛选列表
   */
  @Input() filterList: Array<FilterConfig>;
  @Output() filterChange = new EventEmitter<FilterConfig[]>();
  @Input() filterMultiple = true;
  @Input() beforeFilter: (value) => boolean | Promise<boolean> | Observable<boolean>;
  @ContentChild(DataTableCellViewTmplComponent) cellCmp: DataTableCellViewTmplComponent;
  @ContentChild(DataTableCellEditTmplComponent) cellEditCmp: DataTableCellEditTmplComponent;
  @ContentChild(DataTableCellFilterTmplComponent) cellFilterCmp: DataTableCellFilterTmplComponent;
  @ContentChild(DataTableHeadCellTmplComponent) headCellTmpl: DataTableHeadCellTmplComponent;
  @Input() customFilterTemplate: TemplateRef<any>;
  orderChange = new EventEmitter<SimpleChanges>();
  _formatter: (item: any, row?: any) => string;

  constructor(private devUIConfig: DevUIConfig) {

  }

  @Input() set formatter(formatter: (item: any, row?: any) => string) {
    this._formatter = formatter;
  }

  get formatter() {
    return this._formatter || this.defaultFormatter.bind(this);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['order']) {
      this.orderChange.emit(changes['order'].currentValue);
    }
  }

  ngOnDestroy(): void {
    this.orderChange.unsubscribe();
  }

  // column.extraOptions?.dateFormat

  defaultFormatter(item, row?: any) {
    if (this.fieldType && this[this.fieldType]) {
      return this[this.fieldType](item, row);
    }
    return item && item.toString();
  }

  date(item) {
    let pattern;
    if (this.extraOptions && this.extraOptions.dateFormat) {
      pattern = this.extraOptions.dateFormat;
    } else {
      pattern = this.extraOptions && this.extraOptions.showTime ?
      this.devUIConfig.datePickerCN.format.time : this.devUIConfig.datePickerCN.format.date;
    }

    return item ? formatDate(new Date(item), pattern) : '';
  }
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
