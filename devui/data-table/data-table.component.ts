import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { DOCUMENT } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { merge, Subscription } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { DataTableHeadComponent } from './data-table-head.component';
import {
  CellSelectedEventArg,
  CheckableRelation,
  ColumnResizeEventArg,
  RowCheckChangeEventArg,
  RowSelectedEventArg,
  SortEventArg,
  TableCheckOptions,
  TableCheckStatusArg,
  TableExpandConfig,
  TableWidthConfig,
} from './data-table.model';
import { DATA_TABLE } from './data-table.token';
import { TableTbodyComponent } from './table/body/tbody.component';
import { TableThComponent } from './table/head/th/th.component';
import { TableTheadComponent } from './table/head/thead.component';
import { DataTableColumnTmplComponent } from './tmpl/data-table-column-tmpl.component';

const SCROLL_BAR_WIDTH = 8;

@Component({
  selector: 'd-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss', './data-table.component.color.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'dataTable',
  preserveWhitespaces: false,
  providers: [
    {
    provide: DATA_TABLE,
      useExisting: forwardRef(() => DataTableComponent),
    },
  ],
})
export class DataTableComponent implements OnDestroy, OnInit, OnChanges, AfterContentInit, AfterViewInit {
  /**
   * 【可选】Datatable是否提供勾选行的功能
   */
  @Input() checkable: boolean;
  /**
   * 【可选】表头checkbox是否disabled
   */
  @Input() headerCheckDisabled: boolean;
  /**
   * 【可选】表头checkbox是否可见
   */
  @Input() headerCheckVisible = true;
  /**
   * 【可选】表头选中的下拉项及操作
   */
  @Input() checkOptions: TableCheckOptions[];

  @Input() checkOptionsIndex = 1050;

  @Input() selectOptionOnCheckbox = false;
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
   * 【可选】默认表格使用的表格类型，可选值为'cell' @deprecated
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
   * 表格类型 @deprecated
   */
  @Input() type: any;
  /**
   * 鼠标悬浮行时是否高亮
   */
  @Input() rowHoveredHighlight = true;
  /**
   * 鼠标悬浮行时$hovered是否记录到rowItem中
   */
  @Input() generalRowHoveredData;
  /**
   * 表格自定义样式
   */
  @Input() cssClass: string;
  /**
   * 表格宽度
   */
  @Input() tableWidth = '100%';
  /**
   * 表格高度
   */
  @Input() tableHeight: string;
  /**
   * 固定表头指定高度是否包含表头的高度，`tableHeight`设置的高度默认是表格body的高度
   */
  @Input() containFixHeaderHeight = false;
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
   * 【可选】用来自定义详情页的模板 @deprecated
   */
  @Input() detailTemplateRef: TemplateRef<any>;
  /**
   * 【可选】同时绑定单击、双击事件时，用于区分点击的时间间隔,默认300ms，两个事件不同时使用可以指定为0
   */
  @Input() timeout = 300;
  /**
   * 【可选】配置表头操作未激活状态下是否显示操作区域，默认不显示
   */
  @Input() showOperationArea = false;
  /**
   * 【可选】是否显示排序未激活图标，默认显示,
   */
  @Input() showSortIcon = true;
  /**
   * 【可选】是否显示筛选未激活图标，默认显示,
   */
  @Input() showFilterIcon = true;
  /**
   * 多列选择Change事件，用来更新多列选择数组, column param
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
   * 表格单元格开始编辑后的拦截事件
   */
  @Input() beforeCellEditEnd: (rowItem: any, column: any) => boolean;
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
   * 延迟懒加载完成事件
   */
  @Output() loadMore = new EventEmitter<any>();
  /**
   * 列宽变化事件
   */
  @Output() resize = new EventEmitter<ColumnResizeEventArg>();
  /**
   * 当前表格层级，默认为0，在树形表格场景下自增长
   * 内部嵌套使用，不对外暴露
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
  @Output() allChildrenTableClose = new EventEmitter<any>();
  /**
   * 虚拟滚动配置
   */
  @Input() virtualItemSize = 40;
  @Input() virtualMinBufferPx = 80;
  @Input() virtualMaxBufferPx = 200;

