import {
  Component,
  ChangeDetectionStrategy,
  ContentChild,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { DataTableCellViewTmplComponent } from './data-table-cell-view-tmpl.component';
import { DataTableCellEditTmplComponent } from './data-table-cell-edit-tmpl.component';
import { DataTableCellFilterTmplComponent } from './data-table-cell-filter-tmpl.component';
import { formatDate } from '../../utils/date-utils';
import { DevUIConfig } from '../../devui.config';
import { DataTableHeadCellTmplComponent } from './data-table-head-cell-tmpl.component';

@Component({
  selector: 'ave-column',
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
  @Input() cellClass: string;
  @Input() width: string;
  @Input() style?: any;
  @Input() extraOptions: any;
  @Input() isShow = true;
  @Input() order: number = Number.MAX_VALUE;
  @ContentChild(DataTableCellViewTmplComponent) cellCmp: DataTableCellViewTmplComponent;
  @ContentChild(DataTableCellEditTmplComponent) cellEditCmp: DataTableCellEditTmplComponent;
  @ContentChild(DataTableCellFilterTmplComponent) cellFilterCmp: DataTableCellFilterTmplComponent;
  @ContentChild(DataTableHeadCellTmplComponent) headCellTmpl: DataTableHeadCellTmplComponent;
  orderChange = new EventEmitter<SimpleChanges>();
  _formatter: (item: any, row?: any) => string;

  constructor(private avenuebirthUIConfig: DevUIConfig) {

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
    const pattern = this.extraOptions && this.extraOptions.dateFormat ?
      this.extraOptions.dateFormat : this.avenuebirthUIConfig.datePickerCN.format.date;

    return item ? formatDate(new Date(item), pattern) : '';
  }

  datetime(item) {
    const pattern = this.extraOptions && this.extraOptions.dateFormat ?
      this.extraOptions.dateFormat : this.avenuebirthUIConfig.datePickerCN.format.time;

    return item ? formatDate(new Date(item), pattern) : '';
  }
}
