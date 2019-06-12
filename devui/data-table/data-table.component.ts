import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { WindowRef } from '../window-ref/window-ref.service';
import {
  CellSelectedEventArg,
  ColumnDefs,
  DataTablePager,
  RowCheckChangeEventArg,
  RowSelectedEventArg,
  SortEventArg
} from './data-table.model';
import { DataTableColumnTmplComponent } from './tmpl/data-table-column-tmpl.component';
import { DataTableFootTmplComponent } from './tmpl/data-table-foot-tmpl.component';
import { DataTableHeadTmplComponent } from './tmpl/data-table-head-tmpl.component';
import { DataTablePagerTmplComponent } from './tmpl/data-table-pager-tmpl.component';
import { DataTableTmplsComponent } from './tmpl/data-table-tmpls.component';

@Component({
  selector: 'ave-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: [
    './data-table.component.scss',
    './data-table.component.color.scss'
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'dataTable'
})
export class DataTableComponent implements OnDestroy, OnInit, AfterContentInit {
  @HostBinding('attr.ave-ui') aveUi = true;
  /**
   * 【可选】Datatable是否提供勾选行的功能
   */
  @Input() checkable: boolean;
  /**
   * 【可选】是否提供显示行详情的功能
   */
  @Input() showDetail: boolean;
  /**
   * 【可选】是否固定表头（在表格超过容器最大高度时，表格可滚动时生效）
   */
  @Input() fixHeader: boolean;
  /**
   * 【可选】表格在超出容器时，是否可以通过滚动查看表格内容
   */
  @Input() scrollable: boolean;
  /**
   * 【可选】默认表格使用的表格类型，可选值为'cell'
   */
  @Input() editModel = 'cell';
  /**
   * 【可选】限制表格最大宽度，默认撑满父容器
   */
  @Input() maxWidth: string;
  /**
   * 【可选】限制最大高度，默认
   */
  @Input() maxHeight: string;
  /**
   * 表格类型,striped表现为条纹间隔
   */
  @Input() type: '' | 'striped' = '';
  /**
   * 表格是否开启鼠标hover行高亮效果
   */
  @Input() hover = true;
  /**
   * 表格自定义样式
   */
  @Input() cssClass: string;
  /**
   * 表格宽度
   */
  @Input() tableWidth = '100%';
  /**
   * 【可选】列引用，用于列渲染
   * 接口如下
   * export interface ColumnDefs {
   *   render: (data: any, row: any[]) => any;
   *   target: string;
   * }
   */
  @Input() columnDefs: ColumnDefs[];
  /**
   * 【可选】是否限制多列排序的输出限制为一项
   */
  @Input() onlyOneColumnSort: boolean;
  /**
   * 【可选】多列选择数组，用来指导那几列会被排序
   */
  @Input() multiSort: SortEventArg[] = [];
  /**
   * 【可选】是否可以拖拽调整列宽
   */
  @Input() resizeable: boolean;
  /**
   * 【可选】用来自定义详情页的模板
   */
  @Input() detailTemplateRef: TemplateRef<any>;
  /**
   * 【可选】同时绑定单击、双击事件时，用于区分点击的时间间隔,默认300ms，两个事件不同时使用可以指定为0
   */
  @Input() timeout = 300;
  /**
   * 【可选】是否显示排序未激活图标，默认显示,
   */
  @Input() showSortIcon = true;
  /**
   * 多列选择Change事件，用来更新多列选择数组
   * */
  @Output() multiSortChange = new EventEmitter<SortEventArg[]>();
  /**
   * 表格单元格点击事件
   */
  @Output() cellClick = new EventEmitter<CellSelectedEventArg>();
  /**
   * 表格单元格双击事件
   */
  @Output() cellDBClick = new EventEmitter<CellSelectedEventArg>();
  /**
   * 表格行点击事件
   */
  @Output() rowClick = new EventEmitter<RowSelectedEventArg>();
  /**
   * 表格行双击事件
   */
  @Output() rowDBClick = new EventEmitter<RowSelectedEventArg>();
  /**
   * 表格行双击事件
   */
  @Output() detialToggle = new EventEmitter<RowSelectedEventArg>();
  /**
   * 表格单元格开始编辑事件
   */
  @Output() cellEditStart = new EventEmitter<CellSelectedEventArg>();
  /**
   * 表格单元格结束编辑事件
   */
  @Output() cellEditEnd = new EventEmitter<CellSelectedEventArg>();
  /**
   * 某行的勾选状态变化事件
   */
  @Output() rowCheckChange = new EventEmitter<RowCheckChangeEventArg>();
  /**
   * 当前页码全勾选状态变化事件
   */
  @Output() checkAllChange = new EventEmitter<boolean>();
  /**
   * 页码变化事件
   */
  @Output() pageIndexChange = new EventEmitter<any>();
  /**
   * 延迟懒加载完成事件
   */
  @Output() loadMore = new EventEmitter();
  /**
   * 列宽变化事件
   */
  @Output() resize = new EventEmitter<DataTableColumnTmplComponent>();

