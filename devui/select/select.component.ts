import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input, NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  AfterViewInit,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  HostListener
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, BehaviorSubject, Observable, Subscription, of } from 'rxjs';
import { tap, map, debounceTime, filter, switchMap } from 'rxjs/operators';
import { WindowRef } from 'ng-devui/window-ref';
import { I18nService, I18nInterface } from 'ng-devui/i18n';
import { VerticalConnectionPos, ConnectedOverlayPositionChange, CdkOverlayOrigin,
  CdkConnectedOverlay, ConnectedPosition } from '@angular/cdk/overlay';
import { fadeInOut, AppendToBodyDirection, AppendToBodyDirectionsConfig } from 'ng-devui/utils';

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
    if (this.selectWrapper) {
      this.dropDownWidth = this.width ? this.width : (this.selectWrapper.nativeElement.offsetWidth);
    }
    const ele = this.selectWrapper && this.selectWrapper.nativeElement;
    let position = 'bottom';
    if (this.popDirection === 'bottom') {
      position = 'top';
    }
    if (value) {
      if (ele && !ele.classList.contains('devui-dropdown-origin-open')) {
        ele.classList.add('devui-dropdown-origin-open');
      }
      if (!this.appendToBody) {
        if (ele && !ele.classList.contains(`devui-dropdown-origin-${this.popDirection}`)) {
          ele.classList.add(`devui-dropdown-origin-${this.popDirection}`);
          ele.classList.remove(`devui-dropdown-origin-${position}`);
        }
      }
    }
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
  @Input() highlightItemClass = 'active';
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
   * 【可选】cdk模式overlay Positions的控制
   */
  @Input() appendToBodyDirections: Array<AppendToBodyDirection | ConnectedPosition> = [
    'rightDown', 'leftDown', 'rightUp', 'leftUp'
  ];
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

  get isClearIconShow () {
    return this.allowClear && !this.multiple && !this.disabled && this.value;
  }

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

  @ContentChild(TemplateRef) itemTemplate: TemplateRef<any>;

  /**
   * 输出函数，当选中某个选项项后，将会调用此函数，参数为当前选择项的值。如果需要获取所有选择状态的值，请参考(ngModelChange)方法
   */
  @Output() valueChange = new EventEmitter<any>();
  i18nCommonText: I18nInterface['common'];
  i18nSubscription: Subscription;
  /**
   * select下拉toggle事件，值为true或false
   */
  @Output() toggleChange = new EventEmitter<any>();

  @Output() loadMore = new EventEmitter<any>();

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
  @Input() customViewDirection: 'bottom' | 'right' | 'left' = 'bottom';
  @Input() autoFocus = false;
  @Input() notAutoScroll = false; // 自动聚焦的时候，自动滚动到select位置

  @ViewChild('selectWrapper', { static: true }) selectWrapper: ElementRef;
  @ViewChild('selectInput') selectInputElement: ElementRef;
  @ViewChild('selectMenu') selectMenuElement: ElementRef;
  @ViewChild('selectBox', { static: true }) selectBoxElement: ElementRef;
  @ViewChild('selectInputWithTemplate') selectInputWithTemplateElement: ElementRef;
  @ViewChild('selectInputWithLabel') selectInputWithLabelElement: ElementRef;
  @ViewChild('filterInput') filterInputElement: ElementRef;
  @ViewChild('dropdownUl') dropdownUl: ElementRef;
  @ViewChild(CdkConnectedOverlay) connectedOverlay: CdkConnectedOverlay;

  showLoading = false;
  _isOpen = false;
  menuPosition: VerticalConnectionPos = 'bottom';
  halfChecked = false;
  allChecked = false;
  isMouseEvent = false;
  dropDownWidth: number;

  filter = '';
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
  overlayPositions: Array<ConnectedPosition>;

  private sourceSubscription: BehaviorSubject<any>;
  private filterSubscription: Subscription;
  public value;
  private resetting = false;

  private onChange = (_: any) => null;
  private onTouch = () => null;
  constructor(
    private renderer: Renderer2,
    private windowRef: WindowRef,
    private changeDetectorRef: ChangeDetectorRef,
    private i18n: I18nService,
    private ngZone: NgZone
  ) {
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
    this.setI18nText();
    this.registerFilterChange();
    this.setPositions();
  }

  ngAfterViewInit() {
    if (this.autoFocus && this.selectBoxElement) {
      this.selectBoxElement.nativeElement.focus({
        preventScroll: this.notAutoScroll
      });
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
    document.removeEventListener('click', this.onDocumentClick);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && (changes.searchFn || changes.options)) {
      this.resetSource();
    }
    if (changes['appendToBodyDirections']) {
      this.setPositions();
    }
  }
  setPositions() {
    if (this.appendToBodyDirections && this.appendToBodyDirections.length > 0) {
      this.overlayPositions = this.appendToBodyDirections.map(position => {
        if (typeof position === 'string') {
          return AppendToBodyDirectionsConfig[position];
        } else {
          return position;
        }
      }).filter(position => position !== undefined);
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
      this.setAvailableOptions();
      this.changeDetectorRef.markForCheck();
      if (this.appendToBody) {
        setTimeout(() => {
          if (this.connectedOverlay && this.connectedOverlay.overlayRef) {
            this.connectedOverlay.overlayRef.updatePosition();
          }
        });
      }
       // 显示数据变更，需要判断全选半选状态
      if (this.isSelectAll) {
          const selectedItemForFilterOptions = [];
          this.multiItems.forEach(item => {
          this.availableOptions.forEach(option => {
             if (item['id'] === option['id']) {
              selectedItemForFilterOptions.push(item);
             }
            });
          });
          this.setChecked(selectedItemForFilterOptions);
      }
      if (!this.multiple && (!this.value || this.availableOptions && !this.availableOptions.find(option => option.option === this.value))) {
        this.selectIndex = this.filter && this.availableOptions && this.availableOptions.length > 0 ? 0 : -1;
      }
    });

    this.sourceSubscription.subscribe(term => {
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
      if (!this.filterSubscription || this.appendToBody) { // 避免重复订阅
        this.filterSubscription = fromEvent(this.filterInputElement.nativeElement, 'input')
        .pipe(
          map((e: any) => e.target.value),
          tap(term => this.onTouch()),
          filter(term => !this.disabled && this.searchFn && term.length >= 0),
          debounceTime(300) // hard code need refactory
        )
        .subscribe(term => {
          this.selectIndex = -1;
          return this.sourceSubscription.next(term);
        });
      }
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
    this.setChecked(this.value);
  }

  writeIntoInput(value): void {
    this._inputValue = this.multiple
      ? (value || []).map(option => this.valueParser(option)).join(', ')
      : this.valueParser(value);
    this.setAvailableOptions();
  }

  setAvailableOptions() {
    if (!this.value || !Array.isArray(this.availableOptions)) {
      return;
    }
    let _value = this.value;
    if (!this.multiple) {
      _value = [_value];
    }
    this.availableOptions = this.availableOptions
      .map((item) => ({
        isChecked: _value.findIndex(i => JSON.stringify(i) === JSON.stringify(item.option)) > -1, id: item.id, option: item.option
      }));
  }

  choose = (option, index, $event?: Event) => {
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

    if (this.multiple) {
      const indexOfOption = this.multiItems.findIndex(item => JSON.stringify(item.option) === JSON.stringify(option));
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
    this.setChecked(this.value);
  }

  updateCdkConnectedOverlayOrigin() {
    if (this.selectWrapper.nativeElement) {
      this.cdkConnectedOverlayOrigin = new CdkOverlayOrigin(this.selectWrapper.nativeElement);
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
      this.isOpen = false;
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
    }
    this.isOpen = !this.isOpen;

    const that = this;
    setTimeout(function () {
      that.searchInputValueChangeEvent();
    }, 100);
  }

  isBottomRectEnough() {
    const selectMenuElement = this.selectMenuElement.nativeElement;
    const selectInputElement = this.selectInputElement || this.selectInputWithLabelElement || this.selectInputWithTemplateElement;
    const displayStyle =
      selectMenuElement.style['display'] || (<any>window).getComputedStyle(selectMenuElement).display;
    let tempStyle;
    if (displayStyle === 'none') { // 必要， 否则首次展开必有问题， 如果animationEnd之后设置为none也会有问题
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
    const bottomDistance =
      this.windowRef.innerHeight - selectInputElement.nativeElement.getBoundingClientRect().bottom;
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
      mutableOption.forEach(item => {
        const indexOfOption = this.multiItems
          .findIndex(i => JSON.stringify(i.option) === JSON.stringify(item.option));
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
    this.setChecked(this.value);
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
  }

  onPositionChange(position: ConnectedOverlayPositionChange) {
    this.menuPosition = position.connectionPair.originY;
    this.changeAppendToBodyFormDropDownDirection(position.connectionPair.overlayY);
  }

  changeAppendToBodyFormDropDownDirection(position) {
    const ele = this.selectWrapper && this.selectWrapper.nativeElement;
    const menuEle = this.selectMenuElement && this.selectMenuElement.nativeElement;
    let formBorder = 'bottom';
    if (position === 'bottom') {
      formBorder = 'top';
    }
    if (ele && !ele.classList.contains(`devui-dropdown-origin-${formBorder}`)) {
      ele.classList.add(`devui-dropdown-origin-${formBorder}`);
      ele.classList.remove(`devui-dropdown-origin-${position}`);
    }
    if (menuEle && !menuEle.classList.contains(`devui-dropdown-cdk-${formBorder}`)) {
      menuEle.classList.add(`devui-dropdown-cdk-${formBorder}`);
      menuEle.classList.remove(`devui-dropdown-cdk-${position}`);
    }
  }

  animationEnd($event) {
    if (!this.isOpen && this.selectMenuElement) {
      const targetElement = this.selectMenuElement.nativeElement;
      setTimeout(() => {
        // 动画会覆盖导致display还是block， 所以要等动画覆盖完
        this.renderer.setStyle(targetElement, 'display', 'none');
      });
    }
    if (!this.isOpen) {
      const ele = this.selectWrapper && this.selectWrapper.nativeElement;
      const menuEle = this.selectMenuElement && this.selectMenuElement.nativeElement;
      if (ele) {
        ele.classList.remove('devui-dropdown-origin-open');
        ele.classList.remove('devui-dropdown-origin-top');
        ele.classList.remove('devui-dropdown-origin-bottom');
      }
      if (menuEle) {
        menuEle.classList.remove(`devui-dropdown-cdk-top`);
        menuEle.classList.remove(`devui-dropdown-cdk-bottom`);
      }
    }
  }

  setChecked(selectedItem) {
    if (!selectedItem) {
      return;
    }
    if (!this.isSelectAll) {
      return;
    }
    this.halfChecked = false;
    if (selectedItem.length === this.availableOptions.length) {
      this.allChecked = true;
    } else if (selectedItem.length === 0) {
      this.allChecked = false;
    } else {
      this.halfChecked = true;
    }
  }

  showSelectAll() {
    return this.isSelectAll && this.multiple && this.availableOptions.length > 0;
  }

  public forceSearchNext() {
    this.sourceSubscription.next(this.filter);
  }

  valueClear($event) {
    $event.stopPropagation();
    this.value = null;
    this.resetStatus();
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  resetStatus() {
    this.writeIntoInput('');
    if (this.availableOptions && this.availableOptions[this.activeIndex]) {
      this.availableOptions[this.activeIndex].isChecked = false;
    }
    this.activeIndex = -1;
    this.selectIndex  = -1;
    this.changeDetectorRef.markForCheck();
  }

  clearText() {
    this.filter = '';
    this.forceSearchNext();
  }
}
