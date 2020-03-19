import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, map, pluck, takeUntil, tap } from 'rxjs/operators';

const SLIDER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line
  useExisting: forwardRef(() => SliderComponent),
  multi: true
};

@Component({
  selector: 'd-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  providers: [SLIDER_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SliderComponent implements OnInit, OnChanges, ControlValueAccessor, OnDestroy, AfterViewInit {
  constructor(private cdr: ChangeDetectorRef) {
  }
  private dragStartListener: Observable<number>;
  private dragMoveListener: Observable<number>;
  private dragEndListener: Observable<Event>;
  private dragStartHandler: Subscription | null;
  private dragMoveHandler: Subscription | null;
  private dragEndHandler: Subscription | null;
  private isDragging = false;
  private isHovering = false;
  public value;
  public showValuePopover = false;
  private mouseOverHandler: Subscription;
  private mouseLeaveHandler: Subscription;

  @ViewChild('slider', { static: true }) slider: ElementRef;
  @ViewChild('sliderHandle', { static: true }) sliderHandle: ElementRef;
  @ViewChild('sliderTrack', { static: true }) sliderTrack: ElementRef;
  @ViewChild('sliderRail', { static: true }) sliderRail: ElementRef;
  @Input() max = 100;
  @Input() min = 0;
  @Input() step = 1;
  @Input() disabled = false;
  @Input() tipsRenderer: (value: number) => string = (value) => `${value}`;

  ngOnInit() {
    this.checkRangeValues(this.min, this.max);
    this.checkStepValue();
    this.toggleDisabled(this.disabled);
    if (this.value === null) {
      this.setValue(this.ensureValueInRange(null));
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('min') || changes.hasOwnProperty('max') || changes.hasOwnProperty('step')) {
      this.checkRangeValues(this.min, this.max);
      this.checkStepValue();
    }
  }

  ngAfterViewInit() {
    this.registerMouseEventsListeners();
    this.registerHandleHoverPopoverListener();
    this.toggleDisabled(this.disabled);
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.toggleDisabled(isDisabled);
  }

  writeValue(newValue: number): void {
    this.setValue(this.ensureValueInRange(newValue));
  }

  private onTouchedCallback = (v: any) => {
  }

  private onChangeCallback = (v: any) => {
  }

  private checkRangeValues(minValue, maxValue) {
    if (maxValue <= minValue) {
      throw new Error(`max value must be greater than min value`);
    }
  }

  private checkStepValue() {
    if (this.step < 0 || !!!this.step) {
      throw new Error('step value must be greater than 0.');
    } else if ((this.max - this.min) % this.step) {
      throw new Error('(max - min) must be divisible by step.');
    }
  }

  private ratioToValue(
    ratio: number,
    min: number,
    max: number,
    step: number
  ): number {
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
    percentage = Math.min(1, Math.max(0, percentage));
    this.sliderTrack.nativeElement.style.width = `${percentage * 100}%`;
    this.sliderHandle.nativeElement.style.left = `${percentage * 100}%`;
  }

  private registerMouseEventsListeners(): void {
    this.dragStartListener = fromEvent(this.slider.nativeElement, 'mousedown').pipe(
      tap((e: Event) => {
        e.stopPropagation();
        e.preventDefault();
      }),
      pluck<Event, number>('pageX'),
      map((position: number) => this.mousePositionToAdaptiveValue(position))
    );
    this.dragEndListener = fromEvent(document, 'mouseup');
    this.dragMoveListener = fromEvent(document, 'mousemove').pipe(
      tap((e: Event) => {
        e.stopPropagation();
        e.preventDefault();
      }),
      pluck<Event, number>('pageX'),
      distinctUntilChanged(),
      map((position: number) => this.mousePositionToAdaptiveValue(position)),
      distinctUntilChanged(),
      takeUntil(this.dragEndListener)
    );
  }

  private getSliderPagePosition(): number {
    const rect = this.slider.nativeElement.getBoundingClientRect();
    const window = this.slider.nativeElement.ownerDocument.defaultView;
    return rect.left + window.pageXOffset;
  }

  private getRailLength(): number {
    return this.sliderRail.nativeElement.clientWidth;
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

  private mouseStartMoving(value: number): void {
    this.handleController(true);
    this.setValue(value);
  }

  private mouseMoving(value: number): void {
    this.setValue(value);
    this.cdr.markForCheck();
  }

  private mouseStopMoving(): void {
    this.handleController(false);
    this.cdr.markForCheck();
  }

  private subscribeMouseActions(mouseActions: string[] = ['start', 'move', 'end']): void {
    if (mouseActions.indexOf('start') !== -1 && this.dragStartListener && !this.dragStartHandler) {
      this.dragStartHandler = this.dragStartListener.subscribe(this.mouseStartMoving.bind(this));
    }

    if (mouseActions.indexOf('move') !== -1 && this.dragMoveListener && !this.dragMoveHandler) {
      this.dragMoveHandler = this.dragMoveListener.subscribe(this.mouseMoving.bind(this));
    }

    if (mouseActions.indexOf('end') !== -1 && this.dragEndListener && !this.dragEndHandler) {
      this.dragEndHandler = this.dragEndListener.subscribe(this.mouseStopMoving.bind(this));
    }
  }

  private unsubscribeMouseActions(dragStages: string[] = ['start', 'move', 'end']): void {
    if (dragStages.indexOf('start') !== -1 && this.dragStartHandler) {
      this.dragStartHandler.unsubscribe();
      this.dragStartHandler = null;
    }

    if (dragStages.indexOf('move') !== -1 && this.dragMoveHandler) {
      this.dragMoveHandler.unsubscribe();
      this.dragMoveHandler = null;
    }

    if (dragStages.indexOf('end') !== -1 && this.dragEndHandler) {
      this.dragEndHandler.unsubscribe();
      this.dragEndHandler = null;
    }
  }

  private handleController(movable: boolean): void {
    if (movable) {
      this.isDragging = true;
      this.showValuePopover = this.showValuePopoverController();
      this.subscribeMouseActions(['move', 'end']);
    } else {
      this.isDragging = false;
      this.showValuePopover = this.showValuePopoverController();
      this.unsubscribeMouseActions(['move', 'end']);
    }
  }

  private toggleDisabled(disabled: boolean): void {
    if (disabled) {
      this.unsubscribeMouseActions();
    } else {
      this.subscribeMouseActions(['start']);
    }
  }

  private setValue(value: number | null): void {
    if (!(this.value === value)) {
      this.value = value;
      this.updateTrackAndHandle();
    }
    this.onChangeCallback(this.value);
  }

  private ensureValueInRange(value: number | null): number {
    let safeValue = value;
    if (!this.valueMustBeValid(value)) {
      safeValue = this.min;
    } else {
      safeValue = this.clamp(this.min, value as number, this.max);
    }
    return safeValue;
  }

  private updateTrackAndHandle(): void {
    const value = this.value;
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
    const mouseOverListener = fromEvent(this.sliderHandle.nativeElement, 'mouseover');
    const mouseLeaveListener = fromEvent(this.sliderHandle.nativeElement, 'mouseout');
    this.mouseOverHandler = mouseOverListener.subscribe(this.sliderHandlePopoverOnMouseHover.bind(this));
    this.mouseLeaveHandler = mouseLeaveListener.subscribe(this.sliderHandlePopoverOnMouseLeave.bind(this));
  }

  private sliderHandlePopoverOnMouseHover() {
    this.isHovering = true;
    this.showValuePopover = this.showValuePopoverController();
    this.cdr.markForCheck();
  }

  private sliderHandlePopoverOnMouseLeave() {
    this.isHovering = false;
    this.showValuePopover = this.showValuePopoverController();
    this.cdr.markForCheck();
  }

  private unregisterHandleHoverTooltip() {
    this.mouseOverHandler.unsubscribe();
    this.mouseLeaveHandler.unsubscribe();
  }

  private showValuePopoverController() {
    return this.isDragging || this.isHovering;
  }

  ngOnDestroy(): void {
    this.unsubscribeMouseActions();
    this.unregisterHandleHoverTooltip();
  }
}
