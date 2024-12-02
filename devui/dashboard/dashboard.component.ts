import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  isDevMode,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { GridStack, GridStackNode, GridStackOptions } from 'gridstack';
import { DashBoardGridStackDefaultOption, GridStackNodeCompatible } from './grid-stack.config';
import { GridStackService } from './grid-stack.service';
import './polyfill';
import { DashboardLibraryTrashDirective } from './widget-library/library-trash.directive';
import { DashboardLibraryWidgetDirective } from './widget-library/library-widget.directive';
import { DashboardWidgetComponent } from './widget/widget.component';

export type DashboardWidgetEvent = Array<{
  widget?: DashboardWidgetComponent; // change, remove
  node?: GridStackNodeCompatible & {
    widgetData?: any; // add
    willItFit?: boolean;
    trashData?: any; // remove
  };
  origNode?: GridStackNodeCompatible;
}>;

@Component({
  selector: 'd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [GridStackService],
  exportAs: 'dDashboard',
  preserveWhitespaces: false,
})
export class DashboardComponent implements OnChanges, AfterViewInit, OnDestroy {
  public get gridStack() {
    return this.gridStackService?.gridStack;
  }
  @ContentChildren(DashboardWidgetComponent, { descendants: true }) widgetComponents: QueryList<DashboardWidgetComponent>;
  @Input() initOptions: GridStackOptions;

  /* move resize setting*/
  @Input() static: boolean;
  @Input() float: boolean;
  @Input() animate: boolean;
  @Input() widgetMoveable: boolean;
  @Input() widgetResizable: boolean;

  @HostBinding('class.d-dashboard-show-grid-block')
  @Input()
  showGridBlock = false;

  /* layout setting */
  @Input() column: number;
  @HostBinding('attr.gs-min-row')
  @Input()
  minRow: number;
  @HostBinding('attr.gs-max-row')
  @Input()
  maxRow: number;
  @Input() cellHeight: number | string;
  @Input() margin: number | string;

  @Output() widgetAdded = new EventEmitter<DashboardWidgetEvent>();
  @Output() widgetChanged = new EventEmitter<DashboardWidgetEvent>();
  @Output() widgetRemoved = new EventEmitter<DashboardWidgetEvent>();
  @Output() dashboardInit = new EventEmitter();

  finalOption: GridStackOptions;
  renderedWidgets: Array<DashboardWidgetComponent>;

  @HostBinding('class.grid-stack') addClass = true;

