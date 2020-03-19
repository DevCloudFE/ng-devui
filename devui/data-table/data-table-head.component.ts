import { SortEventArg } from './data-table.model';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  HostListener,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { DataTableColumnTmplComponent } from './tmpl/data-table-column-tmpl.component';
import { DataTableComponent } from './data-table.component';
import { DataTableHeadTmplComponent } from './tmpl/data-table-head-tmpl.component';
import { DataTableTmplsComponent } from './tmpl/data-table-tmpls.component';
import { DataTablePager } from './data-table.model';

@Component({
  selector: 'd-data-table-head,[dDataTableHead]',
  templateUrl: './data-table-head.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableHeadComponent implements OnChanges {
  @Input() checkable: boolean;
  @Input() showDetail: boolean;
  @Input() pageAllChecked: boolean;
  @Input() headTemplate: DataTableHeadTmplComponent;
  @Input() columns: DataTableColumnTmplComponent[];
  @Input() dataTableTemplates: DataTableTmplsComponent;
  @Input() multiSort: SortEventArg[] = [];
  @Input() pager: DataTablePager | boolean;
  @Input() resizeable: boolean;
  @Input() showSortIcon: boolean;
  @Input() resizeBarRefElement: ElementRef;
  @Input() tableViewRefElement: ElementRef;
  @Input() checkableColumn: DataTableColumnTmplComponent;
  @Input() showDetailColumn: DataTableColumnTmplComponent;
  @Output() headClickSortEvent = new EventEmitter<SortEventArg>();
  @Output() resizeHandlerEvent = new EventEmitter<any>();
  @Input() halfChecked: boolean;
  @Input() childrenTableOpen: boolean;

  isDrag: boolean;
  dragBoxLeft;
  dragCellRef: HTMLElement;

  searchQuery: { [key: string]: any; } = {};
  multiSortArray: SortEventArg[] = [];
  sortField: string;
  sortDirection: 'ASC' | 'DESC' | '';
  rowItem = undefined;

  // 用于多行多列头部
  rowCount;
  rowCountArray;
  filterHalfChecked: boolean;
  filterAllChecked: boolean;
  columnForFilter;
  filterListDisplay = [];
  choosedItem: any;
  isFilterHidden = false;
  constructor(public dt: DataTableComponent) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.columns || changes.multiSort) {
      this.multiSortArray = [];
      this.columns.forEach(column => {
        if (column.sortable) {
          const sortIndex = this.multiSort.findIndex(item => item['field'] === column.field);
          this.multiSortArray.push({
            field: column.field,
            direction: sortIndex !== -1 ? this.multiSort[sortIndex].direction : ''
          });
        }
      });
    }
    if (changes['columns']) {
        this.rowCount = Math.max(... this.columns.map(column => {
          if ( column.advancedHeader) {
            return  column.advancedHeader.length;
          } else {
            return 0;
          }
        }));
        if (this.rowCount > 0) {
          this.rowCountArray = new Array(this.rowCount);
          this.initAdvanceHeader();
        }
    }
  }

  onHeadClick(column: DataTableColumnTmplComponent) {
    if (!column.sortable) {
      return;
    }

    const sortIndex = this.multiSortArray.findIndex(item => item['field'] === column.field);

    if (sortIndex === -1) {
      return;
    }

    switch (this.multiSortArray[sortIndex].direction) {
      case 'ASC':
        this.multiSortArray[sortIndex].direction = 'DESC'; break;
      case 'DESC':
        this.multiSortArray[sortIndex].direction = ''; break;
      case '':
      default:
        this.multiSortArray[sortIndex].direction = 'ASC';
    }
    this.headClickSortEvent.emit({ field: column.field, direction: this.multiSortArray[sortIndex].direction });
  }

  hasAnyFilterColumns(columns) {
    return (columns || []).some(col => col.filterable);
  }

  onCheckAllChange() {
    this.dt.onCheckAllChange(this.pageAllChecked);
  }

  onSearchQueryChange() {
    this.dt.onSearchQueryChange(this.searchQuery);
  }

  canFilterable(column: DataTableColumnTmplComponent) {
    return column.field && column.field !== '$index' && column.filterable;
  }

  getIfExistMultiSort(field): any {
    const column = this.columns.find(item => item['field'] === field);
    return !!column.sortable;
  }

  getSortDirection(field): any {
    if (!this.multiSortArray) {
      return false;
    }
    const filterField = this.multiSortArray.filter(item => {
      return item['field'] === field;
    });
    if (filterField.length !== 0) {
      return filterField[0]['direction'];
    } else {
      return undefined;
    }
  }

  onResize($event, filed, isUserDefined) {
    this.resizeHandlerEvent.emit({
      newWidth: $event,
      field: filed,
      isUserDefined: isUserDefined
    });
  }

  // 初始化多行表头，为了兼容resizeable对表头互相影响数据做了记录
  initAdvanceHeader() {
    if (this.resizeable) {
      this.columns.forEach((column, colIndex) => {
        if (column['advancedHeader']) {
            column['advancedHeader'].forEach((item, rowIndex) => {
                    item['$rowIndex'] = rowIndex;
                    item['$colIndex'] = colIndex;
                    item['$cols'] = new Array(item.colspan).fill(1).map((v, i) => colIndex + i );
            });
        }
        column['$colIndex'] = colIndex;
      });
    }
  }

  resizeParent(changeColumn) {
      if (this.rowCount > 0 ) {
          this.columns.filter(column => column['advancedHeader'] !== undefined)
                      .map(column => column['advancedHeader'])
                      .reduce( (target, newItemArr) => target.concat(newItemArr))
                      .filter(item => item['$cols'].indexOf(changeColumn['$colIndex']) > -1)
                      .forEach(item => {
                        item['$width'] = item['$cols'].map(i => parseInt(this.columns[i].width, 10) || 0)
                                                      .reduce( (sum, rItem) => sum + rItem ) + 'px';
                      });
      }
  }

  trackByFn(index, item) {
    return index;
  }
  getFilterDataMultiple(column: DataTableColumnTmplComponent) {
    const filterData = column['filterList'].filter(item => item.checked);
    column.emitFilterData(filterData);
  }
  getFilterDataRadio(item, column: DataTableColumnTmplComponent) {
    column.emitFilterData(item);
    this.choosedItem = item;
  }
  showfilterContent($event, column: DataTableColumnTmplComponent) {
    column.canFilter(!$event).then((change) => {
      if (!$event) {
        return;
      }
      if (!change) {
        this.isFilterHidden = true;
        return;
      }
    this.isFilterHidden = false;
    this.columnForFilter = column;
    this.filterListDisplay = column['filterList'];
    this.searchForFilter('');
    });
  }
  searchForFilter($event) {
    this.filterListDisplay = this.columnForFilter['filterList'].filter(item => item.name.includes($event));
    this.setHalfChecked();
  }
  checkAll($event) {
    this.filterHalfChecked = false;
    this.filterListDisplay.forEach(item => {
      item.checked = $event;
    });
  }
  checkboxChange($event) {
    this.setHalfChecked();
  }
  // 设置全选半选状态
  setHalfChecked() {
    this.filterHalfChecked = false;
    const checked = this.filterListDisplay.filter(item => item.checked);
    if (checked.length === this.filterListDisplay.length) {
      this.filterAllChecked = true;
    } else if (checked.length > 0) {
      this.filterHalfChecked = true;
    } else {
      this.filterAllChecked = false;
      this.filterHalfChecked = false;
    }
  }

  toggleChildrenTable() {
    this.childrenTableOpen = !this.childrenTableOpen;
    this.dt.onToggleChildrenTable(this.childrenTableOpen);
  }
}