  /**
   * 懒加载
   */
  @Input() lazy: boolean;
  /**
   * 列宽配置
   */
  @Input() tableWidthConfig: TableWidthConfig[] = [];
  /**
   * 表头是否有背景色
   */
  @Input() headerBg: boolean;
  /**
   * 表格布局
   */
  @Input() tableLayout: 'fixed' | 'auto' = 'fixed';
  /**
   * 表格边框类型，默认有行边框，bordered：全边框，borderless：无边框
   */
  @Input() borderType: '' | 'bordered' | 'borderless' = '';
  /**
   * 表格是否展示为斑马纹间隔
   */
  @Input() striped: boolean;
  /**
   * 表格内部滚动事件
   */
  @Output() tableScrollEvent = new EventEmitter<Event>();

  @Input() minHeight: string;

  @Output() columnDragEnd = new EventEmitter<any>();

  /**
   * 表格尺寸，sm对应行高40px， md对应行高48px，lg对应行高56px
   */
  @Input() size: 'mini' | 'xs' | 'sm' | 'md' | 'lg' = 'sm';

  @Input() shadowType: 'normal' | 'embed' = 'embed';

  @Input() tableOverflowType: 'overlay' | 'auto' = 'auto';

  @ContentChildren(DataTableColumnTmplComponent) columns: QueryList<DataTableColumnTmplComponent>;
  @ContentChild(TableTheadComponent) innerHeader: TableTheadComponent;
  @ContentChild(TableTbodyComponent) innerBody: TableTbodyComponent;
  @ContentChildren(TableThComponent, { descendants: true }) thList: QueryList<TableThComponent>;
  @ContentChild('noResultTemplateRef') noResultTemplate: TemplateRef<any>;
  @ViewChild('fixHeaderContainerRef') fixHeaderContainerRefElement: ElementRef;
  @ViewChild('tableView', { static: true }) tableViewRefElement: ElementRef;
  @ViewChild('cdkVirtualScrollViewport') virtualScrollViewport: CdkVirtualScrollViewport;
  @ViewChild('normalScroll') normalScrollElement: ElementRef;
  @ViewChild('scrollViewTpl') vitualScrollElement: TemplateRef<any>;
  @ViewChild(DataTableHeadComponent) columnHeaderComponent: DataTableHeadComponent;
  @ViewChild('devuiNormalScrollBody', { read: ElementRef }) devuiNormalScrollBody: ElementRef;

  @HostBinding('style.height') get hostHeight() {
    return this.tableHeight && this.dataSource.length ? this.tableHeight : null;
  }

  @HostBinding('class.devui-table-shadow') get hasShadow() {
    return this.shadowType === 'normal';
  }

  hasWidthScroll: boolean;

  hasHeightScroll: boolean;

  _dataSource: any[] = [];
  _pageAllChecked = false;
  selectable = true;
  allChecked: number[] = [];
  selectedRowItem: any;
  selectedColumnItem: any;
  isCellEdit: boolean;
  editRowItem: any;
  documentClickEvent = new EventEmitter<any>();
  cellEditorClickEvent = new EventEmitter<Event>();
  _hideColumn: string[] = [];
  _columns: DataTableColumnTmplComponent[];
  displayDataSource: any[];
  headertoggleTableSubscription: Subscription;
  headerCheckStatusSubscription: Subscription;
  searchQueryChange = new EventEmitter<{ [key: string]: any }>();
  halfChecked = false;
  childrenTableOpen: boolean;
  private scrollY = 0;
  BUILTIN_COL_WIDTH = '41px';
  BUILTIN_COL_WIDTH_EXTRA = '55px';

  tableBodyEl: ElementRef;
  onDocumentClickListen: any;

  _tableTotalWidth = 0;
  _lastColSize = 0;

  @ViewChild('tableBody') set content(content: ElementRef) {
    setTimeout(() => {
      this.tableBodyEl = content;
      if (this.virtualScroll) {
        this.initVirtualBodyHeight();
      }
    });
  }

  @Input() set dataSource(dataSource: any[]) {
    if (dataSource === null || !dataSource) {
    /* eslint-disable-next-line no-param-reassign */
      dataSource = [];
    }
    this._dataSource = dataSource;
    const hasChecked = this.dataSource.some(this.hasChecked);
    const hasUnChecked = this.dataSource.some(this.hasUnChecked);
    this._pageAllChecked = dataSource && dataSource.length > 0 && !hasUnChecked;
    this.halfChecked = hasChecked && hasUnChecked;

    if (this.innerHeader) {
      this.innerHeader.setHeaderCheckStatus({ pageAllChecked: this._pageAllChecked, pageHalfChecked: this.halfChecked });
    }

    // 固定表头时，数据从无数据到有数据，需要更新滚动位置，避免对齐偏移
    if (this.fixHeader) {
      setTimeout(() => {
        this.onBodyScroll();
      });
    }

    if (this.virtualScroll) {
      this.initVirtualBodyHeight();
    }
    this.initScrollStatus();
  }

