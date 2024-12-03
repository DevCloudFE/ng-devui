import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { FilterConfig, SortDirection, SortEventArg } from '../../../data-table.model';
import { TABLE_TH } from './th.token';

@Component({
  /* eslint-disable-next-line @angular-eslint/component-selector*/
  selector: '[dHeadCell]',
  templateUrl: './th.component.html',
  styleUrls: ['./th.component.scss'],
  providers: [
    {
    provide: TABLE_TH,
      useExisting: forwardRef(() => TableThComponent),
    },
  ],
})
export class TableThComponent implements OnChanges, OnDestroy {
  @HostBinding('class.resizeable') resizeEnabledClass = false;
  @HostBinding('class.operable') operableClass = false;
  @HostBinding('class.sort-active') sortActiveClass = false;
  @HostBinding('class.filter-active') filterActiveClass = false;
  @HostBinding('class.devui-sticky-left-cell') stickyLeftClass = false;
  @HostBinding('class.devui-sticky-right-cell') stickyRightClass = false;
  @HostBinding('style.left') stickyLeftStyle: string;
  @HostBinding('style.right') stickyRightStyle: string;

  @Input() resizeEnabled: boolean;
  @Input() filterable: boolean;
  @Input() beforeFilter: (value) => boolean | Promise<boolean> | Observable<boolean>;
  @Input() customFilterTemplate: TemplateRef<any>;
  @Input() extraFilterTemplate: TemplateRef<any>;
  @Input() searchFn: (term: string) => Observable<Array<any>>;
  @Input() showFilterIcon = true;
  @Input() filterList: Array<FilterConfig>;
  @Input() filterIconActive: boolean;
  @Input() filterMultiple = true;
  @Input() closeFilterWhenScroll: boolean;
  @Input() filterBoxWidth: any;
  @Input() filterBoxHeight: any;
  @Output() filterChange = new EventEmitter<FilterConfig[]>();
  @Output() filterToggle = new EventEmitter<{
    isOpen: boolean;
    checklist: FilterConfig[];
  }>();

  @HostBinding('class.can-sort')
  @Input() sortable: boolean;
  @Input() sortDirection: SortDirection;
  @Input() showSortIcon = true;
  @Output() sortDirectionChange = new EventEmitter<SortDirection>();
  @Output() sortChange = new EventEmitter<SortEventArg>();

  @Input() colDraggable: boolean;

  @Input() nestedColumn: boolean;
  /**
   * @depreted 存在xxs风险，使用方需根据自身场景做好防护
   */
  @Input() iconFoldTable: string;
  /**
   * @depreted 存在xxs风险，使用方需根据自身场景做好防护
   */
  @Input() iconUnFoldTable: string;

  @Input() tableViewRefElement: ElementRef;

  @Output() resizeEndEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() resizeStartEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() resizingEvent: EventEmitter<any> = new EventEmitter<any>();

  @Input() minWidth: string;
  @Input() maxWidth: string;

  @Input() fixedLeft: string;
  @Input() fixedRight: string;
  @HostBinding('class.devui-last-sticky-left-cell')
  @Input() isLastFixedLeft: boolean;
  @HostBinding('class.devui-first-sticky-right-cell')
  @Input() isFirstFixedRight: boolean;

  resizeBarRefElement: HTMLElement;
  element: HTMLElement;
  subscription: Subscription;
  resizing = false;
  resizeNodeEvent: any;
  resizeOverlay: HTMLElement;
  nextElement: any;
  initialWidth: number;
  initialOffset: number;
  totalWidth: number;
  mouseDownScreenX: number;
  resizeHandleElement: HTMLElement;
  tableElement: HTMLElement;
  tableHeaderElement: HTMLElement;

  // 以下为内部传递参数，不对外暴露
  @Input() childrenTableOpen: boolean;
  @Output() toggleChildrenTableEvent = new EventEmitter<boolean>();
  @Output() tapEvent = new EventEmitter<any>();
  @Input() column: any; // 为配置column方式兼容自定义过滤模板context
  document: Document;

