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
  ElementRef
} from '@angular/core';
import { DataTableColumnTmplComponent } from './tmpl/data-table-column-tmpl.component';
import { DataTableComponent } from './data-table.component';
import { DataTableHeadTmplComponent } from './tmpl/data-table-head-tmpl.component';
import { DataTableTmplsComponent } from './tmpl/data-table-tmpls.component';
import { DataTablePager } from './data-table.model';

@Component({
  selector: 'ave-data-table-head,[aveDataTableHead]',
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

  isDrag: boolean;
  dragBoxLeft;
  dragCellRef: HTMLElement;

  searchQuery: { [key: string]: any; } = {};
  multiSortArray: SortEventArg[] = [];
  sortField: string;
  sortDirection: 'ASC' | 'DESC' | '';
  isDetailOpen: boolean;
  rowItem = undefined;

  // 用于多行多列头部
  rowCount;
  rowCountArray;

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
                                                      .reduce( (sum, i) => sum + i ) + 'px';
                      });
      }
  }

  trackByFn(index, item) {
    return index;
  }

}
