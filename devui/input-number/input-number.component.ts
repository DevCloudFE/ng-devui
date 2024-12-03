import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DevConfigService, WithConfig } from 'ng-devui/utils';
import { fromEvent, Observable, Subscription } from 'rxjs';

const INPUT_NUMBER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputNumberComponent),
  multi: true,
};

export type InputSizeType = '' | 'sm' | 'lg';

@Component({
  selector: 'd-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
  providers: [INPUT_NUMBER_CONTROL_VALUE_ACCESSOR],
  preserveWhitespaces: false,
})
export class InputNumberComponent implements ControlValueAccessor, OnChanges, OnDestroy, AfterViewInit {
  @Input() step = 1;
  @Input() disabled = false;
  @Input() size: InputSizeType = '';
  @Input() decimalLimit;
  @Input() autoFocus = false;
  @Input() allowEmpty = false;
  @Input() placeholder = '';
  @Input() maxLength = 0;
  @Input() reg: RegExp | string;
  @Input() @WithConfig() styleType = 'default';
  @Input() @WithConfig() showGlowStyle = true;
  @HostBinding('class.devui-glow-style') get hasGlowStyle() {
    return this.showGlowStyle;
  }
  @Output() afterValueChanged = new EventEmitter<number>();
  @Output() whileValueChanging = new EventEmitter<number>();
  @ViewChild('incButton', { static: true }) incButton: ElementRef;
  @ViewChild('decButton', { static: true }) decButton: ElementRef;
  @ViewChild('inputElement', { static: true }) inputElement: ElementRef;

  private value: number;
  private _min: number = Number.MIN_SAFE_INTEGER;
  private _max: number = Number.MAX_SAFE_INTEGER;
  private incListener: Observable<any>;
  private decListener: Observable<any>;
  private incAction: Subscription;
  private decAction: Subscription;
  disabledInc = false;
  disabledDec = false;
  lastEmittedValue: number;
  lastValue: number;
  document: Document;

  @Input() set min(val) {
    if (val || val === 0) {
      this._min = val;
    }
  }
  get min() {
    return this._min;
  }

  @Input() set max(val) {
    if (val || val === 0) {
      this._max = val;
    }
  }
  get max() {
    return this._max;
  }

  private onTouchedCallback = () => {};

  private onChangeCallback = (v: any) => {};

  constructor(
    private cdr: ChangeDetectorRef,
    private devConfigService: DevConfigService,
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private doc: any
  ) {
    this.document = this.doc;
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
    // 兼容writeValue时的undefined
    let currentValue = max !== undefined ? Math.min(n, max) : n;
    currentValue = min !== undefined ? Math.max(min, currentValue) : currentValue;
    return currentValue;
  }

  private ensureValueInRange(value: number | null | undefined): number {
    let safeValue;
    if (this.allowEmpty && (value === null || value === undefined)) {
      safeValue = null;
    } else if (!this.valueMustBeValid(value)) {
      safeValue = 0;
    } else {
      let currentValue = value;
      if (!value) {
        currentValue = 0;
      }
      safeValue = this.clamp(this.min, currentValue, this.max);
    }
    return safeValue;
  }

