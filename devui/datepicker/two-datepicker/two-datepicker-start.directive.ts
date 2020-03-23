import { Directive, OnInit, OnDestroy, Host, HostListener, ElementRef, forwardRef, Renderer2, EventEmitter, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TwoDatePickerComponent } from './two-datepicker.component';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[dTwoDatePickerStart]',
  exportAs: 'twoDatePickerStart',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TwoDatePickerStartDirective),
    multi: true
  }]
})
export class TwoDatePickerStartDirective implements OnInit, OnDestroy, ControlValueAccessor {

  @Output() selectStart = new EventEmitter<any>();

  userHtml;
  private inputSub: Subscription;
  private switchSub: Subscription;
  private twoDateSub: Subscription;

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
        }
      }
    });
    this.switchSub = this.twoDatePicker.switchOpenSub.subscribe(side => {
      if (this.el.nativeElement.tagName === 'INPUT') {
        if (side === 'start') {
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
  public toggleStartPicker(event: MouseEvent) {
    event.stopPropagation();
    this.twoDatePicker.toggle(event, 'start');
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

  writeValue(selectedStart): void {
    if (selectedStart) {
      this.renderer.setProperty(
        this.el.nativeElement,
        'value',
        this.twoDatePicker.dateConverter.format(selectedStart, this.twoDatePicker.dateFormat, this.twoDatePicker.locale)
      );
    } else {
      this.renderer.setProperty(this.el.nativeElement, 'value', '');
    }
  }

  transUserInputToDatePicker(event) {
    if (!this.twoDatePicker.showTime) {
      const value = event.target.value;
      const valueDate = new Date(value);
      const valueFormat = this.twoDatePicker.dateConverter.format(valueDate, this.twoDatePicker.dateFormat, this.twoDatePicker.locale);
      if (value && value === valueFormat) {
        this.twoDatePicker.selectStart(valueDate);
        [this.twoDatePicker.rangeStart, this.twoDatePicker.rangeEnd] = this.twoDatePicker.selectedRange;
      }
    } else {
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
    if (this.switchSub) {
      this.switchSub.unsubscribe();
    }
    if (this.inputSub) {
      this.inputSub.unsubscribe();
    }
  }
}
