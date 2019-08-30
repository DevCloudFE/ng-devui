import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input, NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  AfterViewInit,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, BehaviorSubject, Observable, Subscription, of } from 'rxjs';
import { tap, map, debounceTime, filter, switchMap } from 'rxjs/operators';
import { WindowRef } from 'ng-devui/window-ref';
import { I18nService } from 'ng-devui/utils';
import { VerticalConnectionPos, ConnectedOverlayPositionChange, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { fadeInOut } from 'ng-devui/utils';

@Component({
  selector: 'd-select',
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
  ],
  animations: [
    fadeInOut
  ]
})
export class SelectComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy, OnChanges {

  get isOpen() {
    return this._isOpen;
  }

  set isOpen(value) {
    this._isOpen = value;
    this.toggleChange.emit(value);
    this.setDocumentClickListener();
  }
  /**
   * 【必选】下拉选项资源，支持Array<string>, Array<{key: value}>
   */
  @Input() options = [];
  /**
   * 【可选】是否支持过滤搜索
   */
  @Input() isSearch = false;
  /**
   * 【可选】是否支持聚焦自动展开下拉
   */
  @Input() toggleOnFocus = false;
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
   * 【可选】是否appendToBody
   */
  @Input() appendToBody = false;
  /**
   * 【可选】cdk模式origin width
   */
  @Input() width: number;
  /**
   * 【可选】模板高度
   */
  @Input() templateItemSize: number; // 模板itemSize，appendToBody为true
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

  @Input() color;
  /**
   *  【可选】启用数据懒加载，默认不启用
   */
  @Input() enableLazyLoad = false;

  /**
   * 是否虚拟滚动
   */
  @Input() virtualScroll;

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

  @Input() autoFocus = false;

  @ViewChild('selectInput') selectInputElement: ElementRef;
  @ViewChild('selectMenu') selectMenuElement: ElementRef;
  @ViewChild('selectBox') selectBoxElement: ElementRef;
  @ViewChild('selectInputWithTemplate') selectInputWithTemplateElement: ElementRef;
  @ViewChild('selectInputWithLabel') selectInputWithLabelElement: ElementRef;
  @ViewChild('filterInput') filterInputElement: ElementRef;
  @ViewChild('dropdownUl') dropdownUl: ElementRef;

  showLoading = false;
  _isOpen = false;
  menuPosition: VerticalConnectionPos = 'bottom';
  halfChecked = false;
  allChecked = false;

  filter: string;
  activeIndex = -1;

  // for multiple
  availableOptions = [];
  multiItems = [];

  popDirection: 'top' | 'bottom';

  selectIndex = -1;
  _inputValue: any;
  virtualScrollItemSize: any = { // sm对应是30px，默认36px高，lg对应是44px
    sm: 30,
    normal: 36,
    lg: 44
  };

  cdkConnectedOverlayOrigin: CdkOverlayOrigin;

  private sourceSubscription: BehaviorSubject<any>;
  private filterSubscription: Subscription;
  public value;
  private resetting = false;
  private searchString = '';
  private onChange = (_: any) => null;
  private onTouch = () => null;
  constructor(
    private renderer: Renderer2,
    private windowRef: WindowRef,
    private changeDetectorRef: ChangeDetectorRef,
    private i18n: I18nService,
    private ngZone: NgZone
  ) {
    this.selectText = i18n.getLangSuffix() === 'CN' ? '全选' : 'Select All';
    this.noDataTips = i18n.getLangSuffix() === 'CN' ? '没有数据' : 'no data';
    this.valueParser = item => (typeof item === 'object' ? item[this.filterKey] || '' : (item + '') ? item.toString() : '');
    this.formatter = item => (typeof item === 'object' ? item[this.filterKey] || '' : (item + '') ? item.toString() : '');
  }

