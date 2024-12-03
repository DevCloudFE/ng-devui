import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedOverlayPositionChange,
  ConnectedPosition,
  ScrollStrategy,
  ScrollStrategyOptions,
  VerticalConnectionPos,
} from '@angular/cdk/overlay';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import {
  AppendToBodyDirection,
  AppendToBodyDirectionsConfig,
  AppendToBodyScrollStrategyType,
  DevConfigService,
  WithConfig,
  addClassToOrigin,
  fadeInOut,
  formWithDropDown,
  removeClassFromOrigin,
} from 'ng-devui/utils';
import { WindowRef } from 'ng-devui/window-ref';
import { differenceBy, isEqual } from 'lodash-es';
import { BehaviorSubject, Observable, Subscription, fromEvent, of } from 'rxjs';
import { debounceTime, filter, map, switchMap } from 'rxjs/operators';

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
      multi: true,
    },
  ],
  animations: [fadeInOut],
  preserveWhitespaces: false,
})
export class SelectComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy, OnChanges {
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
  @Input() highlightItemClass = 'active';
  /**
   * 【当传入资源（options）类型为Array<{key: value}，必选】针对传入资源options的每项对应字段做过滤操作
   */
  @Input() filterKey: string;
  /**
   * 【当传入资源（options）类型为Array<{key: value}，可选】选项与选中值类型不一致时用于指定赋值属性
   */
  @Input() valueKey: string;
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
   * 【可选】cdk模式overlay Positions的控制
   */
  @Input() appendToBodyDirections: Array<AppendToBodyDirection | ConnectedPosition> = ['rightDown', 'leftDown', 'rightUp', 'leftUp'];
  @Input() @WithConfig() appendToBodyScrollStrategy: AppendToBodyScrollStrategyType;
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
  @Input() searchPlaceholder = '';
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
  @Input() direction: 'up' | 'down' | 'auto' = 'down';
  @Input() overview: 'border' | 'underlined' = 'border';
  /**
   *  【可选】是否开启clear功能（是否开启只对单选生效）
   */
  @Input() allowClear = false;
  @Input() color;
  /**
   *  【可选】启用数据懒加载，默认不启用
   */
  @Input() enableLazyLoad = false;
  /**
   * 是否虚拟滚动
   */
  @Input() virtualScroll;
  /**
   * 非必填，如传入，会忽略ContentChild
   */
  @Input() inputItemTemplate: TemplateRef<any>;
  @Input() extraConfig: {
    labelization?: {
      // 选中项显示成标签一样，带有删除按钮可以单个删除
      enable: boolean; // 默认值为false
      overflow?: 'normal' | 'scroll-y' | 'multiple-line' | string; // 默认值为''
      containerMaxHeight?: string; // 默认值1.8em
      /**
       * @deprecated
       */
      containnerMaxHeight?: string; // 默认值1.8em
      labelMaxWidth?: string; // 默认100%
      maxTags?: number; // 可点选最大标签数，超出则省略显示
    };
    selectedItemWithTemplate?: {
      // 单选情况下，显示选项使用了template的情况下，顶部选中的内容是否也以template展示
      enable: boolean; // 默认值为false
    };
    // 多选情况下，用户搜索后按回车默认操作结果的第一个选项，没有结果则关闭下拉列表
    enableFocusFirstFilteredOption?: boolean;
    [feature: string]: any;
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
  /**
   * customViewTemplate的方向，支持下方和右方
   */
  @Input() customViewDirection: 'bottom' | 'right' | 'left' | 'top' = 'bottom';
  @Input() autoScrollIntoActive = false;
  @Input() autoFocus = false;
  @Input() notAutoScroll = false; // 自动聚焦的时候，自动滚动到select位置
  @Input() loadingTemplateRef: TemplateRef<any>;
  @Input() showItemTitle = false;
  @Input() @WithConfig() showAnimation = true;
  @Input() @WithConfig() styleType = 'default';
  @Input() @WithConfig() showGlowStyle = true;
  @Input() beforeChange: (index, option, action) => boolean | Promise<boolean> | Observable<boolean>;
  /**
   * select下拉toggle事件，值为true或false
   */
  @Output() toggleChange = new EventEmitter<boolean>();
  @Output() loadMore = new EventEmitter<any>();
  /**
   * 输出函数，当选中某个选项项后，将会调用此函数，参数为当前选择项的值。如果需要获取所有选择状态的值，请参考(ngModelChange)方法
   */
  @Output() valueChange = new EventEmitter<any>();
  @ContentChild(TemplateRef) itemTemplate: TemplateRef<any>;
  @ViewChild('selectWrapper', { static: true }) selectWrapper: ElementRef;
  @ViewChild('selectInput') selectInputElement: ElementRef;
  @ViewChild('selectMenu') selectMenuElement: ElementRef;
  @ViewChild('selectBox', { static: true }) selectBoxElement: ElementRef;
  @ViewChild('selectInputWithTemplate') selectInputWithTemplateElement: ElementRef;
  @ViewChild('selectInputWithLabel') selectInputWithLabelElement: ElementRef;
  @ViewChild('filterInput') filterInputElement: ElementRef;
  @ViewChild('dropdownUl') dropdownUl: ElementRef;
  @ViewChild(CdkConnectedOverlay) connectedOverlay: CdkConnectedOverlay;
  @ViewChild(CdkVirtualScrollViewport) virtualScrollViewport: CdkVirtualScrollViewport;
  @HostBinding('class.devui-glow-style') get hasGlowStyle() {
    return this.showGlowStyle;
  }

  set isOpen(value) {
    this._isOpen = value;
    this.toggleChange.emit(value);
    this.setDocumentClickListener();
    if (this.selectWrapper) {
      this.dropDownWidth = this.width ? this.width : this.selectWrapper.nativeElement.offsetWidth;
    }
    if (value) {
      addClassToOrigin(this.selectWrapper);
      setTimeout(() => {
        this.startAnimation = true;
        this.changeDetectorRef.detectChanges();
        this.resetScrollTop();
      });
    } else {
      this.resetScrollTop(true);
      removeClassFromOrigin(this.selectWrapper);
      this.onTouch();
      if (this.direction === 'auto') {
        this.clearText();
      }
    }
  }

  get isOpen() {
    return this._isOpen;
  }

  get isClearIconShow() {
    const hasValue = this.multiple ? this.multiItems?.length : this.value;
    return this.allowClear && !this.disabled && hasValue;
  }

  get showMoreTags() {
    return this.multiItems.length > (this.extraConfig?.labelization?.maxTags || 40) && this.isSelectAll && this.virtualScroll;
  }

  get moreTagsNum() {
    return `+${this.multiItems.length - 1}`;
  }

  _inputValue: any;
  _isOpen = false;
  allChecked = false;
  halfChecked = false;
  isMouseEvent = false;
  showLoading = false;
  startAnimation = false;
  limitMaxHeight = false;
  availableOptions = [];
  multiItems = [];
  value: any;
  filter = '';
  activeIndex = -1;
  selectIndex = -1;
  popDirection: 'top' | 'bottom';
  menuPosition: VerticalConnectionPos = 'bottom';
  i18nCommonText: I18nInterface['common'];
  i18nSubscription: Subscription;
  document: Document;
  dropDownWidth: number;
  scrollHeightNum: number;
  lastCloseScrollHeight: number;
  minBuffer: number;
  maxBuffer: number;
  scrollStrategy: ScrollStrategy;
  cdkConnectedOverlayOrigin: CdkOverlayOrigin;
  overlayPositions: Array<ConnectedPosition>;
  virtualScrollViewportSizeMightChange = false;
  virtualScrollItemSize: any = {
    sm: 30,
    normal: 36,
    lg: 50,
    space: 4,
  };
  // 容器边距，虚拟滚动设置高度需考虑上下边距
  CONTAINER_MARGINS = 12;
  ANIMATION_DELAY = 300;

  get showSelectAll() {
    return this.isSelectAll && this.multiple && this.availableOptions.length > 0;
  }

  private sourceSubscription: BehaviorSubject<any>;
  private filterSubscription: Subscription;
  private resetting = false;
  private onChange = (_: any) => null;
  private onTouch = () => null;

  constructor(
    @Inject(DOCUMENT) private doc: any,
    private renderer: Renderer2,
    private windowRef: WindowRef,
    private changeDetectorRef: ChangeDetectorRef,
    private i18n: I18nService,
    private ngZone: NgZone,
    private el: ElementRef,
    private devConfigService: DevConfigService,
    private scrollStrategyOption: ScrollStrategyOptions
  ) {
    this.valueParser = (item) => this.getValue(item, this.filterKey);
    this.formatter = (item) => this.getValue(item, this.filterKey);
    this.scrollStrategy = this.scrollStrategyOption.reposition();
    this.document = this.doc;
  }

  ngOnInit(): void {
    if (!this.searchFn) {
      this.searchFn = (term: any) => {
        return of(
          (this.options || [])
            .map((option, index) => ({ option: option, id: index }))
            .filter((item) => this.formatter(item.option).toLowerCase().indexOf(term.toLowerCase()) !== -1)
        );
      };
    }

    // 只有多选的情况isSelectAll为true才有意义
    if (!this.multiple) {
      this.isSelectAll = false;
    }
    this.setI18nText();
    this.registerFilterChange();
    this.setPositions();
  }

  ngAfterViewInit() {
    if (this.autoFocus && this.selectBoxElement) {
      setTimeout(() => {
        this.selectBoxElement.nativeElement.focus({
          preventScroll: this.notAutoScroll,
        });
      });
    }
    // 当d-select添加limit-max-height样式类时为devui-dropdown-menu-wrap容器添加最大高度限制样式，避免当窗口高度小于指定下拉最大高度时，下拉内容超出cdk容器
    if (this.el.nativeElement?.className.includes('limit-max-height')) {
      this.limitMaxHeight = true;
    }
  }

  ngOnDestroy(): void {
    if (this.sourceSubscription) {
      this.sourceSubscription.unsubscribe();
    }
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();
    }
    this.document.removeEventListener('click', this.onDocumentClick);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { searchFn, options, appendToBodyDirections, appendToBodyScrollStrategy, disabled } = changes;
    const globalScrollStrategy = this.devConfigService.getConfigForApi('appendToBodyScrollStrategy');
    if (searchFn || options) {
      this.resetSource();
      if (this.virtualScroll && this.virtualScrollViewport) {
        this.virtualScrollViewportSizeMightChange = true;
        this.virtualScrollViewport.checkViewportSize();
      }
    }
    if (appendToBodyDirections) {
      this.setPositions();
    }
    if (this.appendToBodyScrollStrategy && (appendToBodyScrollStrategy || globalScrollStrategy)) {
      const func = this.scrollStrategyOption[this.appendToBodyScrollStrategy];
      this.scrollStrategy = func();
    }
    if (disabled && this.isOpen) {
      this.toggle();
    }
  }

