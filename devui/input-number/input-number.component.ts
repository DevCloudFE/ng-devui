import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, Observable, Subscription } from 'rxjs';

const INPUT_NUMBER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line
  useExisting: forwardRef(() => InputNumberComponent),
  multi: true
};

export type InputSizeType = '' | 'sm' | 'lg';

@Component({
  selector: 'd-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
  providers: [INPUT_NUMBER_CONTROL_VALUE_ACCESSOR]
})

export class InputNumberComponent implements ControlValueAccessor, OnChanges, OnDestroy, AfterViewInit {
  @Input() max = 100;
  @Input() min = 0;
  @Input() step = 1;
  @Input() disabled = false;
  @Input() size: InputSizeType = '';
  @Output() whileValueChanging = new EventEmitter<number>();
  @ViewChild('incButton') incButton: ElementRef;
  @ViewChild('decButton') decButton: ElementRef;

  private value: number;
  private incListener: Observable<any>;
  private decListener: Observable<any>;
  private incAction: Subscription;
  private decAction: Subscription;
  disabledInc = false;
  disabledDec = false;
  valueInput: number;
  lastEmittedValue: number;

  private onTouchedCallback = (v: any) => {
  }

  private onChangeCallback = (v: any) => {
  }

  constructor(private cdr: ChangeDetectorRef) {
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

  writeValue(newValue: any): void {
    this.lastEmittedValue = newValue;
    this.setValue(this.ensureValueInRange(newValue));
  }

  private valueMustBeValid(value: number): boolean {
    return !isNaN(typeof value !== 'number' ? parseFloat(value) : value);
  }

  private clamp(min: number, n: number, max: number) {
    return Math.max(min, Math.min(n, max));
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

  private setValue(value: number | null): void {
    this.value = value;
    this.valueInput = value;
    if (this.disabled) {
      return;
    }
    if (!this.canDecrease()) {
      this.unsubscribeDecAction();
    } else {
      this.subscribeDecAction();
    }
    if (!this.canIncrease()) {
      this.unsubscribeIncAction();
    } else {
      this.subscribeIncAction();
    }
    this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    this.registerListeners();
    this.subscribeActions();
    this.toggleDisabled(this.disabled);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('min') || changes.hasOwnProperty('max')) {
      this.checkRangeValues(this.min, this.max);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeActions();
  }

  private registerListeners() {
    if (this.incButton && this.incButton.nativeElement) {
      this.incListener = fromEvent(this.incButton.nativeElement, 'click');
    }
    if (this.decButton && this.decButton.nativeElement) {
      this.decListener = fromEvent(this.decButton.nativeElement, 'click');
    }
  }

  private subscribeActions() {
    this.subscribeIncAction();
    this.subscribeDecAction();
  }

  private subscribeIncAction() {
    if (this.incListener && !this.incAction) {
      this.incAction = this.incListener.subscribe(this.increaseValue.bind(this));
      this.disabledInc = false;
    }
  }

  private subscribeDecAction() {
    if (this.decListener && !this.decAction) {
      this.decAction = this.decListener.subscribe(this.decreaseValue.bind(this));
      this.disabledDec = false;
    }
  }

  private unsubscribeActions() {
    this.unsubscribeIncAction();
    this.unsubscribeDecAction();
  }

  private unsubscribeIncAction() {
    if (this.incListener && this.incAction) {
      this.incAction.unsubscribe();
      this.incAction = null;
      this.disabledInc = true;
    }
  }

  private unsubscribeDecAction() {
    if (this.incListener && this.decAction) {
      this.decAction.unsubscribe();
      this.decAction = null;
      this.disabledDec = true;
    }
  }

  private increaseValue() {
    if (this.canIncrease()) {
      const decimals = this.getMaxDecimals(this.value);
      this.updateValue(parseFloat((this.value + this.step).toFixed(decimals)));
    }
  }

  private decreaseValue() {
    if (this.canDecrease()) {
      const decimals = this.getMaxDecimals(this.value);
      this.updateValue(parseFloat((this.value - this.step).toFixed(decimals)));
    }
  }

  private canIncrease() {
    return (this.value + this.step) <= this.max;
  }

  private canDecrease() {
    return (this.value - this.step) >= this.min;
  }

  private toggleDisabled(disabled: boolean) {
    if (disabled) {
      this.unsubscribeActions();
    } else {
      this.subscribeActions();
    }
  }

  ensureValueIsValid(event: Event) {
    let newValue = event.target['value'];
    newValue = parseFloat(newValue as string);
    if (!isNaN(newValue)) {
      this.updateValue(this.ensureValueInRange(newValue));
      return;
    }
    this.updateValue(this.ensureValueInRange(this.value));
  }

  private checkRangeValues(minValue, maxValue) {
    if (maxValue <= minValue) {
      throw new Error(`max value must be greater than min value`);
    }
  }

  private getDecimals(value: number): number {
    const valueString = value.toString();
    const integerLength = valueString.indexOf('.') + 1;
    return integerLength >= 0 ? valueString.length - integerLength : 0;
  }

  private getMaxDecimals(currentValue) {
    const stepPrecision = this.getDecimals(this.step);
    const currentValuePrecision = this.getDecimals(currentValue as number);
    if (!currentValue) {
      return stepPrecision;
    }
    return Math.max(currentValuePrecision, stepPrecision);
  }

  protectInput(event: KeyboardEvent) {
    let value = event.target['value'];
    // tslint:disable-next-line
    const input = String.fromCharCode(event.which);
    const selectionStart = event.target['selectionStart'];
    const selectionEnd = event.target['selectionEnd'];
    value = value.substring(0, selectionStart) + input + value.substring(selectionEnd);
    if (value === '-' || value.match(/^\s*(-|\+)?\d+\.$/) || value.match(/^\s*(-|\+)?\d+\.[0-9]*0$/)) {
      // indeterminate state
      return;
    } else if (value.match(/^\s*(-|\+)?(\d+|(\d*(\.\d*)))$/)) {
      event.preventDefault();
      value = parseFloat(value as string);
      if (!isNaN(value)) {
        this.valueInput = value;
        this.notifyValueWhileInput(value);
        // updateValue会使输入游标跳到最后，这里设置输入游标归位
        setTimeout(() => {
          event.target['setSelectionRange'](selectionStart + 1, selectionStart + 1);
        }, 0);
        return;
      }
    } else {
      event.preventDefault();
    }
  }

  private notifyValueChange() {
    this.onChangeCallback(this.value);
  }

  private notifyValueWhileInput(value) {
    this.whileValueChanging.emit(value);
  }

  private updateValue(value) {
    this.setValue(value);
    if (this.lastEmittedValue !== value) {
      this.lastEmittedValue = value;
      this.notifyValueChange();
    }
  }

  handleBackspace($event: KeyboardEvent) {
    if ($event.key === 'Backspace') {
      setTimeout(() => {
        this.notifyValueWhileInput(this.valueInput);
      }, 0);
    }
  }
}

