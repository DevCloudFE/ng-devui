import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { distinctUntilChanged, map, pluck, takeUntil, tap } from 'rxjs/operators';
import { GanttRailStatus, GanttTaskInfo } from '../gantt.model';
import { GanttService } from '../gantt.service';

@Component({
  selector: 'd-gantt-bar',
  templateUrl: './gantt-bar.component.html',
  styleUrls: ['./gantt-bar.component.scss'],
})
export class GanttBarComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  private moveBarStartListener: Observable<number>;
  private resizeBarLeftStartListener: Observable<number>;
  private resizeBarRightStartListener: Observable<number>;
  private dragProgressStartListener: Observable<number>;
  private mouseMoveListener: Observable<number>;
  private mouseEndListener: Observable<Event>;

  private moveBarStartHandler: Subscription | null;
  private resizeBarLeftStartHandler: Subscription | null;
  private resizeBarRightStartHandler: Subscription | null;
  private dragProgressStartHandler: Subscription | null;
  private mouseMoveHandler: Subscription | null;
  private mouseEndHandler: Subscription | null;
  private mouseOverProgressHandler: Subscription | null;
  private mouseLeaveProgressHandler: Subscription | null;
  mouseMoveTimer: any = null;
  mouseLeaveTimer: any = null;

  dragProgressStart: boolean;
  moveBarStart: boolean;
  private resizeBarLeftStart: boolean;
  private resizeBarRightStart: boolean;

  private barMoveStartPageX: number;
  private barResizeStartPageX: number;
  private barOriginLeft: number;
  private barOriginWidth: string;
  private originStartDate: Date;
  private originEndDate: Date;

  private barHovering = false;
  private progressHovering = false;

  private ganttScaleStatusHandler: Subscription;
  public focused = false;
  private MIN_WIDTH = 10;
  left = 0;
  width = 0;
  private EARLYOFFSET = 3;

  cdkOverlayOffsetX = 0;

  @ViewChild('ganttBar') ganttBar: ElementRef;
  @ViewChild('ganttBarMain') ganttBarMain: ElementRef;
  @ViewChild('ganttBarProgress') ganttBarProgress: ElementRef;
  @ViewChild('ganttBarTrack') ganttBarTrack: ElementRef;
  @ViewChild('ganttBarRail') ganttBarRail: ElementRef;
  @ViewChild('ganttBarDarggerLeft') ganttBarDarggerLeft: ElementRef;
  @ViewChild('ganttBarDarggerRight') ganttBarDarggerRight: ElementRef;
  private max = 100;
  private min = 0;
  private step = 1;
  private mouseEventDalay = 100;

  public duration: string;
  public tipHovered = false;
  public mouseMoveOnBar = false;
  percentage: number;
  private movedOut = false;
  private mouseenterHandler: Subscription;
  private mouseleaveHandler: Subscription;
  private scrollTimer = null;
  private SCROLL_STEP = 10;
  private outDirection = 'right';
  private scrollViewRange = [0, 0];

  @Input() barMoveDisabled = false;
  @Input() barResizeDisabled = false;
  @Input() progressDisabled = false;

  @Input() startDate: Date;
  @Input() endDate: Date;
  @Input() progressRate = 0;
  @Input() tipTemplateRef: TemplateRef<any>;
  @Input() titleTemplateRef: TemplateRef<any>;
  @Input() data: any;

  @Input() originOffsetX = 0;

  @Input() id: string;

  @Input() title: string;

  @Input() showTitle = false;

  @Input() customBarClass = '';

  @Input() customBgClass = '';

  @Input() customTitleClass = '';

  @Input() scrollElement: HTMLElement;

  @Input() status: GanttRailStatus = 'normal';

  @Output() barMoveStartEvent = new EventEmitter<GanttTaskInfo>();
  @Output() barMovingEvent = new EventEmitter<GanttTaskInfo>();
  @Output() barMoveEndEvent = new EventEmitter<GanttTaskInfo>();

  @Output() barResizeStartEvent = new EventEmitter<GanttTaskInfo>();
  @Output() barResizingEvent = new EventEmitter<GanttTaskInfo>();
  @Output() barResizeEndEvent = new EventEmitter<GanttTaskInfo>();

  @Output() barProgressEvent = new EventEmitter<number>();

  constructor(private cdr: ChangeDetectorRef, private ganttService: GanttService, private ele: ElementRef) {}

  ngOnInit() {
    this.checkRangeValues(this.min, this.max);
    this.checkStepValue();
    if (this.progressRate === null) {
      this.setValue(this.ensureValueInRange(null));
    }
    this.originStartDate = this.startDate;
    this.originEndDate = this.endDate;
    this.duration = this.ganttService.getDuration(this.startDate, this.endDate) + 'd';

    this.ganttScaleStatusHandler = this.ganttService.ganttScaleConfigChange.subscribe((config) => {
      if (config.startDate) {
        this.left = this.ganttService.getDatePostionOffset(this.startDate);
      }
      if (config.unit) {
        this.left = this.ganttService.getDatePostionOffset(this.startDate);
        this.width = this.ganttService.getDurationWidth(this.startDate, this.endDate);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const { progressRate, startDate, endDate, barMoveDisabled, barResizeDisabled, progressDisabled } = changes;
    if (
      Object.prototype.hasOwnProperty.call(changes, 'min') ||
      Object.prototype.hasOwnProperty.call(changes, 'max') ||
      Object.prototype.hasOwnProperty.call(changes, 'step')
    ) {
      this.checkRangeValues(this.min, this.max);
      this.checkStepValue();
    }

    if (progressRate && this.progressRate >= 0) {
      this.updateTrackAndHandle();
    }

    if (startDate) {
      this.left = this.ganttService.getDatePostionOffset(this.startDate);
      this.width = this.ganttService.getDurationWidth(this.startDate, this.endDate);
    }

    if (endDate) {
      this.width = this.ganttService.getDurationWidth(this.startDate, this.endDate);
    }

    if (barMoveDisabled) {
      if (this.barMoveDisabled) {
        this.unsubscribeMouseActions(['start'], ['barMove']);
      } else {
        this.subscribeMouseActions(['start'], ['barMove']);
      }
    }

    if (barResizeDisabled) {
      if (this.barResizeDisabled) {
        this.unsubscribeMouseActions(['start'], ['barResize']);
      } else {
        this.subscribeMouseActions(['start'], ['barResize']);
      }
    }

    if (progressDisabled) {
      if (this.progressDisabled) {
        this.unsubscribeMouseActions(['start'], ['progress']);
      } else {
        this.subscribeMouseActions(['start'], ['progress']);
      }
    }
  }

  ngAfterViewInit() {
    if (this.startDate && this.endDate) {
      this.registerMouseEventsListeners();
      this.registerHandleHoverPopoverListener();
      if (!this.barMoveDisabled) {
        this.subscribeMouseActions(['start'], ['barMove']);
      }

      if (!this.barResizeDisabled) {
        this.subscribeMouseActions(['start'], ['barResize']);
      }

      if (!this.progressDisabled) {
        this.subscribeMouseActions(['start'], ['progress']);
      }
    }

    if (this.progressRate && this.progressRate > 0) {
      this.updateTrackAndHandle();
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  writeValue(newValue: number): void {
    this.setValue(this.ensureValueInRange(newValue));
  }

  private onTouchedCallback = (v: any) => {};

  private onChangeCallback = (v: any) => {};

  private checkRangeValues(minValue, maxValue) {
    if (maxValue <= minValue) {
      throw new Error(`max value must be greater than min value`);
    }
  }

  private checkStepValue() {
    if (this.step < 0 || !this.step) {
      throw new Error('step value must be greater than 0.');
    } else if ((this.max - this.min) % this.step) {
      throw new Error('(max - min) must be divisible by step.');
    }
  }

  private ratioToValue(ratio: number, min: number, max: number, step: number): number {
    let value = (max - min) * ratio + min;
    if (step > 0) {
      value = Math.round(value / step) * step;
    }
    return this.clamp(min, value, max);
  }

  private convertHandlePositionToRatio(handleX: number, startX: number, totalLength: number): number {
    return this.clamp(0, (handleX - startX) / totalLength, 1);
  }

  private clamp(min: number, n: number, max: number) {
    return Math.max(min, Math.min(n, max));
  }

  private updateStyle(percentage) {
    this.percentage = Math.min(1, Math.max(0, percentage));
    if (this.ganttBarTrack && this.ganttBarTrack.nativeElement) {
      this.ganttBarTrack.nativeElement.style.width = `${this.percentage * 100}%`;
    }

    if (this.ganttBarProgress && this.ganttBarProgress.nativeElement) {
      this.ganttBarProgress.nativeElement.style.left = `${this.percentage * 100}%`;
    }
  }

  private registerMouseEventsListeners(): void {
    this.moveBarStartListener = fromEvent(this.ganttBarMain.nativeElement, 'mousedown').pipe(
      tap((e: Event) => {
        e.stopPropagation();
        e.preventDefault();
      }),
      pluck<MouseEvent, 'pageX'>('pageX')
    );

    this.dragProgressStartListener = fromEvent(this.ganttBarProgress.nativeElement, 'mousedown').pipe(
      tap((e: Event) => {
        e.stopPropagation();
        e.preventDefault();
      }),
      pluck<MouseEvent, 'pageX'>('pageX'),
      map((position: number) => this.mousePositionToAdaptiveValue(position))
    );

    this.resizeBarLeftStartListener = fromEvent(this.ganttBarDarggerLeft.nativeElement, 'mousedown').pipe(
      tap((e: Event) => {
        e.stopPropagation();
        e.preventDefault();
      }),
      pluck<MouseEvent, 'pageX'>('pageX')
    );

    this.resizeBarRightStartListener = fromEvent(this.ganttBarDarggerRight.nativeElement, 'mousedown').pipe(
      tap((e: Event) => {
        e.stopPropagation();
        e.preventDefault();
      }),
      pluck<MouseEvent, 'pageX'>('pageX')
    );

    this.mouseEndListener = fromEvent(document, 'mouseup');
    this.mouseMoveListener = fromEvent(document, 'mousemove').pipe(
      tap((e: Event) => {
        e.stopPropagation();
        e.preventDefault();
      }),
      pluck<MouseEvent, 'pageX'>('pageX'),
      distinctUntilChanged(),
      takeUntil(this.mouseEndListener)
    );
  }

  private getSliderPagePosition(): number {
    const rect = this.ganttBar.nativeElement.getBoundingClientRect();
    const window = this.ganttBar.nativeElement.ownerDocument.defaultView;
    return rect.left + window.pageXOffset;
  }

  private getRailLength(): number {
    return this.ganttBarRail.nativeElement.clientWidth;
  }

  private mousePositionToAdaptiveValue(handleX: number): number {
    const sliderStartX = this.getSliderPagePosition();
    const sliderLength = this.getRailLength();
    const ratio = this.convertHandlePositionToRatio(handleX, sliderStartX, sliderLength);
    const value = this.ratioToValue(ratio, this.min, this.max, this.step);
    return parseFloat(value.toFixed(this.getDecimals(this.step)));
  }

  private getDecimals(value: number): number {
    const valueString = value.toString();
    const integerLength = valueString.indexOf('.') + 1;
    return integerLength >= 0 ? valueString.length - integerLength : 0;
  }

  private progressStartDrag(value: number): void {
    this.dragProgressStart = true;
    this.handleController(true);
    this.setValue(value);
  }

  private barStartMoving(value: number): void {
    this.scrollViewRange = [
      this.scrollElement.getBoundingClientRect().left + this.originOffsetX,
      this.scrollElement.getBoundingClientRect().right,
    ];
    this.moveBarStart = true;
    this.barMoveStartPageX = value;
    this.barOriginLeft = parseInt(this.ganttBar.nativeElement.style.left, 10);
    this.handleController(true);
    this.barMoveStartEvent.emit(this.getGanttTaskInfo());
  }

  private barLeftStartResizing(value: number): void {
    this.resizeBarLeftStart = true;
    this.barResizeStartPageX = value;
    this.barOriginLeft = parseInt(this.ganttBar.nativeElement.style.left, 10);
    this.barOriginWidth = this.ganttBar.nativeElement.style.width;
    this.handleController(true);
    this.barResizeStartEvent.emit(this.getGanttTaskInfo());
  }

  private barRightStartResizing(value: number): void {
    this.resizeBarRightStart = true;
    this.barResizeStartPageX = value;
    this.barOriginLeft = parseInt(this.ganttBar.nativeElement.style.left, 10);
    this.barOriginWidth = this.ganttBar.nativeElement.style.width;
    this.handleController(true);
    this.barResizeStartEvent.emit(this.getGanttTaskInfo());
  }

  private mouseMoving(value: number): void {
    if (this.dragProgressStart) {
      this.setValue(this.mousePositionToAdaptiveValue(value));
      this.cdr.markForCheck();
    }

    if (this.resizeBarLeftStart) {
      this.mouseMoveOnBar = true;
      const offset = value - this.barResizeStartPageX;
      const finalWidth = parseInt(this.barOriginWidth, 10) - Math.round(offset);

      if (finalWidth < this.MIN_WIDTH) {
        return;
      }

      const timeOffset = Math.round((offset / this.ganttService.getScaleUnitPixel()) * GanttService.DAY_DURATION);
      this.startDate = new Date(this.originStartDate.getTime() + timeOffset);
      this.ganttService.roundDate(this.startDate);
      if (this.endDate < this.startDate) {
        this.startDate = this.endDate;
      }

      const earlyDateTime = this.startDate.getTime() - this.EARLYOFFSET * GanttService.DAY_DURATION;
      if (offset < 0 && earlyDateTime < this.ganttService.scaleStartDate.getTime()) {
        this.ganttService.setScaleConfig({ startDate: new Date(earlyDateTime) });
        this.barOriginLeft = this.EARLYOFFSET * this.ganttService.getScaleUnitPixel() - Math.round(offset);
      }
      const finalLeft = this.barOriginLeft + Math.round(offset);
      this.left = finalLeft;

      this.width = finalWidth;
      this.dispatchGanttBarStatus();
      const info = this.getGanttTaskInfo();
      info.moveOffset = offset;
      this.barResizingEvent.emit(info);
    }

    if (this.resizeBarRightStart) {
      this.mouseMoveOnBar = true;
      const offset = value - this.barResizeStartPageX;
      const finalWidth = parseInt(this.barOriginWidth, 10) + Math.round(offset);

      if (finalWidth < this.MIN_WIDTH) {
        return;
      }

      const timeOffset = Math.round((offset / this.ganttService.getScaleUnitPixel()) * GanttService.DAY_DURATION);
      this.endDate = new Date(this.originEndDate.getTime() + timeOffset);
      this.ganttService.roundDate(this.endDate);
      if (this.endDate < this.startDate) {
        this.endDate = this.startDate;
      }

      const lateDateTime = this.endDate.getTime() + this.EARLYOFFSET * GanttService.DAY_DURATION;
      if (offset > 0 && lateDateTime > this.ganttService.scaleEndDate.getTime()) {
        this.ganttService.setScaleConfig({ endDate: new Date(lateDateTime) });
      }

      this.width = finalWidth;
      this.dispatchGanttBarStatus();
      const info = this.getGanttTaskInfo();
      info.moveOffset = offset;
      this.barResizingEvent.emit(info);
    }

    if (this.moveBarStart) {
      this.checkIsOut(value);
      if (this.movedOut) {
        return;
      }
      this.mouseMoveOnBar = true;
      const offset = value - this.barMoveStartPageX;

      const timeOffset = Math.round((Math.round(offset) / this.ganttService.getScaleUnitPixel()) * GanttService.DAY_DURATION);

      const newStartDate = new Date(this.originStartDate.getTime() + timeOffset);
      this.ganttService.roundDate(newStartDate);
      this.startDate = newStartDate;

      const newEndDate = new Date(this.originEndDate.getTime() + timeOffset);
      this.ganttService.roundDate(newEndDate);
      this.endDate = newEndDate;

      const earlyDateTime = this.startDate.getTime() - this.EARLYOFFSET * GanttService.DAY_DURATION;
      const lateDateTime = this.endDate.getTime() + this.EARLYOFFSET * GanttService.DAY_DURATION;
      if (earlyDateTime < this.ganttService.scaleStartDate.getTime()) {
        this.ganttService.setScaleConfig({ startDate: new Date(earlyDateTime) });
      } else if (lateDateTime > this.ganttService.scaleEndDate.getTime()) {
        this.ganttService.setScaleConfig({ endDate: new Date(lateDateTime) });
      }
      const finalLeft = this.barOriginLeft + Math.round(offset);
      this.left = finalLeft;

      this.dispatchGanttBarStatus();
      const info = this.getGanttTaskInfo();
      info.moveOffset = offset;
      this.barMovingEvent.emit(info);
    }
  }

  private checkIsOut(value) {
    this.outDirection = value - this.barMoveStartPageX > 0 ? 'right' : 'left';
    if (this.outDirection === 'left') {
      this.movedOut = value < this.scrollViewRange[0];
    } else {
      this.movedOut = value > this.scrollViewRange[1];
    }
    if (this.movedOut) {
      this.autoScroll();
    } else if (this.scrollTimer) {
      const left =
        this.outDirection === 'left'
          ? this.scrollElement.scrollLeft + (value - this.scrollElement.getBoundingClientRect().left) - this.originOffsetX
          : this.scrollElement.scrollLeft + this.scrollElement.clientWidth - this.originOffsetX;
      this.setLeft(Math.round(left));
      this.stopAutoScroll();
      this.barMoveStartPageX = value;
    }
  }

  private autoScroll() {
    if (!this.scrollTimer) {
      this.scrollTimer = setInterval(() => {
        this.outDirection === 'left'
          ? (this.scrollElement.scrollLeft -= this.SCROLL_STEP)
          : (this.scrollElement.scrollLeft += this.SCROLL_STEP);
      }, 10);
    }
  }

  private stopAutoScroll() {
    clearInterval(this.scrollTimer);
    this.scrollTimer = null;
  }

  private setLeft(left) {
    const offset = left - this.left;
    const timeOffset = (Math.round(offset) / this.ganttService.getScaleUnitPixel()) * GanttService.DAY_DURATION;

    const newStartDate = new Date(this.startDate.getTime() + timeOffset);
    this.ganttService.roundDate(newStartDate);
    this.startDate = newStartDate;

    const newEndDate = new Date(this.endDate.getTime() + timeOffset);
    this.ganttService.roundDate(newEndDate);
    this.endDate = newEndDate;

    this.originStartDate = this.startDate;
    this.originEndDate = this.endDate;
    this.barOriginLeft = left;
    this.left = left;
  }

  private getGanttTaskInfo(): GanttTaskInfo {
    this.duration = this.ganttService.getDuration(this.startDate, this.endDate) + 'd';
    const progress = this.progressRate + '%';
    const taskInfo = {
      id: this.id,
      startDate: this.startDate,
      endDate: this.endDate,
      duration: this.duration,
      progress: progress,
      left: this.left,
      width: this.width,
    };
    return taskInfo;
  }
  private mouseStopMoving(): void {
    this.mouseMoveOnBar = false;
    this.ganttService.roundDate(this.startDate);
    this.ganttService.roundDate(this.endDate);
    this.originStartDate = this.startDate;
    this.originEndDate = this.endDate;
    const taskInfo = this.getGanttTaskInfo();
    if (this.moveBarStart) {
      const finalLeft = this.ganttService.getDatePostionOffset(this.startDate);
      this.left = finalLeft > 0 ? finalLeft : 0;
      this.barMoveEndEvent.emit(taskInfo);
    }
    if (this.resizeBarLeftStart) {
      const finalLeft = this.ganttService.getDatePostionOffset(this.startDate);
      const finalWidth = this.ganttService.getDurationWidth(this.startDate, this.endDate);
      this.left = finalLeft > 0 ? finalLeft : 0;
      this.width = finalWidth;
      this.barResizeEndEvent.emit(taskInfo);
    }
    if (this.resizeBarRightStart) {
      const finalWidth = this.ganttService.getDurationWidth(this.startDate, this.endDate);
      this.width = finalWidth;
      this.barResizeEndEvent.emit(taskInfo);
    }
    if (this.dragProgressStart) {
      this.barProgressEvent.emit(this.progressRate);
    }
    this.handleController(false);
    this.stopAutoScroll();
    this.cdr.markForCheck();
  }

  private subscribeMouseActions(
    mouseActions: string[] = ['start', 'move', 'end'],
    events: string[] = ['barMove', 'barResize', 'progress']
  ): void {
    if (
      mouseActions.indexOf('start') !== -1 &&
      this.dragProgressStartListener &&
      !this.dragProgressStartHandler &&
      events.indexOf('progress') !== -1
    ) {
      this.dragProgressStartHandler = this.dragProgressStartListener.subscribe(this.progressStartDrag.bind(this));
    }

    if (
      mouseActions.indexOf('start') !== -1 &&
      this.moveBarStartListener &&
      !this.moveBarStartHandler &&
      events.indexOf('barMove') !== -1
    ) {
      this.moveBarStartHandler = this.moveBarStartListener.subscribe(this.barStartMoving.bind(this));
    }

    if (
      mouseActions.indexOf('start') !== -1 &&
      this.resizeBarLeftStartListener &&
      !this.resizeBarLeftStartHandler &&
      events.indexOf('barResize') !== -1
    ) {
      this.resizeBarLeftStartHandler = this.resizeBarLeftStartListener.subscribe(this.barLeftStartResizing.bind(this));
    }

    if (
      mouseActions.indexOf('start') !== -1 &&
      this.resizeBarRightStartListener &&
      !this.resizeBarRightStartHandler &&
      events.indexOf('barResize') !== -1
    ) {
      this.resizeBarRightStartHandler = this.resizeBarRightStartListener.subscribe(this.barRightStartResizing.bind(this));
    }

    if (mouseActions.indexOf('move') !== -1 && this.mouseMoveListener && !this.mouseMoveHandler) {
      this.mouseMoveHandler = this.mouseMoveListener.subscribe(this.mouseMoving.bind(this));
    }

    if (mouseActions.indexOf('end') !== -1 && this.mouseEndListener && !this.mouseEndHandler) {
      this.mouseEndHandler = this.mouseEndListener.subscribe(this.mouseStopMoving.bind(this));
    }
  }

  private unsubscribeMouseActions(
    dragStages: string[] = ['start', 'move', 'end'],
    events: string[] = ['barMove', 'barResize', 'progress']
  ): void {
    if (dragStages.indexOf('start') !== -1 && events.indexOf('progress') !== -1 && this.dragProgressStartHandler) {
      this.dragProgressStartHandler.unsubscribe();
      this.dragProgressStartHandler = null;
    }

    if (dragStages.indexOf('start') !== -1 && events.indexOf('barMove') !== -1 && this.moveBarStartHandler) {
      this.moveBarStartHandler.unsubscribe();
      this.moveBarStartHandler = null;
    }

    if (dragStages.indexOf('start') !== -1 && events.indexOf('barResize') !== -1 && this.resizeBarLeftStartHandler) {
      this.resizeBarLeftStartHandler.unsubscribe();
      this.resizeBarLeftStartHandler = null;
    }

    if (dragStages.indexOf('start') !== -1 && events.indexOf('barResize') !== -1 && this.resizeBarRightStartHandler) {
      this.resizeBarRightStartHandler.unsubscribe();
      this.resizeBarRightStartHandler = null;
    }

    if (dragStages.indexOf('move') !== -1 && this.mouseMoveHandler) {
      this.mouseMoveHandler.unsubscribe();
      this.mouseMoveHandler = null;
    }

    if (dragStages.indexOf('end') !== -1 && this.mouseEndHandler) {
      this.mouseEndHandler.unsubscribe();
      this.mouseEndHandler = null;
    }
  }

  private handleController(movable: boolean): void {
    if (movable) {
      this.focused = this.focusController();
      this.subscribeMouseActions(['move', 'end']);
    } else {
      this.dragProgressStart = false;
      this.moveBarStart = false;
      this.resizeBarLeftStart = false;
      this.resizeBarRightStart = false;
      this.focused = this.focusController();
      this.unsubscribeMouseActions(['move', 'end']);
    }
  }

  private setValue(value: number | null): void {
    if (this.progressRate !== value) {
      this.progressRate = value;
      this.updateTrackAndHandle();
    }
    this.onChangeCallback(this.progressRate);
  }

  private ensureValueInRange(value: number | null): number {
    let safeValue;
    if (!this.valueMustBeValid(value)) {
      safeValue = this.min;
    } else {
      safeValue = this.clamp(this.min, value as number, this.max);
    }
    return safeValue;
  }

  private updateTrackAndHandle(): void {
    const value = this.progressRate;
    const offset = this.valueToOffset(value);
    this.updateStyle(offset / 100);
    this.cdr.markForCheck();
  }

  private valueMustBeValid(value: number): boolean {
    return !isNaN(typeof value !== 'number' ? parseFloat(value) : value);
  }

  private valueToOffset(value: number): number {
    return ((value - this.min) / (this.max - this.min)) * 100;
  }

  private registerHandleHoverPopoverListener() {
    const mouseOverProgressListener = fromEvent(this.ganttBarProgress.nativeElement, 'mouseover');
    const mouseLeaveProgressListener = fromEvent(this.ganttBarProgress.nativeElement, 'mouseout');
    this.mouseOverProgressHandler = mouseOverProgressListener.subscribe(this.ganttProgressPopoverOnMouseHover.bind(this));
    this.mouseLeaveProgressHandler = mouseLeaveProgressListener.subscribe(this.ganttProgressPopoverOnMouseLeave.bind(this));
  }

  ganttBarPopoverOnMouseHover($event) {
    if (this.mouseLeaveTimer) {
      clearTimeout(this.mouseLeaveTimer);
    }
    this.mouseMoveTimer = setTimeout(() => {
      const barLeft = this.ganttBar.nativeElement.getClientRects()[0].left;
      const eventLeft = $event.clientX;
      this.cdkOverlayOffsetX = eventLeft - barLeft;

      this.barHovering = true;
      this.focused = this.focusController();
      this.dispatchGanttBarStatus();
      this.cdr.markForCheck();
    }, this.mouseEventDalay);
  }

  ganttBarPopoverOnMouseLeave() {
    if (this.mouseMoveTimer) {
      clearTimeout(this.mouseMoveTimer);
    }
    this.mouseLeaveTimer = setTimeout(() => {
      this.barHovering = false;
      this.focused = this.focusController();
      this.dispatchGanttBarStatus();
      this.cdr.markForCheck();
    }, this.mouseEventDalay);
  }

  mouseLeaveTip() {
    setTimeout(() => {
      this.tipHovered = false;
    }, this.mouseEventDalay);
  }

  private ganttProgressPopoverOnMouseHover() {
    this.progressHovering = true;
  }

  private ganttProgressPopoverOnMouseLeave() {
    this.progressHovering = false;
  }

  private unregisterHandleHoverTooltip() {
    if (this.mouseOverProgressHandler) {
      this.mouseOverProgressHandler.unsubscribe();
      this.mouseOverProgressHandler = null;
    }

    if (this.mouseLeaveProgressHandler) {
      this.mouseLeaveProgressHandler.unsubscribe();
      this.mouseLeaveProgressHandler = null;
    }
  }

  private clearTimer() {
    if (this.mouseLeaveTimer) {
      clearTimeout(this.mouseLeaveTimer);
    }
    if (this.mouseMoveTimer) {
      clearTimeout(this.mouseMoveTimer);
    }
  }

  private focusController() {
    return this.dragProgressStart || this.moveBarStart || this.resizeBarLeftStart || this.resizeBarRightStart || this.barHovering;
  }

  dispatchGanttBarStatus() {
    const status = {
      focused: this.focused,
      startDate: this.startDate,
      endDate: this.endDate,
    };
    this.ganttService.changeGanttBarStatus(status);
  }

  ngOnDestroy(): void {
    this.clearTimer();
    this.unsubscribeMouseActions();
    this.unregisterHandleHoverTooltip();
    if (this.ganttScaleStatusHandler) {
      this.ganttScaleStatusHandler.unsubscribe();
      this.ganttScaleStatusHandler = null;
    }
  }
}
