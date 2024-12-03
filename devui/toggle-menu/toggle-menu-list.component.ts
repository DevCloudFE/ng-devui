import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { fadeInOut } from 'ng-devui/utils';
import { Subscription } from 'rxjs';
import { ToggleMenuListItem } from './toggle-menu.type';

@Component({
  selector: 'd-toggle-menu-list',
  templateUrl: './toggle-menu-list.component.html',
  styleUrls: [`./toggle-menu-list.component.scss`],
  animations: [fadeInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class ToggleMenuListComponent implements OnInit, OnChanges, OnDestroy {
  /**
   * 【必选】下拉选项资源，支持Array<string>, Array<{key: value}>
   */
  @Input() options: Array<ToggleMenuListItem> = [];
  /**
   * 【当传入资源（options）类型为Array<{key: value}，必选】针对传入资源options的每项对应字段做禁用操作的key
   */
  @Input() optionDisabledKey = '';
  /**
   * 【当传入资源（options）类型为Array<{key: value}，必选】针对传入资源options的每项对应字段禁止变更的key
   */
  @Input() optionImmutableKey = '';
  /**
   * 【当传入资源（options）类型为Array<{key: value}，可选】如使用分组需设置
   */
  @Input() optionGroupKey = '';
  /**
   * 【可选】下拉选框尺寸
   */
  @Input() size: '' | 'sm' | 'lg';
  @Input() keyword: string;
  /**
   * 【可选】是否在搜索过滤状态中
   */
  @Input() isFiltering = false;
  /**
   *  【可选】启用数据懒加载，默认不启用
   */
  @Input() enableLazyLoad = false;
  /**
   * 【可选】是否虚拟滚动
   */
  @Input() virtualScroll = false;

  /**
   * 【必选】下拉列表单项模板
   */
  @Input() listItemTemplate: TemplateRef<any>;
  /**
   * 【可选】自定义 loading 模板
   */
  @Input() loadingTemplateRef: TemplateRef<any>;
  /**
   * 【可选】配置无数据展示
   */
  @Input() noResultItemTemplate: TemplateRef<any>;
  /**
   * 【可选】支持自定义区域显示内容
   */
  @Input() customViewTemplate: TemplateRef<any>;
  /**
   * customViewTemplate的方向，支持下方和右方
   */
  @Input() customViewDirection: 'top' | 'bottom' | 'right' | 'left' = 'bottom';
  /**
   * 【可选】模板高度
   */
  @Input() templateItemSize: number; // 模板itemSize，appendToBody为true
  /**
   * 【可选】下拉菜单高度，建议使用px作为高度单位
   */
  @Input() set scrollHeight(value) {
    this._scrollHeight = `${parseInt(value, 10)}px`;
  }

  get scrollHeight() {
    return this._scrollHeight;
  }

  @Input() selectIndex = -1;
  /**
   * 【可选】是否允许单选状态下无选中值时高亮某项
   */
  @Input() hasSelectIndex: boolean;
  /**
   * 【可选】是否支持多选
   */
  @Input() multiple: boolean;
  @Input() multiItems = [];
  @Input() value: ToggleMenuListItem | Array<ToggleMenuListItem>;
  /**
   * 【可选】是否支持全选
   */
  @Input() isSelectAll = false;
  /**
   * 【可选】配置多选的时候是否维持原数组排序还是用户选择的顺序排序，默认是用户顺序
   */
  @Input() keepMultipleOrder: 'origin' | 'user-select' = 'user-select';
  @Input() eventHandle: any;
  @Input() closeScope: 'all' | 'blank' | 'none' = 'all';
  /**
   * select下拉toggle事件，值为true或false
   */
  @Output() toggleChange = new EventEmitter<any>();
  @Output() valueChange = new EventEmitter<any>();
  @Output() loadMore = new EventEmitter<any>();
  @ViewChild('dropdownUl') dropdownUl: ElementRef;
  @ViewChild(CdkVirtualScrollViewport) virtualScrollViewport: CdkVirtualScrollViewport;

  get realVirtualScrollItemSize() {
    const itemSize = (this.templateItemSize || this.virtualScrollItemSize[this.size || 'normal']) + this.virtualScrollItemSize.space;
    const num = Math.round(this.scrollHeightNum / itemSize) || 10;
    this.minBuffer = num * 1.5 * itemSize;
    this.maxBuffer = num * 2.5 * itemSize;
    return itemSize;
  }

  _scrollHeight = '300px';
  i18nCommonText: I18nInterface['common'];
  i18nSubscription: Subscription;
  availableOptions = [];
  activeIndex = -1;
  allChecked = false;
  halfChecked = false;
  showLoading = false;
  scrollHeightNum: number;
  minBuffer: number;
  maxBuffer: number;
  virtualScrollViewportSizeMightChange = false;
  virtualScrollItemSize: any = {
    sm: 30,
    normal: 36,
    lg: 50,
    space: 4,
  };
  // 容器边距，虚拟滚动设置高度需考虑上下边距
  CONTAINER_MARGINS = 12;

  constructor(private changeDetectorRef: ChangeDetectorRef, private i18n: I18nService) {}

  ngOnInit() {
    this.setI18nText();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { options, value, eventHandle } = changes;
    if (options) {
      this.availableOptions = this.options;
      this.setAvailableOptions();
      // 显示数据变更，需要判断全选半选状态
      if (this.isSelectAll) {
        const selectedItemForFilterOptions = [];
        this.multiItems.forEach((item) => {
          this.availableOptions.forEach((option) => {
            if (item.id === option.id) {
              selectedItemForFilterOptions.push(item);
            }
          });
        });
        this.setChecked(selectedItemForFilterOptions);
      }
      if (
        !this.hasSelectIndex &&
        !this.multiple &&
        (!this.value || (this.availableOptions && !this.availableOptions.find((option) => option.option === this.value)))
      ) {
        this.selectIndex = this.isFiltering && this.availableOptions && this.availableOptions.length > 0 ? 0 : -1;
      }
      if (this.virtualScroll && this.virtualScrollViewport) {
        this.virtualScrollViewportSizeMightChange = true;
        this.virtualScrollViewport.checkViewportSize();
      }
      this.changeDetectorRef.markForCheck();
    }
    if (value) {
      this.setAvailableOptions();
    }
    if (eventHandle?.currentValue) {
      const evt = eventHandle.currentValue;
      const { event, type } = evt;
      switch (type) {
      case 'keydown.esc':
        this.onEscKeyup(event);
        break;
      case 'keydown.ArrowUp':
        this.handleKeyUpEvent(event);
        break;
      case 'keydown.ArrowDown':
        this.handleKeyDownEvent(event);
        break;
      case 'keydown.enter':
        this.handleKeyEnterEvent(event);
        break;
      default:
      }
    }
  }

  ngOnDestroy(): void {
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();
    }
  }

  setI18nText() {
    this.i18nCommonText = this.i18n.getI18nText().common;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nCommonText = data.common;
    });
  }

  setAvailableOptions() {
    if (!Array.isArray(this.availableOptions)) {
      return;
    }
    const result = this.multiple ? this.value : [this.value];
    const _value = this.value ? result : [];
    this.availableOptions = this.availableOptions.map((item, index) =>
      item.id >= 0 && item.option
        ? {
          isChecked: _value.findIndex((i) => JSON.stringify(i) === JSON.stringify(item.option)) > -1,
          id: item.id,
          option: item.option,
        }
        : { isChecked: _value.findIndex((i) => JSON.stringify(i) === JSON.stringify(item)) > -1, id: index, option: item }
    );
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

  selectAll() {
    const mutableOption = this.optionImmutableKey
      ? this.availableOptions.filter((item) => !item.option[this.optionImmutableKey])
      : this.availableOptions;
    const selectedImmutableOption = this.optionImmutableKey ? this.multiItems.filter((item) => item.option[this.optionImmutableKey]) : [];

    if (mutableOption && mutableOption.length > this.multiItems.length - selectedImmutableOption.length) {
      mutableOption.forEach((item) => {
        const indexOfOption = this.multiItems.findIndex((i) => JSON.stringify(i.option) === JSON.stringify(item.option));
        if (indexOfOption === -1) {
          this.multiItems.push({ id: item.id, option: item.option });
        }
      });
    } else {
      this.multiItems = [...selectedImmutableOption];
    }
    this.value = this.multiItems.map((item) => item.option);
    this.valueChange.emit({ value: this.value, multiItems: this.multiItems });
    this.setChecked(this.value);
  }

  trackByFn(index, item) {
    return index;
  }

  onEscKeyup(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.toggleChange.emit(false);
  }

  handleKeyUpEvent(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.selectIndex = this.selectIndex === 0 || this.selectIndex === -1 ? this.availableOptions.length - 1 : this.selectIndex - 1;
    this.scrollToActive();
  }

  handleKeyDownEvent(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.selectIndex = this.selectIndex === this.availableOptions.length - 1 ? 0 : this.selectIndex + 1;
    this.scrollToActive();
  }

  handleKeyEnterEvent(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const item = this.availableOptions[this.selectIndex];
    if (item) {
      this.choose({ option: item.option, index: item.id, event: null });
    } else if (this.closeScope === 'all') {
      this.toggleChange.emit(false);
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

  resetIndex(resetSelectIndex = true) {
    this.selectIndex = resetSelectIndex ? -1 : 0;
    this.activeIndex = -1;
    this.changeDetectorRef.markForCheck();
  }

  choose = ({ option, index, event }) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (typeof option === 'object' && Object.keys(option).length === 0) {
      this.toggleChange.emit(false);
      return;
    }
    if (this.optionDisabledKey && option[this.optionDisabledKey]) {
      return;
    }
    if (this.optionImmutableKey && option[this.optionImmutableKey]) {
      return;
    }
    if (this.optionGroupKey && option[this.optionGroupKey]) {
      return;
    }
    if (this.multiple) {
      const indexOfOption = this.multiItems.findIndex((item) => JSON.stringify(item.option) === JSON.stringify(option));
      if (indexOfOption === -1) {
        this.multiItems.push({ id: index, option });
      } else {
        this.multiItems.splice(indexOfOption, 1);
      }
      if (this.keepMultipleOrder === 'origin') {
        this.multiItems.sort((a, b) => a.id - b.id);
      }
      this.value = this.multiItems.map((item) => item.option);
    } else {
      this.value = option;
      this.activeIndex = index;
      this.selectIndex = index;
      if (this.closeScope === 'all') {
        this.toggleChange.emit(false);
      }
      if (this.virtualScrollViewportSizeMightChange) {
        // 解决虚拟滚动更新options长度展开前无法获取正确高度影响
        setTimeout(() => {
          if (this.virtualScrollViewportSizeMightChange && this.virtualScrollViewport) {
            this.virtualScrollViewportSizeMightChange = false;
            this.virtualScrollViewport.checkViewportSize();
          }
        }, 0);
      }
    }
    this.valueChange.emit({ value: this.value, multiItems: this.multiItems, option, event, index });
    this.setAvailableOptions();
    this.setChecked(this.value);
  };

  showSelectAll() {
    return this.isSelectAll && this.multiple && this.availableOptions.length > 0;
  }

  getVirtualScrollHeight(len, size) {
    if (len > 0) {
      let height =
        (this.templateItemSize || this.virtualScrollItemSize[size || 'normal']) * len + this.virtualScrollItemSize.space * (len - 1);
      if (this.isSelectAll && this.multiple) {
        height += this.virtualScrollItemSize[size ? size : 'normal'] + this.virtualScrollItemSize.space;
      }
      const scrollHeight = parseInt(this.scrollHeight, 10);
      this.scrollHeightNum = height > scrollHeight ? scrollHeight : height;
      return `${this.scrollHeightNum + this.CONTAINER_MARGINS * 2}px`;
    }
  }

  loadMoreEvent(event) {
    this.showLoading = true;
    this.loadMore.emit({ instance: this, event });
  }

  loadStart() {
    this.showLoading = true;
    this.changeDetectorRef.detectChanges();
  }

  loadFinish() {
    this.showLoading = false;
    this.changeDetectorRef.detectChanges();
  }
}
