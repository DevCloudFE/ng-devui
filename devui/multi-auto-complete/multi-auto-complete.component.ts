import {
  Component,
  Input,
  Output,
  TemplateRef,
  ElementRef,
  EventEmitter,
  ComponentRef,
  ViewChild,
  ChangeDetectorRef,
  forwardRef,
  SimpleChanges,
  OnChanges,
  OnInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { of, Observable } from 'rxjs';
import { AutoCompletePopupComponent, AutoCompleteDirective } from 'ng-devui/auto-complete';

@Component({
  selector: 'd-multi-auto-complete',
  templateUrl: './multi-auto-complete.component.html',
  styleUrls: ['multi-auto-complete.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiAutoCompleteComponent),
    multi: true
  }]
})
export class MultiAutoCompleteComponent implements OnInit, OnChanges, ControlValueAccessor {
  static ID_SEED = 0;
  @Input() cssClass: string;
  /*
  overview: border none multiline single
  */
  @Input() overview = 'border';
  @Input() tipsText: string; // 提示文字
  @Input() placeholder = '请输入关键字'; // placeholder
  @Input() disabled = false;
  @Input() source: any[];
  @Input() latestSource: any[]; // 最近输入
  // @Input() isOpen: boolean;   // 未使用
  // @Input() term: string; // 未使用
  @Input() itemTemplate: TemplateRef<any>;
  @Input() noResultItemTemplate: TemplateRef<any>;
  // @Input() dropdown: boolean; // 未使用
  // @Input() minLength: number; // 未使用
  @Input() delay: number;
  @Input() searchFn: (term: string) => Observable<any[]>;
  @Input() formatter: (item: any) => string;
  @Input() valueParser: (item: any) => any;
  @Output() autoSubmit = new EventEmitter<any>(); // 失焦自动提交

  @ViewChild('multiAutoCompleteInput') multiAutoCompleteInputElement: ElementRef;
  @ViewChild('multiAutoCompleteWrapper') multiAutoCompleteWrapperElement: ElementRef;
  @ViewChild(AutoCompleteDirective) autoCompleteDirective: AutoCompleteDirective;
  multiItems: any[] = [];
  inputValue: any;
  multipleLabelClassNameSuffix: string = this.overview;
  inputEdit = false;
  multipleLabelClassNameConfig: any = {
    'border': {
      'focus': 'border',
      'blur': 'border'
    },
    'none': {
      'focus': 'border',
      'blur': 'none'
    },
    'multiline': {
      'focus': 'multiline',
      'blur': 'multiline'
    },
    'single': {
      'focus': 'single-focus',
      'blur': 'single'
    }
  };
  id: number;
  clonePlaceholder: string = this.placeholder;
  get placeholderView() {
    if (this.multiItems.length > 0) {
      return '';
    } else {
      return this.placeholder;
    }
  }

  private popupRef: ComponentRef<AutoCompletePopupComponent>;
  private value: any;
  private placement = 'bottom-left';

  private onChange = (_: any) => null;
  private onTouched = () => null;

  constructor(
    private changeDetectorRef: ChangeDetectorRef) {
    this.formatter = (item) => item ? (item.label || item.toString()) : '';
    this.valueParser = (item) => item;
    this.id = MultiAutoCompleteComponent.ID_SEED++;
  }

  writeValue(obj: any): void {
    const value = obj || [];
    this.multiItems = value;
    if (this.overview === 'single') {
      this.inputEdit = this.multiItems.length === 0;
    }
    this.setSinglePlaceholder();
    this.changeDetectorRef.markForCheck();
  }