  constructor(
    element: ElementRef,
    private renderer2: Renderer2,
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private doc: any
  ) {
    this.element = element.nativeElement;
    this.document = this.doc;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { resizeEnabled, filterable, sortable, colDraggable, filterIconActive, sortDirection, fixedLeft, fixedRight } = changes;
    if (resizeEnabled) {
      if (this.resizeEnabled) {
        this.resizeEnabledClass = true;
        if (!this.resizeHandleElement) {
          this.resizeHandleElement = this.renderer2.createElement('span');
          this.renderer2.addClass(this.resizeHandleElement, 'resize-handle');
          this.renderer2.appendChild(this.element.firstChild, this.resizeHandleElement);
          this.resizeNodeEvent = this.renderer2.listen(this.resizeHandleElement, 'click', (event) => event.stopPropagation());
        }
      } else {
        this.resizeEnabledClass = false;
      }
    }

    if (filterable || sortable || resizeEnabled || colDraggable) {
      if (this.filterable || this.sortable || this.resizeEnabled || this.colDraggable) {
        this.operableClass = true;
      } else {
        this.operableClass = false;
      }
    }

    if (filterIconActive) {
      if (this.filterIconActive) {
        this.filterActiveClass = true;
      } else {
        this.filterActiveClass = false;
      }
    }

    if (sortDirection) {
      if (this.sortDirection === SortDirection.ASC || this.sortDirection === SortDirection.DESC) {
        this.sortActiveClass = true;
      } else {
        this.sortActiveClass = false;
      }
    }

    if (fixedLeft) {
      if (this.fixedLeft) {
        this.stickyLeftClass = true;
        this.stickyLeftStyle = this.fixedLeft;
      } else {
        this.stickyLeftClass = false;
        this.stickyLeftStyle = null;
      }
    }
    if (fixedRight) {
      if (this.fixedRight) {
        this.stickyRightClass = true;
        this.stickyRightStyle = this.fixedRight;
      } else {
        this.stickyRightClass = false;
        this.stickyRightStyle = null;
      }
    }
  }

  ngOnDestroy(): void {
    this._destroySubscription();
    if (this.resizeNodeEvent) {
      this.resizeNodeEvent();
    }
  }

  onFilterIconActive(active) {
    this.filterActiveClass = active;
  }

  onTap(event) {
    this.tapEvent.emit(event);
  }

  toggleChildrenTable() {
    this.childrenTableOpen = !this.childrenTableOpen;
    this.toggleChildrenTableEvent.emit(this.childrenTableOpen);
  }

  emitFilterData(filterData) {
    this.filterChange.emit(filterData);
  }

  emitFilterToggle(data: { isOpen: boolean; checklist: FilterConfig[] }) {
    this.filterToggle.emit(data);
  }

  onSort(event: SortEventArg) {
    this.sortDirection = event.direction;
    if (event.direction === SortDirection.default) {
      this.sortActiveClass = false;
    } else {
      this.sortActiveClass = true;
    }
    this.sortDirectionChange.emit(event.direction);
    this.sortChange.emit({ ...event, th: this });
  }

