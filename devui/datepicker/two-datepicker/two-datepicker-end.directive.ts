import { Directive, OnInit, OnDestroy, Host, HostListener, ElementRef, forwardRef, Renderer2, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TwoDatePickerComponent } from './two-datepicker.component';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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
  private inputSub: Subscription;
  private switchSub: Subscription;
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
        }
      }
    });
    this.switchSub = this.twoDatePicker.switchOpenSub.subscribe(side => {
      if (this.el.nativeElement.tagName === 'INPUT') {
        if (side === 'end') {
          if (!this.el.nativeElement.classList.contains('devui-input-focus')) {
            this.el.nativeElement.classList.add('devui-input-focus');
          }
        } else {
          this.el.nativeElement.classList.remove('devui-input-focus');
        }
      }
    });
    this.inputSub = fromEvent(this.el.nativeElement, 'input')
      .pipe(
        debounceTime(300)
      ).subscribe(event => {
        this.transUserInputToDatePicker(event);
      });
  }

  @HostListener('click', ['$event'])
  public toggleEndPicker(event: MouseEvent) {
    event.stopPropagation();
    this.twoDatePicker.toggle(event, 'end');
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
    if (selectedEnd) {
      this.renderer.setProperty(
        this.el.nativeElement,
        'value',
        this.twoDatePicker.dateConverter.format(selectedEnd, this.twoDatePicker.dateFormat, this.twoDatePicker.locale)
      );
    } else {
      this.renderer.setProperty(this.el.nativeElement, 'value', '');
    }
  }

  clearEnd = () => {
    this.twoDatePicker.selectEnd(null);
  }

  transUserInputToDatePicker(event) {
    if (!this.twoDatePicker.showTime) {
      const value = event.target.value;
      if (!value) {
        this.clearEnd();
        return;
      }
      const valueDate = new Date(value);
      const valueFormat = this.twoDatePicker.dateConverter.format(valueDate, this.twoDatePicker.dateFormat, this.twoDatePicker.locale);
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
    if (this.switchSub) {
      this.switchSub.unsubscribe();
    }
    if (this.inputSub) {
      this.inputSub.unsubscribe();
    }
  }
}