  constructor(
    public el: ElementRef,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    public gridStackService: GridStackService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.gridStack) {
      if (changes.static) {
        this.gridStack.setStatic(!!this.static);
        if (!this.static) {
          this.gridStackService.resetAcceptWidget(this);
        }
      }
      if (changes.float) {
        this.gridStack.float(!!this.float);
      }
      if (changes.animate) {
        this.gridStack.setAnimation(!!this.animate);
      }
      if (changes.widgetMoveable) {
        this.gridStack.enableMove(!this.static && this.widgetMoveable);
      }
      if (changes.widgetResizable) {
        this.gridStack.enableResize(!this.static && this.widgetResizable);
      }
      if (changes.column && this.column !== undefined) {
        this.gridStack.column(this.column);
        this.gridStackService.updateBackgroundGridBlock();
      }
      if (changes.maxRow) {
        this.gridStack.engine.maxRow = this.maxRow || 0;
      }
      if (changes.cellHeight) {
        this.gridStack.cellHeight(this.cellHeight, true);
        this.gridStackService.updateBackgroundGridBlock();
      }
      if (changes.margin) {
        this.gridStack.margin(this.margin);
        this.gridStackService.updateBackgroundGridBlock();
      }
    }
  }

  ngAfterViewInit() {
    this.finalOption = { ...DashBoardGridStackDefaultOption, ...this.initOptions, ...this.getTransformOption() };
    this.renderer.addClass(this.el.nativeElement, 'grid-stack-' + this.finalOption.column);
    this.gridStackService.gridStack = GridStack.init(this.finalOption, this.el.nativeElement);
    this.gridStackService.resetAcceptWidget(this);
    this.gridStackService.resetRemoveDrop(this);
    this.gridStackService.updateBackgroundGridBlock();

    this.renderedWidgets = this.widgetComponents.toArray();
    setTimeout(() => {
      this.renderedWidgets.forEach((widget) =>
        widget.handleChange(this.addGridStackNodeCompatible(widget.elem.nativeElement.gridstackNode))
      );
    });
    this.widgetComponents.changes.subscribe((changes) => {
      this.handleItemChanges(this.renderedWidgets, this.widgetComponents.toArray());
      this.renderedWidgets = this.widgetComponents.toArray();
    });
    this.dashboardInit.emit();
  }

  ngOnDestroy() {
    if (this.gridStackService && this.gridStackService.gridStack) {
      this.gridStackService.removeBackgroundGridBlockStyleSheet();
      this.gridStackService.gridStack.destroy();
    }
  }

  private getTransformOption() {
    const option = {};
    const getOppositeKeepUndefined = (v) => {
      if (v === undefined) {
        return undefined;
      }
      return !v;
    };

    Object.assign(option, {
      column: this.column,
      cellHeight: this.cellHeight,
      margin: this.margin,
      minRow: this.minRow,
      maxRow: this.maxRow,
      staticGrid: this.static,
      float: this.float,
      animate: this.animate,
      disableDrag: getOppositeKeepUndefined(this.widgetMoveable),
      disableResize: getOppositeKeepUndefined(this.widgetResizable),
    });

    Object.keys(option).forEach((k) => {
      if (option[k] === undefined) {
        delete option[k];
      }
    });
    return option;
  }

  private handleItemChanges(renderedItems: DashboardWidgetComponent[], items: DashboardWidgetComponent[]): void {
    const itemsToAdd = items.filter((i) => !renderedItems.some((w) => w === i));
    const itemsToRemove = renderedItems.filter((w) => !items.some((i) => w === i));
    this.gridStack.batchUpdate();
    itemsToAdd.forEach((i) => this.gridStack.addWidget(i.elem.nativeElement));
    itemsToRemove.forEach((i) => this.gridStack.removeWidget(i.elem.nativeElement));
    this.gridStack.commit();
  }

  public batchUpdate() {
    this.cdr.detach();
  }
  public commit() {
    this.cdr.detectChanges();
    this.cdr.reattach();
  }

  @HostListener('added', ['$event', '$event.detail'])
  public addedHandler = (event, items: GridStackNode[]) => {
    setTimeout(() => {
      const all = items.map((item) => ({
        node: this.addGridStackNodeCompatible(item),
        widget: this.widgetComponents.toArray().find((widget) => item.el === widget.elem.nativeElement),
      }));

      // 处理ContentChildren数据推送进来的
      all
        .filter((wd) => wd.widget)
        .forEach(({ node, widget }) => {
          widget.handleChange(node);
        });
    });
  };

  @HostListener('change', ['$event', '$event.detail'])
  public changeHandler = (event, items: GridStackNode[]) => {
    if (!this.gridStack) {
      return;
    }
    if (!(this.gridStack as any)._oneColumnMode) {
      setTimeout(() => {
        const all = items.map((item) => ({
          node: this.addGridStackNodeCompatible(item),
          widget: this.renderedWidgets.find((widget) => item.el === widget.elem.nativeElement),
        }));
        // 处理UI操作调整大小/调整位置
        all
          .filter((w) => w.widget)
          .forEach(({ node, widget }) => {
            widget.handleChange(node);
          });
        if (isDevMode() && all.some((w) => !w.widget)) {
          console.warn('remove: something wrong, not handled by dashboard');
        }
        this.widgetChanged.emit(all.filter((w) => w.widget));
      });
    }
    if (this.showGridBlock) {
      this.gridStackService.setBackgroundGridBlockIfColumnChange();
    }
  };

  @HostListener('removed', ['$event', '$event.detail'])
  public removedHandler = (event, items: GridStackNode[]) => {
    const all = items.map((item) => ({
      node: this.addGridStackNodeCompatible(item),
      widget: this.renderedWidgets.find((widget) => item.el === widget.elem.nativeElement),
    }));
    // 不做处理仅提醒部分组件的移除不能被dashboard所理解
    if (isDevMode() && all.some((wd) => !wd.widget)) {
      console.warn('remove: something wrong, not handled by dashboard');
    }
  };

  handleDragInNode(node: GridStackNode, origNode: GridStackNode, widget: DashboardLibraryWidgetDirective) {
    this.widgetAdded.emit([
      {
        node: {
          ...this.addGridStackNodeCompatible(node),
          widgetData: widget.widgetData,
          willItFit: this.willItFit(node.x, node.y, widget.width, widget.height),
        },
        // origNode: this.addGridStackNodeCompatible(origNode),
      },
    ]);
  }

  handleDragOutNode(node: GridStackNode, dropArea: DashboardLibraryTrashDirective) {
    this.widgetRemoved.emit([
      {
        widget: this.renderedWidgets.find((widget) => node.el === widget.elem.nativeElement),
        node: {
          ...this.addGridStackNodeCompatible(node),
          trashData: dropArea.trashData,
        },
      },
    ]);
  }

  private addGridStackNodeCompatible(item: GridStackNode): GridStackNodeCompatible {
    return {
      ...item,
      ...{
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h,
      },
    };
  }

  public getCurrentColumn() {
    if (!this.gridStack) {
      return null;
    }
    return this.gridStack.getColumn();
  }
  public getCurrentRow() {
    if (!this.gridStack) {
      return null;
    }
    return this.gridStack.getRow();
  }
  public getCurrentColumnWidth() {
    if (!this.gridStack) {
      return null;
    }
    return this.gridStack.cellWidth();
  }
  public getCurrentCellHeight() {
    if (!this.gridStack) {
      return null;
    }
    return this.gridStack.getCellHeight();
  }
  public getCurrentMargin() {
    if (!this.gridStack) {
      return null;
    }
    return this.gridStack.getMargin();
  }

  public compact() {
    if (!this.gridStack) {
      return;
    }
    this.gridStack.compact();
  }

  public willItFit(x: number, y: number, width: number, height: number, autoPosition = false): boolean {
    if (!this.gridStack) {
      return;
    }
    return this.gridStack.willItFit({ x, y, w: width, h: height, autoPosition });
  }
}
