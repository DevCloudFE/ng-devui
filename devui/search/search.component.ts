import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, filter, map, takeUntil } from 'rxjs/operators';

const NOOP = (value: string) => {};

@Component({
  selector: 'd-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  exportAs: 'search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchComponent),
      multi: true,
    },
  ],
})
export class SearchComponent implements ControlValueAccessor, OnInit, OnDestroy, AfterViewInit {
  constructor(private ngZone: NgZone, private renderer: Renderer2, private i18n: I18nService, private cdr: ChangeDetectorRef) {}

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
  @Input() disabled = false;
  @Input() cssClass: string;
  @Input() iconPosition = 'right';
  @Input() noBorder = false;
  @Input() autoFocus = false;
  @Output() searchFn = new EventEmitter<string>();
  /** The native `<input class="devui-input" />` element. */
  @ViewChild('filterInput', { static: true }) filterInputElement: ElementRef<HTMLInputElement>;
  @ViewChild('line') lineElement: ElementRef;
  @ViewChild('clearIcon') clearIconElement: ElementRef;
  i18nCommonText: I18nInterface['common'];
  clearIconExit = false;
  width: number;
  private destroy$ = new Subject<void>();
  private onChange = NOOP;
  private onTouch = () => null;

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
    this.i18n
      .langChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.i18nCommonText = data.common;
        this.cdr.markForCheck();
      });
  }

  clearText() {
    this.renderer.setProperty(this.filterInputElement.nativeElement, 'value', '');
    if (this.onChange) {
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

  inputBlur() {
    this.onTouch();
  }

  clickSearch(term) {
    if (!this.disabled) {
      this.searchFn.emit(term);
    }
  }

  registerFilterChange(): void {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(this.filterInputElement.nativeElement, 'input')
        .pipe(
          filter(
            () =>
              // The following condition checks 2 things:
              // 1) if `SearchComponent` acts as a value accessor (`onChange !== NOOP`),
              //    it means that `ngModel` or `formControl` directive is bound. Otherwise,
              //    `registerOnChange` will not be called and `onChange` will not be re-assigned.
              // 2) if `keyupSearch` is truthy and `searchFn` is observed within the parent component
              //    through `(searchFn)="onSearchFn($event)"`
              // We'll skip running change detection if these conditions are not met.
              this.onChange !== NOOP || (this.isKeyupSearch && this.searchFn.observers.length > 0)
          ),
          map((event: KeyboardEvent) => (event.target as HTMLInputElement).value),
          debounceTime(this.delay),
          takeUntil(this.destroy$)
        )
        .subscribe((value) => {
          this.ngZone.run(() => {
            this.onChange(value);
            if (this.isKeyupSearch) {
              this.searchFn.emit(value);
            }
            this.cdr.markForCheck();
          });
        });

      fromEvent(this.filterInputElement.nativeElement, 'keydown')
        .pipe(
          takeUntil(this.destroy$),
          filter((keyEvent: KeyboardEvent) => keyEvent.key === 'Enter' && this.searchFn.observers.length > 0),
          debounceTime(this.delay)
        )
        .subscribe(() => {
          this.ngZone.run(() => {
            this.searchFn.emit(this.filterInputElement.nativeElement.value);
            this.cdr.markForCheck();
          });
        });
    });
  }

  ngAfterViewInit() {
    this.registerFilterChange();
    this.renderClearIcon();
  }

  renderClearIcon() {
    if (this.iconPosition === 'right') {
      if (this.filterInputElement.nativeElement.value && this.lineElement && this.clearIconElement) {
        this.clearIconExit = true;
      } else if (this.lineElement && this.clearIconElement) {
        this.clearIconExit = false;
      }
    } else {
      if (this.filterInputElement.nativeElement.value && this.clearIconElement) {
        this.clearIconExit = true;
      } else if (this.clearIconElement) {
        this.clearIconExit = false;
      }
    }
    this.cdr.markForCheck();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
