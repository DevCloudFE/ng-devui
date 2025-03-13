import { Directive, ElementRef, EventEmitter, forwardRef, HostListener, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { addClassToOrigin, removeClassFromOrigin } from 'ng-devui/utils';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { TwoDatePickerComponent } from './two-datepicker.component';

@Directive({
    selector: '[dTwoDatePickerStart]',
    exportAs: 'twoDatePickerStart',
    providers: [{
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TwoDatePickerStartDirective),
            multi: true
        }],
    standalone: false
})
export class TwoDatePickerStartDirective implements OnInit, OnDestroy, ControlValueAccessor {

  @Output() selectStart = new EventEmitter<any>();

  userHtml;
  private switchOriginSub: Subscription;
  private twoDateSub: Subscription;
  private valueChangeSubscrip: Subscription;

  private onChange = (_: any) => null;

  constructor(private twoDatePicker: TwoDatePickerComponent, private renderer: Renderer2,
              private el: ElementRef) {
    this.twoDateSub = this.twoDatePicker.selectDateSubject.subscribe(data => {
      if (data.side === 'start') {
        if (this.el.nativeElement.tagName === 'INPUT') {
          this.writeValue(data.date);
        } else {
          this.el.nativeElement.innerHTML = data.date ? this.twoDatePicker.formatDate(data.date) : this.userHtml;
        }
        if (!data.onlyWrite) {
          this.selectStart.emit(data.date);
          this.onChange(data.date);
        }
      }
    });
    this.switchOriginSub = this.twoDatePicker.switchOriginPositionSub.subscribe(side => {
      if (side === 'start') {
        addClassToOrigin(this.el);
      } else {
        removeClassFromOrigin(this.el);
      }
    });
  }

  public toggle(event?: MouseEvent) {
    this.twoDatePicker.toggle('start');
  }

  @HostListener('blur', ['$event'])
  onBlur($event) {
    if (!this.validDate(this.el.nativeElement.value)) {
      this.resetValue();
    }
  }

  ngOnInit() {
    this.userHtml = this.el.nativeElement.innerHTML;
    this.initInputChanges();
  }

  initInputChanges(): void {
    this.valueChangeSubscrip = fromEvent(this.el.nativeElement, 'keyup').pipe(
      map((e: any) => e.target.value),
      debounceTime(300)
    ).subscribe(value => {
      this.transUserInputToDatePicker(value);
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    return;
  }

  writeValue(selectedStart): void {
    selectedStart = selectedStart || null;
    const formatStart = selectedStart ?
      this.twoDatePicker.dateConverter.format(selectedStart, this.twoDatePicker.dateFormat, this.twoDatePicker.locale) :
      '';
    this.renderer.setProperty(this.el.nativeElement, 'value', formatStart);
    this.twoDatePicker.selectStart(selectedStart, true);
  }

  clear = () => {
    this.twoDatePicker.clear('start');
  };

  transUserInputToDatePicker(value?: string) {
    if (!this.twoDatePicker.showTime) {
      const _value = value || this.el.nativeElement.value;
      if (!_value && !this.twoDatePicker.rangeStart || !_value) {
        this.clear();
        return;
      }
      const valueDate = new Date(_value);
      if (_value && this.validDate(_value)) {
        this.twoDatePicker.selectStart(valueDate);
        [this.twoDatePicker.rangeStart, this.twoDatePicker.rangeEnd] = this.twoDatePicker.selectedRange;
      }
    } else {
      this.resetValue();
    }
  }

  validDate(value) {
    if (!value) {
      return true;
    }
    const valueDate = new Date(value);
    const valueFormat = valueDate && !isNaN(valueDate.getTime()) &&
      this.twoDatePicker.dateConverter.format(valueDate, this.twoDatePicker.dateFormat, this.twoDatePicker.locale);
    if (
      !valueDate || value !== valueFormat ||
      (value === valueFormat &&
      (valueDate.getTime() < this.twoDatePicker.minDate.getTime() || valueDate.getTime() > this.twoDatePicker.maxDate.getTime()))
    ) {
      return false;
    } else {
      return true;
    }
  }

  resetValue() {
    if (this.twoDatePicker.rangeStart) {
      this.el.nativeElement.value =
       this.twoDatePicker.dateConverter.format(
         this.twoDatePicker.rangeStart,
         this.twoDatePicker.dateFormat,
         this.twoDatePicker.locale
       );
    }
  }

  ngOnDestroy() {
    if (this.twoDateSub) {
      this.twoDateSub.unsubscribe();
    }
    if (this.switchOriginSub) {
      this.switchOriginSub.unsubscribe();
    }
    if (this.valueChangeSubscrip) {
      this.valueChangeSubscrip.unsubscribe();
    }
  }
}