  ngOnInit(): void {
    if (!this.searchFn) {
      this.searchFn = (term: any) => {
        return of(
          (this.options ? this.options : [])
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

  ngAfterViewInit() {
    if (this.autoFocus && this.selectBoxElement) {
      this.selectBoxElement.nativeElement.focus();
    }

    if (this.selectBoxElement) {
      this.width = this.width ? this.width : this.selectBoxElement.nativeElement.offsetWidth;
    }
  }

  ngOnDestroy(): void {
    this.sourceSubscription && this.sourceSubscription.unsubscribe(); // tslint:disable-line:no-unused-expression
    this.filterSubscription && this.filterSubscription.unsubscribe(); // tslint:disable-line:no-unused-expression
    document.removeEventListener('click', this.onDocumentClick);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && (changes.searchFn || changes.options)) {
      this.resetSource();
    }
  }

  getVirtualScrollHeight(len, size) {
    if (len > 0) {
      let height = this.templateItemSize ? this.templateItemSize * len : this.virtualScrollItemSize[size ? size : 'normal'] * len;
      if (this.isSelectAll && this.multiple) {
        height += this.virtualScrollItemSize[size ? size : 'normal'];
      }
      const scrollHight = parseInt(this.scrollHight, 10);
      if (height > scrollHight) {
        return this.scrollHight;
      } else {
        return height + 'px';
      }
    }
  }

  getVirtualScrollItemSize(size) {
    return this.templateItemSize ? this.templateItemSize : this.virtualScrollItemSize[size ? size : 'normal'];
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
      if (!this.multiple && !this.value) {
        this.selectIndex = this.availableOptions && this.availableOptions.length > 0 ? 0 : -1;
      }
    });

    this.sourceSubscription.subscribe(term => {
      if (this.resetting && term === '') {
        this.writeValue(this.value);
        this.resetting = false;
      }
    });

    if (this.isOpen && this.filterInputElement) {
      this.filterSubscription = fromEvent(this.filterInputElement.nativeElement, 'input')
        .pipe(
          map((e: any) => e.target.value),
          tap(term => this.onTouch()),
          filter(term => !this.disabled && this.searchFn && term.length >= 0),
          debounceTime(300) // hard code need refactory
        )
        .subscribe(term => {
          this.searchString = term;
          return this.sourceSubscription.next(term);
        });
    }
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
      this.selectIndex = this.activeIndex ? this.activeIndex : -1;
    }

    this.writeIntoInput(this.value);
    this.changeDetectorRef.markForCheck();
    if (this.isSelectAll) {
      this.setChecked();
    }
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

    if (typeof option === 'object') {
      if (Object.keys(option).length === 0 || this.disabled) {
        this.isOpen = false;
        return;
      }
    } else {
      if (!(option + '') || this.disabled) {
        this.isOpen = false;
        return;
      }
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
    if (this.isSelectAll) {
      this.setChecked();
    }
  }

  updateCdkConnectedOverlayOrigin() {
    if (this.selectBoxElement.nativeElement) {
      this.cdkConnectedOverlayOrigin = new CdkOverlayOrigin(this.selectBoxElement.nativeElement);
    }
  }

  toggle() {
    if (this.disabled) {
      this.isOpen = false;
      return;
    }

    if (!this.isOpen) {
      this.filter = '';
      this.resetSource();

      if (!this.appendToBody) {
        let direction = '';
        switch (this.direnction) {
          case 'auto':
            direction = this.isBottomRectEnough() ? 'bottom' : 'top';
            break;
          case 'down':
            direction = 'bottom';
            break;
          case 'up':
            direction = 'top';
            break;
          default:
            direction = 'bottom';
        }
        this.popDirection = <any>direction;
      } else {
        this.updateCdkConnectedOverlayOrigin();
      }
    }
    this.isOpen = !this.isOpen;

    const that = this;
    setTimeout(function () {
      if (that.isOpen) {
        that.registerFilterChange();
        if (that.filterInputElement) {
          that.filterInputElement.nativeElement.focus();
        }
      }
    });
  }

  isBottomRectEnough() {
    const selectMenuElement = this.selectMenuElement.nativeElement;
    const selectInputElement = this.selectInputElement || this.selectInputWithLabelElement || this.selectInputWithTemplateElement;
    const displayStyle =
      selectMenuElement.style['display'] || (<any>window).getComputedStyle(selectMenuElement).display;
    const elementHeight = selectMenuElement.offsetHeight;
    const bottemDistance =
      this.windowRef.innerHeight - selectInputElement.nativeElement.getBoundingClientRect().bottom;
    const isBotemEnough = bottemDistance >= elementHeight;
    return isBotemEnough;
  }

  isChecked(option: any) {
    return this.multiItems.map(item => this.formatter(item.option)).indexOf(this.formatter(option)) !== -1;
  }

  setDocumentClickListener() {
    this.ngZone.runOutsideAngular(() => {
      if (this.isOpen) {
        document.addEventListener('click', this.onDocumentClick);
      } else {
        document.removeEventListener('click', this.onDocumentClick);
      }
    });
  }

  onDocumentClick = ($event: Event) => {
    if (this.isOpen && !this.selectBoxElement.nativeElement.contains($event.target)) {
      this.isOpen = false;
      this.selectIndex = this.activeIndex ? this.activeIndex : -1;
      this.changeDetectorRef.detectChanges();
    }
  }

  onEscKeyup($event) {
    if (this.isOpen) {
      $event.stopPropagation();
    }
    this.isOpen = false;
  }

  handleKeyUpEvent($event) {
    if (this.isOpen) {
      $event.preventDefault();
      $event.stopPropagation();
      this.selectIndex = this.selectIndex === 0 || this.selectIndex === -1 ? this.availableOptions.length - 1 : this.selectIndex - 1;
      this.scrollToActive();
    }
  }

  handleKeyDownEvent($event) {
    if (this.isOpen) {
      $event.preventDefault();
      $event.stopPropagation();
      this.selectIndex =
        this.selectIndex === this.availableOptions.length - 1 ? 0 : this.selectIndex + 1;
      this.scrollToActive();
    }
  }

  autoToggle($event) {
    $event.preventDefault();
    $event.stopPropagation();
    if (this.toggleOnFocus) {
      this.toggle();
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
      } catch (e) {
      }
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
    } else {
      this.toggle();
    }
  }

