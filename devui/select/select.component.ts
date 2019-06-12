import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
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
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, BehaviorSubject, Observable, Subscription, of } from 'rxjs';
import { tap, map, debounceTime, filter, switchMap } from 'rxjs/operators';
import { WindowRef } from '../window-ref/window-ref.service';

@Component({
  selector: 'ave-select',
  templateUrl: './select.component.html',
  styleUrls: [`./select.component.scss`],
  exportAs: 'select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
  /**
   * 【必选】下拉选项资源，支持Array<string>, Array<{key: value}>
   */
  @Input() options = [];
  /**
   * 【可选】是否支持过滤搜索
   */
  @Input() isSearch = false;
  /**
   * 【可选】下拉菜单高度，建议使用px作为高度单位
   */
  @Input() scrollHight = '300px';
  /**
   * 【可选】下拉高亮css
   */
  @Input() hightLightItemClass = 'active';
  /**
   * 【当传入资源（options）类型为Array<{key: value}，必选】针对传入资源options的每项对应字段做过滤操作
   */
  @Input() filterKey: string;
  /**
   * 【可选】是否支持多选
   */
  @Input() multiple: boolean;
  /**
   * 【可选】是否支持全选
   */
  @Input() isSelectAll = false;
  /**
   * 【可选】是否可以输入
   */
  @Input() readonly = true;
  /**
   * 【可选】下拉选框尺寸
   */
  @Input() size: '' | 'sm' | 'lg';
  /**
   * 【可选】是否禁用下拉框
   */
  @Input() disabled = false;
  /**
   * 【可选】下拉默认显示文字
   */
  @Input() placeholder = '';
  /**
   * 【可选】搜索函数，当需要自定义下拉选择过滤规则时可以使用
   *  请保证返回值有id和option字段，id是确保尤其多选的时候能正确索引对应选项
   *  简单实现参考：
   *  search = (term) => {
   *    return of(
   *     [Lily, May, Jorsh, Shiwa, Nanth]
   *     .map((option, index) => ({id: index, option: option}))
   *     .filter(item => item.option.name.toLowerCase().indexOf(term.toLowerCase()) !== -1)
   *   );
   *  }
   */
  @Input() searchFn: (term: string) => Observable<Array<{ id: string | number; option: any }>>;
  /**
   * 【可选】决定选择框文字如何显示，默认显示filterKey字段或者本身的值
   */
  @Input() valueParser: (item: any) => any;
  /**
   * 【可选】决定下拉框没项文字如何显示，默认显示filterKey字段或者本身的值
   */
  @Input() formatter: (item: any) => string;
  @Input() direnction: 'up' | 'down' | 'auto' = 'down';
  @Input() overview: 'border' | 'underlined' = 'border';

  /**
   *  【可选】启用数据懒加载，默认不启用
  */
   @Input() enableLazyLoad = false;

  @ContentChild(TemplateRef) itemTemplate: TemplateRef<any>;

  /**
   * 输出函数，当选中某个选项项后，将会调用此函数，参数为当前选择项的值。如果需要获取所有选择状态的值，请参考(ngModelChange)方法
   */
  @Output() valueChange = new EventEmitter();
  selectText = '全选';
  noDataTips = '没有数据';
  /**
   * select下拉toggle事件，值为true或false
   */
  @Output() toggleChange = new EventEmitter();

  @Output() loadMore = new EventEmitter();

  @Input() extraConfig: {
    labelization?: {
      // 选中项显示成标签一样，带有删除按钮可以单个删除
      enable: boolean; // 默认值为false
      overflow?: 'normal' | 'scroll-y' | 'multiple-line' | string; // 默认值为''
      containnerMaxHeight?: string; // 默认值1.8em
      labelMaxWidth?: string; // 默认100%
    };
    selectedItemWithTemplate?: {
      // 单选情况下，显示选项使用了template的情况下，顶部选中的内容是否也以template展示
      enable: boolean; // 默认值为false
    };
    [featrue: string]: any;
  };

  /**
   * 【当传入资源（options）类型为Array<{key: value}，必选】针对传入资源options的每项对应字段做禁用操作的key
   */
  @Input() optionDisabledKey = '';
    /**
   * 【当传入资源（options）类型为Array<{key: value}，必选】针对传入资源options的每项对应字段禁止变更的key
   */
  @Input() optionImmutableKey = '';
  /**
   * 【可选】配置无数据展示
   */
  @Input() noResultItemTemplate: TemplateRef<any>;
  /**
   * 【可选】配置多选的时候是否维持原数组排序还是用户选择的顺序排序，默认是用户顺序
   */
  @Input() keepMultipleOrder: 'origin' | 'user-select' = 'user-select';
  @Input() customViewTemplate: TemplateRef<any>;


  @ViewChild('selectInput') selectInputElement: ElementRef;
  @ViewChild('selectMenu') selectMenuElement: ElementRef;
  @ViewChild('selectBox') selectBoxElement: ElementRef;
  @ViewChild('selectInputWithTemplate') selectInputWithTemplateElement: ElementRef;
  @ViewChild('selectInputWithLabel') selectInputWithLabelElement: ElementRef;
  @ViewChild('filterInput') filterInputElement: ElementRef;
  @ViewChild('dropdownUl') dropdownUl: ElementRef;
  @HostBinding('attr.ave-ui') aveUi = true;

  showLoading = false;
  _isOpen = false;

  get isOpen() {
    return this._isOpen;
  }

  set isOpen(value) {
    this._isOpen = value;
    this.toggleChange.emit(value);
  }

  filter: string;
  activeIndex = -1;

  // for multiple
  availableOptions = [];
  multiItems = [];

  popDirection: 'up' | 'down';

  selectIndex = -1;
  _inputValue: any;

  private sourceSubscription: BehaviorSubject<any>;
  private filterSubscription: Subscription;
  public value;
  private resetting = false;
  private onChange = (_: any) => null;
  private onTouch = () => null;

  constructor(
    private renderer: Renderer2,
    private windowRef: WindowRef,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.selectText = '全选';
    this.noDataTips = '没有数据';
    this.valueParser = item => (typeof item === 'object' ? item[this.filterKey] || '' : item ? item.toString() : '');
    this.formatter = item => (typeof item === 'object' ? item[this.filterKey] || '' : item ? item.toString() : '');
  }

  ngOnInit(): void {
    if (!this.searchFn) {
      this.searchFn = (term: any) => {
        return of(
          (this.options ? this.options : [])
            .filter(option => option)
            .map((option, index) => ({ option: option, id: index }))
            .filter(
              item =>
                this.formatter(item.option)
                  .toLowerCase()
                  .indexOf(term.toLowerCase()) !== -1
            )
        );
      };
    }
    // 只有多选的情况isSelectAll为true才有意义
    if (!this.multiple) {
      this.isSelectAll = false;
    }
    this.registerFilterChange();
  }

  ngOnDestroy(): void {
    this.sourceSubscription && this.sourceSubscription.unsubscribe(); // tslint:disable-line:no-unused-expression
    this.filterSubscription && this.filterSubscription.unsubscribe(); // tslint:disable-line:no-unused-expression
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && (changes.searchFn || changes.options)) {
      this.resetSource();
    }
  }

  resetSource() {
    if (this.sourceSubscription && this.searchFn) {
      this.resetting = true;
      this.sourceSubscription.next('');
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  registerFilterChange(): void {
    this.sourceSubscription = new BehaviorSubject<any>('');
    this.sourceSubscription.pipe(switchMap(term => this.searchFn(term))).subscribe(options => {
      this.availableOptions = options;
      this.changeDetectorRef.markForCheck();
    });

    this.sourceSubscription.subscribe(term => {
      if (this.resetting && term === '') {
        this.writeValue(this.value);
        this.resetting = false;
      }
    });

    this.filterSubscription = fromEvent(this.filterInputElement.nativeElement, 'input')
      .pipe(
        map((e: any) => e.target.value),
        tap(term => this.onTouch()),
        filter(term => !this.disabled && this.searchFn && term.length >= 0),
        debounceTime(300) // hard code need refactory
      )
      .subscribe(term => this.sourceSubscription.next(term));
  }

  writeValue(obj: any): void {
    if (obj === null || obj === undefined) {
      return;
    }
    this.value = obj;

    if (this.multiple) {
      this.value = this.value ? this.value : [];
      this.value = Array.isArray(this.value) ? this.value : [this.value];
      this.multiItems = this.value.map((option, index) => ({ option: option, id: this.options.indexOf(option) }));
    } else {
      const selectedItem = this.availableOptions.find(
        item => this.formatter(item.option) === this.formatter(this.value)
      );
      this.activeIndex = selectedItem ? selectedItem.id : -1;
    }

    this.writeIntoInput(this.value);
    this.changeDetectorRef.markForCheck();
  }

  writeIntoInput(value): void {
    this._inputValue = this.multiple
      ? (value || []).map(option => this.valueParser(option)).join(', ')
      : this.valueParser(value);
  }

  choose(option, index, $event?: Event) {
    // tslint:disable-next-line:no-unused-expression
    if ($event) {
      $event.preventDefault();
      $event.stopPropagation();
    }
    if (!option || this.disabled) {
      this.isOpen = false;
      return;
    }

    if (this.optionDisabledKey && option[this.optionDisabledKey]) {
      return;
    }
    if (this.optionImmutableKey && option[this.optionImmutableKey]) {
      return;
    }

    if (this.multiple) {
      const indexOfOption = this.multiItems.map(item => this.formatter(item.option)).indexOf(this.formatter(option));
      if (indexOfOption === -1) {
        this.multiItems.push({ id: index, option });
      } else {
        this.multiItems.splice(indexOfOption, 1);
      }
      if (this.keepMultipleOrder === 'origin') {
        this.multiItems.sort((a, b) => a.id - b.id);
      }
      this.value = this.multiItems.map(item => item.option);
    } else {
      this.value = option;
      this.activeIndex = index;
      this.selectIndex = index;
      this.toggle();
    }
    this.writeIntoInput(this.value);
    this.onChange(this.value);
    this.valueChange.emit(option);
  }

  toggle() {
    if (this.disabled) {
      this.isOpen = false;
      return;
    }

    if (!this.isOpen) {
      this.filter = '';
      this.resetSource();

      this.popDirection = <any>this.direnction;
      if (this.direnction === 'auto') {
        this.popDirection = this.isBottomRectEnough() ? 'down' : 'up';
      }
    }
    this.isOpen = !this.isOpen;
    const that = this;
    setTimeout(function() {
      that.filterInputElement.nativeElement.focus();
    });
  }

  isBottomRectEnough() {
    const selectMenuElement = this.selectMenuElement.nativeElement;
    const selectInputElement = this.selectInputElement || this.selectInputWithLabelElement || this.selectInputWithTemplateElement;
    const displayStyle =
      selectMenuElement.style['display'] || (<any>window).getComputedStyle(selectMenuElement).display;
    if (displayStyle === 'none') {
      this.renderer.setStyle(selectMenuElement, 'visibility', 'hidden');
      this.renderer.setStyle(selectMenuElement, 'display', 'block');
      this.renderer.setStyle(selectMenuElement, 'transform', 'translate(0, -9999)');
    }
    const elementHeight = selectMenuElement.offsetHeight;
    const bottemDistance =
      this.windowRef.innerHeight - selectInputElement.nativeElement.getBoundingClientRect().bottom;
    const isBotemEnough = bottemDistance >= elementHeight;
    this.renderer.setStyle(selectMenuElement, 'visibility', null);
    this.renderer.setStyle(selectMenuElement, 'display', null);
    this.renderer.setStyle(selectMenuElement, 'transform', null);
    return isBotemEnough;
  }

  isChecked(option: any) {
    return this.multiItems.map(item => this.formatter(item.option)).indexOf(this.formatter(option)) !== -1;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick($event: Event) {
    if (this.isOpen && !this.selectBoxElement.nativeElement.contains($event.target)) {
      this.isOpen = false;
      this.selectIndex = this.activeIndex ? this.activeIndex : -1;
    }
  }

  onEscKeyup($event) {
    this.isOpen = false;
  }

  handleKeyUpEvent($event) {
    if (this.isOpen) {
      $event.preventDefault();
      $event.stopPropagation();
      this.selectIndex = this.selectIndex === 0 || this.selectIndex === -1 ? 0 : this.selectIndex - 1;
      this.scrollToActive();
    }
  }

  handleKeyDownEvent($event) {
    if (this.isOpen) {
      $event.preventDefault();
      $event.stopPropagation();
      this.selectIndex =
        this.selectIndex === this.availableOptions.length - 1 ? this.selectIndex : this.selectIndex + 1;
      this.scrollToActive();
    }
  }

  scrollToActive(): void {
    const that = this;
    setTimeout(_ => {
      try {
        const selectIndex = that.selectIndex + (that.isSelectAll ? 1 : 0); // 多了个全选会导致问题，index需要加1
        const scrollPane: any = that.dropdownUl.nativeElement.children[selectIndex];
        if (scrollPane.scrollIntoViewIfNeeded) {
          scrollPane.scrollIntoViewIfNeeded(false);
        } else {
          const containerInfo = that.dropdownUl.nativeElement.getBoundingClientRect();
          const elementInfo = scrollPane.getBoundingClientRect();
          if (elementInfo.bottom > containerInfo.bottom || elementInfo.top < containerInfo.top) {
            // scrollPane.scrollIntoView(elementInfo.top < containerInfo.top); // true: top align, false: bottom align
            scrollPane.scrollIntoView(false);
          }
        }
      } catch (e) {}
    });
  }

  handleKeyEnterEvent($event) {
    if (this.isOpen) {
      $event.preventDefault();
      $event.stopPropagation();
      const item = this.availableOptions[this.selectIndex];
      if (item) {
        this.choose(item.option, item.id, $event);
      } else {
        this.toggle();
      }
    }
  }

  removeItem(item, $event) {
    this.choose(item.option, item.id, $event);
  }

  selectAll() {
    const mutableOption = this.optionImmutableKey
      ? this.availableOptions.filter(item => ! item.option[this.optionImmutableKey])
      : this.availableOptions;
    const selectedImmutableOption = this.optionImmutableKey
      ? this.multiItems.filter(item => item.option[this.optionImmutableKey])
      : [];

    if (mutableOption && mutableOption.length > (this.multiItems.length - selectedImmutableOption.length)) {
      mutableOption.map(option => {
        const indexOfOption = this.multiItems
          .map(item => this.formatter(item.option))
          .indexOf(this.formatter(option.option));
        if (indexOfOption === -1) {
          this.multiItems.push({ id: option.id, option: option.option });
        }
      });
    } else {
      this.multiItems = [...selectedImmutableOption];
    }
    this.value = this.multiItems.map(item => item.option);
    this.writeIntoInput(this.value);
    this.onChange(this.value);
    this.valueChange.emit(this.multiItems);
  }

  trackByFn(index, item) {
    return index;
  }

  trackByOptionPointer(index, item) {
    return item.option;
  }

  loadMoreEvent(event) {
    this.showLoading = true;
    this.loadMore.emit({instance: this, event: event});
  }

  loadFinish() {
    this.showLoading = false;
  }
}