  @ContentChildren(DataTableColumnTmplComponent) columns: QueryList<
    DataTableColumnTmplComponent
  >;
  @ContentChild(DataTableHeadTmplComponent)
  headTemplate: DataTableHeadTmplComponent;
  @ContentChild(DataTableFootTmplComponent)
  footTemplate: DataTableFootTmplComponent;
  @ContentChild(DataTablePagerTmplComponent)
  pagerTemplate: DataTablePagerTmplComponent;
  @ContentChild('noResultTemplateRef') noResultTemplate: TemplateRef<any>;
  @ViewChild(DataTableTmplsComponent)
  dataTableTemplates: DataTableTmplsComponent;
  @ViewChild('showDetailColumnRef')
  showDetailColumn: DataTableColumnTmplComponent;
  @ViewChild('checkableColumnRef')
  checkableColumn: DataTableColumnTmplComponent;
  @ViewChild('fixHeaderRef') fixHeaderRefElement: ElementRef;
  @ViewChild('resizeBar') resizeBarRefElement: ElementRef;
  @ViewChild('tableView') tableViewRefElement: ElementRef;

  _dataSource: any[] = [];
  _pageAllChecked = false;
  selectable = true;
  allChecked: number[] = [];
  _pager: DataTablePager;
  selectedRowItem: any;
  selectedColumnItem: any;
  isCellEdit: boolean;
  editRowItem: any;
  documentClickEvent = new EventEmitter<Event>();
  _hideColumn: string[] = [];
  _columns: DataTableColumnTmplComponent[];
  displayDataSource: any[];
  _lazy = false;
  scrollStream = new EventEmitter<Event>();
  subscription: Subscription;
  colSubscription: Subscription;

  searchQueryChange = new EventEmitter<{ [key: string]: any }>();

  @Input() set dataSource(dataSource: any[]) {
    if (null === dataSource || !dataSource) {
      dataSource = [];
    }
    this._dataSource = dataSource;
    this._pageAllChecked =
      dataSource &&
      dataSource.length > 0 &&
      this.dataSource.every(item => item.$checked);
  }

  get dataSource() {
    return this._dataSource;
  }

  @Input() set hideColumn(hideColume: string[]) {
    this._hideColumn = hideColume;
    if (this._columns) {
      this.updateColumns();
    }
  }

  get hideColumn() {
    return this._hideColumn;
  }

  @Input() set pager(pager: DataTablePager) {
    if (pager === undefined || pager === null) {
      return;
    } else {
      this._pager = {
        total: pager.total,
        pageIndex: pager.pageIndex || 1,
        pageSize: pager.pageSize || 10,
        maxItems: pager.maxItems || 8,
        selectDirection: pager.selectDirection || 'auto'
      };
    }
  }

  get pager() {
    return this._pager;
  }

  @Input() set pageAllChecked(pageAllChecked: boolean) {
    if (pageAllChecked) {
      this._dataSource = this.dataSource.map(item => {
        item.$checked = true;
        return item;
      });
    }
    this._pageAllChecked = pageAllChecked;
  }

  get pageAllChecked() {
    return this._pageAllChecked;
  }

  @Input() set lazy(lazy: boolean) {
    this._lazy = lazy;
  }

  get lazy() {
    return this._lazy;
  }