  get dataSource() {
    return this._dataSource;
  }

  @Input() set hideColumn(hideColumn: string[]) {
    this._hideColumn = hideColumn;
    if (this._columns) {
      this.updateColumns();
    }
  }

  get hideColumn() {
    return this._hideColumn;
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

  virtualBodyHeight;
  document: Document;
  constructor(
    private elementRef: ElementRef,
    private ngZone: NgZone,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private doc: any
  ) {
    this.onDocumentClickListen = this.onDocumentClick.bind(this);
    this.document = this.doc;
  }

  initVirtualBodyHeight() {
    setTimeout(() => {
      if (this.virtualScrollViewport) {
        this.virtualScrollViewport.checkViewportSize();
      }
    });
    if (this.tableHeight && this.tableHeight !== 'auto') {
      this.virtualBodyHeight = this.tableHeight;
      return;
    }

    if (!this.maxHeight) {
      this.virtualBodyHeight = null;
      return;
    }

    if (this.tableBodyEl) {
      const tableHeader = this.tableBodyEl.nativeElement.querySelector('thead');
      const tableHeaderHeight = tableHeader?.offsetHeight + SCROLL_BAR_WIDTH || 0;
      const curTotalHeight = this.dataSource.length * this.virtualItemSize + tableHeaderHeight + SCROLL_BAR_WIDTH;
      this.virtualBodyHeight = curTotalHeight < parseInt(this.maxHeight, 10) ? curTotalHeight + 'px' : this.maxHeight;
      return;
    }
  }

  private getColumns() {
    const cols = this.columns.filter((column) => {
      return !this.hideColumn.some((field) => column.field === field);
      });
    cols.sort((first, second) => first.order - second.order);
    return cols;
  }

  // life hook start
  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.document.addEventListener('click', this.onDocumentClickListen);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { checkable, showExpandToggle, tableHeight, maxHeight, virtualScroll } = changes;
    if (checkable) {
      const checkColIndex = this.tableWidthConfig.findIndex((config) => {
        return config.field === 'checkbox';
      });
      if (this.checkable) {
        if (checkColIndex < 0) {
          if (this.showExpandToggle) {
            this.tableWidthConfig.splice(1, 0, { field: 'checkbox', width: this.BUILTIN_COL_WIDTH });
          } else {
            this.tableWidthConfig.unshift({ field: 'checkbox', width: this.BUILTIN_COL_WIDTH });
          }
        }
      } else {
        if (checkColIndex > -1) {
          this.tableWidthConfig.splice(checkColIndex, 1);
        }
      }
    }

    if (showExpandToggle) {
      const expandColIndex = this.tableWidthConfig.findIndex((config) => {
        return config.field === 'expand';
      });
      if (this.showExpandToggle) {
        if (expandColIndex < 0) {
          this.tableWidthConfig.unshift({ field: 'expand', width: this.BUILTIN_COL_WIDTH });
        }
      } else {
        if (expandColIndex > -1) {
          this.tableWidthConfig.splice(expandColIndex, 1);
        }
      }
    }

    if (
      this.virtualScroll &&
      ((tableHeight && !tableHeight.firstChange) || (maxHeight && !maxHeight.firstChange) || (virtualScroll && !virtualScroll.firstChange))
    ) {
      this.initVirtualBodyHeight();
    }
  }

  onDocumentClick($event: Event) {
    this.documentClickEvent.emit($event);
  }

  ngAfterContentInit() {
    if (this.columns.length > 0) {
      this.updateColumns();
      this.columns.forEach((col) => {
        col.orderChange.subscribe(() => {
          this.updateColumns();
        });
        col.widthChange.subscribe(() => {
          this.updateColumns();
        });
      });
    }

    if (this.innerHeader) {
      this.headerCheckStatusSubscription = this.innerHeader.headerCheckStatusEvent.subscribe((status) => {
        this.onCheckAllChange(status);
      });
      this.headertoggleTableSubscription = this.innerHeader.headerChildrenTableToggleEvent.subscribe((status) => {
        this.onToggleAllChildrenTable(status);
      });
    } else {
      this.columns.changes.subscribe(() => {
        this.updateColumns();
      });
    }

    setTimeout(() => {
      this.initScrollStatus();
    });
  }