  ngOnInit() {
    if (this.source && !this.searchFn) {
      this.searchFn = (term) => {
        return of(this.source
          .filter(lang => this.multiItems.indexOf(lang) === -1 && lang.toLowerCase().indexOf(term.toLowerCase()) !== -1)
        );
      };
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes['overview']) {
      this.multipleLabelClassNameSuffix = changes['overview'].currentValue;
    }
    if (changes && changes['placeholder']) {
      this.clonePlaceholder = changes['placeholder'].currentValue;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  singleClick($event: any) {
    this.inputEdit = true;
  }

  onMultipleSearch(item?: any) {
    if (this.overview !== 'single' && item) {
      let inArray = false;
      for (let i = 0; i < this.multiItems.length; i++) {
        if (item.label) {
          if (item.label === this.multiItems[i].label) {
            inArray = true;
            break;
          }
        } else {
          if (item === this.multiItems[i]) {
            inArray = true;
            break;
          }
        }
      }
      if (!inArray) {
        this.multiItems.push(item);
      } else {
        this.multiItems = this.multiItems.filter(data => {
          if (data.label) {
            return data.label !== item.label;
          } else {
            return data !== item;
          }
        });
      }
    } else if (this.overview === 'single' && item) {
      this.multiItems = [];
      this.multiItems.push(item);
      this.inputEdit = false;
      this.multipleLabelClassNameSuffix = this.multipleLabelClassNameConfig[this.overview]['blur'];
    }
    this.setSinglePlaceholder();
    this.autoSubmit.emit(this.multiItems);
    this.onChange(this.multiItems);
    this.inputValue = null;
    this.multiAutoCompleteInputElement.nativeElement.value = '';
  }

  public removeLabel(label: any) {
    if (this.multiItems.indexOf(label) !== -1) {
      this.multiItems = this.multiItems.filter(item => item !== label);
    }
    this.setSinglePlaceholder();
    this.autoSubmit.emit(this.multiItems);
    this.onChange(this.multiItems);
  }

  getInputFocusFlag($event: any) {
    this.inputEdit = this.multiItems.length === 0 || $event.focus;
    this.popupRef = $event.popupRef;
    this.setSinglePlaceholder();
    if ($event.focus) {
      this.multipleLabelClassNameSuffix = this.multipleLabelClassNameConfig[this.overview]['focus'];
      setTimeout(() => { // 这里需要等待一会才能聚焦
        this.multiAutoCompleteInputElement.nativeElement.focus();
      }, 0);
    } else {
      this.multipleLabelClassNameSuffix = this.multipleLabelClassNameConfig[this.overview]['blur'];
      this.inputValue = null;
      this.multiAutoCompleteInputElement.nativeElement.value = '';
      this.autoSubmit.emit(this.multiItems);
    }
  }

  onBackspaceKeyUp($event: any, inputValue: any) {
    if (this.multiItems.length > 0 && !inputValue) {
      this.multiItems.pop();
    }
    this.setSinglePlaceholder();
    this.autoSubmit.emit(this.multiItems);
    this.onChange(this.multiItems);
  }

  setSinglePlaceholder() {
    if (this.overview === 'single') {
      if (this.multiItems && this.multiItems.length > 0) {
        this.placeholder = '';
      } else {
        this.placeholder = this.clonePlaceholder;
      }
    }
  }

  changePopUp(open) {
    if (open) {
      this.openPopup();
    } else {
      this.hidePopup();
    }
  }

  openPopup() {
    const ele = this.multiAutoCompleteWrapperElement && this.multiAutoCompleteWrapperElement.nativeElement;
    if (ele && !ele.classList.contains('devui-dropdown-origin-open')) {
      ele.classList.add('devui-dropdown-origin-open');
    }
    if (ele && !ele.classList.contains('devui-dropdown-origin-bottom')) {
      ele.classList.add('devui-dropdown-origin-bottom');
    }
  }

  hidePopup() {
    const ele = this.multiAutoCompleteWrapperElement && this.multiAutoCompleteWrapperElement.nativeElement;
    if (ele && ele.classList.contains('devui-dropdown-origin-open')) {
      ele.classList.remove('devui-dropdown-origin-open');
    }
    if (ele && ele.classList.contains('devui-dropdown-origin-bottom')) {
      ele.classList.remove('devui-dropdown-origin-bottom');
    }
  }
}