  constructor(
    private windowRef: WindowRef,
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick($event: Event) {
    this.documentClickEvent.emit($event);
  }

  @HostListener('window:wheel', ['$event'])
  onWinScroll($event: Event) {
    this.scrollStream.emit($event);
  }

  getColumns() {
    const cols = this.columns.filter(column => {
      return !this.hideColumn.some(field => column.field === field);
    });
    cols.sort((first, second) => first.order - second.order);
    return cols;
  }

  // life hook start
  ngOnInit() {
    if (this.lazy) {
      this.pager = null;
    }
    this.setupScrollEvent();
  }

  ngAfterContentInit() {
    this.updateColumns();
    this.columns.forEach(col => {
      col.orderChange.subscribe(order => {
        this.updateColumns();
      });
    });
    this.columns.changes.subscribe(() => {
      this.updateColumns();
    });
  }

  updateColumns() {
    this._columns = this.getColumns();
    this.onUpdateColumnDefs();
    this.changeDetectorRef.markForCheck();
  }

  ngOnDestroy(): void {
    this.unSubscription();
  }

  // life hook end

  onUpdateColumnDefs() {
    if (this.columnDefs) {
      this.columnDefs.forEach(columnDef => {
        const column = this.columns.find(
          col => col.field === columnDef.target
        );
        column.formatter = columnDef.render;
      });
    }
  }

  onHandleSort(column: SortEventArg) {
    // set column direction
    for (let i = 0; i < this.multiSort.length; i++) {
      if (this.multiSort[i].field === column.field) {
        this.multiSort[i].direction = column.direction;
        break;
      }
    }

    if (this.multiSort) {
      const multiSortIndex = this.multiSort.findIndex(
        item => item.field === column.field
      );
      if (multiSortIndex !== -1) {
        this.multiSort.splice(multiSortIndex, 1);
      }

      if (column.direction === '') {
        this.multiSortChange.emit(this.multiSort);
        return;
      }

      if (!this.onlyOneColumnSort) {
        this.multiSort.push(column);
      } else {
        this.multiSort = [column];
      }
    } else {
      this.multiSort = [column];
    }
    this.multiSortChange.emit(this.multiSort);
  }

  onCellClick($event: CellSelectedEventArg) {
    this.selectedRowItem = $event.rowItem;
    this.selectedColumnItem = $event.column;
    this.cellClick.emit($event);
  }

  onCellEditStart($event: CellSelectedEventArg) {
    this.isCellEdit = true;
    this.cellEditStart.emit($event);
  }

  onCellEditEnd($event: CellSelectedEventArg) {
    this.isCellEdit = false;
    this.cellEditEnd.emit($event);
  }

  onCellDBClick($event: CellSelectedEventArg) {
    this.cellDBClick.emit($event);
  }

  onRowClick($event: RowSelectedEventArg) {
    this.selectedRowItem = $event.rowItem;
    this.rowClick.emit($event);
  }

  onRowDBClick($event: RowSelectedEventArg) {
    this.rowDBClick.emit($event);
  }

  onDetailToggle($event: any) {
    this.detialToggle.emit($event);
  }

  onRowCheckChange($event: RowCheckChangeEventArg) {
    this.pageAllChecked = !this.dataSource.some(item => !item.$checked);
    this.rowCheckChange.emit($event);
  }

  onCheckAllChange($event: boolean) {
    if (this.dataSource) {
      this._dataSource = this.dataSource.map(item => {
        item.$checked = $event;
        return item;
      });
      this.pageAllChecked = $event;
    }
    this.checkAllChange.emit($event);
    this.changeDetectorRef.markForCheck();
  }

  onSearchQueryChange($event: { [key: string]: any }) {
    this.searchQueryChange.emit($event);
  }

  onPageChange($event: number) {
    this.pageIndexChange.emit({
      pageIndex: $event,
      pageSize: this.pager.pageSize
    });
  }

  getCheckRows(): any[] {
    return this.dataSource ? this.dataSource.filter(item => item.$checked) : [];
  }

  getSelectedRowItem(): any[] {
    return this.selectedRowItem;
  }

  editRow(rowItem, editModel) {
    rowItem.$$edit = true;
    rowItem.$$editModel = editModel;
    this.editRowItem = rowItem;
  }

  endEditRow(rowItem) {
    const editModel = rowItem.$$editModel;
    delete rowItem.$$edit;
    delete rowItem.$$editModel;
    this.editRowItem = null;
    return editModel;
  }

  loadFinish(complete: boolean) {
    if (complete) {
      return this.unSubscription();
    }
    setTimeout(_ => this.onWinScroll(null), 300);
  }

  onScrollChange() {
    const winHeight = this.windowRef.innerHeight;
    const clientRect = this.windowRef.getBoundingClientRect(this.elementRef);
    if (clientRect && winHeight - clientRect.bottom >= 40) {
      this.loadMore.emit(this);
    }
  }

  onResizeHandler($event: { newWidth; field; isUserDefined }) {
    const { newWidth, field, isUserDefined } = $event;
    // if (!isUserDefined) {
    //     if (field === 'showDetail') {
    //         this.showDetailColumn = Object.assign({}, this.showDetailColumn, {width: newWidth});
    //     }

    //     if (field === 'checkable') {
    //         this.checkableColumn = Object.assign({}, this.checkableColumn, {width: newWidth});
    //     }
    // } else {
    // }
    this._columns = this._columns.map(column => {
      if (column.field === field) {
        column.width = newWidth;
        this.resize.emit(column);
        return column;
      }
      return column;
    });

    this.changeDetectorRef.markForCheck();
  }

  onBodyScroll(event: Event) {
    if (this.fixHeader) {
      (<HTMLElement>this.fixHeaderRefElement.nativeElement).scrollLeft = (<
        HTMLElement
      >event.target).scrollLeft;
    }
  }

  private unSubscription() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }

    if (this.colSubscription) {
      this.colSubscription.unsubscribe();
      this.colSubscription = null;
    }
  }

  private setupScrollEvent() {
    if (!this.subscription) {
      this.subscription = this.registerOnScrollStream(
        this.scrollStream
      ).subscribe(_ => this.onScrollChange());
    }
  }

  private registerOnScrollStream(scrollStream: EventEmitter<any>) {
    return scrollStream.pipe(
      debounceTime(300),
      distinctUntilChanged()
    );
  }
}