  removeItem(item, $event) {
    this.choose(item.option, item.id, $event);
  }

  selectAll() {
    const mutableOption = this.optionImmutableKey
      ? this.availableOptions.filter(item => !item.option[this.optionImmutableKey])
      : this.availableOptions;
    const selectedImmutableOption = this.optionImmutableKey
      ? this.multiItems.filter(item => item.option[this.optionImmutableKey])
      : [];

    if (mutableOption && mutableOption.length > (this.multiItems.length - selectedImmutableOption.length)) {
      mutableOption.map(item => {
        const indexOfOption = this.multiItems
          .map(value => this.formatter(value.option))
          .indexOf(this.formatter(item.option));
        if (indexOfOption === -1) {
          this.multiItems.push({ id: item.id, option: item.option });
        }
      });
    } else {
      this.multiItems = [...selectedImmutableOption];
    }
    this.value = this.multiItems.map(item => item.option);
    this.writeIntoInput(this.value);
    this.onChange(this.value);
    this.valueChange.emit(this.multiItems);
    this.setChecked();
  }

  trackByFn(index, item) {
    return index;
  }

  trackByOptionPointer(index, item) {
    return item.option;
  }

  loadMoreEvent(event) {
    this.showLoading = true;
    this.loadMore.emit({ instance: this, event: event });
  }

  loadFinish() {
    this.showLoading = false;
    this.changeDetectorRef.markForCheck();
  }

  onPositionChange(position: ConnectedOverlayPositionChange) {
    this.menuPosition = position.connectionPair.originY;
  }

  animationEnd($event) {
    if (!this.isOpen && this.selectMenuElement) {
      const targetElement = this.selectMenuElement.nativeElement;
      this.renderer.setStyle(targetElement, 'display', 'none');
    }
  }

  setChecked() {
    if (!this.value) {
      return;
    }
    this.halfChecked = false;
    if (this.value.length === this.availableOptions.length) {
      this.allChecked = true;
    } else if (this.value.length === 0) {
      this.allChecked = false;
    } else {
      this.halfChecked = true;
    }
  }

  showSelectAll() {
    return this.isSelectAll && this.multiple && this.availableOptions.length > 0;
  }

  public forceSearchNext() {
    this.sourceSubscription.next(this.searchString);
  }
}
