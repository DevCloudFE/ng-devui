import {
  AfterViewInit, ChangeDetectorRef, Component, DoCheck, ElementRef,
  EventEmitter, Input, IterableDiffers, KeyValueDiffers, NgZone, OnChanges,
  OnDestroy, OnInit, Output, SimpleChanges, ViewChild
} from '@angular/core';
import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { DropDownDirective } from 'ng-devui/dropdown';
import { DataTableComponent } from './data-table.component';
import { DataTablePager, SortEventArg } from './data-table.model';
import { DataTableColumnTmplComponent } from './tmpl/data-table-column-tmpl.component';
import { DataTableHeadTmplComponent } from './tmpl/data-table-head-tmpl.component';
import { I18nInterface, I18nService } from 'ng-devui/i18n';

const documentElement = document.documentElement;
@Component({
  selector: 'd-data-table-head,[dDataTableHead]',
  templateUrl: './data-table-head.component.html',
  styleUrls: ['./data-table-head.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableHeadComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy, DoCheck {
  @Input() checkable: boolean;
  @Input() showExpandToggle: boolean;
  @Input() pageAllChecked: boolean;
  @Input() headTemplate: DataTableHeadTmplComponent;
  @Input() columns: DataTableColumnTmplComponent[];
  @Input() multiSort: SortEventArg[] = [];
  @Input() pager: DataTablePager | boolean;
  @Input() resizeable: boolean;
  @Input() maxHeight: string;
  @Input() showSortIcon: boolean;
  @Input() colDropFreezeTo: number;
  @Input() colDraggable: boolean;
  @Input() fixHeader: boolean;
  @Input() dataSource: any[] = [];
  @Input() resizeBarRefElement: ElementRef;
  @Input() tableViewRefElement: ElementRef;
  @Input() tableBodyEl: ElementRef;
  @Input() checkableColumn: DataTableColumnTmplComponent;
  @Input() showExpandToggleColumn: DataTableColumnTmplComponent;
  @Output() headClickSortEvent = new EventEmitter<SortEventArg>();
  @Output() resizeHandlerEvent = new EventEmitter<any>();
  @Input() halfChecked: boolean;
  @Input() childrenTableOpen: boolean;
  @Output() beginResizeHandlerEvent = new EventEmitter<any>();
  @Output() resizingHandlerEvent = new EventEmitter<any>();
  @Output() dragTableEndEvent = new EventEmitter<any>();

  objDiffer: {};

  isDrag: boolean;
  dragBoxLeft;
  dragCellRef: HTMLElement;

  searchQuery: { [key: string]: any; } = {};
  multiSortArray: SortEventArg[] = [];
  sortField: string;
  sortDirection: 'ASC' | 'DESC' | '';
  isDetailOpen: boolean;
  rowItem = undefined;
  mirror;
  bindDrag;
  lastDropTarget;
  originCellIndex;
  lastCellIndex;
  originTable;
  fixOriginTable;
  fakeTable;
  mainFakeTable;
  classes = {
    originTable: 'sindu_origin_table',
    draggableTable: 'sindu_dragger',
    dragging: 'sindu_dragging',
    static: 'sindu_static',
    handle: 'sindu_handle',
  };
  el;
  grabbed;
  source;
  item;
  initialSibling;
  currentSibling;
  offsetX;
  offsetY;
  bodyOverflow;
  oldCoord = 0;
  mirrorContainer;
  // 用于多行多列头部
  rowCount;
  rowCountArray;
  fixFakeTableEl;
  fixTableOffsetTop;
  childTables = [];
  dataSourceChange = false;
  tableScrollbarWidth = 0;
  scrollViewEl;
  scrollViewRect;
  fixTableScrollViewEl;
  animationRequestId;
  colOffset = 0;
  seconedHeaderOffset = 0;
  cellMapOffset = 0;
  cellMap = {};
  iterableDiffer;
  choosedItem: any;
  searchText = '';

  i18nCommonText: I18nInterface['common'];
  filterHalfChecked: boolean;
  filterAllChecked: boolean;
  filterListDisplay = [];
  isFilterHidden = false;
  columnForFilter;
  private searchElement;
  private sourceSubscription: Subscription;
  private sourceSubject: BehaviorSubject<any>;
  private filterSubscription: Subscription;
  private i18nSubscription: Subscription;
  checkedListForFilter = [];
  constructor(public dt: DataTableComponent,
    private zone: NgZone,
    private element: ElementRef,
    private differs: KeyValueDiffers,
    private iterableDiffers: IterableDiffers,
    private ref: ChangeDetectorRef,
    private i18n: I18nService) {
      this.i18nCommonText = this.i18n.getI18nText().common;
  }

  ngOnInit() {
    if (this.colDraggable) {
      this.iterableDiffer = this.iterableDiffers.find([]).create(null);
      this.objDiffer = {};
      this.dataSource.forEach((data, index) => {
        this.objDiffer[index] = this.differs.find(data).create();
      });
    }

    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nCommonText = data.common;
    });
  }

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
        if (column.advancedHeader) {
          return column.advancedHeader.length;
        } else {
          return 0;
        }
      }));
      if (this.rowCount > 0) {
        this.rowCountArray = new Array(this.rowCount);
        this.initAdvanceHeader();
      }
      if (this.colDraggable) {
        this.rerenderTables();
      }
    }
    if (changes && changes.dataSource) {
      if (this.colDraggable) {
        this.rerenderTables();
      }
    }
  }

  ngDoCheck() {
    if (!this.colDraggable) {
      return;
    }
    this.dataSource.forEach((elt, index) => {
      const objDiffer = this.objDiffer[index];
      if (!objDiffer) {
        return;
      }
      const objChanges = objDiffer.diff(elt);
      if (objChanges) {
        objChanges.forEachChangedItem((changeItem) => {
          if (changeItem.key === '$isChildTableOpen' && elt.children && elt.children.length) {
            this.rerenderTables();
          }

          if (changeItem.key === 'children') {
            this.rerenderTables();
          }
        });
      }
    });

    const changes = this.iterableDiffer.diff(this.columns);
    if (changes) {
      this.createCellMap();
    }
  }

  ngAfterViewInit() {
    if (this.colDraggable) {
      // set mirror container to table-wrap element
      this.mirrorContainer = this.element.nativeElement.parentNode.parentNode;
      this.bodyOverflow = documentElement.style.overflow;
      this.detecteOriginTable();
      setTimeout(() => { // wait for table render ready
        this.renderFakeTable();
        this.el.style.display = 'none';
        if (this.fixHeader && this.tableBodyEl) {
          this.fixOriginTable = this.tableBodyEl.nativeElement;
          this.tableScrollbarWidth = this.getScrollbarWidth();
          this.renderFixFakeTableEl();
          this.fixFakeTableEl.style.display = 'none';
        }
      });
      documentElement.addEventListener('resize', this.renderFakeTable);
      this.createCellMap();
      this.scrollViewEl = this.originTable.parentNode.parentNode;
      this.scrollViewRect = this.scrollViewEl.getBoundingClientRect();
      if (this.fixHeader && this.tableBodyEl) {
        this.fixTableScrollViewEl = this.fixOriginTable.parentNode.parentNode;
      }
    }
  }

  createCellMap() {
    let cellIndex = 0;
    this.columns.forEach((column, index) => {
      if (!column.advancedHeader) {
        this.cellMap[cellIndex] = { name: column.field, sortKey: [index] };
        cellIndex++;
      } else {
        if (column.advancedHeader[0].colspan) {
          this.cellMap[cellIndex] = { name: column.field, isAdvanceHeader: true,
            sortKey: [index], headerLength: column.advancedHeader[0].colspan };
          cellIndex++;
        } else {
          Object.keys(this.cellMap).forEach(key => {
            const item = this.cellMap[key];
            if (item.isAdvanceHeader && item.sortKey.length < item.headerLength) {
              item.sortKey.push(index);
            }
          });
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.colDraggable) {
      documentElement.removeEventListener('resize', this.renderFakeTable);
    }
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();
    }
  }
  resetSources() {
    this.checkedListForFilter = [];
    if (this.sourceSubscription) {
      this.sourceSubscription.unsubscribe();
    }
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
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
    return (columns || []).some(col => col && col.filterable);
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

  onResize($event, column, isUserDefined) {
    // tslint:disable-next-line:no-unused-expression
    column['advancedHeader'] == null && this.resizeHandlerEvent.emit({
      ...$event,
      field: column.field,
      isUserDefined: isUserDefined
    });
  }

  onBeginResize($event) {
    this.beginResizeHandlerEvent.emit($event);
  }

  onResizing($event, column) {
    // tslint:disable-next-line:no-unused-expression
    column['advancedHeader'] == null && this.resizingHandlerEvent.emit({
      ...$event,
      column
    });
  }

  private setParentNextWidth(lastChildIndex: number, parentWidth: number, newParentWidth: number) {
    if (!lastChildIndex) { return; }

    const lastChilds = this.columns.filter(column => column['$colIndex'] === lastChildIndex).map(item => item.field);

    for (let index = 0; index < this.columns.length - 1; index++) {
      if (this.columns[index].field === lastChilds[0] && index + 1 < this.columns.length && this.columns[index + 1].width) {
        const totalWidth = parentWidth + parseInt(this.columns[index + 1].width, 10);
        this.columns[index + 1].width = totalWidth - newParentWidth + 'px';
        return;
      }
    }
  }

  resizingParent($event, changeColumn) {
    const { width } = $event;

    if (this.rowCount > 0) {
      this.columns.filter(column => column['advancedHeader'] !== undefined)
        .map(column => column['advancedHeader'])
        .reduce((target, newItemArr) => target.concat(newItemArr))
        .filter(item => item['$cols'].indexOf(changeColumn['$colIndex']) > -1)
        .forEach(item => {
          this.zone.run(() => {
            if (!item.$rowIndex) {
              const length = item['$cols'].length;
              const currentIsLastChild = changeColumn['$colIndex'] === item['$cols'][length - 1];
              // tslint:disable-next-line:no-unused-expression
              !currentIsLastChild && this.setParentNextWidth(item['$cols'][length - 1], parseInt(item['$width'], 10), length * width);
              item['$width'] = length * width + 'px';
            }
          });
        });
    }
  }

  // 初始化多行表头，为了兼容resizeable对表头互相影响数据做了记录
  initAdvanceHeader() {
    if (this.resizeable) {
      this.columns.forEach((column, colIndex) => {
        if (column['advancedHeader']) {
          column['advancedHeader'].forEach((item, rowIndex) => {
            item['$rowIndex'] = rowIndex;
            item['$colIndex'] = colIndex;
            item['$cols'] = new Array(item.colspan).fill(1).map((v, i) => colIndex + i);
          });
        }
        column['$colIndex'] = colIndex;
      });
    }
  }

  resizeParent($event, changeColumn) {
    const { width } = $event;
    if (this.rowCount > 0) {
      this.columns.filter(column => column['advancedHeader'] !== undefined)
        .map(column => column['advancedHeader'])
        .reduce((target, newItemArr) => target.concat(newItemArr))
        .filter(item => item['$cols'].indexOf(changeColumn['$colIndex']) > -1)
        .forEach(item => {
          if (item['header'] === changeColumn['header']) { // 是当前列则直接赋值
            item['$width'] = width;
          } else {
            // 判断是父列，则修改父列宽
            if (!item.$rowIndex) {
              item['$width'] = item['$cols'].length * parseInt(width, 10) + 'px';
            }
          }
        });
    }
  }

  trackByFn(index, item) {
    return index;
  }

  onTap(e) {
    e.preventDefault();
    this.originCellIndex = this.findCellIndex(e);
    setTimeout(() => { // fix chrome bug, mousedown的时候会错误的触发mousemove
      documentElement.addEventListener('mousemove', this.handleMousemove);
      documentElement.addEventListener('mouseup', () => {
        documentElement.removeEventListener('mousemove', this.handleMousemove);
      });
    });
  }

  handleMousemove = (e) => {
    e.preventDefault();
    documentElement.removeEventListener('mousemove', this.handleMousemove);
    documentElement.addEventListener('mousedown', this.grab);
    documentElement.addEventListener('mouseup', this.release);
    setTimeout(() => { // fix chrome bug, mousedown的时候会错误的触发mousemove
      this.dispatchMousedown();
    });
  }

  grab = (e) => {
    e.preventDefault();
    documentElement.removeEventListener('mousedown', this.grab);
    this.addClass(documentElement, 'gu-unselectable');
    const context = this.canStart(e.target);
    this.grabbed = context;
    documentElement.addEventListener('mousemove', this.startBecauseMouseMoved);
  }

  startBecauseMouseMoved = (e) => {
    e.preventDefault();
    if (!this.grabbed) {
      return;
    }
    documentElement.removeEventListener('mousemove', this.startBecauseMouseMoved);
    documentElement.addEventListener('mousemove', this.drag);
    this.source = this.grabbed.source;
    this.item = this.grabbed.item;
    this.initialSibling = this.currentSibling = this.nextEl(this.grabbed.item);
    this.addClass(this.item, 'gu-transit');
    this.el.style.display = 'flex';
    this.el.style.position = 'relative';
    this.originTable.style.display = 'none';
    if (this.fixHeader) {
      this.fixTableOffsetTop = this.fixOriginTable.parentNode.parentNode.scrollTop;
      this.fixFakeTableEl.style.display = 'flex';
      this.fixOriginTable.style.display = 'none';
      this.fixFakeTableEl.style.position = 'relative';
    }
    this.offsetX = 15;
    this.offsetY = 15;
    this.renderMirrorImage(this.item);
  }

  release = (e) => {
    e.preventDefault();
    this.grabbed = null;
    documentElement.removeEventListener('mousemove', this.drag);
    documentElement.removeEventListener('mouseup', this.release);
    const to = Array.from(this.el.children).indexOf(this.item);
    this.removeMirrorImage();
    this.el.style.display = 'none';
    this.originTable.style.display = 'table';
    if (this.fixHeader) {
      this.fixFakeTableEl.style.display = 'none';
      this.fixOriginTable.style.display = 'table';
      this.fixFakeTableEl.style.position = 'absolute';
    }
    documentElement.style.overflow = this.bodyOverflow;
    documentElement.removeEventListener('mouseup', this.release);
    if (this.item) {
      this.rmClass(this.item, 'gu-transit');
    }
    this.sortColumn(this.originCellIndex.x, to);
    cancelAnimationFrame(this.animationRequestId);
  }

  sortColumn = (from, to) => {
    if (from === to) {
      return;
    }
    let offset = 0;
    if (this.checkable) {
      offset++;
    }
    if (this.showExpandToggle) {
      offset++;
    }
    from = from - offset;
    to = to - offset;
    let toCell = this.cellMap[to].sortKey[0];
    let fromCell = this.cellMap[from].sortKey[0];
    let loopCount = 1;
    if (this.cellMap[from].isAdvanceHeader) {
      loopCount = this.cellMap[from].headerLength;
      if (from > to) {
        fromCell = this.cellMap[from].sortKey[this.cellMap[from].headerLength - 1];
      }
    }
    if (this.cellMap[to].isAdvanceHeader && from < to) {
      toCell = this.cellMap[to].sortKey[this.cellMap[to].headerLength - 1];
    }
    for (let i = 0; i < loopCount; i++) {
      this.dragTableEndEvent.emit({ from: fromCell, to: toCell });
    }
  }

  sort = ({ list, from, to }) => {
    if (!list[from] && !list[to]) {
      return;
    }
    if (from < to) {
      this.appendSibling({ target: list[from], origin: list[to] });
    } else {
      this.insertBeforeSibling({ target: list[from], origin: list[to] });
    }
  }

  appendSibling({ target, origin }) {
    if (!target) {
      return;
    }
    target.parentNode.insertBefore(target, origin ? origin.nextElementSibling : null);
  }

  getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + this.getScroll('scrollLeft', 'pageXOffset'),
      top: rect.top + this.getScroll('scrollTop', 'pageYOffset')
    };
  }
  getScroll(scrollProp, offsetProp) {
    if (typeof window[offsetProp] !== 'undefined') {
      return window[offsetProp];
    }
    if (documentElement.clientHeight) {
      return documentElement[scrollProp];
    }
    return document.body[scrollProp];
  }

  dispatchMousedown() {
    const { el, originCellIndex } = this;
    el.children[originCellIndex.x].dispatchEvent(this.getTouchyEvent());
  }

  getTouchyEvent() {
    let event;
    // This is true only for IE,firefox
    if (document.createEvent) {
      // To create a mouse event , first we need to create an event and then initialize it.
      event = document.createEvent('MouseEvent');
      event.initMouseEvent('mousedown', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    } else {
      event = new MouseEvent('mousedown', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      });
    }
    return event;
  }

  removeMirrorImage() {
    if (this.mirror) {
      documentElement.removeEventListener('mousemove', this.grab);
      this.getParent(this.mirror).removeChild(this.mirror);
      this.mirror = null;
      setTimeout(() => {
        this.rmClass(this.mirrorContainer, 'gu-unselectable');
        this.rmClass(documentElement, 'gu-unselectable');
      });
    }
  }

  canStart(item) {
    while (this.getParent(item) && this.isContainer(this.getParent(item)) === false) {
      item = this.getParent(item); // drag target should be a top element
      if (!item) {
        return;
      }
    }
    const source = this.getParent(item);
    if (!source) {
      return;
    }
    return {
      item: item,
      source: source
    };
  }

  detecteOriginTable() {
    let target = this.element.nativeElement;
    while (target.nodeName !== 'TABLE') {
      target = target.parentElement;
    }
    this.originTable = target;
    if (this.fixHeader && this.tableBodyEl) {
      this.fixOriginTable = this.tableBodyEl.nativeElement;
      this.detecteChildTables(this.fixOriginTable);
    } else {
      this.detecteChildTables(this.originTable);
    }
  }

  rerenderTables = () => {
    this.dataSourceChange = true;
    if (this.fixHeader && this.tableBodyEl) {
      this.fixOriginTable = this.tableBodyEl.nativeElement;
      setTimeout(() => {
        this.renderFixFakeTableEl();
        this.fixFakeTableEl.style.display = 'none';
      });
    } else {
      this.detecteOriginTable();
      setTimeout(() => {
        this.renderFakeTable();
        this.el.style.display = 'none';
      });
    }
  }

  renderFakeTable() {
    if (this.el && !this.dataSourceChange) {
      return;
    }
    this.childTables = [];
    this.detecteChildTables(this.originTable);
    const fakeTable = this.buildFakeTable(this.originTable);
    this.fakeTable = fakeTable;
    const el = fakeTable.reduce((previous, current) => {
      const li = document.createElement('li');
      if (current) {
        li.appendChild(current);
      }
      return previous.appendChild(li) && previous;
    }, document.createElement('ul'));
    this.el = el;
    this.renderEl(el, this.originTable, fakeTable);
  }

  renderFixFakeTableEl() {
    if (this.fixFakeTableEl && !this.dataSourceChange) {
      return;
    }
    const fakeTable = this.buildFakeTable(this.fixOriginTable);
    this.mainFakeTable = fakeTable;
    const el = fakeTable.reduce((previous, current) => {
      const li = document.createElement('li');
      li.appendChild(current);
      return previous.appendChild(li) && previous;
    }, document.createElement('ul'));
    this.fixFakeTableEl = el;
    this.renderEl(el, this.fixOriginTable, this.mainFakeTable);
  }
  buildFakeTable(table) {
    this.colOffset = 0;
    this.seconedHeaderOffset = 0;
    return Array.from(table.rows[0].children).map((cell, index) => {
      return this.getColumnAsTableByIndex(table, index, (<any>cell).colSpan, (<any>cell).rowSpan);
    });
  }

  renderEl(el, originEl, fakeTables) {
    this.sizeColumnFake(fakeTables, originEl);
    this.css(el, {
      position: 'absolute',
    });
    if (originEl.parentNode.children[0].nodeName === 'UL') {
      originEl.parentNode.removeChild(originEl.parentNode.children[0]);
      this.insertBeforeSibling({ target: el, origin: originEl });
    } else {
      this.insertBeforeSibling({ target: el, origin: originEl });
    }

    // render every wrapper of table(element li)
    const spacing = window.getComputedStyle(originEl).getPropertyValue('border-spacing').split(' ')[0];
    const attr = 'margin-right';
    const length = el.children.length;
    Array.from(el.children).forEach((li, dex) => {
      if (spacing && dex < (length - 1)) {
        (<any>li).style[attr] = `-${spacing}`;
      }
    });
    this.addClass(el.parentElement, this.classes.dragging);
    this.addClass(el, this.classes.draggableTable);
    this.addClass(el, 'sindu_column');
  }

  sizeColumnFake(fakeTables, originEl) {
    // calculate width of every column
    Array.from(originEl.rows[0].children).forEach(
      (cell, index) => {
        if (!fakeTables[index]) {
          return;
        }
        const w = (<any>cell).getBoundingClientRect().width;
        const t = fakeTables[index];
        this.css(t, { width: `${w}px` });
        this.css(t.rows[0].children[0], { width: `${w}px` });
      }
    );
  }

  css(el, csses) {
    Object.keys(csses).forEach((k) => {
      el.style[k] = csses[k];
    });
    return el;
  }

  insertBeforeSibling({ target, origin }) {
    if (!target) {
      return;
    }
    origin.parentNode.insertBefore(target, origin);
  }

  findCellIndex(e) {
    let target = e.target;
    while (target.nodeName !== 'TH') {
      target = target.parentElement || target.parentNode;
    }
    return { x: target.cellIndex, y: target.parentElement.rowIndex };
  }

  renderMirrorImage(target) {
    if (this.mirror) {
      return;
    }

    this.mirror = target.cloneNode(true);
    const getFixTableTotalHeight = () => {
      return this.fixOriginTable.parentNode.parentNode.parentNode.getBoundingClientRect().height;
    };
    const getTableTotalHeight = () => {
      return this.originTable.parentNode.parentNode.parentNode.getBoundingClientRect().height;
    };
    // 固定表头表格时，对拖动内容进行截取
    if (this.fixHeader) {
      const to = Array.from(this.el.children).indexOf(target);
      const fixTarget = this.fixFakeTableEl.children[to].children[0].cloneNode(true);
      const fixTargetContainer = document.createElement('div');
      const mirrorHeight = Math.min(parseInt(this.maxHeight, 10), getFixTableTotalHeight());
      fixTargetContainer.style.height = mirrorHeight + 'px';
      fixTargetContainer.style.overflow = 'hidden';
      fixTargetContainer.appendChild(fixTarget);
      fixTarget.style.maxHeight = this.maxHeight;
      fixTarget.style.top = '-' + this.fixTableOffsetTop + 'px';
      this.mirror.appendChild(fixTargetContainer);
    }

    // 设置最大高度，但不是固定表头的表格
    if (!this.fixHeader && this.maxHeight) {
      const mirrorHeight = Math.min(parseInt(this.maxHeight, 10), getTableTotalHeight());
      this.mirror.style.height = mirrorHeight + 'px';
      this.mirror.style.overflow = 'hidden';
    }
    this.mirror.style.visibility = 'hidden';
    const thNode = this.mirror.querySelector('th');
    this.addClass(thNode, 'hover');
    this.rmClass(this.mirror, 'gu-transit');
    this.addClass(this.mirror, 'gu-mirror');
    this.mirrorContainer.appendChild(this.mirror);
    this.addClass(this.mirrorContainer, 'gu-unselectable');
  }

  lookupClass(className) {
    const cache = {};
    const start = '(?:^|\\s)';
    const end = '(?:\\s|$)';
    let cached = cache[className];
    if (cached) {
      cached.lastIndex = 0;
    } else {
      cache[className] = cached = new RegExp(start + className + end, 'g');
    }
    return cached;
  }

  addClass(el, className) {
    const current = el.className;
    if (!current.length) {
      el.className = className;
    } else if (!this.lookupClass(className).test(current)) {
      el.className += ' ' + className;
    }
  }

  rmClass(el, className) {
    el.className = el.className.replace(this.lookupClass(className), ' ').trim();
  }

  drag = (e) => {
    e.preventDefault();
    if (!this.mirror) {
      return;
    }
    const clientX = this.getCoord('clientX', e);
    const clientY = this.getCoord('clientY', e);
    if (this.animationRequestId) {
      cancelAnimationFrame(this.animationRequestId);
      this.animationRequestId = null;
    }
    this.handleScroll(clientX, clientY, e);
    documentElement.style.overflow = 'hidden';

    const x = clientX - this.offsetX;
    const y = clientY - this.offsetY;
    this.mirror.style.left = x + 'px';
    this.mirror.style.top = y + 'px';
    this.mirror.style.visibility = 'visible';

    const elementBehindCursor = this.getElementBehindPoint(this.mirror, clientX, clientY);
    const dropTarget = this.findDropTarget(elementBehindCursor, clientX, clientY);
    if (!dropTarget) {
      return;
    }

    const immediate = this.getImmediateChild(dropTarget, elementBehindCursor);
    let reference;
    if (immediate) {
      reference = this.getReference(dropTarget, immediate, clientX);
    }

    const changed = dropTarget !== null && dropTarget !== this.lastDropTarget;
    if (changed || dropTarget === null) {
      this.lastDropTarget = dropTarget;
    }
    if (
      (reference === null && changed) ||
      reference !== this.item &&
      reference !== this.nextEl(this.item)
    ) {
      let mover;
      const nowCord = e.pageX;
      if (nowCord < this.oldCoord) {
        mover = reference; // upward or right
      } else {
        mover = reference ? (reference.previousElementSibling ? reference.previousElementSibling : reference) : dropTarget.lastElementChild;
      }
      this.oldCoord = nowCord;

      let from;
      let to;
      let moverIndex;
      let fixItemRect;
      let fixItem;
      let fixMoverRect;
      let fixMover;
      if (this.fixHeader) {
        from = Array.from(this.el.children).indexOf(this.item);
        to = Array.from(this.el.children).indexOf(reference);
        moverIndex = Array.from(this.el.children).indexOf(mover);
        fixItem = Array.from(this.fixFakeTableEl.children)[from];
        fixItemRect = fixItem.getBoundingClientRect();
        fixMover = Array.from(this.fixFakeTableEl.children)[moverIndex];
        fixMoverRect = moverIndex !== -1 && fixMover.getBoundingClientRect();
      }

      const moverRect = mover && mover.getBoundingClientRect();
      const itemRact = this.item.getBoundingClientRect();
      this.moveTarget(dropTarget, this.item, reference);
      if (this.fixHeader) {
        this.moveTarget(this.fixFakeTableEl, Array.from(this.fixFakeTableEl.children)[from], Array.from(this.fixFakeTableEl.children)[to]);
      }
      if (mover && moverRect) {
        this.animate(moverRect, mover, 300);
        this.animate(itemRact, this.item, 300);
      }
      if (this.fixHeader && moverIndex !== -1 && fixMoverRect) {
        this.animate(fixMoverRect, fixMover, 300);
        this.animate(fixItemRect, fixItem, 300);
      }
    }
  }

  handleScroll(x, y, e) {
    this.scrollViewRect = this.scrollViewEl.getBoundingClientRect();
    let fixTableScrollViewRect;
    if (this.fixHeader) {
      this.fixTableScrollViewEl = this.fixOriginTable.parentNode.parentNode;
      fixTableScrollViewRect = this.fixTableScrollViewEl.getBoundingClientRect();
    }
    let scrollLeft = this.scrollViewEl.scrollLeft;
    const range = 150;
    const scrollToLeft = () => {
      scrollLeft -= 50;
      if (this.fixHeader) {
        this.fixTableScrollViewEl.scrollTo(scrollLeft, 0);
      }
      this.scrollViewEl.scrollTo(scrollLeft, 0);
      this.animationRequestId = requestAnimationFrame(scrollToLeft);
      documentElement.dispatchEvent(e);
    };

    const scrollToRight = () => {
      scrollLeft += 50;
      if (this.fixHeader) {
        this.fixTableScrollViewEl.scrollTo(scrollLeft, 0);
      }
      this.scrollViewEl.scrollTo(scrollLeft, 0);
      this.animationRequestId = requestAnimationFrame(scrollToRight);
      documentElement.dispatchEvent(e);
    };
    if (!this.fixHeader && (y < this.scrollViewRect.top || y > this.scrollViewRect.bottom)) {
      return;
    }
    if (this.fixHeader && (y < this.scrollViewRect.top || y > fixTableScrollViewRect.bottom)) {
      return;
    }

    if (this.scrollViewRect.left < x && x < (this.scrollViewRect.left + range)) {
      this.animationRequestId = requestAnimationFrame(scrollToLeft);
    }
    if ((this.scrollViewRect.right - range) < x && x < this.scrollViewRect.right) {
      this.animationRequestId = requestAnimationFrame(scrollToRight);
    }
  }

  moveTarget(container, target, reference) {
    container.insertBefore(target, reference);
  }

  getParent(el) {
    return el.parentNode === document ? null : el.parentNode;
  }

  getEventHost(e) {
    if (e.targetTouches && e.targetTouches.length) {
      return e.targetTouches[0];
    }
    if (e.changedTouches && e.changedTouches.length) {
      return e.changedTouches[0];
    }
    return e;
  }

  getCoord(coord, e) {
    const host = this.getEventHost(e);
    return host[coord];
  }

  getLongestRow = (table) => {
    let result = table.rows[0];
    Array.from(table.rows).forEach((row) => {
      const rowL = (<any>row).children.length;
      const resultL = result.children.length;
      result = rowL > resultL ? row : result;
    });
    return result;
  }
  getColumnAsTableByIndex(table, selectedColIndex, colSpan, rowSpan) {
    const skipRowIndexList = this.getDataBetween(0, 0 + rowSpan);
    const cTable = table.cloneNode(true);
    if (this.fixHeader) {
      cTable.deleteCaption();
    } else if (!this.fixHeader && cTable.tBodies.length > 1) {
      cTable.removeChild(cTable.tBodies[0]);
    }
    this.origin2DragItem(cTable);
    const empty = (node) => {
      while (node.firstChild) {
        node.removeChild(node.firstChild);
      }
    };
    const insertBodyColList = this.getDataBetween(selectedColIndex - 1 + this.colOffset, selectedColIndex + this.colOffset + colSpan);
    const insertHeaderColList = this.getDataBetween(selectedColIndex + this.seconedHeaderOffset - 1, selectedColIndex +
      this.seconedHeaderOffset + colSpan - rowSpan + 1);
    const getTreeTableCol = (row, rowIndex) => {
      const target = this.getChildTableColumn((<any>row).children[0].children[0], selectedColIndex);
      empty((<any>row).children[0]);
      (<any>row).children[0].appendChild(target);
    };
    const getMultipleHCol = (row, rowIndex) => {
      if (rowIndex === 0) {
        const target = (<any>row).children[selectedColIndex];
        empty(row);
        if (target) {
          (<any>row).appendChild(target);
        }
        return;
      }
      if (rowIndex === 1) {
        const targets = insertHeaderColList.map((colIndex) => {
          return (<any>row).children[colIndex];
        });
        empty(row);
        targets.forEach((target) => {
          if (target) {
            (<any>row).appendChild(target);
          }
        });
        return;
      } else {
        const targets = insertBodyColList.map((colIndex) => {
          return (<any>row).children[colIndex];
        });
        empty(row);
        targets.forEach((target) => {
          if (target) {
            (<any>row).appendChild(target);
          }
        });
      }
    };

    const getNormalTableCol = (row, rowIndex) => {
      if (rowIndex === 0) {
        const target = (<any>row).children[selectedColIndex];
        empty(row);
        if (target) {
          (<any>row).appendChild(target);
        }
      } else {
        const target = (<any>row).children[selectedColIndex + this.colOffset];
        empty(row);
        if (target && skipRowIndexList.indexOf(rowIndex) === -1) {
          (<any>row).appendChild(target);
        }
      }
    };

    Array.from(cTable.rows).forEach((row, rowIndex) => {
      if ((<any>row).classList.contains('child-table')) {
        getTreeTableCol(row, rowIndex);
      } else {
        if (colSpan > 1) {
          getMultipleHCol(row, rowIndex);
        } else {
          getNormalTableCol(row, rowIndex);
        }
      }
      this.css(row, { height: `${table.rows[rowIndex].getBoundingClientRect().height}px` });
    });
    this.colOffset += (colSpan - 1);
    this.seconedHeaderOffset = rowSpan > 1 ? this.seconedHeaderOffset - 1 : this.seconedHeaderOffset;
    return cTable;
  }

  getDataBetween(form, end) {
    const result = [];
    for (let i = form + 1; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  getChildTableColumn = (table, index) => {
    const cTable = table.cloneNode(true);
    this.origin2DragItem(cTable);
    const empty = (node) => {
      while (node.firstChild) {
        node.removeChild(node.firstChild);
      }
    };
    Array.from(cTable.rows).forEach((row) => {
      if ((<any>row).classList.contains('child-table')) {
        const target = this.getChildTableColumn((<any>row).children[0].children[0], index);
        empty((<any>row).children[0]);
        (<any>row).children[0].appendChild(target);
      } else {
        const target = (<any>row).children[index];
        empty(row);
        if (target) {
          (<any>row).appendChild(target);
        }
      }
    });
    this.sizeChildColumnFake(cTable, table, index);
    return cTable;
  }

  sizeChildColumnFake(fakeTable, originEl, index) {
    // calculate width of every column
    const cell = Array.from(this.originTable.rows[0].children)[index];
    const w = (<any>cell).getBoundingClientRect().width;
    this.css(fakeTable, { width: `${w}px` });
    this.css(fakeTable.rows[0].children[0], { width: `${w}px` });

    // calculate height of every cell
    const rowHeights = Array.from(originEl.rows)
      .map(row => (<any>row).children[0].getBoundingClientRect().height);
    Array.from(fakeTable.rows).forEach((row, rowIndex) => {
      this.css(row, { height: `${rowHeights[rowIndex]}px` });
    });
  }

  detecteChildTables = (table) => {
    Array.from(table.rows).forEach((row, index) => {
      if ((<any>row).classList.contains('child-table')) {
        const childTable = (<any>table.rows[index]).children[0].children[0];
        this.childTables.push(childTable);
        this.detecteChildTables(childTable);
      }
    });
  }
  origin2DragItem(liTable) {
    this.css(liTable, { 'table-layout': 'fixed', width: 'initial', height: 'initial', padding: 0, margin: 0 });
    ['width', 'height', 'id'].forEach((p) => {
      liTable.removeAttribute(p);
    });
  }

  getElementBehindPoint(point, x, y) {
    const p = point || {};
    const state = p.className;
    let el;
    p.className += ' gu-hide';
    el = document.elementFromPoint(x, y);
    p.className = state;
    return el;
  }

  findDropTarget(elementBehindCursor, clientX, clientY) {
    let target = elementBehindCursor;
    const accepted = () => {
      const droppable = this.isContainer(target);
      if (droppable === false) {
        return false;
      }

      const immediate = this.getImmediateChild(target, elementBehindCursor);
      if (!immediate) {
        return false;
      }
      const reference = this.getReference(target, immediate, clientX);
      const initial = this.isInitialPlacement(target, reference);
      if (initial) {
        return true; // should always be able to drop it right back where it was
      }
      return true;
    };

    while (target && !accepted()) {
      target = this.getParent(target);
    }
    return target;
  }

  getReference = (dropTarget, target, x) => {
    const resolve = (after) => {
      return after ? this.nextEl(target) : target;
    };

    const inside = () => { // faster, but only available if dropped inside a child element
      const rect = target.getBoundingClientRect();
      return resolve(x > rect.left + this.getRectWidth(rect) / 2);
    };

    const outside = () => { // slower, but able to figure out any position
      const len = dropTarget.children.length;
      let i;
      let el;
      let rect;
      for (i = 0; i < len; i++) {
        el = dropTarget.children[i];
        rect = el.getBoundingClientRect();
        if ((rect.left + rect.width / 2) > x) {
          return el;
        }
      }
      return null;
    };

    const reference = target !== dropTarget ? inside() : outside();
    return reference;
  }

  getRectWidth(rect) {
    return rect.width || (rect.right - rect.left);
  }
  getRectHeight(rect) {
    return rect.height || (rect.bottom - rect.top);
  }

  nextEl(el) {
    return el.nextElementSibling || manually();
    function manually() {
      let sibling = el;
      do {
        sibling = sibling.nextSibling;
      } while (sibling && sibling.nodeType !== 1);
      return sibling;
    }
  }

  isInitialPlacement(target, s) {
    let sibling;
    if (s !== void 0) {
      sibling = s;
    } else if (this.mirror) {
      sibling = this.currentSibling;
    } else {
      sibling = this.nextEl(this.item);
    }
    return target === this.source && sibling === this.initialSibling;
  }

  isContainer(el) {
    return el === this.el;
  }

  getImmediateChild = (dropTarget, target) => {
    let immediate = target;
    const isElementDropFreeze = (element) => {
      const index = Array.from(element.parentNode.children).indexOf(element);
      return index < this.colDropFreezeTo;
    };
    while (immediate !== dropTarget && this.getParent(immediate) !== dropTarget) {
      immediate = this.getParent(immediate);
    }
    if (immediate === documentElement || isElementDropFreeze(immediate)) {
      return null;
    }
    return immediate;
  }

  animate(prevRect, target, time) {
    if (time) {
      if (!prevRect || !target) {
        return;
      }
      const currentRect = target.getBoundingClientRect();
      target.style.transition = 'none';
      target.style.transform = 'translate3d(' + (prevRect.left - currentRect.left) + 'px,' + (prevRect.top - currentRect.top) + 'px,0)';
      target.offsetWidth; // tslint:disable-line
      target.style.transition = 'all ' + time + 'ms cubic-bezier(0.755, 0.05, 0.855, 0.06)';
      target.style.transform = 'translate3d(0,0,0)';
      clearTimeout(target.animated);
      target.animated = setTimeout(function () {
        target.style.transition = '';
        target.style.transform = '';
        target.animated = false;
      }, time);
    }
  }

  getScrollbarWidth() {
    if (this.fixHeader && this.tableBodyEl) {
      const inner = this.fixOriginTable.parentNode;
      const outer = inner.parentNode;
      // Calculating difference between container's full width and the child width
      return (outer.offsetWidth - inner.offsetWidth);
    }
    return 0;
  }

  toggleChildrenTable() {
    this.childrenTableOpen = !this.childrenTableOpen;
    this.dt.onToggleAllChildrenTable(this.childrenTableOpen);
  }

  closeFilter(dropdown: DropDownDirective) {
    dropdown.toggle();
  }

  getFilterDataMultiple(column: DataTableColumnTmplComponent) {
    // 兼容当前当用户未传入id时，使用name做重名判断
    const keyValue = this.checkedListForFilter.length ? this.checkedListForFilter[0].hasOwnProperty('id') ? 'id' : 'name' : '';
    const checkedList = this.removeDuplication(this.checkedListForFilter, keyValue).filter(item => item.checked);
    this.setFilterIconActive(checkedList, column);
    column.emitFilterData(checkedList);
  }
  getFilterDataRadio(item, column: DataTableColumnTmplComponent) {
    this.choosedItem = item;
    this.setFilterIconActive(item, column);
    column.emitFilterData(item);
  }
  showfilterContent($event, column: DataTableColumnTmplComponent) {
    this.searchText = '';
    column.canFilter(!$event).then((change) => {
      if (!$event) {
        this.resetSources();
        return;
      }
      if (!change) {
        this.isFilterHidden = true;
        return;
      }
      this.isFilterHidden = false;
      this.columnForFilter = column;
      if (!column.customFilterTemplate) {
        this.registerFilterChange(column);
      }
    });
  }
  filterCheckAll($event) {
    this.filterHalfChecked = false;
    this.filterListDisplay.forEach(item => {
      item.checked = $event;
      this.checkedListForFilter.push(item);
    });
  }
  checkboxChange($event, item) {
    this.checkedListForFilter.push(item);
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

  registerFilterChange(column: DataTableColumnTmplComponent): void {
    this.sourceSubject = new BehaviorSubject<any>('');
    setTimeout(() => {
      this.searchElement = document.querySelector('.data-table-column-filter-content input');
      this.searchInputValueChangeEvent();
    });
    this.sourceSubscription = this.sourceSubject.pipe(switchMap(term => column.searchFn(term))).subscribe(options => {
      this.filterListDisplay = options;
      this.checkedListForFilter.push(...options.filter(item => item.checked));
      this.setHalfChecked();
      this.ref.markForCheck();
    });
  }

  searchInputValueChangeEvent() {
    this.filterSubscription = fromEvent(this.searchElement, 'input')
      .pipe(
        map((e: any) => e.target.value),
        debounceTime(300) // hard code need refactory
      )
      .subscribe(term => {
        return this.sourceSubject.next(term);
      });
  }
  removeDuplication(array, key) {
    const hash = {};
    return array.reduceRight((item, next) => {
      if (!hash[next[key]]) {
        hash[next[key]] = true;
        item.push(next);
      }
      return item;
    }, []);
  }
  setFilterIconActive(checkedData, column: DataTableColumnTmplComponent) {
    if (column['filterIconActive'] === undefined && (Array.isArray(checkedData) ?
      (checkedData.length && (checkedData.length < column['filterList'].length)) : checkedData)) {
      column['filterIconActiveInner'] = true;
    } else {
      column['filterIconActiveInner'] = false;
    }
  }
}
