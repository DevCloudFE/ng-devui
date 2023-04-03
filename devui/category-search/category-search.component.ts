import { DOCUMENT } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatepickerProCalendarComponent } from 'ng-devui/datepicker-pro';
import { DropDownDirective } from 'ng-devui/dropdown';
import { DValidateRules } from 'ng-devui/form';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { ITreeItem, OperableTreeComponent } from 'ng-devui/tree';
import { DefaultIcons } from 'ng-devui/tree-select';
import { DateConverter, DefaultDateConverter, DevConfigService, WithConfig } from 'ng-devui/utils';
import { cloneDeep, isEqual, merge, mergeWith } from 'lodash-es';
import { fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';
import {
  COLORS,
  CreateFilterEvent,
  ExtendedConfig,
  ICategorySearchTagItem,
  ITagOption,
  SearchConfig,
  SearchEvent,
  SelectedTagsEvent,
  TextConfig
} from './category-search.type';
import { ContentTemplateDirective } from './content-template.directive';
import { DefaultTemplateDirective } from './default-template.directive';

@Component({
  selector: 'd-category-search',
  templateUrl: './category-search.component.html',
  styleUrls: ['./category-search.component.scss'],
})
export class CategorySearchComponent implements OnChanges, OnDestroy, AfterViewInit, AfterContentInit {
  static ID_SEED = 0;
  @Input() category: ICategorySearchTagItem[] = [];
  @Input() defaultSearchField = [];
  @Input() selectedTags: ICategorySearchTagItem[] = [];
  /**
   * @deprecated
   */
  @Input() allowClear = true;
  /**
   * @deprecated
   */
  @Input() allowSave = true;
  /**
   * @deprecated
   */
  @Input() allowShowMore = false;
  @Input() extendedConfig: ExtendedConfig;
  @Input() toggleScrollToTail = false;
  @Input() searchKey = '';
  @Input() placeholderText: string;
  @Input() inputReadOnly = false;
  @Input() showSearchCategory: SearchConfig | boolean = true; // 配置是否显示搜索相关下拉选项
  @Input() categoryInGroup = false; // 是否按组别显示分类下拉列表
  @Input() groupOrderConfig: string[]; // 用户配置组顺序
  @Input() customGroupNameTemplate: TemplateRef<any>; // 用户自定义组名称显示模板
  @Input() tagMaxWidth: number;
  @Input() textConfig: TextConfig = {
    keywordName: '',
    createFilter: '',
    filterTitle: '',
    labelConnector: '|',
  };
  @Input() filterNameRules: DValidateRules = [];
  @Input() beforeTagChange: (tag, searchKey, operation) => boolean | Promise<boolean> | Observable<boolean>;
  @Input() toggleEvent: (dropdown, tag?, currentSelectTag?) => void;
  @Input() @WithConfig() styleType = 'default';
  @Output() searchEvent = new EventEmitter<SearchEvent>();
  @Output() selectedTagsChange = new EventEmitter<SelectedTagsEvent>();
  @Output() createFilterEvent = new EventEmitter<CreateFilterEvent>();
  @Output() clearAllEvent = new EventEmitter<MouseEvent>();
  @Output() searchKeyChange = new EventEmitter<String>();
  @ViewChild('InputEle', { static: true }) inputEle: ElementRef;
  @ViewChild('ScrollBarContainer', { static: true }) scrollBarContainer: ElementRef;
  @ViewChild('PrimeContainer', { static: true }) primeContainer: ElementRef;
  @ViewChild('OperableTree') treeInstance: OperableTreeComponent;
  @ViewChildren('selectedDropdown') selectedDropdownList: QueryList<DropDownDirective>;
  @ViewChildren(DefaultTemplateDirective) defaultTemplates: QueryList<DefaultTemplateDirective>;
  @ContentChildren(ContentTemplateDirective) contentTemplates: QueryList<ContentTemplateDirective>;

  id: number;
  searchField: ICategorySearchTagItem[];
  categoryDisplay: ICategorySearchTagItem[];
  currentSearchCategory: ICategorySearchTagItem[];
  currentSelectTag: ICategorySearchTagItem;
  dateConverter: DateConverter;
  treeResetFlag: boolean;
  treeSearchKey = '';
  filterName = '';
  searchKeyCache = '';
  enterSearch = false;
  isShowSavePanel = false;
  isSearchCategory = false;
  isHover = false;
  isFocus = false;
  treeNoRecord = false;
  showNoDataTips = false;
  icons = DefaultIcons;
  destroy$ = new Subject<void>();
  i18nCommonText: I18nInterface['common'];
  i18nCategorySearchText: I18nInterface['categorySearch'];
  showSearchConfig: SearchConfig;
  currentOpenDropdown: DropDownDirective;
  currentScrollTagIndex: number; // 当前要滚动至的标签索引
  blurTimer: any; // 失焦关闭下拉延时器，失焦后立刻展开下拉需清除该延时
  scrollTimeout: any; // 如果标签在可视范围内则延时展开下拉的定时器
  scrollToTailFlag = true; // 是否在更新标签内容后滚动至输入框的开关
  DROPDOWN_ANIMATION_TIMEOUT = 200; // 下拉动画延迟
  DELAY = 300; // 防抖延迟
  templates = {}; // 所有类型默认模板
  customTemplates = {}; // 按field标记的自定义模板集合
  joinLabelTypes = ['checkbox', 'label'];
  valueIsArrayTypes = ['dateRange', 'numberRange', 'treeSelect'];
  document: Document;
  operationConfig: ExtendedConfig = {
    clear: { show: true },
    save: { show: true },
    more: { show: false },
  };

  get showFilterNameClear() {
    return typeof this.filterName === 'string' && this.filterName.length > 0;
  }

  get showExtendedConfig() {
    return this.operationConfig.show ?? Boolean(this.selectedTags.length || this.searchKey);
  }

  private categoryOrder = [];
  private categoryDictionary = {};

  constructor(private devConfigService: DevConfigService, @Inject(DOCUMENT) private doc: any, private i18n: I18nService) {
    this.document = this.doc;
    this.dateConverter = new DefaultDateConverter();
    this.id = CategorySearchComponent.ID_SEED++;
    this.showSearchConfig = { keyword: true, field: true, category: true };
    this.i18n
      .langChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => this.setI18nAndFilterText(data));
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {
      allowClear,
      allowSave,
      allowShowMore,
      defaultSearchField,
      category,
      extendedConfig,
      selectedTags,
      searchKey,
      showSearchCategory,
      textConfig,
    } = changes;
    const hasExtendChanged = [allowClear, allowSave, allowShowMore, extendedConfig].some((change) => change);
    if (defaultSearchField || category || selectedTags) {
      this.init();
    }
    if (searchKey) {
      this.setSearchKeyTag(false);
    }
    if (showSearchCategory) {
      this.setSearchShow();
    }
    if (textConfig) {
      this.setI18nAndFilterText(this.i18n.getI18nText());
    }
    if (hasExtendChanged) {
      this.setExtendedConfig();
    }
  }

  ngAfterViewInit() {
    // 获取所有默认模板，规避脏检查添加延时
    setTimeout(() =>
      this.defaultTemplates.forEach((item) => {
        this.templates[item.type] = item.template;
      })
    );

    if (this.scrollBarContainer && this.inputEle) {
      // 初始化如果有滚动条直接位移至输入框
      this.scrollToTail(true);
      // 监听滚动事件，在跳转至指定标签后触发其下拉列表
      fromEvent(this.scrollBarContainer.nativeElement, 'scroll')
        .pipe(
          takeUntil(this.destroy$),
          tap(() => {
            // 指定标签在可视范围则展开下拉，不在可视范围，即触发滚动后清除定时的展开下拉动作
            if (this.scrollTimeout) {
              clearTimeout(this.scrollTimeout);
              this.scrollTimeout = undefined;
            }
            // TODO: 无法区分手动和自动滚动，待处理滚动时关闭已打开的下拉
          }),
          // 300毫秒内不再触发滚动事件则展开下拉列表
          debounceTime(this.DELAY)
        )
        .subscribe((event: Event) => this.openCurrentScrollTagMenu(event));
    }
  }

  ngAfterContentInit() {
    this.setCustomTemplate(this.contentTemplates);
    this.contentTemplates.changes.subscribe((data) => this.setCustomTemplate(data));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setCustomTemplate(data) {
    if (data?.length && this.category) {
      this.customTemplates = {};
      data.forEach((item) => {
        this.customTemplates[item.field] = item.template;
      });
      this.category.forEach((tag) => {
        tag.customTemplate = this.customTemplates[tag.field];
      });
      this.selectedTags.forEach((tag) => {
        tag.customTemplate = this.customTemplates[tag.field];
      });
    }
  }

  setI18nAndFilterText(data) {
    this.i18nCommonText = data.common;
    this.i18nCategorySearchText = data.categorySearch;
    this.textConfig.createFilter = this.textConfig.createFilter || this.i18nCategorySearchText?.saveFilter;
    this.textConfig.filterTitle = this.textConfig.filterTitle || this.i18nCategorySearchText?.filterTitle;
    this.showSearchConfig.keywordDescription =
      this.showSearchCategory['keywordDescription'] || this.i18nCategorySearchText.getSearchMessage;
    this.showSearchConfig.fieldDescription = this.showSearchCategory['fieldDescription'] || this.i18nCategorySearchText.getFindingMessage;
    this.showSearchConfig.categoryDescription =
      this.showSearchCategory['categoryDescription'] || this.i18nCategorySearchText.selectFilterCondition;
    // 关键字分类内文本不能随语言对象变化，需重新赋值
    const keyword = this.selectedTags.find((item) => item.field === 'devuiCategorySearchKeyword');
    if (keyword) {
      keyword.label = this.textConfig.keywordName || this.i18nCategorySearchText['keyword'];
      keyword.title = `${keyword.label}:${keyword.value?.label}`;
    }
  }

  setSearchShow() {
    const customConfig =
      typeof this.showSearchCategory === 'boolean'
        ? {
          keyword: this.showSearchCategory,
          field: this.showSearchCategory,
          category: this.showSearchCategory,
        }
        : this.showSearchCategory;
    this.showSearchConfig = { ...this.showSearchConfig, ...customConfig };
  }

  setSearchKeyTag(isSearch = true) {
    const result = this.searchKey || this.searchKeyCache;
    if (this.showSearchConfig.keyword && !this.currentSelectTag) {
      const existingSearchKeyTag = this.selectedTags.find((tag) => tag.field === 'devuiCategorySearchKeyword');
      if (existingSearchKeyTag && !isSearch && this.searchKey === '') {
        this.removeTag(existingSearchKeyTag);
      } else if (this.searchKey && this.searchKey !== existingSearchKeyTag?.value.value) {
        this.createSearchKeyTag(isSearch);
      }
    }
    this.searchKey = '';
    if (isSearch) {
      setTimeout(() => {
        this.enterSearch = false;
      }, this.DELAY);
    }
    return result;
  }

  createSearchKeyTag(isSearch: boolean) {
    const label = this.textConfig.keywordName || this.i18nCategorySearchText['keyword'];
    const searchKeyTag: ICategorySearchTagItem = {
      options: [],
      field: 'devuiCategorySearchKeyword',
      label: label,
      type: 'keyword',
      title: `${label}:${this.searchKey}`,
      value: {
        label: this.searchKey,
        value: this.searchKey,
        cache: this.searchKey,
      },
    };
    this.updateSelectedTags(searchKeyTag, isSearch);
    this.searchKeyCache = this.searchKey;
    this.searchKey = '';
  }

  setExtendedConfig() {
    const oldConfig: ExtendedConfig = {
      clear: { show: this.allowClear },
      save: { show: this.allowSave },
      more: { show: this.allowShowMore },
    };
    merge(oldConfig, this.extendedConfig);
    merge(this.operationConfig, oldConfig);
  }

  init() {
    this.setValue(this.category);
    this.setValue(this.selectedTags, true);
    this.initCategoryDisplay(true);
    if (this.defaultSearchField?.length && this.category?.length) {
      this.searchField = this.category.filter(
        (item) => this.defaultSearchField.includes(item.field) && !this.valueIsArrayTypes.includes(item.type)
      );
    }
    // 初始化时判断已选中分类中最后一项是否赋值，未赋值则识别为正在处理的分类，优先显示赋值下拉列表
    if (this.selectedTags.length) {
      const [lastItem] = this.selectedTags.slice(-1);
      const isNull = lastItem.value[lastItem.filterKey || 'label'] === undefined;
      this.currentSelectTag =
        isNull && (lastItem.value.value === undefined || (Array.isArray(lastItem.value.value) && lastItem.value.value.length === 0))
          ? lastItem
          : undefined;
    }
    if (this.searchKeyCache) {
      this.searchKey = this.searchKeyCache;
      this.setSearchKeyTag(false);
    }
  }

  // 初始化tag的value属性：{filterKey | label, value, data}
  initCategoryItem(item) {
    const preValue = this.valueIsArrayTypes.includes(item.type) ? { value: [] } : { value: undefined };
    preValue[item.filterKey || 'label'] = undefined;
    if (item.value) {
      for (const prop in preValue) {
        if (item.value[prop] === undefined) {
          item.value[prop] = preValue[prop];
        }
      }
    } else {
      item.value = preValue;
    }
    item.value.cache = (item.value.value && typeof item.value.value === 'object' && cloneDeep(item.value.value)) || item.value.value;
    if (item.type === 'treeSelect' && item.options && item.options.length) {
      item.value.options = cloneDeep(item.options);
    }
    item.customTemplate = this.customTemplates[item.field] || item.customTemplate;
    return item;
  }

  mergeCheck(objValue, srcValue, key) {
    if (key === 'options' && objValue !== srcValue) {
      return srcValue;
    }
  }

  setValue(data: any, isSelectedTags = false) {
    if (Array.isArray(data) && data.length) {
      data.forEach((item) => {
        if (isSelectedTags && this.category) {
          let result = '';
          const originItem = this.category.find((categoryItem) => categoryItem.field === item.field);
          mergeWith(item, originItem, this.mergeCheck);
          if (item.value.value) {
            item.value.cache = cloneDeep(item.value.value);
            result = this.joinLabelTypes.includes(item.type) ? this.getItemValue(item.value.value, item.filterKey || 'label') : '';
          }
          item.title = this.setTitle(item, item.type, result);
          if (item.type === 'label' && item.options[0] && !item.options[0].$label) {
            this.mergeToLabel(item);
          }
        } else {
          item = this.initCategoryItem(item);
        }
      });
    }
  }

  setTitle(tag: ICategorySearchTagItem, type: string, result?: string) {
    return this.joinLabelTypes.includes(type)
      ? `${tag.label}: ${result || ''}`
      : `${tag.label}: ${result || (tag.value && tag.value[tag.filterKey || 'label']) || ''}`;
  }

  initCategoryDisplay(isInit = false) {
    const selectedTagsField = this.selectedTags.map((item) => item.field);
    if (isInit) {
      this.category = this.category || [];
      this.categoryOrder = [];
      this.categoryDictionary = {};
      this.initGroupAndDictionary();
      this.initCategoryOrder();
    }
    this.categoryDisplay = this.categoryOrder.map((item) => {
      item.isSelected = selectedTagsField.includes(item.field);
      this.handleGroupLength(item, item.isSelected, isInit);
      return item;
    });
    this.showNoDataTips = this.categoryDisplay.every((item) => item.isSelected);
  }

  initGroupAndDictionary() {
    this.category.forEach((item) => {
      if (this.categoryInGroup && item.group) {
        if (this.categoryDictionary[item.group]) {
          this.categoryDictionary[item.group].groupLength++;
        } else {
          this.categoryDictionary[item.group] = { groupName: item.group, groupLength: 1, children: [] };
        }
        this.categoryDictionary[item.group].children.push(item);
      }
      this.categoryDictionary[item.field] = item;
    });
  }

  initCategoryOrder() {
    const keys = this.groupOrderConfig || Object.keys(this.categoryDictionary);
    keys.forEach((key) => {
      const item = this.categoryDictionary[key];
      if (item) {
        if (item) {
          if (this.categoryInGroup) {
            if (item.groupName) {
              this.categoryOrder.push(item, ...item.children);
            } else if (!item.group) {
              this.categoryOrder.push(item);
            }
          } else {
            this.categoryOrder.push(item);
          }
        }
      }
    });
  }

  handleGroupLength(tag: ICategorySearchTagItem, isSelected: boolean, isInit = false) {
    if (this.categoryInGroup && tag.group) {
      const group = this.categoryDictionary[tag.group];
      const len = group.groupLength;
      group.groupLength = isSelected ? len - 1 : isInit ? len : len + 1;
      group.isSelected = group.groupLength === 0;
    }
  }

  insertCategoryToGroup(groupName: string, groupObj: object, item: ICategorySearchTagItem, isInsert: boolean) {
    if (!groupName) {
      return;
    }
    groupObj[groupName] = groupObj[groupName] || [];
    if (isInsert) {
      groupObj[groupName].push(item);
    }
  }

  search() {
    this.searchEvent.emit({
      selectedTags: this.getSelectedTagsExceptKeyword(),
      searchKey: this.setSearchKeyTag(),
    });
    this.isFocus = true;
  }

  searchCategory(item: ICategorySearchTagItem, value?: string) {
    if (this.valueIsArrayTypes.includes(item.type)) {
      return;
    }
    this.updateFieldValue(item, value || this.searchKey);
    this.updateSelectedTags(item);
    this.searchKey = '';
    this.enterSearch = false;
    this.finishChoose();
  }

  searchInputValue(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.searchEvent.emit({
      selectedTags: this.getSelectedTagsExceptKeyword(),
      searchKey: this.setSearchKeyTag(),
    });
  }

  chooseCategory(item: ICategorySearchTagItem, inputDropdown: DropDownDirective) {
    // 点选分组名称不处理
    if (item.groupLength !== undefined) {
      return;
    }
    setTimeout(() => {
      this.currentSelectTag = item;
      if (this.currentSelectTag.type === 'label') {
        this.currentSelectTag = this.mergeToLabel(this.currentSelectTag);
      }
      this.currentSelectTag.title = this.setTitle(this.currentSelectTag, this.currentSelectTag.type, '');
      inputDropdown.isOpen = true;
    }, this.DROPDOWN_ANIMATION_TIMEOUT);
    this.updateSelectedTags(item, false);
  }

  getSelectedTagsExceptKeyword(): ICategorySearchTagItem[] {
    return this.showSearchConfig.keyword
      ? this.selectedTags.filter((item) => item.field !== 'devuiCategorySearchKeyword')
      : this.selectedTags;
  }

  updateSelectedTags(tag: ICategorySearchTagItem, valueChanged = true) {
    this.canChange(tag, 'add').then((val) => {
      if (!val) {
        return;
      }
      const index = this.selectedTags.map((item) => item.field).indexOf(tag.field);
      if (index > -1) {
        if (!tag.value.value) {
          // 通过输入选择分类时避免空值覆盖已选值
          merge(tag, this.selectedTags[index]);
        }
        this.selectedTags[index] = tag;
      } else {
        this.selectedTags.push(tag);
      }
      if (valueChanged) {
        // 只在新增标签时位移滚动条
        if (this.scrollToTailFlag) {
          setTimeout(() => this.scrollToTail());
        }
        this.selectedTagsChange.emit({
          selectedTags: this.getSelectedTagsExceptKeyword(),
          currentChangeTag: tag,
          operation: 'add',
        });
        this.isSearchCategory = false;
      } else {
        this.resolveCategoryDisplay(tag, 'delete');
      }
    });
  }

  // 判断滚动条是否存在，如果存在自动滚动到末尾的输入框
  scrollToTail(isInit?: boolean) {
    const dom = this.scrollBarContainer.nativeElement;
    if (this.toggleScrollToTail && dom.scrollWidth > dom.clientWidth) {
      if (isInit) {
        dom.scrollLeft = dom.scrollWidth - dom.clientWidth;
      } else {
        this.inputEle.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      }
    } else if (!isInit) {
      // 初始化不聚焦，避免展开下拉
      this.inputEle.nativeElement.focus();
    }
  }

  // 滚动至指定的tag
  scrollToTag(index: number, event: Event) {
    const tags = this.scrollBarContainer?.nativeElement.querySelectorAll('ul.devui-category-search-line>li');
    if (tags[index]) {
      this.currentScrollTagIndex = index;
      tags[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      this.scrollTimeout = setTimeout(() => this.openCurrentScrollTagMenu(event), this.DELAY);
    }
  }

  openCurrentScrollTagMenu(event: Event) {
    if (this.currentScrollTagIndex !== undefined) {
      const dropdownArr = this.selectedDropdownList.toArray();
      this.openMenu(dropdownArr[this.currentScrollTagIndex], event);
      this.currentScrollTagIndex = undefined;
    }
  }

  updateFieldValue(field: ICategorySearchTagItem, value: any) {
    const result = {};
    const filterKey = field.filterKey || 'label';
    const colorKey = field.colorKey || 'color';
    result[filterKey] = value;
    if (field.type === 'radio') {
      field.value.value = { [filterKey]: value };
    }
    if (field.type === 'textInput') {
      field.value.value = value;
    }
    if (field.type === 'label') {
      if (field.options[0] && !field.options[0].$label) {
        this.mergeToLabel(field);
      }
      result[colorKey] = COLORS[Math.floor(COLORS.length * Math.random())];
      result['$label'] = `${value}_${result[colorKey]}`;
    }
    if (this.joinLabelTypes.includes(field.type)) {
      field.value.value = [result];
    }
    field.value[filterKey] = value;
    field.value.cache = cloneDeep(field.value.value);
    field.title = this.setTitle(field, field.type, value);
  }

  removeTag(tag: ICategorySearchTagItem, event?: Event) {
    this.canChange(tag, 'delete').then((val) => {
      if (!val) {
        if (this.beforeTagChange && event) {
          event.stopPropagation();
        }
        return;
      }
      tag = this.resetValue(tag);
      this.selectedTags = this.selectedTags.filter((item) => item.field !== tag.field);
      const result = this.getSelectedTagsExceptKeyword();
      if (tag.type === 'keyword') {
        this.searchKey = this.searchKey === this.searchKeyCache ? '' : this.searchKey;
        this.searchKeyCache = '';
        this.enterSearch = this.searchKey !== '';
        this.searchEvent.emit({ selectedTags: result, searchKey: this.searchKey });
      } else {
        this.resolveCategoryDisplay(tag, 'add');
        this.selectedTagsChange.emit({ selectedTags: result, currentChangeTag: tag, operation: 'delete' });
      }
      this.currentSelectTag = undefined;
    });
  }

  checkInputSearching() {
    this.isFocus = true;
    if (this.searchKey === '') {
      this.enterSearch = false;
    } else {
      this.enterSearch = true;
    }
  }

  // 解决dropdownMenu展开时焦点会自动到toggle上的问题
  focusInput() {
    setTimeout(() => {
      this.inputEle.nativeElement.focus();
    });
  }

  // 失焦时关闭当前下拉列表，延时用以防止关闭掉点击分类展开的内容列表
  blurInput(event: FocusEvent) {
    this.blurTimer = setTimeout(() => {
      const className = event.relatedTarget && event.relatedTarget['className'];
      const outsideHost =
        !className || (typeof className === 'string' && className.indexOf(`devui-category-dropdown-menu-${this.id}`) === -1);
      if (!this.currentSelectTag && this.currentOpenDropdown && outsideHost) {
        this.currentOpenDropdown.isOpen = false;
      }
    }, this.DELAY);
  }

  openMenu(inputDropdown: DropDownDirective, event: Event) {
    const code = event['code'];
    if (inputDropdown.isOpen || (event.type === 'keyup' && ['Enter', 'Backspace', 'Escape'].includes(code))) {
      return;
    }
    setTimeout(() => {
      if (!inputDropdown.isOpen) {
        inputDropdown.toggle();
      }
    });
  }

  closeMenu(inputDropdown: DropDownDirective) {
    if (inputDropdown.isOpen) {
      inputDropdown.toggle();
    }
  }

  backspaceEvent(inputDropdown: DropDownDirective) {
    if (this.searchKey) {
      return;
    }
    if (this.currentSelectTag) {
      this.currentSelectTag = undefined;
      this.closeMenu(inputDropdown);
      return;
    }
    if (this.selectedTags.length) {
      const tag = this.selectedTags[this.selectedTags.length - 1];
      this.removeTag(tag);
    }
    this.closeMenu(inputDropdown);
  }

  canChange(tag: ICategorySearchTagItem, operation: 'delete' | 'add') {
    let changeResult = Promise.resolve(true);
    if (this.beforeTagChange) {
      const result: any = this.beforeTagChange(tag, this.searchKey, operation);
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

  finishChoose() {
    this.currentSelectTag = undefined;
    this.inputEle.nativeElement.focus();
  }

  clearFilter(event: MouseEvent) {
    if (this.selectedTags.length) {
      this.selectedTags.forEach((item) => this.resetValue(item));
      this.selectedTags = [];
    }
    if (this.searchKey || this.searchKeyCache) {
      this.searchKey = '';
      this.searchKeyCache = '';
    }
    if (this.currentSelectTag) {
      this.currentSelectTag = undefined;
    }
    this.selectedTagsChange.emit({ selectedTags: [], currentChangeTag: undefined, operation: 'clear' });
    this.clearAllEvent.emit(event);
    this.initCategoryDisplay();
  }

  resolveCategoryDisplay(tag: ICategorySearchTagItem, type: string) {
    if (tag.field === 'devuiCategorySearchKeyword' || !this.categoryDictionary[tag.field]) {
      return;
    }
    this.handleGroupLength(tag, type === 'delete');
    this.categoryDictionary[tag.field].isSelected = type === 'delete';
  }

  createFilterFn() {
    this.createFilterEvent.emit({ name: this.filterName, selectedTags: this.getSelectedTagsExceptKeyword(), keyword: this.searchKey });
    setTimeout(() => {
      this.filterName = '';
    }, this.DELAY);
  }

  createFilterInputAutoFocus(dropdown: DropDownDirective, inputElm: HTMLElement, filterNameForm: NgForm) {
    if (dropdown.isOpen) {
      filterNameForm.form.reset();
      setTimeout(() => inputElm.focus());
    }
  }

  searchKeyChangeEvent(event: string) {
    this.searchKey = event;
    this.enterSearch = !!event;
    this.currentSearchCategory = event ? this.category.filter((item) => item['label'].toLowerCase().includes(event.toLowerCase())) : [];
    this.searchKeyChange.emit(event);
  }

  checkType(tag: ICategorySearchTagItem) {
    return tag && tag.type === 'radio' ? 'all' : 'blank';
  }

  resetValue(tag: ICategorySearchTagItem) {
    tag.value = this.valueIsArrayTypes.includes(tag.type) ? { value: [] } : { value: undefined };
    tag.value[tag.filterKey || 'label'] = undefined;
    return tag;
  }

  afterDropdownClosed() {
    setTimeout(() => {
      this.currentSelectTag = undefined;
    }, this.DROPDOWN_ANIMATION_TIMEOUT + 100);
  }

  /* 各类型模板调用方法 */
  // radio 单选 处理选中项方法
  chooseItem(tag: ICategorySearchTagItem, chooseItem: ITagOption) {
    this.afterDropdownClosed();
    const key = tag.filterKey || 'label';
    tag.value = { value: chooseItem, cache: cloneDeep(chooseItem) };
    tag.value[key] = chooseItem[key];
    tag.title = this.setTitle(tag, 'radio');
    this.updateSelectedTags(tag);
  }

  confirmDate(datepicker: DatepickerProCalendarComponent, tag: ICategorySearchTagItem, dropdown: DropDownDirective) {
    if (!tag.value.value) {
      return;
    }
    if (datepicker.currentActiveInput === 'start') {
      datepicker.focusChange('end');
    } else if (!tag.value.value[0]) {
      datepicker.focusChange('start');
    } else if (tag.value.value.length > 1) {
      this.closeMenu(dropdown);
      this.afterDropdownClosed();
      const start = tag.value.value[0] as Date;
      const end = tag.value.value[1] as Date;
      tag.value.cache = cloneDeep(tag.value.value);
      tag.value[tag.filterKey || 'label'] = tag.showTime
        ? `${this.dateConverter.formatDateTime(start)} - ${this.dateConverter.formatDateTime(end)}`
        : `${this.dateConverter.format(start)} - ${this.dateConverter.format(end)}`;
      tag.title = this.setTitle(tag, 'dateRange');
      this.updateSelectedTags(tag);
    }
  }

  // checkbox | label 多选 处理选中项方法
  chooseItems(tag: ICategorySearchTagItem) {
    this.afterDropdownClosed();
    const key = tag.filterKey || 'label';
    const result = this.getItemValue(tag.value.value, key);
    if (result) {
      tag.title = this.setTitle(tag, 'checkbox', result);
      tag.value[key] = result;
      tag.value.cache = cloneDeep(tag.value.value);
      this.updateSelectedTags(tag);
    } else {
      this.removeTag(tag);
    }
  }

  // checkbox | label 将选中项对应filterKey的值合并的方法，当前多选已通过data展示，可考虑移除
  getItemValue(value: any, key: string) {
    if (value && Array.isArray(value)) {
      const result = value.map((item) => item[key]);
      return result.join(',');
    }
  }

  // checkbox | label 当下拉菜单展开重置多选的选中状态
  resetContent(dropdown: DropDownDirective, tag?: ICategorySearchTagItem) {
    const tagItem = tag || this.currentSelectTag || { type: '', options: [] };
    if (this.blurTimer) {
      clearTimeout(this.blurTimer);
    }
    if (this.toggleEvent) {
      this.toggleEvent(dropdown, tag, this.currentSelectTag);
    }
    if (dropdown.isOpen) {
      this.currentOpenDropdown = dropdown;
      if (tag?.type === 'keyword') {
        this.searchKey = this.searchKeyCache;
        this.searchKeyChangeEvent(this.searchKey);
        this.inputEle.nativeElement.focus();
        dropdown.isOpen = false;
      }
    } else {
      this.clearCurrentSelectTagFromSearch();
      this.currentOpenDropdown = undefined;
      this.showNoDataTips = false;
      this.resetTreeRender(dropdown, tagItem, false);
      return;
    }
    if (tag) {
      this.scrollToTailFlag = false;
      this.resetTreeRender(dropdown, tagItem, true);
      if (!isEqual(tag.value.value, tag.value.cache)) {
        tag.value.value = cloneDeep(tag.value.cache);
        this.handleAccordingType(tag.type, tag.value.options);
      }
    } else if (this.currentSelectTag) {
      this.currentSelectTag.value.value = this.valueIsArrayTypes.includes(this.currentSelectTag.type) ? [] : undefined;
      this.resetTreeRender(dropdown, tagItem, true, true);
      this.handleAccordingType(this.currentSelectTag.type, this.currentSelectTag.options);
      this.scrollToTailFlag = true;
    }
    this.showNoDataTips = this.categoryDisplay.every((item) => item.isSelected);
  }

  resetTreeRender(dropdown: DropDownDirective, tag: any, flag: boolean, isCurrentSelectTag?: boolean) {
    if (tag.type === 'treeSelect') {
      setTimeout(() => {
        this.treeResetFlag = isCurrentSelectTag ? false : flag;
        if (!flag) {
          this.treeSearch('');
          return;
        }
        if (tag.searchable) {
          const dom = dropdown.menuEl.nativeElement.querySelector('.devui-search-container .devui-search>input');
          if (dom) {
            dom.focus();
          }
        }
      }, this.DELAY);
    }
  }

  showCurrentSearchCategory(tag: ICategorySearchTagItem, inputDropdown: DropDownDirective) {
    this.isSearchCategory = true;
    this.searchKey = '';
    this.closeMenu(inputDropdown);
    this.chooseCategory(tag, inputDropdown);
    setTimeout(() => this.checkInputSearching(), this.DELAY);
  }

  clearCurrentSelectTagFromSearch() {
    if (this.currentSelectTag) {
      if (this.isSearchCategory) {
        this.isSearchCategory = false;
        setTimeout(() => this.finishChoose(), this.DELAY);
      }
    }
  }

  handleAccordingType(type: string, options: any[]) {
    switch (type) {
    case 'treeSelect':
      options = cloneDeep(options);
      break;
    case 'textInput':
      setTimeout(() => {
        const inputDom: HTMLElement = this.document.querySelector('.devui-category-search-type-text-input');
        if (inputDom) {
          inputDom.focus();
        }
      }, this.DROPDOWN_ANIMATION_TIMEOUT);
      break;
    default:
    }
  }

  // label 合并名称和颜色字段赋给tag，待[tag]支持传入对象后可移除
  mergeToLabel(obj: any) {
    if (obj?.options && Array.isArray(obj.options)) {
      obj.options.forEach((item) => {
        item.$label = `${item[obj.filterKey || 'label']}_${item[obj.colorKey || 'color']}`;
      });
    }
    return obj;
  }

  // label 拆分名称和颜色用于下拉选项显示
  splitLabel(key: string, value: any) {
    // 初始化选中类别生成标签时，value为label的对象，不需要对值进行操作
    if (typeof value !== 'string') {
      return;
    }
    const res = value && value.split('_');
    const obj = res && { label: res[0], color: res[1] };
    return obj && obj[key];
  }

  // textInput 文本输入框 处理选中项方法
  getTextInputValue(tag: ICategorySearchTagItem) {
    this.afterDropdownClosed();
    tag.value[tag.filterKey || 'label'] = tag.value.cache = tag.value.value;
    tag.title = this.setTitle(tag, 'textInput');
    this.updateSelectedTags(tag);
  }

  // numberRange 数字范围 处理选中项方法
  getNumberRangeValue(tag: ICategorySearchTagItem) {
    this.afterDropdownClosed();
    const startNum = tag.value.value[0] || 0;
    const endNum = tag.value.value[1] || 0;
    tag.value.value = [startNum, endNum];
    tag.value.cache = [startNum, endNum];
    tag.value[tag.filterKey || 'label'] = `${startNum} - ${endNum}`;
    tag.title = this.setTitle(tag, 'numberRange');
    this.updateSelectedTags(tag);
  }

  // treeSelect 树 处理选中项方法
  getTreeValue(tag: ICategorySearchTagItem) {
    this.afterDropdownClosed();
    const result = [];
    const selectedIds = [];
    const data = tag.value.value as ITagOption[];
    data.forEach((item) => {
      result.push(item[tag.filterKey || tag.treeNodeTitleKey || 'title']);
      selectedIds.push(item[tag.treeNodeIdKey || 'id']);
    });
    if (result.length) {
      tag.value.options = cloneDeep(tag.options);
      tag.value.cache = cloneDeep(tag.value.value);
      tag.value[tag.filterKey || 'label'] = result.join(',');
      tag.title = this.setTitle(tag, 'treeSelect');
      if (tag.multiple) {
        const halfCheckedIds = [];
        this.treeInstance.nodes.forEach((item) => item.data.halfChecked && halfCheckedIds.push(item.id));
        this.updateTreeData(tag, tag.value.options, selectedIds, halfCheckedIds);
      }
      this.updateSelectedTags(tag);
    } else {
      this.removeTag(tag);
    }
  }

  updateTreeData(tag: ICategorySearchTagItem, data: ITagOption[], selectedIds: string[], halfCheckedIds: string[]) {
    data.forEach((item) => {
      const itemId = item[tag.treeNodeIdKey || 'id'];
      const childData = item[tag.treeNodeChildrenKey || 'children'];
      item.isChecked = selectedIds.includes(itemId);
      item.halfChecked = halfCheckedIds.includes(itemId);
      if (childData && childData.length) {
        this.updateTreeData(tag, childData, selectedIds, halfCheckedIds);
      }
    });
  }

  onOperableNodeChecked(selectedNodes: ITreeItem[], tag: ICategorySearchTagItem) {
    const selectedValueExtractor = (nodes) => {
      return tag.leafOnly
        ? nodes.filter((node) => !node.data.isParent).map((node) => node.data.originItem)
        : nodes.map((node) => node.data.originItem);
    };
    if (tag.multiple) {
      tag.value.value = selectedValueExtractor(selectedNodes);
    }
  }

  onOperableNodeSelected(selectedNode: ITreeItem, tag: ICategorySearchTagItem) {
    if (tag.multiple || (tag.leafOnly && selectedNode.data.isParent)) {
      return;
    }
    if (selectedNode.data.isActive) {
      tag.value.value = [selectedNode.data.originItem];
      this.getTreeValue(tag);
    } else {
      selectedNode.data.isActive = true;
    }
  }

  treeSearch(value: string, searchFn?: Function) {
    this.treeSearchKey = value;
    if (this.treeInstance) {
      const searchRes = searchFn
        ? searchFn(this.treeSearchKey, this.treeInstance)
        : this.treeInstance.treeFactory.searchTree(this.treeSearchKey, true);
      if (typeof searchRes === 'boolean') {
        this.treeNoRecord = searchRes;
      } else if (Array.isArray(searchRes)) {
        this.treeNoRecord = searchRes.every((res) => !res);
      }
      this.treeInstance.treeFactory.getFlattenNodes();
    }
  }
}
