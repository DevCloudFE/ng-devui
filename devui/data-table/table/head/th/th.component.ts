import {
  ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input,
  NgZone, OnChanges, OnDestroy, Output, Renderer2, SimpleChanges, TemplateRef
} from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { FilterConfig, SortDirection, SortEventArg } from '../../../data-table.model';

@Component({
  selector: '[dHeadCell]',
  templateUrl: './th.component.html',
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
  @Input() filterList: Array<FilterConfig>;
  @Input() filterIconActive: boolean;
  @Input() filterMultiple = true;
  @Input() closeFilterWhenScroll: boolean;
  @Input() filterBoxWidth: any;
  @Input() filterBoxHeight: any;
  @Output() filterChange = new EventEmitter<FilterConfig[]>();

  @Input() sortable: boolean;
  @Input() sortDirection: SortDirection;
  @Output() sortDirectionChange = new EventEmitter<SortDirection>();
  @Output() sortChange = new EventEmitter<SortEventArg>();

  @Input() colDraggable: boolean;

  @Input() nestedColumn: boolean;
  @Input() iconFoldTable: string;
  @Input() iconUnFoldTable: string;

  resizeBarRefElement: HTMLElement;
  @Input() tableViewRefElement: ElementRef;

  @Output() resizeEndEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() resizeStartEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() resizingEvent: EventEmitter<any> = new EventEmitter<any>();

  @Input() minWidth: string;
  @Input() maxWidth: string;

  @Input() fixedLeft: string;
  @Input() fixedRight: string;
  element: HTMLElement;
  subscription: Subscription;
  resizing = false;
  resizeNodeEvent: any;
  resizeOverlay: HTMLElement;
  nextElement: any;
  initialWidth: number;
  totalWidth: number;
  mouseDownScreenX: number;
  resizeHandleElement: HTMLElement;
  tableElement: HTMLElement;
  @Input() childrenTableOpen: boolean;
  @Output() toggleChildrenTableEvent = new EventEmitter<boolean>();
  @Output() tapEvent = new EventEmitter<any>();

  @Input() column: any; // 为配置column方式兼容自定义过滤模板context

  constructor(element: ElementRef, private renderer2: Renderer2, private zone: NgZone, private cdr: ChangeDetectorRef) {
    this.element = element.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resizeEnabled']) {
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

    if (changes['filterable'] || changes['sortable'] || changes['resizeEnabled'] || changes['colDraggable']) {
      if (this.filterable || this.sortable || this.resizeEnabled || this.colDraggable) {
        this.operableClass = true;
      } else {
        this.operableClass = false;
      }
    }

    if (changes['filterIconActive']) {
      if (this.filterIconActive) {
        this.filterActiveClass = true;
      } else {
        this.filterActiveClass = false;
      }
    }

    if (changes['sortDirection']) {
      if (this.sortDirection === SortDirection.ASC || this.sortDirection === SortDirection.DESC) {
        this.sortActiveClass = true;
      } else {
        this.sortActiveClass = false;
      }
    }

    if (changes['fixedLeft']) {
      if (this.fixedLeft) {
        this.stickyLeftClass = true;
        this.stickyLeftStyle = this.fixedLeft;
      } else {
        this.stickyLeftClass = false;
        this.stickyLeftStyle = null;
      }
    }
    if (changes['fixedRight']) {
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
      const initialOffset = this.element.offsetLeft;
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
      if (this.tableElement) {
        this.renderer2.appendChild(this.tableElement, resizeBar);
        this.renderer2.setStyle(resizeBar, 'display', 'block');
        this.renderer2.setStyle(resizeBar, 'left', initialOffset + this.initialWidth + 'px');
        this.resizeBarRefElement = resizeBar;
      }

      this.renderer2.addClass(this.element, 'hover-bg');

      const mouseup = fromEvent(document, 'mouseup');
      this.subscription = mouseup.subscribe((ev: MouseEvent) => this.onMouseup(ev));

      this.zone.runOutsideAngular(() => {
        window.document.addEventListener('mousemove', this.bindMousemove);
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

      this.renderer2.removeClass(this.element, 'hover-bg');
      if (this.tableElement) {
        this.renderer2.removeChild(this.tableElement, this.resizeBarRefElement);
      }
      // this.width = finalWidth + 'px';

      this.resizeEndEvent.emit({ width: finalWidth });
    });
    if (this.subscription && !this.subscription.closed) {
      this._destroySubscription();
    }

    window.document.removeEventListener('mousemove', this.bindMousemove);
  }

  bindMousemove = (e) => {
    this.move(e);
  }

  move(event: MouseEvent): void {

    const movementX = event.clientX - this.mouseDownScreenX;
    const newWidth = this.initialWidth + movementX;

    const finalWidth = this.getFinalWidth(newWidth);
    if (this.resizeBarRefElement) {
      this.renderer2.setStyle(this.resizeBarRefElement, 'left', `${finalWidth + this.element.offsetLeft}px`);
    }
    this.resizingEvent.emit({ width: finalWidth });
  }

  private getFinalWidth(newWidth: number): number {
    const minWidth = this.handleWidth(this.minWidth);
    const maxWidth = this.handleWidth(this.maxWidth);

    const overMinWidth = !this.minWidth || newWidth >= minWidth;
    const underMaxWidth = !this.maxWidth || newWidth <= maxWidth;

    const finalWidth = !overMinWidth ? minWidth : !underMaxWidth ? maxWidth : newWidth;
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
