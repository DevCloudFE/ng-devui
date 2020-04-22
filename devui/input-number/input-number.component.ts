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
  @Input() decimalLimit;
  @Input() autoFocus = false;
  @Input() allowEmpty = false;
  @Input() placeholder = '';
  @Input() maxLength = 0;
  @Input() reg: RegExp | string;
  @Output() afterValueChanged = new EventEmitter<number>();
  @Output() whileValueChanging = new EventEmitter<number>();
  @ViewChild('incButton', { static: true }) incButton: ElementRef;
  @ViewChild('decButton', { static: true }) decButton: ElementRef;
  @ViewChild('inputElement', { static: true }) inputElement: ElementRef;

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
  constructor(private cdr: ChangeDetectorRef, private el: ElementRef) {
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

  private ensureValueInRange(value: number | null | undefined): number {
    let safeValue;
    if (this.allowEmpty && (value === null || value === undefined)) {
      safeValue = value;
    } else if (!this.valueMustBeValid(value)) {
      safeValue = this.min;
    } else {
      let currentValue = value;
      if (!value) {
        currentValue = 0;
      }
      safeValue = this.clamp(this.min, currentValue, this.max);
    }
    return safeValue;
  }

  private setValue(value: number | null | undefined): void {
    this.value = value;
    this.valueInput = value;
    if (this.disabled) { return; }
    if (this.allowEmpty && (value === null || value === undefined)) {
      this.subscribeDecAction();
      this.subscribeIncAction();
    } else {
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
    }
    this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    this.registerListeners();
    this.subscribeActions();
    this.toggleDisabled(this.disabled);
    this.el.nativeElement.addEventListener('click', this.registerBlurListener.bind(this));
    if (this.autoFocus) {
      this.el.nativeElement.click();
      this.inputElement.nativeElement.focus();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('min') || changes.hasOwnProperty('max')) {
      this.checkRangeValues(this.min, this.max);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeActions();
  }

  registerListeners() {
    if (this.incButton && this.incButton.nativeElement) {
      this.incListener = fromEvent(this.incButton.nativeElement, 'click');
    }
    if (this.decButton && this.decButton.nativeElement) {
      this.decListener = fromEvent(this.decButton.nativeElement, 'click');
    }
  }

  subscribeActions() {
    this.subscribeIncAction();
    this.subscribeDecAction();
  }

  subscribeIncAction() {
    if (this.incListener && !this.incAction) {
      this.incAction = this.incListener.subscribe(this.increaseValue.bind(this));
      this.disabledInc = false;
    }
  }

  subscribeDecAction() {
    if (this.decListener && !this.decAction) {
      this.decAction = this.decListener.subscribe(this.decreaseValue.bind(this));
      this.disabledDec = false;
    }
  }

  unsubscribeActions() {
    this.unsubscribeIncAction();
    this.unsubscribeDecAction();
  }

  unsubscribeIncAction() {
    if (this.incListener && this.incAction) {
      this.incAction.unsubscribe();
      this.incAction = null;
      this.disabledInc = true;
    }
  }

  unsubscribeDecAction() {
    if (this.incListener && this.decAction) {
      this.decAction.unsubscribe();
      this.decAction = null;
      this.disabledDec = true;
    }
  }

  private increaseValue() {
    if (this.canIncrease()) {
      if (this.allowEmpty && (this.value === null || this.value === undefined)) {
        this.updateValue(this.min);
      } else {
        const decimals = this.getMaxDecimals(this.value);
        this.updateValue(parseFloat((this.value + this.step).toFixed(decimals)));
      }
    }
  }

  private decreaseValue() {
    if (this.canDecrease()) {
      if (this.allowEmpty && (this.value === null || this.value === undefined)) {
        this.updateValue(this.min);
      } else {
        const decimals = this.getMaxDecimals(this.value);
        this.updateValue(parseFloat((this.value - this.step).toFixed(decimals)));
      }
    }
  }

  private canIncrease() {
    if (this.allowEmpty && (this.value === null || this.value === undefined)) {
      return (this.min + this.step) <= this.max;
    } else {
      return (this.value + this.step) <= this.max;
    }
  }

  private canDecrease() {
    if (this.allowEmpty && (this.value === null || this.value === undefined)) {
      return (this.min + this.step) <= this.max;
    } else {
      return (this.value - this.step) >= this.min;
    }
  }

  private toggleDisabled(disabled: boolean) {
    if (disabled) {
      this.unsubscribeActions();
    } else {
      this.subscribeActions();
    }
  }

  ensureValueIsValid(event: Event) {
    event.stopPropagation();

    const newValue = event.target['value'];
    const parseValue = parseFloat(newValue as string);
    if (this.allowEmpty && newValue === '') {
      this.updateValue(this.ensureValueInRange(null));
    } else if (!isNaN(parseValue)) {
      this.updateValue(this.ensureValueInRange(parseValue));
    } else {
      this.updateValue(this.ensureValueInRange(this.value));
    }

  }

  private checkRangeValues(minValue, maxValue) {
    if (maxValue < minValue) {
      throw new Error(`max value must be greater than or equal to min value`);
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
    if (this.decimalLimit !== undefined && this.decimalLimit !== null) {
      return this.decimalLimit;
    }
    return Math.max(currentValuePrecision, stepPrecision);
  }

  protectInput(event: KeyboardEvent | ClipboardEvent) {
    let value = event.target['value'];
    let input;
    if (event['charCode']) {
      input = String.fromCharCode(event['charCode']);
    } else {
      input = event['clipboardData'].getData('text');
    }
    const selectionStart = event.target['selectionStart'];
    const selectionEnd = event.target['selectionEnd'];
    value = value.substring(0, selectionStart) + input + value.substring(selectionEnd);
    if (this.maxLength && value.length > this.maxLength) {
      event.preventDefault();
      return;
    }
    if (this.reg && !value.match(new RegExp(this.reg))) {
      event.preventDefault();
      return;
    } else if (
      value === '-' || value.match(/^\s*(-|\+)?\d+\.$/) || value.match(/^\s*(-|\+)?\d+\.[0-9]*0$/) || value.match(/^\s*(-|\+)0+$/)
    ) {
      // indeterminate state
      return;
    } else if (value.match(/^\s*(-|\+)?(\d+|(\d*(\.\d*)))$/)) {
      event.preventDefault();

      if (this.decimalLimit !== undefined && this.decimalLimit !== null) {
        value = parseFloat(value).toFixed(this.decimalLimit);
      }
      value = parseFloat(value as string);
      if (!isNaN(value)) {
        this.valueInput = value;
        this.notifyWhileValueChanging(value);
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
    this.afterValueChanged.emit(this.value);
    this.onChangeCallback(this.value);
  }

  private notifyWhileValueChanging(value) {
    this.whileValueChanging.emit(value);
  }

  private updateValue(value) {
    this.setValue(value);
    if (this.lastEmittedValue !== value) {
      this.lastEmittedValue = value;
      this.notifyValueChange();
    }
  }

  handleBackspace(event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      let oldValue = event.target['value'];
      const selectionStart = event.target['selectionStart'];
      const selectionEnd = event.target['selectionEnd'];
      let newValue = oldValue.substring(0, selectionStart - 1) + oldValue.substring(selectionEnd);
      oldValue = oldValue === '' ? null : this.ensureValueInRange(oldValue);
      newValue = newValue === '' ? null : this.ensureValueInRange(newValue);
      if (oldValue !== newValue && newValue !== '-') {
        this.notifyWhileValueChanging(newValue);
      }
    }
  }

  registerBlurListener() {
    document.addEventListener('click', this.emitBlurEvent.bind(this), {
      capture: true,
      once: true,
    });
  }

  emitBlurEvent(event: MouseEvent) {
    if (this.el.nativeElement !== event.target && !this.el.nativeElement.contains(event.target)) {
      this.el.nativeElement.dispatchEvent(new Event('blur', {
        bubbles: false
      }));
    }
  }
}