  clearSortOrder() {
    this.sortDirection = SortDirection.default;
    this.sortActiveClass = false;
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event: MouseEvent): void {
    const isHandle = (<HTMLElement>event.target).classList.contains('resize-handle');

    if (isHandle) {
      this.resizeStartEvent.emit(event); // emit begin resize event

      this.initialWidth = this.element.clientWidth;
      this.initialOffset = this.element.offsetLeft;
      this.mouseDownScreenX = event.clientX;
      event.stopPropagation();
      this.nextElement = this.element.nextElementSibling;
      this.resizing = true;
      this.totalWidth = this.nextElement ? this.initialWidth + this.nextElement.clientWidth : this.initialWidth;

      // create resizeOverlay
      this.resizeOverlay = this.renderer2.createElement('div');
      this.renderer2.appendChild(this.element.firstElementChild, this.resizeOverlay);
      this.renderer2.addClass(this.resizeOverlay, 'resize-overlay');
      this.renderer2.listen(this.resizeOverlay, 'click', (clickEvent: Event) => clickEvent.stopPropagation());

      this.renderer2.addClass(this.tableViewRefElement.nativeElement, 'table-view-selector');

      const resizeBar = this.renderer2.createElement('div');
      this.renderer2.addClass(resizeBar, 'resize-bar');

      this.tableElement = this.tableViewRefElement.nativeElement.querySelector('.devui-scrollbar table');

      if (this.isLastFixedLeft || this.isFirstFixedRight) {
        this.renderer2.addClass(this.tableViewRefElement.nativeElement, 'd-table-on-resize');
      }

      this.initialOffset = this.initialOffset - this.tableElement.parentElement.scrollLeft;
      if (this.tableElement) {
        this.renderer2.appendChild(this.tableElement, resizeBar);
        this.renderer2.setStyle(resizeBar, 'display', 'block');
        this.renderer2.setStyle(resizeBar, 'left', this.initialOffset + this.initialWidth - 2 + 'px');
        this.resizeBarRefElement = resizeBar;
      }

      this.tableHeaderElement = this.tableViewRefElement.nativeElement.querySelector('.table-fix-header');

      if (this.tableHeaderElement) {
        this.renderer2.appendChild(this.tableHeaderElement, resizeBar);
        this.renderer2.setStyle(resizeBar, 'display', 'block');
        this.renderer2.setStyle(resizeBar, 'left', this.initialOffset + this.initialWidth - 2 + 'px');
      }

      this.renderer2.addClass(this.element, 'hover-bg');

      const mouseup = fromEvent(this.document, 'mouseup');
      this.subscription = mouseup.subscribe((ev: MouseEvent) => this.onMouseup(ev));

      this.zone.runOutsideAngular(() => {
        this.document.addEventListener('mousemove', this.bindMousemove);
      });
    }
  }

  onMouseup(event: MouseEvent): void {
    this.zone.run(() => {
      const movementX = event.clientX - this.mouseDownScreenX;
      const newWidth = this.initialWidth + movementX;

      const finalWidth = this.getFinalWidth(newWidth);
      this.resizing = false;

      // destroy overlay
      this.renderer2.removeChild(this.element, this.resizeOverlay);

      this.renderer2.removeClass(this.tableViewRefElement.nativeElement, 'table-view-selector');

      this.renderer2.removeClass(this.tableViewRefElement.nativeElement, 'd-table-on-resize');

      this.renderer2.removeClass(this.element, 'hover-bg');
      if (this.tableElement) {
        this.renderer2.removeChild(this.tableElement, this.resizeBarRefElement);
      }

      if (this.tableHeaderElement) {
        this.renderer2.removeChild(this.tableHeaderElement, this.resizeBarRefElement);
      }

      this.resizeEndEvent.emit({ width: finalWidth, beforeWidth: this.initialWidth });
    });
    if (this.subscription && !this.subscription.closed) {
      this._destroySubscription();
    }

    this.document.removeEventListener('mousemove', this.bindMousemove);
  }

  bindMousemove = (e) => {
    this.move(e);
  };

  move(event: MouseEvent): void {

    const movementX = event.clientX - this.mouseDownScreenX;
    const newWidth = this.initialWidth + movementX;

    const finalWidth = this.getFinalWidth(newWidth);
    if (this.resizeBarRefElement) {
      this.renderer2.setStyle(this.resizeBarRefElement, 'left', `${finalWidth + this.initialOffset}px`);
    }
    this.resizingEvent.emit({ width: finalWidth });
  }

  private getFinalWidth(newWidth: number): number {
    const minWidth = this.handleWidth(this.minWidth);
    const maxWidth = this.handleWidth(this.maxWidth);

    const overMinWidth = !this.minWidth || newWidth >= minWidth;
    const underMaxWidth = !this.maxWidth || newWidth <= maxWidth;

    const result = !underMaxWidth ? maxWidth : newWidth;
    const finalWidth = !overMinWidth ? minWidth : result;
    return finalWidth;
  }

  private handleWidth(width: string | number) {
    if (!width) {
      return;
    }
    if (typeof width === 'number') {
      return width;
    }
    if (width.includes('%')) {
      const tableWidth = this.tableViewRefElement.nativeElement.clientWidth;
      return (tableWidth * parseInt(width, 10)) / 100;
    }
    return parseInt(width.replace(/[^\d]+/, ''), 10);
  }

  private _destroySubscription() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }
}