  public initScrollStatus() {
    if (this.tableOverflowType !== 'overlay') {
      return;
    }
    const ele = this.virtualScroll ? this.virtualScrollViewport?.elementRef?.nativeElement : this.normalScrollElement?.nativeElement;
    this.hasWidthScroll = ele && ele.scrollWidth > ele.clientWidth;
    this.hasHeightScroll = ele && ele.scrollHeight > ele.clientHeight;
  }

  ngAfterViewInit() {
    this.thList.forEach((th) => {
      th.tableViewRefElement = this.tableViewRefElement;
    });
    this.thList.changes.subscribe((list) => {
      list.forEach((th) => {
        th.tableViewRefElement = this.tableViewRefElement;
      });
    });
    if (this.onlyOneColumnSort) {
      this.resetThSortOrder();
    }
    setTimeout(() => {
      this.initScrollClass();
    });
  }

  // 初始化时判断是否存在横向滚动，并加上相应类名
  initScrollClass() {
    const ele = this.normalScrollElement?.nativeElement || this.vitualScrollElement?.elementRef?.nativeElement;
    if (ele.clientWidth !== ele.scrollWidth) {
      this.setScrollViewClass('left');
    }
  }

  private resetThSortOrder() {
    merge(...this.thList?.map((th) => th.sortChange))
      .pipe(takeUntil(this.thList.changes))
      .subscribe((sortEvent: SortEventArg) => {
        this.thList.filter((th) => th !== sortEvent.th).forEach((th) => th.clearSortOrder());
    });

    this.thList.changes.pipe(switchMap(() => merge(...this.thList.map((th) => th.sortChange)))).subscribe((sortEvent: SortEventArg) => {
      this.thList.filter((th) => th !== sortEvent.th).forEach((th) => th.clearSortOrder());
    });
  }

  public updateColumns() {
    this._columns = this.getColumns();
    this.tableWidthConfig = [];
    if (this.showExpandToggle) {
      this.tableWidthConfig.push({ field: 'expand', width: this.BUILTIN_COL_WIDTH });
    }
    if (this.checkable) {
      if (this.checkOptions && this.checkOptions.length > 0) {
        this.tableWidthConfig.push({ field: 'checkbox', width: this.BUILTIN_COL_WIDTH_EXTRA });
      } else {
        this.tableWidthConfig.push({ field: 'checkbox', width: this.BUILTIN_COL_WIDTH });
      }
    }

    this._columns.forEach((col) => {
      this.tableWidthConfig.push({ field: col.field, width: col.width });
    });
  }

  ngOnDestroy(): void {
    this.unSubscription();
    this.document.removeEventListener('click', this.onDocumentClickListen);
  }

