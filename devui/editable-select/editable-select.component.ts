import { ConnectedPosition } from '@angular/cdk/overlay';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
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
import { AppendToBodyDirection, DevConfigService, WithConfig } from 'ng-devui/utils';
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
  @Input() disabled = false;
  @Input() placeholder = '';
  @Input() source: any[] = [];
  @Input() itemTemplate: TemplateRef<any>;
  @Input() noResultItemTemplate: TemplateRef<any>;
  @Input() maxHeight: number;
  @Input() width: number;
  @Input() disabledKey: string;
  @Input() allowClear = false;
  @Input() enableLazyLoad = false;
  @Input() customViewTemplate: TemplateRef<any>;
  @Input() customViewDirection: 'bottom' | 'right' | 'left' | 'top' = 'bottom';
  @Input() formatter = (item: any) => (item ? item.label || item.toString() : '');
  @Input() valueParser = (item) => item;
  @Input() searchFn: (term: string) => Observable<any[]>;
  @Input() @WithConfig() showAnimation = true;
  @Output() loadMore = new EventEmitter<any>();
  @Output() toggleChange = new EventEmitter<any>();
  @Output() hoverItem: EventEmitter<any> = new EventEmitter();
  @ViewChild(AutoCompleteDirective, { static: true }) autoCompleteDirective: AutoCompleteDirective;
  @ViewChild('editableSelectBox', { static: true }) editableSelectBox: ElementRef;

  multiItems: any[] = [];
  inputValue: any;
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

  private _dropDownOpen = false;
  private onChange = (_: any) => null;
  private onTouched = () => null;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.dropDownOpen) {
      return;
    }

    const targetEl = event.target as HTMLElement;
    if (!this.editableSelectBox.nativeElement.contains(targetEl)) {
      this.dropDownOpen = false;
    }
  }

  constructor(private cdr: ChangeDetectorRef, private i18n: I18nService, private devConfigService: DevConfigService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['searchFn'] && typeof this.searchFn === 'function') {
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

  writeValue(obj: any): void {
    this.inputValue = obj || '';
    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  selectValue(): void {
    this.dropDownOpen = false;
  }

  valueClear(event: Event): void {
    event.stopPropagation();
    this.inputValue = '';
    this.onChange(this.inputValue);
  }

  onTermChange(value: any): void {
    this.inputValue = value;
    this.onChange(this.inputValue);
  }

  toggle(): void {
    const inputString = this.formatter(this.inputValue);
    this.activeIndex = this.source.map((item) => this.formatter(item).toLowerCase()).indexOf(inputString.toLowerCase());
    this.activeIndex = this.activeIndex > -1 ? this.activeIndex : 0;
    this.dropDownOpen = !this.dropDownOpen;
  }

  loadMoreEvent(event: any): void {
    this.loadMore.emit(event);
  }

  toggleChangeHandler(value: boolean): void {
    this.toggleChange.emit(value);
  }

  onHoverItem(event: any): void {
    this.hoverItem.emit(event);
  }
}