  setPositions() {
    if (this.appendToBodyDirections && this.appendToBodyDirections.length > 0) {
      this.overlayPositions = this.appendToBodyDirections
        .map((position) => {
          if (typeof position === 'string') {
            return AppendToBodyDirectionsConfig[position];
          } else {
            return position;
          }
        })
        .filter((position) => position !== undefined);
    } else {
      this.overlayPositions = undefined;
    }
  }

  setI18nText() {
    this.i18nCommonText = this.i18n.getI18nText().common;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nCommonText = data.common;
    });
  }

  getVirtualScrollHeight(len, size) {
    if (len > 0) {
      let height =
        (this.templateItemSize || this.virtualScrollItemSize[size || 'normal']) * len + this.virtualScrollItemSize.space * (len - 1);
      if (this.isSelectAll && this.multiple) {
        height += this.virtualScrollItemSize[size ? size : 'normal'] + this.virtualScrollItemSize.space;
      }
      const scrollHeight = parseInt(this.scrollHight, 10);
      this.scrollHeightNum = height > scrollHeight ? scrollHeight : height;
      return `${this.scrollHeightNum + this.CONTAINER_MARGINS * 2}px`;
    }
  }

  get realVirtualScrollItemSize() {
    const itemSize = (this.templateItemSize || this.virtualScrollItemSize[this.size || 'normal']) + this.virtualScrollItemSize.space;
    const num = Math.round(this.scrollHeightNum / itemSize) || 10;
    this.minBuffer = num * 1.5 * itemSize;
    this.maxBuffer = num * 2.5 * itemSize;
    return itemSize;
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
    this.sourceSubscription.pipe(switchMap((term) => this.searchFn(term))).subscribe((options) => {
      this.availableOptions = options;
      this.setAvailableOptions();
      this.setAllChecked();
      this.changeDetectorRef.markForCheck();
      if (this.appendToBody) {
        setTimeout(() => {
          if (this.connectedOverlay && this.connectedOverlay.overlayRef) {
            this.connectedOverlay.overlayRef.updatePosition();
          }
        });
      }
      if (
        !this.multiple &&
        (!this.value || (this.availableOptions && !this.availableOptions.find((option) => option.option === this.value)))
      ) {
        this.selectIndex = this.filter && this.availableOptions && this.availableOptions.length > 0 ? 0 : -1;
      }
    });

    this.sourceSubscription.subscribe((term) => {
      if (this.resetting && term === '') {
        this.writeValue(this.value);
        this.resetting = false;
      }
    });

    this.searchInputValueChangeEvent();
  }

  searchInputValueChangeEvent() {
    if (this.isSearch && this.isOpen && this.filterInputElement) {
      this.filterInputElement.nativeElement.focus();
      if (!this.filterSubscription || this.appendToBody) {
        // 避免重复订阅
        this.filterSubscription = fromEvent(this.filterInputElement.nativeElement, 'input')
          .pipe(
            map((e: any) => e.target.value),
            filter((term) => !this.disabled && this.searchFn && term.length >= 0),
            debounceTime(this.ANIMATION_DELAY)
          )
          .subscribe((term) => {
            this.selectIndex = -1;
            return this.sourceSubscription.next(term);
          });
      }
    }
  }

  writeValue(value: any): void {
    if (this.multiple) {
      this.value = value ?? [];
      if (this.showMoreTags) {
        this.value = this.value || [];
        this.value = Array.isArray(this.value) ? this.value : [this.value];
      } else {
        this.getMultipleSelectedOption();
        this.setAllChecked();
      }
    } else {
      this.value = value ?? '';
      this.getSingleSelectedOption();
      if (this.autoScrollIntoActive) {
        this.scrollIntoActive();
      }
    }
    this.writeIntoInput(this.value);
    this.changeDetectorRef.markForCheck();
  }

  writeIntoInput(value): void {
    let valueItem = value;
    if (this.valueKey) {
      valueItem = this.multiple ? this.multiItems.map((item) => item.option) : this.getOption(this.availableOptions, value, true);
      valueItem = valueItem ?? '';
    }
    this._inputValue = this.multiple ? (valueItem || []).map((option) => this.valueParser(option)).join(', ') : this.valueParser(valueItem);
    this.setAvailableOptions();
    if (this.showMoreTags) {
      this.multiItems = this.availableOptions.filter((item) => item.isChecked);
      this.setAllChecked();
    }
  }

  setAvailableOptions() {
    const hasNoValue = this.value === undefined || this.value === '';
    if (hasNoValue || !Array.isArray(this.availableOptions)) {
      return;
    }
    let _value = this.value;
    if (!this.multiple) {
      _value = [_value];
    }
    this.availableOptions = this.availableOptions.map((item) => ({
      isChecked: _value.findIndex((i) => isEqual(i, this.valueKey ? item.option[this.valueKey] : item.option)) > -1,
      id: item.id,
      option: item.option,
    }));
  }

  getMultipleSelectedOption() {
    this.value = this.value || [];
    this.value = Array.isArray(this.value) ? this.value : [this.value];
    this.multiItems = this.valueKey
      ? this.value.map((value) => this.getOption(this.availableOptions, value)).filter((item) => item)
      : this.value.map((option) => ({ option: option, id: this.getOptionIndex(option) }));
  }

  getSingleSelectedOption() {
    const selectedItem = this.valueKey
      ? this.getOption(this.availableOptions, this.value)
      : this.availableOptions.find((item) => this.formatter(item.option) === this.formatter(this.value));
    this.activeIndex = selectedItem ? selectedItem.id : -1;
    this.selectIndex = this.activeIndex >= 0 ? this.activeIndex : -1;
  }

  getOption(data, value, hasOption?) {
    const hasValue = (value ?? undefined) !== undefined;
    const valueItem = this.getValue(value, this.valueKey);
    const result = hasValue ? data.find((item) => this.getValue(item.option, this.valueKey) === valueItem) || '' : '';
    return hasOption && result ? result.option : result;
  }

  getOptionIndex(option) {
    return this.options?.length
      ? this.options.findIndex((item) => isEqual(item, option))
      : this.availableOptions.findIndex((item) => isEqual(item.option, option));
  }

  getValue = (item, key) => {
    let result = item ?? '';
    if (typeof item === 'object') {
      result = item[key] ?? '';
    }
    return String(result);
  };

  scrollIntoActive() {
    if (this.activeIndex >= 0) {
      setTimeout(() => {
        const items = this.dropdownUl?.nativeElement.querySelectorAll('.devui-dropdown-item') || [];
        if (items[this.activeIndex]) {
          items[this.activeIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        }
      }, this.ANIMATION_DELAY);
    }
  }

  canChange(option, index, action: string) {
    let changeResult = Promise.resolve(true);

    if (this.beforeChange) {
      const result: any = this.beforeChange(index, option, action);
      if (typeof result !== 'undefined') {
        if (result.then) {
          changeResult = result;
        } else if (result.subscribe) {
          changeResult = (result as Observable<boolean>).toPromise();
        } else {
          changeResult = Promise.resolve(result);
        }
      }
    }

    return changeResult;
  }

  choose = (option, index, $event?: Event, operate?: string) => {
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
      if (this.disabled) {
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

    this.canChange(option, index, operate || 'select').then((change) => {
      if (!change) {
        return;
      }
      if (this.multiple) {
        const indexOfOption = this.multiItems.findIndex((item) => isEqual(item.option, option));
        if (indexOfOption === -1) {
          this.multiItems.push({ id: index, option });
        } else {
          this.multiItems.splice(indexOfOption, 1);
        }
        if (this.keepMultipleOrder === 'origin') {
          this.multiItems.sort((a, b) => a.id - b.id);
        }
        this.value = this.valueKey ? this.multiItems.map((item) => item.option[this.valueKey]) : this.multiItems.map((item) => item.option);
        this.setAllChecked();
      } else {
        this.value = this.valueKey ? option[this.valueKey] : option;
        this.activeIndex = index;
        this.selectIndex = index;
        this.toggle();
      }
      this.writeIntoInput(this.value);
      this.onChange(this.value);
      this.valueChange.emit(option);
    });
  };

  updateCdkConnectedOverlayOrigin() {
    if (this.selectWrapper.nativeElement) {
      this.cdkConnectedOverlayOrigin = new CdkOverlayOrigin(formWithDropDown(this.selectWrapper) || this.selectWrapper.nativeElement);
    }
  }

  resetScrollTop(isClose = false) {
    const menuDom = this.selectMenuElement?.nativeElement.querySelector('ul.devui-select-list-unstyled.devui-scrollbar');
    if (this.enableLazyLoad && menuDom) {
      if (isClose) {
        this.lastCloseScrollHeight = menuDom.scrollHeight ?? 0;
      } else if (menuDom.scrollHeight < this.lastCloseScrollHeight) {
        menuDom.scrollTop = 0;
      }
    }
  }

  autoToggle($event) {
    $event.preventDefault();
    $event.stopPropagation();
    if (this.toggleOnFocus && !this.disabled && !this.isOpen && !this.isMouseEvent) {
      this.toggle();
    }
  }

  // mousedown mouseup解决focus与click冲突问题
  @HostListener('mousedown', ['$event'])
  public setMouseEventTrue(event) {
    this.isMouseEvent = true;
  }
  @HostListener('mouseup', ['$event'])
  public setMouseEventFalse(event) {
    this.isMouseEvent = false;
  }

  toggle() {
    if (this.disabled) {
      if (this.isOpen) {
        this.isOpen = false;
      }
      return;
    }

    if (!this.isOpen) {
      this.filter = '';
      this.resetSource();
      if (!this.appendToBody) {
        let direction = '';
        switch (this.direction) {
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
    } else if (!this.showAnimation) {
      this.startAnimation = false;
    }
    this.isOpen = !this.isOpen;
    if (this.virtualScrollViewportSizeMightChange) {
      // 解决虚拟滚动更新options长度展开前无法获取正确高度影响
      setTimeout(() => {
        if (this.virtualScrollViewportSizeMightChange && this.virtualScrollViewport) {
          this.virtualScrollViewportSizeMightChange = false;
          this.virtualScrollViewport.checkViewportSize();
        }
      }, 0);
    }
    if (this.isSearch && this.isOpen) {
      // 条件外移减少setTimeout
      setTimeout(() => this.searchInputValueChangeEvent(), 100);
    }
  }

  isBottomRectEnough() {
    const selectMenuElement = this.selectMenuElement.nativeElement;
    const selectInputElement = this.selectInputElement || this.selectInputWithLabelElement || this.selectInputWithTemplateElement;
    const displayStyle = selectMenuElement.style.display || (<any>window).getComputedStyle(selectMenuElement).display;
    let tempStyle;
    if (displayStyle === 'none') {
      // 必要， 否则首次展开必有问题， 如果animationEnd之后设置为none也会有问题
      tempStyle = {
        visibility: selectMenuElement.style.visibility,
        display: selectMenuElement.style.display,
        transform: selectMenuElement.style.transform,
      };
      this.renderer.setStyle(selectMenuElement, 'visibility', 'hidden');
      this.renderer.setStyle(selectMenuElement, 'display', 'block');
      this.renderer.setStyle(selectMenuElement, 'transform', 'translate(0, -9999)');
    }
    const elementHeight = selectMenuElement.offsetHeight;
    const bottomDistance = this.windowRef.innerHeight - selectInputElement.nativeElement.getBoundingClientRect().bottom;
    const isBottomEnough = bottomDistance >= elementHeight;
    if (displayStyle === 'none') {
      this.renderer.setStyle(selectMenuElement, 'visibility', tempStyle.visibility);
      this.renderer.setStyle(selectMenuElement, 'display', tempStyle.display);
      this.renderer.setStyle(selectMenuElement, 'transform', tempStyle.transform);
    }
    return isBottomEnough;
  }

  setDocumentClickListener() {
    this.ngZone.runOutsideAngular(() => {
      if (this.isOpen) {
        this.document.addEventListener('click', this.onDocumentClick);
      } else {
        this.document.removeEventListener('click', this.onDocumentClick);
      }
    });
  }

  onDocumentClick = ($event: Event) => {
    if (this.isOpen && !this.selectBoxElement.nativeElement.contains($event.target)) {
      this.isOpen = false;
      this.selectIndex = this.activeIndex ? this.activeIndex : -1;
      this.changeDetectorRef.detectChanges();
    }
  };

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
      this.selectIndex = this.selectIndex === this.availableOptions.length - 1 ? 0 : this.selectIndex + 1;
      this.scrollToActive();
    }
  }

  scrollToActive(): void {
    const that = this;
    setTimeout(() => {
      try {
        const selectIndex = that.selectIndex + (that.isSelectAll ? 1 : 0); // 多了个全选会导致问题，index需要加1
        const scrollPane: any = that.dropdownUl.nativeElement.children[selectIndex];
        if (scrollPane.scrollIntoViewIfNeeded) {
          scrollPane.scrollIntoViewIfNeeded(false);
        } else {
          const containerInfo = that.dropdownUl.nativeElement.getBoundingClientRect();
          const elementInfo = scrollPane.getBoundingClientRect();
          if (elementInfo.bottom > containerInfo.bottom || elementInfo.top < containerInfo.top) {
            scrollPane.scrollIntoView(false);
          }
        }
      } catch (e) {}
    });
  }

  handleKeyEnterEvent($event, isSearchInput = false) {
    if (this.isOpen) {
      $event.preventDefault();
      $event.stopPropagation();
      const item = this.getSelectedItem();
      if (item) {
        this.choose(item.option, item.id, $event);
      } else if (!isSearchInput) {
        this.toggle();
      }
    } else {
      this.toggle();
    }
  }

  getSelectedItem = () => {
    return this.extraConfig?.enableFocusFirstFilteredOption && this.multiple && this.availableOptions.length
      ? this.availableOptions[0]
      : this.availableOptions[this.selectIndex];
  };

  removeItem(item, $event) {
    this.choose(item.option, item.id, $event, 'remove');
  }

  selectAll() {
    const mutableOption = this.optionImmutableKey
      ? this.availableOptions.filter((item) => !item.option[this.optionImmutableKey])
      : this.availableOptions;
    const selectedImmutableOption = this.optionImmutableKey ? this.multiItems.filter((item) => item.option[this.optionImmutableKey]) : [];
    const hasNotSelected = differenceBy(mutableOption, this.multiItems, 'id');

    if (hasNotSelected.length) {
      mutableOption.forEach((item) => {
        const indexOfOption = this.multiItems.findIndex((i) => isEqual(i.option, item.option));
        if (indexOfOption === -1) {
          this.multiItems.push({ id: item.id, option: item.option });
        }
      });
    } else if (mutableOption.length === this.multiItems.length - selectedImmutableOption.length) {
      this.multiItems = [...selectedImmutableOption];
    } else {
      this.multiItems = differenceBy(this.multiItems, mutableOption, 'id');
    }
    this.value = this.valueKey ? this.multiItems.map((item) => item.option[this.valueKey]) : this.multiItems.map((item) => item.option);
    this.writeIntoInput(this.value);
    this.setAllChecked();
    this.onChange(this.valueKey ? this.multiItems.map((item) => item.option[this.valueKey]) : this.value);
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
    this.loadMore.emit({ instance: this, event: event });
  }

  loadFinish() {
    this.showLoading = false;
    this.changeDetectorRef.markForCheck();
  }

  loadStart() {
    this.showLoading = true;
    this.changeDetectorRef.markForCheck();
  }

  onPositionChange(position: ConnectedOverlayPositionChange) {
    this.menuPosition = position.connectionPair.originY;
  }

  animationEnd($event) {
    if (!this.isOpen && this.selectMenuElement && this.showAnimation) {
      const targetElement = this.selectMenuElement.nativeElement;
      this.startAnimation = false;
      setTimeout(() => {
        // 动画会覆盖导致display还是block， 所以要等动画覆盖完
        this.renderer.setStyle(targetElement, 'display', 'none');
      });
    }
  }

  setAllChecked() {
    this.allChecked = false;
    this.halfChecked = false;
    if (!this.showSelectAll) {
      return;
    }
    if (!this.multiItems || this.multiItems.length === 0) {
      return;
    }
    // 从当前下拉选项中用 id 排除已选中选项
    const result = differenceBy(this.availableOptions, this.multiItems, 'id');
    if (result.length === 0) {
      this.allChecked = true;
    } else if (result.length === this.availableOptions.length) {
      this.allChecked = false;
    } else {
      this.halfChecked = true;
    }
  }

  public forceSearchNext() {
    this.sourceSubscription.next(this.filter);
  }

  valueClear($event) {
    $event.stopPropagation();
    if (this.multiple) {
      this.multiItems = [];
      this.value = [];
      this.setAllChecked();
    } else {
      this.value = undefined;
    }
    this.resetStatus();
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  resetStatus() {
    this.writeIntoInput(this.value);
    if (this.availableOptions && this.availableOptions[this.activeIndex]) {
      this.availableOptions[this.activeIndex].isChecked = false;
    }
    this.activeIndex = -1;
    this.selectIndex = -1;
    this.changeDetectorRef.markForCheck();
  }

  clearText() {
    this.filter = '';
    this.forceSearchNext();
  }
}
