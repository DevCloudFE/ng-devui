import { ConnectedPosition } from '@angular/cdk/overlay';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AutoCompleteDirective } from 'ng-devui/auto-complete';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { AppendToBodyDirection, AppendToBodyScrollStrategyType, DevConfigService, WithConfig } from 'ng-devui/utils';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'd-editable-select',
  templateUrl: './editable-select.component.html',
  styleUrls: ['./editable-select.component.scss'],
  exportAs: 'editable-select',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditableSelectComponent),
      multi: true,
    },
  ],
  preserveWhitespaces: false,
})
export class EditableSelectComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
  @Input() appendToBody = false;
  @Input() appendToBodyDirections: Array<AppendToBodyDirection | ConnectedPosition> = ['rightDown', 'leftDown', 'rightUp', 'leftUp'];
  @Input() @WithConfig() appendToBodyScrollStrategy: AppendToBodyScrollStrategyType;
  @Input() disabled = false;
  @Input() placeholder = '';
  @Input() source: any[] = [];
  @Input() itemTemplate: TemplateRef<any>;
  @Input() noResultItemTemplate: TemplateRef<any>;
  @Input() maxHeight: number;
  @Input() width: number;
  @Input() disabledKey: string;
  @Input() allowClear = false;
  @Input() enableSelectedValueList = false;
  @Input() enableLazyLoad = false;
  @Input() customViewTemplate: TemplateRef<any>;
  @Input() customViewDirection: 'bottom' | 'right' | 'left' | 'top' = 'bottom';
  @Input() formatter = (item: any) => (item ? item.label || item.toString() : '');
  @Input() valueParser = (item: any) => (item ? item.label || item.toString() : '');
  @Input() searchFn: (term: string) => Observable<any[]>;
  @Input() @WithConfig() showAnimation = true;
  @Input() @WithConfig() styleType = 'default';
  @Input() @WithConfig() showGlowStyle = true;
  @HostBinding('class.devui-glow-style') get hasGlowStyle() {
    return this.showGlowStyle;
  }
  @Output() loadMore = new EventEmitter<any>();
  @Output() toggleChange = new EventEmitter<any>();
  @Output() hoverItem = new EventEmitter<any>();
  @Output() selectItem = new EventEmitter<any>();
  @ViewChild(AutoCompleteDirective, { static: true }) autoCompleteDirective: AutoCompleteDirective;
  @ViewChild('editableSelectBox', { static: true }) editableSelectBox: ElementRef;

  inputValue: any;
  inputValueCache: any;
  multiItems: any[] = [];
  activeIndex = 0;
  i18nCommonText: I18nInterface['common'];
  i18nSubscription: Subscription;
  subscription: Subscription;

  set dropDownOpen(val) {
    this._dropDownOpen = val;
    if (this._dropDownOpen) {
      this.autoCompleteDirective.openPopup(this.activeIndex);
    } else {
      this.autoCompleteDirective.hidePopup();
      this.onTouched();
    }
  }

  get dropDownOpen() {
    return this._dropDownOpen;
  }

  get placeholderContent() {
    return this.valueParser(this.inputValueCache) || this.placeholder;
  }

  private ANIMATION_DELAY = 300;
  private blurTimer: any;
  private _dropDownOpen = false;
  private onChange = (_: any) => null;
  private onTouched = () => null;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.blurTimer) {
      clearTimeout(this.blurTimer);
    }
    this.closeDropdownMenu(event);
  }

  constructor(private cdr: ChangeDetectorRef, private i18n: I18nService, private devConfigService: DevConfigService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.searchFn && typeof this.searchFn === 'function') {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      this.subscription = this.searchFn('').subscribe((source) => {
        this.source = source;
      });
    }
  }

  ngOnInit(): void {
    this.i18nCommonText = this.i18n.getI18nText().common;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nCommonText = data.common;
    });
  }

  ngOnDestroy(): void {
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();
    }
  }

  writeValue(value: any): void {
    this.inputValueCache = this.inputValue = value ?? '';
    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  selectValue(value: any): void {
    this._dropDownOpen = false;
    this.inputValueCache = this.inputValue = value ?? '';
    this.selectItem.emit(this.inputValue);
    this.onChange(this.inputValue);
    this.onTouched();
  }

  valueClear(event: Event): void {
    event.stopPropagation();
    this.inputValueCache = this.inputValue = '';
    this.onChange('');
  }

  onTermChange(value: any): void {
    this.inputValueCache = this.inputValue = value;
    this.onChange(this.inputValue);
  }

  toggle(): void {
    const inputString = this.formatter(this.inputValue) ?? '';
    this.activeIndex = this.enableSelectedValueList
      ? this.autoCompleteDirective.popupRef.instance.activeIndex
      : this.source.map((item) => this.formatter(item).toLowerCase()).indexOf(inputString.toLowerCase());
    this.activeIndex = this.activeIndex > -1 ? this.activeIndex : 0;
    this.dropDownOpen = !this.dropDownOpen;
    if (this.dropDownOpen && !this.enableSelectedValueList) {
      this.autoCompleteDirective.searchValue('', false);
      this.autoCompleteDirective.popupRef.instance.scrollToActive(this.activeIndex);
    }
  }

  loadMoreEvent(event: any): void {
    this.loadMore.emit(event);
  }

  toggleChangeHandler(value: boolean): void {
    this._dropDownOpen = value;
    this.inputValue = !this.enableSelectedValueList && value ? '' : this.inputValueCache;
    this.toggleChange.emit(value);
  }

  onHoverItem(event: any): void {
    this.hoverItem.emit(event);
  }

  closeDropdownMenu(event: FocusEvent | MouseEvent, isBlur = false) {
    if (this.dropDownOpen) {
      const target = isBlur ? event.relatedTarget : event.target;
      const targetEl = target as HTMLElement;
      if (!this.editableSelectBox.nativeElement.contains(targetEl)) {
        this.dropDownOpen = false;
      }
    }
  }

  blurEventHandle(event: FocusEvent) {
    if (this.blurTimer) {
      clearTimeout(this.blurTimer);
    }
    this.blurTimer = setTimeout(() => this.closeDropdownMenu(event, true), this.ANIMATION_DELAY);
  }
}
