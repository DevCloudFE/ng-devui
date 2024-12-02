import { ConnectedPosition } from '@angular/cdk/overlay';
import {
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AutoCompleteDirective, AutoCompletePopupComponent } from 'ng-devui/auto-complete';
import { addClassToOrigin, AppendToBodyDirection, DevConfigService, removeClassFromOrigin, WithConfig } from 'ng-devui/utils';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'd-multi-auto-complete',
  templateUrl: './multi-auto-complete.component.html',
  styleUrls: ['multi-auto-complete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiAutoCompleteComponent),
      multi: true,
    },
  ],
  preserveWhitespaces: false,
})
export class MultiAutoCompleteComponent implements OnInit, OnChanges, ControlValueAccessor {
  static ID_SEED = 0;
  @Input() appendToBody = false;
  @Input() appendToBodyDirections: Array<AppendToBodyDirection | ConnectedPosition> = ['rightDown', 'leftDown', 'rightUp', 'leftUp'];
  /**
   * @deprecated
   */
  @Input() cssClass: string;
  /**
   * @deprecated
   * overview: border none multiline single
   */
  @Input() overview = 'border';
  @Input() tipsText: string; // 提示文字
  @Input() placeholder = ''; // placeholder
  @Input() disabled = false;
  @Input() retainInputValue = false;
  @Input() source: any[];
  @Input() latestSource: any[]; // 最近输入
  @Input() disabledKey: string; // 单个选项禁用
  @Input() width: number;
  @Input() itemTemplate: TemplateRef<any>;
  @Input() noResultItemTemplate: TemplateRef<any>;
  @Input() delay: number;
  @Input() searchFn: (term: string) => Observable<any[]>;
  @Input() formatter: (item: any) => string;
  @Input() valueParser: (item: any) => any;
  @Input() @WithConfig() showAnimation = true;
  @Input() @WithConfig() showGlowStyle = true;
  @HostBinding('class.devui-glow-style') get hasGlowStyle() {
    return this.showGlowStyle;
  }
  @Output() autoSubmit = new EventEmitter<any>(); // 失焦自动提交
  @ViewChild('multiAutoCompleteInput') multiAutoCompleteInputElement: ElementRef;
  @ViewChild('multiAutoCompleteWrapper') multiAutoCompleteWrapperElement: ElementRef;
  @ViewChild(AutoCompleteDirective) autoCompleteDirective: AutoCompleteDirective;
  multiItems: any[] = [];
  inputValue: any;
  multipleLabelClassNameSuffix: string = this.overview;
  inputEdit = false;
  multipleLabelClassNameConfig: any = {
    border: {
      focus: 'border',
      blur: 'border',
    },
    none: {
      focus: 'border',
      blur: 'none',
    },
    multiline: {
      focus: 'multiline',
      blur: 'multiline',
    },
    single: {
      focus: 'single-focus',
      blur: 'single',
    },
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

  constructor(private changeDetectorRef: ChangeDetectorRef, private devConfigService: DevConfigService) {
    this.formatter = (item) => (item ? item.label || item.toString() : '');
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
        return of(
          this.source.filter((lang) => this.multiItems.indexOf(lang) === -1 && lang.toLowerCase().indexOf(term.toLowerCase()) !== -1)
        );
      };
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const { overview, placeholder } = changes;
    if (overview) {
      this.multipleLabelClassNameSuffix = overview.currentValue;
    }
    if (placeholder) {
      this.clonePlaceholder = placeholder.currentValue;
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
        this.multiItems = this.multiItems.filter((data) => {
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
      this.multipleLabelClassNameSuffix = this.multipleLabelClassNameConfig[this.overview].blur;
    }
    this.setSinglePlaceholder();
    this.autoSubmit.emit(this.multiItems);
    this.onChange(this.multiItems);
    this.clearInputValue();
  }

  public removeLabel(label: any) {
    if (this.multiItems.indexOf(label) !== -1) {
      this.multiItems = this.multiItems.filter((item) => item !== label);
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
      this.multipleLabelClassNameSuffix = this.multipleLabelClassNameConfig[this.overview].focus;
      setTimeout(() => {
        // 这里需要等待一会才能聚焦
        this.multiAutoCompleteInputElement.nativeElement.focus();
      }, 0);
    } else {
      this.multipleLabelClassNameSuffix = this.multipleLabelClassNameConfig[this.overview].blur;
      this.clearInputValue();
      this.autoSubmit.emit(this.multiItems);
    }
  }

  clearInputValue() {
    if (!this.retainInputValue) {
      this.inputValue = null;
      this.multiAutoCompleteInputElement.nativeElement.value = '';
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
      addClassToOrigin(this.multiAutoCompleteWrapperElement);
    } else {
      removeClassFromOrigin(this.multiAutoCompleteWrapperElement);
    }
  }

  inputBlur() {
    this.onTouched();
  }
}
