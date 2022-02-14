import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { DatepickerProCalendarComponent } from 'ng-devui/datepicker-pro';
import { DropDownDirective } from 'ng-devui/dropdown';
import { DValidateRules } from 'ng-devui/form';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { ITreeItem } from 'ng-devui/tree';
import { DefaultIcons } from 'ng-devui/tree-select';
import { DateConverter, DefaultDateConverter } from 'ng-devui/utils';
import { cloneDeep, isEqual } from 'lodash-es';
import { fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';
import { CreateFilterEvent, ICategorySearchTagItem, SearchEvent, SelectedTagsEvent } from './category-search.type';

@Component({
  selector: 'd-category-search',
  templateUrl: './category-search.component.html',
  styleUrls: ['./category-search.component.scss'],
})
export class CategorySearchComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  static ID_SEED = 0;
  @Input() category: Array<ICategorySearchTagItem>;
  @Input() defaultSearchField = [];
  @Input() selectedTags: Array<ICategorySearchTagItem> = [];
  @Input() allowClear = true;
  @Input() allowSave = true;
  @Input() allowShowMore = false;
  @Input() toggleScrollToTail = false;
  @Input() searchKey = '';
  @Input() placeholderText;
  @Input() inputReadOnly = false;
  @Input() showSearchCategory = true; // 是否显示搜索关键字下拉菜单
  @Input() categoryInGroup = false; // 是否按组别显示分类下拉列表
  @Input() groupOrderConfig: Array<string>; // 用户配置组顺序
  @Input() customGroupNameTemplate: TemplateRef<any>; // 用户自定义组名称显示模板
  @Input() tagMaxWidth: number;
  @Input() filterNameRules: DValidateRules = [];
  @Input() beforeTagChange: (tag, searchKey, operation) => boolean | Promise<boolean> | Observable<boolean>;
  @Input() toggleEvent: (dropdown, tag?, currentSelectTag?) => void;
  @Output() searchEvent = new EventEmitter<SearchEvent>();
  @Output() selectedTagsChange = new EventEmitter<SelectedTagsEvent>();
  @Output() createFilterEvent = new EventEmitter<CreateFilterEvent>();
  @Output() clearAllEvent = new EventEmitter<MouseEvent>();
  @Output() searchKeyChange = new EventEmitter<String>();
  @ViewChild('InputEle') inputEle: ElementRef;
  @ViewChild('ScrollBarContainer') scrollBarContainer: ElementRef;
  @ViewChild('PrimeContainer') PrimeContainerRef: ElementRef;
  @ViewChildren('selectedDropdown') selectedDropdownList: QueryList<DropDownDirective>;
  @ViewChildren(DatepickerProCalendarComponent) datePickers: QueryList<DatepickerProCalendarComponent>;
  @ViewChildren(DatepickerProCalendarComponent, { read: ElementRef }) datePickerElements: QueryList<ElementRef>;
  public currentSelectTag = undefined;
  public currentTag: ICategorySearchTagItem;
  public searchField;
  public id: number;
  dateConverter: DateConverter;
  filterName = '';
  treeSearchKey = '';
  searchKeyCache = '';
  enterSearch = false;
  isShowSavePanel = false;
  isHover = false;
  isFocus = false;
  noRecord = false;
  showNoDataTips = false;
  icons = DefaultIcons;
  destroy$ = new Subject();
  i18nCommonText: I18nInterface['common'];
  i18nCategorySearchText: I18nInterface['categorySearch'];
  currentSearchCategory: Array<ICategorySearchTagItem>;
  categoryDisplay: Array<ICategorySearchTagItem>;
  currentScrollTagIndex: number; // 当前要滚动至的标签索引
  scrollTimeout: any; // 如果标签在可视范围内则延时展开下拉的定时器
  scrollToTailFlag = true; // 是否在更新标签内容后滚动至输入框的开关
  DROPDOWN_ANIMATION_TIMEOUT = 200; // 下拉动画延迟
  document: Document;
  get showFilterNameClear() {
    return typeof this.filterName === 'string' && this.filterName.length > 0;
  }

  constructor(private i18n: I18nService, private elm: ElementRef, @Inject(DOCUMENT) private doc: any) {
    this.dateConverter = new DefaultDateConverter();
    this.id = CategorySearchComponent.ID_SEED++;
    this.document = this.doc;
  }

  ngOnInit() {
    this.setI18nText();
    this.setSearchKeyTag();
    this.setTagsMaxWidth();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['defaultSearchField'] || changes['category'] || changes['selectedTags']) {
      this.getDefaultSearchField();
    }
  }

  ngAfterViewInit() {
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
          }),
          // 300毫秒内不再触发滚动事件则展开下拉列表
          debounceTime(300)
        )
        .subscribe((event) => this.openCurrentScrollTagMenu(event));
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setI18nText() {
    this.i18nCommonText = this.i18n.getI18nText().common;
    this.i18nCategorySearchText = this.i18n.getI18nText().categorySearch;
    this.i18n
      .langChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.i18nCommonText = data.common;
        this.i18nCategorySearchText = data.categorySearch;
      });
  }

  // 插入tag max-width 样式控制是否显示省略号
  setTagsMaxWidth() {
    if (this.tagMaxWidth) {
      const rule = `.devui-category-search-id-${this.id} .devui-tag-container d-tag>.devui-tag-item>span{max-width:${this.tagMaxWidth}px}`;
      const style = this.document.createElement('style');
      style.innerText = rule;
      this.document.head.appendChild(style);
    }
  }

  setSearchKeyTag() {
    const result = this.selectedTags.filter((item) => item.field !== 'devuiCategorySearchKeyword');
    if (this.searchKey && !this.currentSelectTag) {
      const label = this.i18nCategorySearchText['keyword'];
      const value = [{ label: this.searchKey }];
      const searchKeyTag = {
        options: [],
        field: 'devuiCategorySearchKeyword',
        label: label,
        type: 'keyword',
        title: `${label}:${this.searchKey}`,
        value: {
          label: this.searchKey,
        },
      };
      this.updateSelectedTags(searchKeyTag, true, result);
      this.searchKeyCache = this.searchKey;
    }
    this.searchKey = '';
    setTimeout(() => {this.enterSearch = false;}, 300);
    return result;
  }

  // 初始化数据
  getDefaultSearchField() {
    this.setValue(this.category);
    this.setValue(this.selectedTags);
    this.initCategoryDisplay();
    if (this.defaultSearchField && this.defaultSearchField.length) {
      this.searchField = this.category.filter((item) => this.defaultSearchField.includes(item.field));
    }
    // 初始化时判断已选中分类中最后一项是否赋值，未赋值则识别为正在处理的分类，优先显示赋值下拉列表
    if (this.selectedTags.length) {
      const [lastItem] = this.selectedTags.slice(-1);
      const isNull = lastItem.value[lastItem.filterKey || 'label'] === undefined;
      this.currentSelectTag = isNull && (lastItem.value.value === undefined || lastItem.value.value === []) ? lastItem : undefined;
    }
  }

  // 初始化tag的value属性：{filterKey | label, value, data}
  initCategoryItem(item) {
    const preValue = item.type === 'numberRange' || item.type === 'treeSelect' ? { value: [] } : { value: undefined };
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
    const result = (item.type === 'checkbox' || item.type === 'label') && this.getItemValue(item.value.value, item.filterKey || 'label');
    item.title = this.setTitle(item, item.type, result);
    return item;
  }

  setValue(data) {
    if (data && Array.isArray(data) && data.length) {
      data.forEach((item) => {item = this.initCategoryItem(item);});
    }
  }

  setTitle(tag: ICategorySearchTagItem, type: string, result?: string) {
    return type === 'checkbox' || type === 'label'
      ? `${tag.label}: ${result || ''}`
      : `${tag.label}: ${(tag.value && tag.value[tag.filterKey || 'label']) || ''}`;
  }

  initCategoryDisplay() {
    const selectedTagsField = this.selectedTags.map((item) => item.field);
    if (this.categoryInGroup) {
      const groupObj = {};
      this.category.forEach((item) => this.insertCategoryToGroup(item.group, groupObj, item, selectedTagsField.indexOf(item.field) === -1));
      const keys = this.groupOrderConfig || Object.keys(groupObj);
      this.categoryDisplay = [];
      keys.forEach((key) => {
        if (groupObj[key]) {
          const groupItem = <ICategorySearchTagItem>{};
          groupItem.groupName = key;
          groupItem.groupLength = groupObj[key].length;
          this.categoryDisplay.push(groupItem, ...groupObj[key]);
        }
      });
    } else {
      this.categoryDisplay =
        selectedTagsField && selectedTagsField.length
          ? this.category.filter((item) => selectedTagsField.indexOf(item.field) === -1)
          : this.category;
    }
  }

  insertCategoryToGroup(groupName, groupObj, item, isInsert) {
    if (!groupName) {
      return;
    }
    groupObj[groupName] = groupObj[groupName] || [];
    if (isInsert) {
      groupObj[groupName].push(item);
    }
  }

  search() {
    const result = this.setSearchKeyTag();
    this.searchEvent.emit({ selectedTags: result, searchKey: this.searchKeyCache });
    this.isFocus = true;
  }

  searchCategory(item) {
    const validField = item;
    this.updateFieldValue(validField, this.searchKey);
    this.updateSelectedTags(validField);
    this.searchKey = '';
    this.inputEle.nativeElement.focus();
  }

  searchInputValue(event) {
    event.preventDefault();
    event.stopPropagation();
    const result = this.setSearchKeyTag();
    this.searchEvent.emit({ selectedTags: result, searchKey: this.searchKeyCache });
  }

  chooseCategory(item, inputDropdown: DropDownDirective) {
    // 点选分组名称不处理
    if (item.groupLength !== undefined) {
      return;
    }
    setTimeout(() => {
      this.currentSelectTag = item;
      if (this.currentSelectTag.type === 'label') {
        this.currentSelectTag = this.mergeToLabel(this.currentSelectTag);
      }
      inputDropdown.isOpen = true;
    }, this.DROPDOWN_ANIMATION_TIMEOUT);
    this.updateSelectedTags(item, false);
  }

  updateSelectedTags(tag, valueChanged = true, result?: any) {
    this.canChange(tag, 'add').then((val) => {
      if (!val) {
        return;
      }
      const index = this.selectedTags.map((item) => item.field).indexOf(tag.field);
      if (index > -1) {
        this.selectedTags[index] = tag;
      } else {
        this.selectedTags.push(tag);
      }
      this.resolveCategoryDisplay(tag, 'delete');
      if (valueChanged) {
        // 只在新增标签时位移滚动条
        if (this.scrollToTailFlag) {
          setTimeout(() => this.scrollToTail());
        }
        this.selectedTagsChange.emit({ selectedTags: result || this.selectedTags, currentChangeTag: tag, operation: 'add' });
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
      this.scrollTimeout = setTimeout(() => this.openCurrentScrollTagMenu(event), 300);
    }
  }

  openCurrentScrollTagMenu(event) {
    if (this.currentScrollTagIndex !== undefined) {
      const dropdownArr = this.selectedDropdownList.toArray();
      this.openMenu(dropdownArr[this.currentScrollTagIndex], event);
      this.currentScrollTagIndex = undefined;
    } else {
      this.inputEle.nativeElement.focus();
    }
  }

  updateFieldValue(field, value) {
    field.value[field.filterKey || 'label'] = value;
    field.value.value = value;
    field.value.cache = cloneDeep(field.value.value);
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
      if (tag.type !== 'keyword') {
        this.selectedTagsChange.emit({ selectedTags: this.selectedTags, currentChangeTag: tag, operation: 'delete' });
        this.resolveCategoryDisplay(tag, 'add');
      } else {
        this.searchKeyCache = '';
        this.searchEvent.emit({ selectedTags: this.selectedTags, searchKey: '' });
      }
      this.currentSelectTag = undefined;
    });
  }

  checkInputSearching(event) {
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

  openMenu(inputDropdown: DropDownDirective, event) {
    if (inputDropdown.isOpen || (event.type === 'keyup' && (event.code === 'Enter' || event.code === 'Backspace'))) {
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

  backspaceEvent(inputDropdown) {
    if (this.searchKey) {
      return;
    }
    if (this.currentSelectTag) {
      this.currentSelectTag = undefined;
      this.closeMenu(inputDropdown);
      return;
    }
    this.canChange(this.selectedTags[this.selectedTags.length - 1], 'delete').then((val) => {
      if (!val) {
        return;
      }
      const changeTag = this.selectedTags.pop();
      this.resolveCategoryDisplay(changeTag, 'add');
      if (changeTag) {
        this.selectedTagsChange.emit({ selectedTags: this.selectedTags, currentChangeTag: changeTag, operation: 'delete' });
      }
    });
    this.closeMenu(inputDropdown);
  }

  canChange(tag, operation: 'delete' | 'add') {
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

  clearFilter(event) {
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

  resolveCategoryDisplay(tag, type) {
    if (tag && type === 'add') {
      if (this.categoryInGroup) {
        const groupIndex = this.categoryDisplay.findIndex((item) => item.groupName === tag.group);
        this.categoryDisplay[groupIndex].groupLength++;
        this.categoryDisplay.splice(groupIndex + 1, 0, tag);
      } else {
        this.categoryDisplay.push(tag);
      }
    }
    if (type === 'delete') {
      if (this.categoryInGroup) {
        const tagIndex = this.categoryDisplay.findIndex((item) => item.field === tag.field);
        if (tagIndex >= 0) {
          const groupIndex = this.categoryDisplay.findIndex((item) => item.groupName === tag.group);
          this.categoryDisplay[groupIndex].groupLength--;
          this.categoryDisplay.splice(tagIndex, 1);
        }
      } else {
        this.categoryDisplay = this.categoryDisplay.filter((item) => item.field !== tag.field);
      }
    }
  }

  createFilterFn() {
    this.createFilterEvent.emit({ name: this.filterName, selectedTags: this.selectedTags, keyword: this.searchKey });
    this.filterName = '';
  }

  createFilterInputAutoFocus(dropdown, inputElm, filterNameForm) {
    if (dropdown.isOpen) {
      filterNameForm.form.reset();
      setTimeout(() => inputElm.focus());
    }
  }

  searchKeyChangeEvent(event) {
    this.enterSearch = !!event;
    this.currentSearchCategory = this.category.filter((item) => item['label'].toLowerCase().includes(event.toLowerCase()));
    this.searchKeyChange.emit(event);
  }

  checkType(value) {
    return value && value.type === 'radio' ? 'all' : 'blank';
  }

  resetValue(tag) {
    tag.value = tag.type === 'numberRange' || tag.type === 'treeSelect' ? { value: [] } : { value: undefined };
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
  chooseItem(tag, chooseItem) {
    this.afterDropdownClosed();
    tag.value = chooseItem;
    tag.value.cache = tag.value.value;
    tag.title = this.setTitle(tag, 'radio');
    this.updateSelectedTags(tag);
  }

  confirmDate(tag) {
    this.afterDropdownClosed();
    tag.value.cache = cloneDeep(tag.value.value);
    tag.value[tag.filterKey || 'label'] = tag.showTime
      ? this.dateConverter.formatDateTime(tag.value.value[0]) + ' - ' + this.dateConverter.formatDateTime(tag.value.value[1])
      : this.dateConverter.format(tag.value.value[0]) + ' - ' + this.dateConverter.format(tag.value.value[1]);
    tag.title = this.setTitle(tag, 'dateRange');
    this.updateSelectedTags(tag);
  }

  dateValueChange(tag, datepickerpro: DatepickerProCalendarComponent) {
    const index = datepickerpro.currentActiveInput === 'start' ? 0 : 1;
    if (tag.value.value) {
      tag.value.value[index] = datepickerpro.curActiveDate;
    } else {
      tag.value.value = [datepickerpro.curActiveDate];
    }
  }

  // checkbox | label 多选 处理选中项方法
  chooseItems(tag) {
    this.afterDropdownClosed();
    const result = this.getItemValue(tag.value.value, tag.filterKey || 'label');
    if (result) {
      tag.title = this.setTitle(tag, 'checkbox', result);
      tag.value[tag.filterKey || 'label'] = result;
      tag.value.cache = cloneDeep(tag.value.value);
      this.updateSelectedTags(tag);
    } else {
      this.removeTag(tag);
    }
  }

  // checkbox | label 将选中项对应filterKey的值合并的方法，当前多选已通过data展示，可考虑移除
  getItemValue(value, key) {
    if (value && Array.isArray(value)) {
      const result = value.map((item) => item[key]);
      return result.join(',');
    }
  }

  // checkbox | label 当下拉菜单展开重置多选的选中状态
  resetContent(dropdown: DropDownDirective, tag?: any) {
    if (this.toggleEvent) {
      this.toggleEvent(dropdown, tag, this.currentSelectTag);
    }
    if (dropdown.isOpen && tag?.type === 'keyword') {
      this.searchKey = this.searchKeyCache;
      this.inputEle.nativeElement.focus();
      dropdown.isOpen = false;
    }
    if (!dropdown.isOpen) {
      this.showNoDataTips = false;
      return;
    }
    if (tag) {
      this.scrollToTailFlag = false;
      if (!isEqual(tag.value.value, tag.value.cache)) {
        tag.value.value = cloneDeep(tag.value.cache);
        this.handleAccordingType(tag.type, tag.value.options);
      }
      if (tag.type === 'dateRange') {
        // 由于datePicker无法初始化显示已有时间，需通过实例调用updateCurPosition方法渲染，因此通过field识别当前显示实例并调用
        const datePickerItem =
          this.datePickers.length > 1
            ? this.datePickers.find((v, i) => this.datePickerElements.toArray()[i]?.nativeElement?.id === tag.field)
            : this.datePickers.first;
        datePickerItem.updateCurPosition();
      }
    } else if (this.currentSelectTag) {
      const isArrayType = this.currentSelectTag.type === 'numberRange' || this.currentSelectTag.type === 'treeSelect';
      this.currentSelectTag.value.value = isArrayType ? [] : undefined;
      this.handleAccordingType(this.currentSelectTag.type, this.currentSelectTag.options);
      this.scrollToTailFlag = true;
    }
    this.showNoDataTips = this.categoryDisplay.length === 0 || !this.categoryDisplay.some((item) => item && item.groupLength === undefined);
  }

  handleAccordingType(type, options) {
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
  mergeToLabel(obj) {
    if (obj && obj.options && Array.isArray(obj.options)) {
      obj.options.map((item) => {item.$label = `${item[obj.filterKey || 'label']}_${item[obj.colorKey || 'color']}`;});
    }
    return obj;
  }

  // label 拆分名称和颜色用于下拉选项显示
  splitLabel(key, value) {
    // 初始化选中类别生成标签时，value为label的对象，不需要对值进行操作
    if (typeof value !== 'string') {
      return;
    }
    const res = value && value.split('_');
    const obj = res && { label: res[0], color: res[1] };
    return obj && obj[key];
  }

  // textInput 文本输入框 处理选中项方法
  getTextInputValue(tag) {
    this.afterDropdownClosed();
    tag.value[tag.filterKey || 'label'] = tag.value.cache = tag.value.value;
    tag.title = this.setTitle(tag, 'textInput');
    this.updateSelectedTags(tag);
  }

  // numberRange 数字范围 处理选中项方法
  getNumberRangeValue(tag) {
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
  getTreeValue(tag, tree) {
    this.afterDropdownClosed();
    const result = [];
    const selectedIds = [];
    tag.value.value.forEach((item) => {
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
        tree.nodes.forEach((item) => item.data.halfChecked && halfCheckedIds.push(item.id));
        this.updateTreeData(tag, tag.value.options, selectedIds, halfCheckedIds);
      }
      this.updateSelectedTags(tag);
    } else {
      this.removeTag(tag);
    }
  }

  updateTreeData(tag, data, selectedIds, halfCheckedIds) {
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

  onOperableNodeSelected(selectedNode: ITreeItem, tag: ICategorySearchTagItem, tree) {
    if (tag.multiple || (tag.leafOnly && selectedNode.data.isParent)) {
      return;
    }
    if (selectedNode.data.isActive) {
      tag.value.value = [selectedNode.data.originItem];
      this.getTreeValue(tag, tree);
    } else {
      selectedNode.data.isActive = true;
    }
  }

  treeSearch(tree, value) {
    tree.operableTree.treeFactory.searchTree(value, true);
  }

  clearSearchKey() {
    this.searchKey = '';
  }
}
