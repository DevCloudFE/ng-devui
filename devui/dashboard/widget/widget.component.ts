import {
  Component,
  ElementRef,
  Input,
  ChangeDetectionStrategy,
  HostBinding,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges,
  Optional,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { GridStackNode, GridStackWidget } from 'gridstack';
import { GridStackNodeCompatible } from '../grid-stack.config';
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
    preserveWhitespaces: false,
    standalone: false
})
export class DashboardWidgetComponent implements GridStackNode, OnChanges, AfterViewInit, OnDestroy {
  static autoNumberedId = 0;
  @HostBinding('attr.gs-x')
  @Input()
  x: number;
  @Output() xChange = new EventEmitter<number>();

  @HostBinding('attr.gs-y')
  @Input()
  y: number;
  @Output() yChange = new EventEmitter<number>();

  @HostBinding('attr.gs-w')
  @Input()
  width: number;
  @Output() widthChange = new EventEmitter<number>();

  @HostBinding('attr.gs-h')
  @Input()
  height: number;
  @Output() heightChange = new EventEmitter<number>();

  @HostBinding('attr.gs-id')
  @Input()
  id: string;

  @HostBinding('attr.gs-max-w')
  @Input()
  maxWidth: number;

  @HostBinding('attr.gs-max-h')
  @Input()
  maxHeight: number;

  @HostBinding('attr.gs-min-w')
  @Input()
  minWidth: number;

  @HostBinding('attr.gs-min-h')
  @Input()
  minHeight: number;

  @HostBinding('attr.gs-no-resize')
  @Input()
  noResize: boolean;

  @HostBinding('attr.gs-no-move')
  @Input()
  noMove: boolean;

  @HostBinding('attr.gs-auto-position')
  @Input()
  autoPosition: boolean; // 仅初始化有效，默认为false

  @HostBinding('attr.gs-locked')
  @Input()
  locked: boolean;

  @Input() widgetData;

  @Output() widgetInit = new EventEmitter(true);
  @Output() widgetResize = new EventEmitter<{ width: number; height: number } | null>(true);
  @Output() widgetDestroy = new EventEmitter();

  @HostBinding('class.grid-stack-item')
  hostBinding = true;

  generatedId: string = (DashboardWidgetComponent.autoNumberedId++).toString();

  constructor(public elem: ElementRef, @Optional() private gridStackService: GridStackService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.gridStackService && this.gridStackService.gridStack) {
      if (changes.x || changes.y || changes.width || changes.height) {
        this.gridStackService.gridStack.update(this.elem.nativeElement, { x: this.x, y: this.y, w: this.width, h: this.height });
      }
      if (changes.noResize) {
        this.gridStackService.gridStack.resizable(this.elem.nativeElement, !this.noResize);
      }
      if (changes.noMove) {
        this.gridStackService.gridStack.movable(this.elem.nativeElement, !this.noMove);
      }
      if (changes.locked) {
        this.gridStackService.gridStack.update(this.elem.nativeElement, { locked: !!this.locked });
      }
      if (changes.maxWidth) {
        this.gridStackService.gridStack.update(this.elem.nativeElement, { maxW: this.maxWidth });
      }
      if (changes.maxHeight) {
        this.gridStackService.gridStack.update(this.elem.nativeElement, { maxH: this.maxHeight });
      }
      if (changes.minWidth) {
        this.gridStackService.gridStack.update(this.elem.nativeElement, { minW: this.minWidth });
      }
      if (changes.minHeight) {
        this.gridStackService.gridStack.update(this.elem.nativeElement, { minH: this.minHeight });
      }
    }
  }

  ngAfterViewInit() {
    this.widgetInit.emit();
  }
  ngOnDestroy() {
    this.widgetDestroy.emit();
  }

  handleChange({ x, y, width, height }: GridStackNodeCompatible) {
    const change = { x, y, width, height};
    const beforeChange = { width: this.width, height: this.height };
    Object.keys(change).forEach((key) => {
      if (change[key] !== this[key]) {
        this[key] = change[key];
        const eventEmitter = this[key + 'Change'] as EventEmitter<number>;
        if (eventEmitter) {
          eventEmitter.emit(change[key]);
        }
      }
    });
    if (change.width !== beforeChange.width || change.height !== beforeChange.height) {
      this.widgetResize.emit({ width, height});
    }
  }
}
