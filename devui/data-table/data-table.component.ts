import { AfterContentInit, ChangeDetectorRef, Component, ContentChild, ContentChildren, ElementRef, EventEmitter,
  HostBinding, Input, NgZone, OnDestroy, OnInit, Output, QueryList, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { WindowRef } from 'ng-devui/window-ref';
import { CellSelectedEventArg, CheckableRelation, ColumnResizeEventArg, DataTablePager, RowCheckChangeEventArg,
  RowSelectedEventArg, SortEventArg, TableExpandConfig } from './data-table.model';
import { DataTableColumnTmplComponent } from './tmpl/data-table-column-tmpl.component';
import { DataTableFootTmplComponent } from './tmpl/data-table-foot-tmpl.component';
import { DataTableHeadTmplComponent } from './tmpl/data-table-head-tmpl.component';
import { DataTablePagerTmplComponent } from './tmpl/data-table-pager-tmpl.component';

@Component({
  selector: 'd-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: [
    './data-table.component.scss',
    './data-table.component.color.scss'
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'dataTable'
})
export class DataTableComponent implements OnDestroy, OnInit, AfterContentInit {
  /**
   * 【可选】Datatable是否提供勾选行的功能
   */
  @Input() checkable: boolean;
  /**
   * 【可选】是否提供显示行详情的功能
   */
  @Input() showExpandToggle: boolean;
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
   * 【可选】用来自定义表格是否可以拖动
   */
  @Input() colDraggable: boolean;
  /**
   * 【可选】用来自定义不可拖拽的前几列
   */
  @Input() colDropFreezeTo = 0;
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
  * 行detail toggle事件
  */
  @Output() detialToggle = new EventEmitter<any>();
  /**
   * 表格单元格开始编辑前的拦截事件
   */
  @Input() beforeCellEdit: (rowItem: any, column: any) => Promise<any>;
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
  @Output() resize = new EventEmitter<ColumnResizeEventArg>();
  /**
   * 当前表格层级，默认为0，在树形表格场景下自增长
   */
  @Input() tableLevel = 0;
  /**
 * 配置树形表格的父子选中是否互相关联
 * upward：选中子关联父
 * downward： 选中父关联子
 */
  @Input() checkableRelation: CheckableRelation = { upward: true, downward: true };
  /**
   * 异步加载子列表
   */
  @Input() loadChildrenTable: (rowItem: any) => Promise<any>;
  /**
   * 异步加载全部子列表
   */
  @Input() loadAllChildrenTable: () => Promise<any>;
  /**
   * 是否虚拟滚动
   */
  @Input() virtualScroll;
  /**
   * 配置header的展开内容
   */
  @Input() headerExpandConfig: TableExpandConfig;
  /**
   * 子列表关闭事件
   */
  @Output() childrenTableClose = new EventEmitter<any>();
  /**
   * 全部子列表关闭事件
   */
  @Output() allChildrenTableClose = new EventEmitter();

  @ContentChildren(DataTableColumnTmplComponent) columns: QueryList<DataTableColumnTmplComponent>;
  @ContentChild(DataTableHeadTmplComponent, { static: false }) headTemplate: DataTableHeadTmplComponent;
  @ContentChild(DataTableFootTmplComponent, { static: false }) footTemplate: DataTableFootTmplComponent;
  @ContentChild(DataTablePagerTmplComponent, { static: false }) pagerTemplate: DataTablePagerTmplComponent;
  @ContentChild('noResultTemplateRef', { static: false }) noResultTemplate: TemplateRef<any>;
  @ViewChild('fixHeaderContainerRef', { static: false }) fixHeaderContainerRefElement: ElementRef;
  @ViewChild('fixHeaderTableRef', { static: false }) fixHeaderTableRefElement: ElementRef;
  // @ViewChild('fixColumnRef') fixColumnRefElement: ElementRef;
  @ViewChild('tableView', { static: true }) tableViewRefElement: ElementRef;

  _dataSource: any[] = [];
  _pageAllChecked = false;
  selectable = true;
  allChecked: number[] = [];
  _pager: DataTablePager;
  selectedRowItem: any;
  selectedColumnItem: any;
  isCellEdit: boolean;
  editRowItem: any;
  documentClickEvent = new EventEmitter<any>();
  cellEditorClickEvent = new EventEmitter<Event>();
  _hideColumn: string[] = [];
  _columns: DataTableColumnTmplComponent[];
  displayDataSource: any[];
  _lazy = false;
  scrollStream = new EventEmitter<Event>();
  subscription: Subscription;
  colSubscription: Subscription;
  searchQueryChange = new EventEmitter<{ [key: string]: any; }>();
  halfChecked = false;
  tableBodyEl: ElementRef;
  tableStatusEnum = {
    open: true,
    close: false
  };
  resizeBarRefElement: ElementRef;

  private scrollY = 0;
  @ViewChild('resizeBar', { static: false }) set resizeBar(content: ElementRef) {
    setTimeout(() => {
      this.resizeBarRefElement = content;
      if (!this.changeDetectorRef['destroyed']) {
        this.changeDetectorRef.detectChanges();
      }
    });
  }


  @Input() set dataSource(dataSource: any[]) {
    if (null === dataSource || !dataSource) {
      dataSource = [];
    }
    this._dataSource = dataSource;
    const hasChecked = this.dataSource.some(this.hasChecked);
    const hasUnChecked = this.dataSource.some(this.hasUnChecked);
    this._pageAllChecked = dataSource && dataSource.length > 0 && !hasUnChecked;
    this.halfChecked = hasChecked && hasUnChecked;
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
    if (this.dataSource) {
      this._dataSource = this.setCheckedStatus(this.dataSource, pageAllChecked);
    }
    this._pageAllChecked = pageAllChecked;
    this.halfChecked = this.dataSource.some(this.hasChecked) && this.dataSource.some(this.hasUnChecked);
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
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private renderer: Renderer2) {
  }

  private getColumns() {
    const cols = this.columns
      .filter(column => {
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
    this.ngZone.runOutsideAngular(() => {
      document.addEventListener(
        'click',
        this.onDocumentClick.bind(this)
      );
      window.addEventListener(
        'wheel',
        this.onWinScroll.bind(this)
      );
    });
  }

  onDocumentClick($event: Event) {
    this.documentClickEvent.emit($event);
  }

  onWinScroll($event: Event) {
    this.ngZone.run(() => {
      this.scrollStream.emit($event);
    });
  }

  ngAfterContentInit() {
    this.updateColumns();
    this.columns.forEach((col) => {
      col.orderChange.subscribe((order) => {
        this.updateColumns();
      });
    });
    this.columns.changes.subscribe(() => {
      this.updateColumns();
    });
  }

  private updateColumns() {
    this._columns = this.getColumns();
  }

  private getScrollbarWidth() {
    if (this.tableBodyEl) {
      const inner = this.tableBodyEl.nativeElement.parentNode;
      const outer = inner.parentNode;
      // Calculating difference between container's full width and the child width
      return (outer.offsetWidth - inner.offsetWidth);
    }
  }

  ngOnDestroy(): void {
    this.unSubscription();
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
      const multiSortIndex = this.multiSort.findIndex(item => item.field === column.field);
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
    this.ngZone.run(() => {
      this.cellClick.emit($event);
    });
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
    this.ngZone.run(() => {
      this.cellDBClick.emit($event);
    });
  }

  onRowClick($event: RowSelectedEventArg) {
    this.selectedRowItem = $event.rowItem;
    this.ngZone.run(() => {
      this.rowClick.emit($event);
    });
  }

  onRowDBClick($event: RowSelectedEventArg) {
    this.ngZone.run(() => {
      this.rowDBClick.emit($event);
    });
  }

  onDetailToggle($event: any) {
    this.detialToggle.emit($event);
  }

  // 判断数据是否存在选中状态
  private hasChecked = (data) => {
    if (data.$checked) {
      return true;
    }
    if (data.children) {
      return data.children.some(this.hasChecked);
    }
  }

  // 判断数据是否存在未选中状态
  private hasUnChecked = (data) => {
    if (!data.$checked) {
      return true;
    }
    if (data.children) {
      return data.children.some(this.hasUnChecked);
    }
  }

  onRowCheckChange($event: RowCheckChangeEventArg) {
    // 处理children的选中
    if ($event.rowItem.children && this.checkableRelation.downward) {
      this.setCheckedStatus($event.rowItem.children, $event.checked);
    }

    // 处理parents的选中
    if (this.checkableRelation.upward) {
      const nestedIndexArray = $event.nestedIndex.split(',');
      nestedIndexArray.shift();
      const nestedIndexArrayToInt = nestedIndexArray.map((value) => {
        // tslint:disable-next-line:radix
        return parseInt(value);
      });
      // 通过选中行的父级索引设置父的选中状态
      this.setParentCheckStatus(nestedIndexArrayToInt);
    }

    // 处理整个table header的选中
    const hasChecked = this.dataSource.some(this.hasChecked);
    if ($event) {
      const hasUnChecked = this.dataSource.some(this.hasUnChecked);
      this._pageAllChecked = !hasUnChecked;
      this.halfChecked = hasChecked && hasUnChecked;
    } else {
      this._pageAllChecked = false;
      this.halfChecked = hasChecked;
    }

    this.rowCheckChange.emit($event);
  }

  private setParentCheckStatus(nestedIndex) {
    if (nestedIndex.length > 0) {
      const topIndex = nestedIndex[0];
      const topParent = this.dataSource[topIndex];
      const argNestedIndex = [...nestedIndex];
      argNestedIndex.shift();
      const lastParent = this.findLastParent(topParent, argNestedIndex);
      this.setSelfCheckStatus(lastParent);

      nestedIndex.pop();
      if (nestedIndex.length > 0) {
        this.setParentCheckStatus(nestedIndex);
      }
    }
  }

  private findLastParent(source, indexArray) {
    if (source && indexArray.length > 0) {
      const topIndex = indexArray[0];
      const topParent = source.children[topIndex];
      indexArray.shift();
      return this.findLastParent(topParent, indexArray);
    } else {
      return source;
    }
  }

  private setSelfCheckStatus(data) {
    if (data && data.children) {
      const hasUnChecked = data.children.some((child) => {
        return !child.$checked;
      });

      const hasChecked = data.children.some((child) => {
        return child.$checked || child.$halfChecked;
      });

      data.$checked = !hasUnChecked;
      data.$halfChecked = hasUnChecked && hasChecked;
    }
  }

  private setCheckedStatus(data, checked) {
    return data.map(item => {
      if (!item.$disabled) {
        item.$checked = checked;
        item.$halfChecked = false;
      }

      if (item.children) {
        item.children = this.setCheckedStatus(item.children, checked);
      }
      return item;
    });
  }

  onCheckAllChange($event: boolean) {
    this.pageAllChecked = $event;
    this.checkAllChange.emit($event);
    // this.changeDetectorRef.markForCheck();
  }

  onSearchQueryChange($event: { [key: string]: any; }) {
    this.searchQueryChange.emit($event);
  }

  onPageChange($event: number) {
    this.pageIndexChange.emit({ pageIndex: $event, pageSize: this.pager.pageSize });
  }

  getSelectedRowItem(): any[] {
    return this.selectedRowItem;
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

  beginResizeHandlerEvent($event) {
    this.onDocumentClick($event);
  }

  onResizingFixedHandler({ column, width, nextElementWidth }) {
    this._columns = this._columns.map((_column, index) => {
      if (_column.field === column.field) {
        this.ngZone.run(() => {
          if (index + 1 < this._columns.length && this._columns[index + 1].width && _column.width) {
            this._columns[index + 1].width = parseInt(nextElementWidth, 10) + 'px';
          }
          _column.width = width + 'px';
        });

        return _column;
      }
      return _column;
    });
  }

  handleDragTable({ from, to }) {
    const sortArray = (array, fromE, toE) => {
      if (fromE < toE) {
        const fromEData = array[fromE];
        for (let i = 0; i < array.length; i++) {
          if (i >= fromE && i < toE) {
            this.ngZone.run(() => {
              array[i] = array[i + 1];
            });
          }
        }
        this.ngZone.run(() => {
          array[toE] = fromEData;
        });
      }

      if (fromE > toE) {
        const fromEData = array[fromE];
        for (let i = array.length; i > 0; i--) {
          if (i <= fromE && i > toE) {
            array[i] = array[i - 1];
          }
        }
        array[toE] = fromEData;
      }
    };
    sortArray(this._columns, from, to);
    this._columns.forEach((item, index) => {
      item.order = index;
    });
  }

  onResizeHandler($event: { width, field, isUserDefined, nextElementWidth }) {
    const { width, field, isUserDefined, nextElementWidth } = $event;
    this._columns = this._columns.map((column, index) => {
      if (column.field === field) {
        this.ngZone.run(() => {
          if (index + 1 < this._columns.length && this._columns[index + 1].width && column.width) {
            this._columns[index + 1].width = parseInt(nextElementWidth, 10) + 'px';
          }
          column.width = parseInt(width, 10) + 'px';
          const columnResizeEventArg = { currentColumn: column, nextColumn: this._columns[index + 1] };
          this.resize.emit(columnResizeEventArg);
        });
        return column;
      }
      return column;
    });

    this.changeDetectorRef.markForCheck();
  }

  onBodyScroll(event: Event) {
    const target = <HTMLElement>event.target;

    if (this.isCellEdit) {
      // Y轴滚动距离超过tr高度时取消目前编辑状态
      if (this.scrollY === 0) {
        this.scrollY = target.scrollTop;
      }
      const offset = target.scrollTop - this.scrollY;
      if (offset > 40 || offset < -40) {
        this.cancelEditingStatus();
        this.scrollY = 0;
      }
    }

    const scrollLeft = target.scrollLeft;
    if (scrollLeft === 0) {
      if (target.clientWidth === target.scrollWidth) {
        this.setScrollViewClass('none');
      } else {
        this.setScrollViewClass('left');
      }
    } else if (scrollLeft + target.clientWidth === target.scrollWidth) {
      this.setScrollViewClass('right');
    } else {
      this.setScrollViewClass('middle');
    }

    if (this.fixHeader) {
      (<HTMLElement>this.fixHeaderContainerRefElement.nativeElement).scrollLeft = scrollLeft;
    }
  }

  private setScrollViewClass(position: string) {
    const element = this.tableViewRefElement.nativeElement;
    const className = 'devui-talbe-scorll-' + position;
    const elClassList = element.classList;
    if (!elClassList.contains(className)) {
      for (let index = 0; index < elClassList.length; index++) {
        const clName = elClassList[index];
        if (clName.startsWith('devui-talbe-scorll-')) {
          this.renderer.removeClass(element, clName);
        }
      }
      this.renderer.addClass(element, className);
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
      this.subscription = this.registerOnScrollStream(this.scrollStream)
        .subscribe(_ => this.onScrollChange());
    }
  }

  private registerOnScrollStream(scrollStream: EventEmitter<any>) {
    return scrollStream
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      );
  }

  onToggleChildrenTable(rowItem, status) {
    if (status === this.tableStatusEnum.open) {
      let loadChildrenResult = Promise.resolve(true);
      if (this.loadChildrenTable) {
        loadChildrenResult = this.loadChildrenTable(rowItem);
      }
      loadChildrenResult.then(() => {
        // 异步加载子表格是检查选中状态
        if (rowItem.$checked && this.checkableRelation.downward) {
          this.setCheckedStatus(rowItem.children, rowItem.$checked);
        }
      });
    } else {
      this.childrenTableClose.emit(rowItem);
    }
  }

  private setChildrenToogleStatus(data, open) {
    return data.map(item => {
      if (item.children) {
        item.$isChildTableOpen = open;
        item.children = this.setChildrenToogleStatus(item.children, open);
      }
      return item;
    });
  }

  // 切换表头的子表格展开收起
  onToggleAllChildrenTable(status) {
    if (status === this.tableStatusEnum.open) {
      let loadAllChildrenResult = Promise.resolve(true);
      if (this.loadAllChildrenTable) {
        loadAllChildrenResult = this.loadAllChildrenTable();
      }
      loadAllChildrenResult.then(() => {
        this.dataSource.forEach(item => {
          if (item.$checked && item.children) {
            this.setCheckedStatus(item.children, true);
          }
        });
        this.setChildrenToogleStatus(this.dataSource, status);
      });
    } else {
      this.setChildrenToogleStatus(this.dataSource, status);
      this.allChildrenTableClose.emit();
    }
  }

  cancelEditingStatus() {
    this.documentClickEvent.emit('cancel');
  }

  private collectCheckedRows(dist: Array<any>, source: Array<any>) {
    source.forEach(row => {
      if (row.$checked) {
        dist.push(row);
      }
      if (row.children) {
        this.collectCheckedRows(dist, row.children);
      }
    });
  }

  getCheckedRows() {
    if (this.checkableRelation.upward) {
      // 如果children的选中状态关联parent的选中状态,只需返回最外层的数据
      return this.dataSource ? this.dataSource.filter(item => item.$checked || item.$halfChecked) : [];
    } else {
      // 如果children的选中状态不关联parent的选中状态,遍历dataSource,将所有的选中行平级返回
      const checkedRows = [];
      this.collectCheckedRows(checkedRows, this.dataSource);
      return checkedRows;
    }
  }
}
