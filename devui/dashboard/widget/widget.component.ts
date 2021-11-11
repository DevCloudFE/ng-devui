import {
  AfterViewInit, ChangeDetectionStrategy, Component,
  ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnDestroy, Optional, Output, SimpleChanges
} from '@angular/core';
import { GridStackNode, GridStackWidget } from 'gridstack';
import { GridStackService } from '../grid-stack.service';

export type DashboardWidget = GridStackWidget & {
  widgetData?: any;
  [prop: string]: any;
};

@Component({
  selector: 'd-dashboard-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'dDashboardWidget',
  preserveWhitespaces: false
})
export class DashboardWidgetComponent implements GridStackNode, OnChanges, AfterViewInit, OnDestroy {
  static autoNumberedId = 0;
  @HostBinding('attr.data-gs-x')
  @Input() x: number;
  @Output() xChange = new EventEmitter<number>();

  @HostBinding('attr.data-gs-y')
  @Input() y: number;
  @Output() yChange = new EventEmitter<number>();

  @HostBinding('attr.data-gs-width')
  @Input() width: number;
  @Output() widthChange = new EventEmitter<number>();

  @HostBinding('attr.data-gs-height')
  @Input() height: number;
  @Output() heightChange = new EventEmitter<number>();

  @HostBinding('attr.data-gs-id')
  @Input() id: string;

  @HostBinding('attr.data-gs-max-width')
  @Input() maxWidth: number;

  @HostBinding('attr.data-gs-max-height')
  @Input() maxHeight: number;

  @HostBinding('attr.data-gs-min-width')
  @Input() minWidth: number;

  @HostBinding('attr.data-gs-min-height')
  @Input() minHeight: number;

  @HostBinding('attr.data-gs-no-resize')
  @Input() noResize: boolean;

  @HostBinding('attr.data-gs-no-move')
  @Input() noMove: boolean;

  @HostBinding('attr.data-gs-auto-position')
  @Input() autoPosition: boolean; // 仅初始化有效，默认为false

  @HostBinding('attr.data-gs-locked')
  @Input() locked: boolean;

  @Input() widgetData;

  @Output() widgetInit = new EventEmitter(true);
  @Output() widgetResize = new EventEmitter<{width: number, height: number} | null>(true);
  @Output() widgetDestroy = new EventEmitter();

  @HostBinding('class.grid-stack-item')
  hostBinding = true;

  generatedId: string = (DashboardWidgetComponent.autoNumberedId++).toString();

  constructor(public elem: ElementRef, @Optional() private gridStackService: GridStackService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.gridStackService && this.gridStackService.gridStack) {
      if (changes.x || changes.y || changes.width || changes.height) {
        this.gridStackService.gridStack.update(this.elem.nativeElement, this.x, this.y, this.width, this.height);
      }
      if (changes.noResize) {
        this.gridStackService.gridStack.resizable(this.elem.nativeElement, !this.noResize);
      }
      if (changes.noMove) {
        this.gridStackService.gridStack.movable(this.elem.nativeElement, !this.noMove);
      }
      if (changes.locked) {
        this.gridStackService.gridStack.locked(this.elem.nativeElement, !!this.locked);
      }
      if (changes.maxWidth) {
        this.gridStackService.gridStack.maxWidth(this.elem.nativeElement, this.maxWidth);
      }
      if (changes.maxHeight) {
        this.gridStackService.gridStack.maxHeight(this.elem.nativeElement, this.maxHeight);
      }
      if (changes.minWidth) {
        this.gridStackService.gridStack.minWidth(this.elem.nativeElement, this.minWidth);
      }
      if (changes.minHeight) {
        this.gridStackService.gridStack.minHeight(this.elem.nativeElement, this.minHeight);
      }
    }
  }

  ngAfterViewInit() {
    this.widgetInit.emit();
  }
  ngOnDestroy() {
    this.widgetDestroy.emit();
  }

  handleChange({ x, y, width, height }: GridStackNode) {
    const change = { x, y, width, height };
    const beforeChange = {width: this.width, height: this.height};
    Object.keys(change).forEach(key => {
      if (change[key] !== this[key]) {
        this[key] = change[key];
        const eventEmitter = this[key + 'Change'] as EventEmitter<number>;
        if (eventEmitter) {
          eventEmitter.emit(change[key]);
        }
      }
    });
    if (change.width !== beforeChange.width || change.height !== beforeChange.height) {
      this.widgetResize.emit({width: width, height: height});
    }
  }
}
