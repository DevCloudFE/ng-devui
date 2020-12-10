import { Directive, OnInit, OnDestroy, Host, HostListener, ElementRef, forwardRef, Renderer2, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TwoDatePickerComponent } from './two-datepicker.component';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[dTwoDatePickerEnd]',
  exportAs: 'twoDatePickerEnd',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TwoDatePickerEndDirective),
    multi: true
  }]
})
export class TwoDatePickerEndDirective implements OnInit, OnDestroy, ControlValueAccessor {

  @Output() selectEnd = new EventEmitter<any>();

  userHtml;
  private switchOriginSub: Subscription;
  private twoDateSub: Subscription;

  private onChange = (_: any) => null;

  constructor(private twoDatePicker: TwoDatePickerComponent, private renderer: Renderer2,
   private el: ElementRef) {
    this.twoDateSub = this.twoDatePicker.selectDateSubject.subscribe(data => {
      if (data.side === 'end') {
        if (this.el.nativeElement.tagName === 'INPUT') {
          this.writeValue(data.date);
        } else {
          this.el.nativeElement.innerHTML = data.date ? this.twoDatePicker.formatDate(data.date) : this.userHtml;
        }
        if (!data.onlyWrite) {
          this.selectEnd.emit(data.date);
          this.onChange(data.date);
        }
      }
    });
    this.switchOriginSub = this.twoDatePicker.switchOriginPositionSub.subscribe(side => {
      if (side === 'end') {
        this.twoDatePicker.changeFormWithDropDown(this.el);
      } else {
        this.twoDatePicker.removeClass(this.el);
      }
    });
  }

  public toggle(event?: MouseEvent) {
    this.twoDatePicker.toggle('end');
  }

  @HostListener('blur', ['$event'])
  onBlur($event) {
    this.transUserInputToDatePicker();
  }

  ngOnInit() {
    this.userHtml = this.el.nativeElement.innerHTML;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    return;
  }

  writeValue(selectedEnd): void {
    selectedEnd = selectedEnd || null;
    const formatEnd = selectedEnd ?
      this.twoDatePicker.dateConverter.format(selectedEnd, this.twoDatePicker.dateFormat, this.twoDatePicker.locale) :
      '';
    this.renderer.setProperty(this.el.nativeElement, 'value', formatEnd);
    this.twoDatePicker.selectEnd(selectedEnd, true);
  }

  clear = () => {
    this.twoDatePicker.clear('end');
  }

  transUserInputToDatePicker() {
    if (!this.twoDatePicker.showTime) {
      const value = this.el.nativeElement.value;
      if (!value && !this.twoDatePicker.rangeEnd) {
        return;
      }
      if (!value) {
        this.clear();
        return;
      }
      const valueDate = new Date(value);
      const valueFormat = this.twoDatePicker.dateConverter.format(valueDate, this.twoDatePicker.dateFormat, this.twoDatePicker.locale);
      if (new Date(valueFormat).getTime() === new Date(this.twoDatePicker.rangeEnd).getTime()) {
        return;
      }
      if (value && value === valueFormat) {
        this.twoDatePicker.selectEnd(valueDate);
        [this.twoDatePicker.rangeStart, this.twoDatePicker.rangeEnd] = this.twoDatePicker.selectedRange;
      }
    } else {
      this.el.nativeElement.value =
       this.twoDatePicker.dateConverter.format(this.twoDatePicker.rangeEnd, this.twoDatePicker.dateFormat, this.twoDatePicker.locale);
    }
  }

  ngOnDestroy() {
    if (this.twoDateSub) {
      this.twoDateSub.unsubscribe();
    }
    if (this.switchOriginSub) {
      this.switchOriginSub.unsubscribe();
    }
  }
}