  private setValue(value: number | null): void {
    this.value = value;
    this.lastValue = value;
    if (this.allowEmpty && value === null) {
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
    this.renderer.setProperty(this.inputElement.nativeElement, 'value', value);
    this.disabledDec = this.value === this.min;
    this.disabledInc = this.value === this.max;
    this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    this.registerListeners();
    this.subscribeActions();
    setTimeout(() => {
      this.toggleDisabled(this.disabled);
      if (!this.disabled) {
        if (this.autoFocus) {
          this.el.nativeElement.click();
          this.inputElement.nativeElement.focus();
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (Object.prototype.hasOwnProperty.call(changes, 'min') || Object.prototype.hasOwnProperty.call(changes, 'max')) {
      this.checkRangeValues(this.min, this.max);
      if (this.value < this.min) {
        this.setValue(this.min);
      } else if (this.value > this.max) {
        this.setValue(this.max);
      }
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
      this.incAction = this.incListener.subscribe(this.increaseValue);
    }
  }

  subscribeDecAction() {
    if (this.decListener && !this.decAction) {
      this.decAction = this.decListener.subscribe(this.decreaseValue);
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

  private increaseValue = () => {
    this.inDecreaseValue('increase');
  };

  private decreaseValue = () => {
    this.inDecreaseValue('decrease');
  };

  private inDecreaseValue(type: string) {
    const canContinue = type === 'increase' ? this.canIncrease() : this.canDecrease();
    if (canContinue) {
      if (this.allowEmpty && (this.value === null || this.value === undefined)) {
        this.updateValue(0);
      } else {
        const decimals = this.getMaxDecimals(this.value);
        const floatValue = type === 'increase' ? this.value + this.step : this.value - this.step;
        if (this.matchReg(String(floatValue))) {
          let value;
          if (floatValue < 0) {
            value = Math.ceil(floatValue * Number(`1e+${decimals}`) - Number('1e-12')) / Number(`1e+${decimals}`);
          } else {
            value = Math.floor(floatValue * Number(`1e+${decimals}`) + Number('1e-12')) / Number(`1e+${decimals}`);
          }
          this.updateValue(value);
        }
      }
      this.inputElement.nativeElement.focus();
    }
  }

  private matchReg(value) {
    if (this.reg && !value.match(new RegExp(this.reg))) {
      return false;
    } else {
      return true;
    }
  }

  private canIncrease() {
    if (this.allowEmpty && (this.value === null || this.value === undefined)) {
      return this.min + this.step <= this.max;
    } else {
      return this.value + this.step <= this.max;
    }
  }

  private canDecrease() {
    if (this.allowEmpty && (this.value === null || this.value === undefined)) {
      return this.min + this.step <= this.max;
    } else {
      return this.value - this.step >= this.min;
    }
  }

  private toggleDisabled(disabled: boolean) {
    if (disabled) {
      this.unsubscribeActions();
    } else {
      this.disabledDec = this.value === this.min;
      this.disabledInc = this.value === this.max;
      this.subscribeActions();
    }
  }

  ensureValueIsValid(event: Event) {
    event.stopPropagation();
    if (this.disabled) {
      return;
    }
    const newValue = (event.target as any).value;
    const parseValue = parseFloat(newValue as string);
    let result;
    if (this.allowEmpty && newValue === '') {
      result = null;
    } else if (!isNaN(parseValue)) {
      result = parseValue;
    } else {
      result = this.value;
    }
    result = this.ensureValueInRange(result);
    this.notifyWhileValueChanging(result);
    this.updateValue(result);
    const blurEvent = new Event('blur', { bubbles: false, cancelable: true });
    this.el.nativeElement.dispatchEvent(blurEvent);
    this.onTouchedCallback();
  }

  private checkRangeValues(minValue, maxValue) {
    if (maxValue < minValue) {
      throw new Error(`max value must be greater than or equal to min value`);
    }
  }

  private getDecimals(value: number): number {
    const valueString = value.toString();
    const integerLength = valueString.indexOf('.') + 1;
    return valueString.length - integerLength;
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

  handleKeyDown(event: KeyboardEvent) {
    this.handleBackspace(event);
    this.keyBoardControl(event);
  }

  protectInput(event: Event) {
    if (this.disabled) {
      return;
    }
    const target: any = event.target;
    let value = target.value;
    let input;
    let selectionStart = target.selectionStart;
    let selectionEnd = target.selectionEnd;
    if ((event as any).clipboardData) {
      input = (event as any).clipboardData.getData('text');
      value = value.substring(0, selectionStart) + input + value.substring(selectionEnd);
      event.preventDefault();
    } else {
      input = (event as any).data;
      if (input === undefined || input === null) {
        return;
      }
      selectionStart = selectionStart - input.length;
      selectionEnd = selectionEnd - input.length;
    }
    if (this.maxLength && value.length > this.maxLength) {
      this.setValue(this.lastValue);
      return;
    }
    if (!this.matchReg(value)) {
      this.setValue(this.lastValue);
      return;
    } else if (
      value === '-' ||
      value.match(/^\s*(-|\+)?\d+\.$/) ||
      value.match(/^\s*(-|\+)?\d+\.[0-9]*0$/) ||
      value.match(/^\s*(-|\+)0+$/)
    ) {
      // indeterminate state
      return;
    } else if (value.match(/^\s*(-|\+)?(\d+|(\d*(\.\d*)))$/)) {
      if (this.decimalLimit !== undefined && this.decimalLimit !== null) {
        if (value < 0) {
          value = Math.ceil(value * Number(`1e+${this.decimalLimit}`) - Number('1e-12')) / Number(`1e+${this.decimalLimit}`);
        } else {
          value = Math.floor(value * Number(`1e+${this.decimalLimit}`) + Number('1e-12')) / Number(`1e+${this.decimalLimit}`);
        }
      }
      value = parseFloat(value as string);
      if (!isNaN(value)) {
        this.setValue(value);
        this.notifyWhileValueChanging(value);
        // updateValue会使输入游标跳到最后，这里设置输入游标归位
        if (input !== null) {
          setTimeout(() => {
            target.setSelectionRange(selectionStart + input.length, selectionStart + input.length);
          }, 0);
        }
        return;
      }
    } else {
      this.setValue(value.slice(0, value.length - 1));
      setTimeout(() => {
        target.setSelectionRange(selectionStart, selectionStart);
      }, 0);
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
    if (this.disabled) {
      return;
    }
    this.setValue(value);
    if (this.lastEmittedValue !== value) {
      this.lastEmittedValue = value;
      this.notifyValueChange();
    }
  }

  handleBackspace(event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      const target: any = event.target;
      const oldValue = target.value;
      const selectionStart = target.selectionStart;
      const selectionEnd = target.selectionEnd;
      let newValue = oldValue.substring(0, selectionStart - 1) + oldValue.substring(selectionEnd);
      if (newValue !== '-' && !newValue.match(/^\s*(-|\+)?\d+\.$/)) {
        newValue = newValue === '' ? null : newValue;
        this.notifyWhileValueChanging(newValue);
      }
    }
  }

  keyBoardControl(event: KeyboardEvent) {
    const key = event.key;
    if (key === 'ArrowUp' || key === 'Up') {
      event.preventDefault();
      this.increaseValue();
    } else if (key === 'ArrowDown' || key === 'Down') {
      event.preventDefault();
      this.decreaseValue();
    } else if (key === 'Enter') {
      this.inputElement.nativeElement.blur();
    }
  }
}