  onHandleSort(column: SortEventArg) {
    if (this.multiSort && this.multiSort.length > 0) {
      const multiSortIndex = this.multiSort.findIndex((item) => item.field === column.field);
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
  };

  // 判断数据是否存在未选中状态
  private hasUnChecked = (data) => {
    if (!data.$checked) {
      return true;
    }
    if (data.children) {
      return data.children.some(this.hasUnChecked);
    }
  };

  setRowCheckStatus($event: RowCheckChangeEventArg) {
    // 处理children的选中
    if ($event.rowItem.children && this.checkableRelation.downward) {
      this.setCheckedStatus($event.rowItem.children, $event.checked);
    }

    // 处理parents的选中
    if (this.checkableRelation.upward) {
      const nestedIndexArray = $event.nestedIndex.split(',');
      nestedIndexArray.shift();
      const nestedIndexArrayToInt = nestedIndexArray.map((value) => {
        return parseInt(value, 10);
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

    if (this.innerHeader) {
      this.innerHeader.setHeaderCheckStatus({ pageAllChecked: this._pageAllChecked, pageHalfChecked: this.halfChecked });
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

  private setCheckedStatus(data, checked, toggle?: boolean) {
    return data.map((item) => {
      if (!(item.$checkDisabled || item.$disabled)) {
        if ((toggle && item.$checked === undefined) || !toggle) {
          item.$checked = checked;
          item.$halfChecked = false;
        }
      }

      if (item.children) {
        item.children = this.setCheckedStatus(item.children, checked, toggle);
      }
      return item;
    });
  }

  onCheckAllChange($event: boolean) {
    this.pageAllChecked = $event;
    this.checkAllChange.emit($event);
  }

  onSearchQueryChange($event: { [key: string]: any }) {
    this.searchQueryChange.emit($event);
  }

  getSelectedRowItem(): any[] {
    return this.selectedRowItem;
  }

  onLoadMore(event) {
    this.loadMore.emit(this);
  }

  private updateColumnsWidth() {
    this.tableWidthConfig = [];
    if (this.showExpandToggle) {
      const expandWidth = this.elementRef.nativeElement.querySelector('.devui-detail-cell').clientWidth;
      this.tableWidthConfig.push({ field: 'expand', width: expandWidth + 'px' });
    }
    if (this.checkable) {
      const list = this.elementRef.nativeElement.querySelectorAll('.devui-checkable-cell');
      const checkboxWidth = list[list.length - 1].clientWidth;
      this.tableWidthConfig.push({ field: 'checkbox', width: checkboxWidth + 'px' });
    }
    this._columns.forEach((col) => {
      this.tableWidthConfig.push({ field: col.field, width: col.width });
    });
  }

  beginResizeHandlerEvent($event) {
    const thRenderWidthList = $event.thRenderWidthList;
    if (thRenderWidthList.length > 0) {
      this._tableTotalWidth = this.elementRef.nativeElement.querySelector('.table-wrap').offsetWidth - 8;
      // 兼容d-column表头分组场景
      const reverseThList = thRenderWidthList.reverse();
      this._columns.forEach((column) => {
        const thItem = reverseThList.find((th) => th.field === column.field);
        if (thItem) {
          column.width = thItem.width + 'px';
        }
      });

      if (!this._lastColSize) {
        this._lastColSize = parseInt(this._columns.slice(-1)[0].width, 10);
      }
      this.updateColumnsWidth();
    }
    this.onDocumentClick($event.event);
  }

  onResizingFixedHandler({ field, width }) {
    if (this.resizeable) {
      const index = this.tableWidthConfig.findIndex((config) => {
        return config.field === field;
      });
      if (index > -1) {
        setTimeout(() => {
          this.tableWidthConfig[index].width = width + 'px';
        });
      }
    }
  }

  onResizeHandler({ width, field }) {
    if (width < 0) {
      return;
    }
    const index = this.tableWidthConfig.findIndex((config) => {
      return config.field === field;
    });
    if (index > -1) {
      this.tableWidthConfig[index].width = width + 'px';
    }
    const curTotal = this.tableWidthConfig.reduce((pre, cur) => {
      const value = pre + parseInt(cur.width, 10);
      return value;
    }, 0);
    let columnResizeEventArg;
    this._columns = this._columns.map((column, colIndex) => {
      if (column.field === field) {
        column.width = parseInt(width, 10) + 'px';
        columnResizeEventArg = { currentColumn: column, nextColumn: this._columns[colIndex + 1] };
        this.resize.emit(columnResizeEventArg);
      }
      return column;
    });

    const changeSize = curTotal - this._tableTotalWidth;
    const lastCol = this._columns.slice(-1)[0];
    const lastColWidth = parseInt(lastCol.width, 10);
    if (changeSize < 0 && columnResizeEventArg.nextColumn) {
      const newSize = parseInt(lastCol.width) - changeSize + 'px';
      lastCol.width = newSize;
      this.tableWidthConfig[this.tableWidthConfig.length - 1].width = newSize;
    } else if (this._lastColSize < lastColWidth) {
      const lastChange = lastColWidth - this._lastColSize > changeSize ? changeSize : lastColWidth - this._lastColSize;
      lastCol.width = lastColWidth - lastChange + 'px';
      this.tableWidthConfig[this.tableWidthConfig.length - 1].width = lastColWidth - lastChange + 'px';
    }
  }

  handleDragTable({ from, to }) {
    this.columnDragEnd.emit({ from, to });
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

  onBodyScroll(event?: Event) {
    const target = <HTMLElement>event?.target
      || this.normalScrollElement?.nativeElement
      || this.virtualScrollViewport?.elementRef.nativeElement;

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
    } else if (Math.abs(scrollLeft + target.clientWidth - target.scrollWidth) < 1) {
      this.setScrollViewClass('right');
    } else {
      this.setScrollViewClass('middle');
    }

    if (this.fixHeader) {
      (<HTMLElement>this.fixHeaderContainerRefElement.nativeElement).scrollLeft = scrollLeft;
    }

    this.tableScrollEvent.emit(event);
  }

  private setScrollViewClass(position: string) {
    const element = this.tableViewRefElement.nativeElement;
    const className = 'devui-table-scroll-' + position;
    const elClassList = element.classList;
    if (!elClassList.contains(className)) {
      for (let index = 0; index < elClassList.length; index++) {
        const clName = elClassList[index];
        if (clName.startsWith('devui-table-scroll-')) {
          this.renderer.removeClass(element, clName);
        }
      }
      this.renderer.addClass(element, className);
    }
  }

  private unSubscription() {
    if (this.headerCheckStatusSubscription) {
      this.headerCheckStatusSubscription.unsubscribe();
      this.headerCheckStatusSubscription = null;
    }

    if (this.headertoggleTableSubscription) {
      this.headertoggleTableSubscription.unsubscribe();
      this.headertoggleTableSubscription = null;
    }
  }

  setRowChildToggleStatus(rowItem: any, open: boolean) {
    if (open) {
      let loadChildrenResult = Promise.resolve(true);
      if (this.loadChildrenTable) {
        loadChildrenResult = this.loadChildrenTable(rowItem);
      }
      loadChildrenResult.then(() => {
        // 异步加载子表格是检查选中状态
        if (rowItem.$checked && this.checkableRelation.downward) {
          this.setCheckedStatus(rowItem.children, rowItem.$checked, true);
        }
      });
    } else {
      this.childrenTableClose.emit(rowItem);
    }
  }

  setTableChildrenToggleStatus(open: boolean) {
    this.onToggleAllChildrenTable(open);
    if (this.innerHeader) {
      this.innerHeader.setHeaderToggleStatus(open);
    } else {
      this.childrenTableOpen = open;
    }
  }

  private travelChildrenToggleStatus(data, open: boolean) {
    return data.map((item) => {
      if (item.children) {
        item.$isChildTableOpen = open;
        item.children = this.travelChildrenToggleStatus(item.children, open);
      }
      return item;
    });
  }

  // 切换表头的子表格展开收起
  onToggleAllChildrenTable(open: boolean) {
    this.childrenTableOpen = open;
    if (open) {
      let loadAllChildrenResult = Promise.resolve(true);
      if (this.loadAllChildrenTable) {
        loadAllChildrenResult = this.loadAllChildrenTable();
      }
      loadAllChildrenResult.then(() => {
        this.dataSource.forEach((item) => {
          if (item.$checked && item.children) {
            this.setCheckedStatus(item.children, true, true);
          }
        });
        this.travelChildrenToggleStatus(this.dataSource, open);
      });
    } else {
      this.travelChildrenToggleStatus(this.dataSource, open);
      this.allChildrenTableClose.emit();
    }
  }

  cancelEditingStatus() {
    this.documentClickEvent.emit('cancel');
  }

  private collectCheckedRows(dist: Array<any>, source: Array<any>) {
    source.forEach((row) => {
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
      return this.dataSource ? this.dataSource.filter((item) => item.$checked || item.$halfChecked) : [];
    } else {
      // 如果children的选中状态不关联parent的选中状态,遍历dataSource,将所有的选中行平级返回
      const checkedRows = [];
      this.collectCheckedRows(checkedRows, this.dataSource);
      return checkedRows;
    }
  }

  setTableCheckStatus(status: TableCheckStatusArg) {
    if (status.pageAllChecked !== undefined) {
      // 设置全选
      if (this.dataSource) {
        this._dataSource = this.setCheckedStatus(this.dataSource, status.pageAllChecked);
      }
      this._pageAllChecked = status.pageAllChecked;
      if (status.pageAllChecked) {
        // 全选为true
        this.halfChecked = false;
      } else {
        this.halfChecked = this.dataSource.some(this.hasChecked) && this.dataSource.some(this.hasUnChecked);
      }
    }

    if (status.pageHalfChecked !== undefined) {
      // 设置半选
      this.halfChecked = status.pageHalfChecked;
    }

    if (this.innerHeader) {
      this.innerHeader.setHeaderCheckStatus({ pageAllChecked: this._pageAllChecked, pageHalfChecked: this.halfChecked });
    }
  }

  // 更新cdk虚拟滚动viewport size并重新渲染，解决父层高度变化渲染数据size没有更新问题
  updateVirtualScrollSize() {
    this.virtualScrollViewport.checkViewportSize();
  }
}
