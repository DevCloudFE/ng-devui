import { fromEvent, Subscription  } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, Input, Output, forwardRef, AfterViewInit,
   EventEmitter, ViewChild, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { map , filter, debounceTime } from 'rxjs/operators';
import { I18nService, I18nInterface } from 'ng-devui/i18n';

@Component({
  selector: 'd-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  exportAs: 'search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SearchComponent),
    multi: true
  }]
})
export class SearchComponent implements ControlValueAccessor, OnInit, OnDestroy, AfterViewInit {
  /**
   * 【可选】下拉选框尺寸
   */
  @Input() size: '' | 'sm' | 'lg';
  /**
   * 【可选】下拉默认显示文字
   */
  @Input() placeholder: string;
  @Input() maxLength = Number.MAX_SAFE_INTEGER;
  @Input() isKeyupSearch = false;
  @Input() delay = 300;
  @Output() searchFn = new EventEmitter<string>();
  @ViewChild('filterInput', { static: true }) filterInputElement: ElementRef;
  @ViewChild('line', { static: true }) lineElement: ElementRef;
  @ViewChild('clearIcon', { static: true }) clearIconElement: ElementRef;
  i18nCommonText: I18nInterface['common'];
  i18nSubscription: Subscription;
  private subscription: Subscription;
  private onChange = (_: any) => null;
  private onTouch = () => null;

  constructor(private renderer: Renderer2, private i18n: I18nService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.setI18nText();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: any = ''): void {
    this.renderer.setProperty(this.filterInputElement.nativeElement, 'value', value);
    this.renderClearIcon();
  }

  setI18nText() {
    this.i18nCommonText = this.i18n.getI18nText().common;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nCommonText = data.common;
      this.cdr.markForCheck();
    });
  }

  clearText() {
    this.renderer.setProperty(this.filterInputElement.nativeElement, 'value', '');
    if ( this.onChange) {
        this.onChange('');
    }
    this.searchFn.emit('');
    this.filterInputElement.nativeElement.focus();
    this.renderClearIcon();
  }

  inputChange(value, event?) {
    this.renderClearIcon();
    // 此函数不能删除，需要给filterInput.value赋值，从而控制clear的显隐。因为registerFilterChange对clear的显隐控制不起作用。
  }

  keyupEnter(term) {
    this.searchFn.emit(term);
  }

  registerFilterChange() {
    this.subscription = fromEvent(this.filterInputElement.nativeElement, 'input')
     .pipe(
      map((e: any) => e.target.value),
      filter(term => true),
      debounceTime(this.delay)
     ).subscribe(value => {
        this.onChange(value);
        if (this.isKeyupSearch) {
          this.searchFn.emit(value);
        }
      });
  }

  ngAfterViewInit() {
    this.registerFilterChange();
    this.renderClearIcon();
  }

  renderClearIcon() {
    if (this.filterInputElement.nativeElement.value && this.lineElement && this.clearIconElement) {
      this.renderer.setStyle(this.lineElement.nativeElement, 'display', 'block');
      this.renderer.setStyle(this.clearIconElement.nativeElement, 'display', 'block');
    } else if (this.lineElement && this.clearIconElement) {
      this.renderer.setStyle(this.lineElement.nativeElement, 'display', 'none');
      this.renderer.setStyle(this.clearIconElement.nativeElement, 'display', 'none');
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();
    }
  }

}
