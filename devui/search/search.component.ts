import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { DevConfigService, WithConfig } from 'ng-devui/utils';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { debounceTime, filter, map, takeUntil } from 'rxjs/operators';

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
    standalone: false
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
  @Input() disabled = false;
  @Input() cssClass: string;
  @Input() iconPosition = 'right';
  @Input() noBorder = false;
  @Input() autoFocus = false;
  @Input() @WithConfig() styleType = 'default';
  @Input() @WithConfig() showGlowStyle = true;
  @HostBinding('class.devui-glow-style') get hasGlowStyle () {
    return this.showGlowStyle;
  };
  @Output() searchFn = new EventEmitter<string>();
  @ViewChild('filterInput', { static: true }) filterInputElement: ElementRef;
  @ViewChild('line') lineElement: ElementRef;
  @ViewChild('clearIcon') clearIconElement: ElementRef;
  i18nCommonText: I18nInterface['common'];
  i18nSubscription: Subscription;
  clearIconExit = false;
  width: number;
  destroy$ = new Subject();
  private onChange = (_: any) => null;
  private onTouch = () => null;

  constructor(
    private renderer: Renderer2,
    private i18n: I18nService,
    private cdr: ChangeDetectorRef,
    private el: ElementRef,
    private devConfigService: DevConfigService
  ) {}

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
    this.i18nSubscription = this.i18n
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

  registerFilterChange() {
    fromEvent(this.filterInputElement.nativeElement, 'input')
      .pipe(
        takeUntil(this.destroy$),
        map((e: any) => e.target.value),
        debounceTime(this.delay)
      )
      .subscribe((value) => {
        this.onChange(value);
        if (this.isKeyupSearch) {
          this.searchFn.emit(value);
        }
      });

    fromEvent(this.filterInputElement.nativeElement, 'keydown')
      .pipe(
        takeUntil(this.destroy$),
        filter((keyEvent: KeyboardEvent) => keyEvent.key === 'Enter'),
        debounceTime(this.delay)
      )
      .subscribe((keyEvent) => {
        this.searchFn.emit(this.filterInputElement.nativeElement.value);
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
    this.destroy$.next(true);
  }
}
