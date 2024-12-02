import { ConnectedPosition } from '@angular/cdk/overlay';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
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
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { ToggleMenuContainerComponent, ToggleMenuListComponent, ToggleMenuSearchComponent } from 'ng-devui/toggle-menu';
import { AppendToBodyDirection, AppendToBodyScrollStrategyType, DevConfigService, WithConfig } from 'ng-devui/utils';
import { isEmpty } from 'lodash-es';
import { BehaviorSubject, fromEvent, Observable, of, Subscription } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'd-tags-input',
  templateUrl: './tags.input.component.html',
  styleUrls: ['./tags.input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagsInputComponent),
      multi: true,
    },
  ],
  exportAs: 'TagsInput',
  preserveWhitespaces: false,
})
export class TagsInputComponent implements ControlValueAccessor, OnInit, OnDestroy, OnChanges, AfterViewInit {
  /**
   * 【必选】记录输入的标签
   */
  @Input() tags = [];
  /**
   * 【可选】disabled 灰化状态
   */
  @Input() disabled = false;
  /**
   * 【可选】使用的属性名
   */
  @Input() displayProperty = 'name';
  /**
   * 【可选】输入的placeholder
   */
  @Input() placeholder = '';
  /**
   * 【可选】达到最大值时可自定义placeholder
   */
  @Input() maxPlaceholder: string;
  /**
   * 【可选】输入标签的最小长度
   */
  @Input() minLength = 3;
  /**
   * 【可选】输入标签的最大长度, 524288为 input 支持最大值
   */
  @Input() maxLength = 524288;
  /**
   * 【可选】标签的最小个数
   */
  @Input() minTags = 0;
  /**
   * 【可选】标签的最大个数
   */
  @Input() maxTags: number = Number.MAX_SAFE_INTEGER;
  /**
   * 【可选】输入框的spellcheck
   */
  @Input() spellcheck = true;
  /**
   * 【可选】是否appendToBody
   */
  @Input() appendToBody = false;
  @Input() appendToBodyDirections: Array<AppendToBodyDirection | ConnectedPosition> = ['rightDown', 'leftDown', 'rightUp', 'leftUp'];
  @Input() @WithConfig() appendToBodyScrollStrategy: AppendToBodyScrollStrategyType;
  /**
   * 【可选】是否虚拟滚动
   */
  @Input() virtualScroll = false;
  /**
   * 【可选】是否使用下拉列表
   */
  @Input() showSuggestion = true;
  /**
   * 【可选】下拉选项
   */
  @Input() suggestionList: any = [];
  /**
   * 【可选】是否按空格添加tag
   */
  @Input() isAddBySpace = true;
  /**
   * 【可选】默认两行显示，false 则单行显示
   */
  @Input() multiline = true;
  /**
   * 【可选】已选中标签容器最大高度
   */
  @Input() maxHeight: string;
  @Input() generateOptionFromInput = true;
  /**
   * 【可选】大小写敏感
   */
  @Input() caseSensitivity = false;
  @Input() itemTemplate: TemplateRef<any>;
  @Input() tagTemplate: TemplateRef<any>;
  @Input() noResultItemTemplate: TemplateRef<any>;
  @Input() checkBeforeGenerate: (newTag: string) => boolean;
  @Input() checkBeforeAdd: (newTag: string) => boolean | Promise<boolean> | Observable<boolean>;
  @Input() @WithConfig() showAnimation = true;
  @Input() @WithConfig() styleType = 'default';
  /**
   * 输出函数，当选中某个选项项后，将会调用此函数，参数为当前选择项的值。如果需要获取所有选择状态的值，请参考(ngModelChange)方法
   */
  @Output() valueChange = new EventEmitter<any>();
  @Output() searchChange = new EventEmitter<any>();
  @ViewChild('tagsInputWrapper', { static: true }) tagsInputWrapperItem: ElementRef;
  @ViewChild(ToggleMenuContainerComponent) selectBoxContainer: ToggleMenuContainerComponent;
  @ViewChild(ToggleMenuListComponent) selectBox: ToggleMenuListComponent;
  @ViewChild(ToggleMenuSearchComponent) searchBox: ToggleMenuSearchComponent;

  get getPlaceHolder() {
    const maxPlaceholder =
      this.maxPlaceholder === undefined ? `${this.i18nTagsInputText.tagsReachMaxNumber}${this.maxTags}` : this.maxPlaceholder;
    return this.selectedItems.length >= this.maxTags ? maxPlaceholder : this.placeholder;
  }

  newTag = '';
  availableOptions = [];
  selectedItems = [];
  /**
   * 对于用户传入的suggestionList不做修改，数据的操作在_suggestionList上进行
   */
  _suggestionList = [];
  newTagValid = false;
  isReduce = false;
  isOpen = false;
  inputEvent: any;
  blurEventSubscription: Subscription;
  valueParser: (item: any) => any;
  searchFn: (term: string) => Observable<Array<{ id: string | number; option: any }>>;

  private DEBOUNCE_TIME = 300;
  private sourceSubscription: BehaviorSubject<any>;
  private KEYS: any = {
    backspace: 8,
    tab: 9,
    enter: 13,
    escape: 27,
    space: 32,
    up: 38,
    down: 40,
    left: 37,
    right: 39,
    delete: 46,
    comma: 188,
  };
  private i18nSubscription: Subscription;
  public i18nCommonText: I18nInterface['common'];
  public i18nTagsInputText: I18nInterface['tagsInput'];
  private onChange = (_: any) => null;
  private onTouch = () => null;

  constructor(private i18n: I18nService, private devConfigService: DevConfigService, private cdr: ChangeDetectorRef) {}

  private setI18nText() {
    this.i18nCommonText = this.i18n.getI18nText().common;
    this.i18nTagsInputText = this.i18n.getI18nText().tagsInput;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nCommonText = data.common;
      this.i18nTagsInputText = data.tagsInput;
    });
  }

  writeValue(value: any): void {
    if (!value) {
      return;
    }
    this.tags = value;
    this.isReduce = false;
    this.reduceSuggestionList();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  ngOnInit() {
    this.setI18nText();
    this.valueParser = (item) => {
      const str = String(item) ? item.toString() : '';
      const obj = typeof item === 'object' ? item[this.displayProperty] || '' : str;
      return this.tagTemplate ? item : obj;
    };
    this.newTag = '';
    this._suggestionList = [...this.suggestionList];
    this.searchFn = (term: any) => {
      const data = this.showSuggestion && this._suggestionList ? this._suggestionList : [];
      const matchItem = data.find((item) =>
        this.caseSensitivity ? item[this.displayProperty] === term : item[this.displayProperty].toLowerCase() === term.toLowerCase()
      );
      const result = data.filter((item) => {
        const str = this.caseSensitivity
          ? item[this.displayProperty].indexOf(term) !== -1
          : item[this.displayProperty].toLowerCase().indexOf(term.toLowerCase()) !== -1;
        return term === '' ? true : str;
      });
      return of(matchItem ? [matchItem] : result);
    };
    this.registerFilterChange();
  }

  ngAfterViewInit() {
    if (this.searchBox) {
      const inputDom = this.searchBox.el.nativeElement.querySelector('input');
      // input失焦不冒泡，直接监听事件处理会早于list中点击事件传递到该组件，因此增加debounceTime待下拉列表关闭后判断是否插入标签
      this.blurEventSubscription = fromEvent(inputDom, 'blur')
        .pipe(debounceTime(this.DEBOUNCE_TIME))
        .subscribe(() => {
          if (this.isOpen) {
            return;
          }
          if (this.generateOptionFromInput && !isEmpty(this.newTag)) {
            this.addTag();
          }
        });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.suggestionList && changes.suggestionList.currentValue) {
      this._suggestionList = [...this.suggestionList];
      this.reduceSuggestionList();
      if (this.sourceSubscription && this.searchFn) {
        this.sourceSubscription.next('');
      }
    }
    if (changes && changes.tags && changes.tags.currentValue) {
      this.reduceSuggestionList();
    }
  }

  ngOnDestroy() {
    if (this.sourceSubscription) {
      this.sourceSubscription.unsubscribe();
    }
    if (this.blurEventSubscription) {
      this.blurEventSubscription.unsubscribe();
    }
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();
    }
  }

  registerFilterChange() {
    this.sourceSubscription = new BehaviorSubject<any>('');
    this.sourceSubscription
      .pipe(
        map((term) => {
          this.tagIsValid();
          return term;
        }),
        switchMap((term) => this.searchFn(term))
      )
      .subscribe((options) => {
        this.availableOptions = options;
        const flag = this.checkBeforeGenerate?.(this.newTag);
        const flags = [this.generateOptionFromInput, !!this.newTag, this.newTagValid, flag];
        if (!flags.includes(false)) {
          const obj = { isDevuiTagsInputCreated: true };
          obj[this.displayProperty] = this.newTag;
          if (this.availableOptions.length && this.availableOptions[0].isDevuiTagsInputCreated) {
            this.availableOptions[0] = obj;
          } else {
            this.availableOptions.unshift(obj);
          }
        }
        if (this.selectBoxContainer) {
          this.selectBoxContainer.updatePosition();
        }
        if (this.selectBox) {
          this.selectBox.resetIndex(!options.length);
        }
      });
  }

  checkIsIncludes(option, item, isString?) {
    const key = this.displayProperty;
    const value = isString ? item : item[key];
    return this.caseSensitivity ? option[key] === value : option[key].toLowerCase() === value.toLowerCase();
  }

  reduceSuggestionList() {
    this.selectedItems = this.tags.map((option, id) => ({ option, id }));
    if (this.isReduce) {
      return;
    }
    if (this.suggestionList.length > 0) {
      this.isReduce = true;
      // 使用用户最初传入的数据来进行过滤
      this._suggestionList = this.suggestionList.filter((suggestion) => {
        return this.selectedItems.findIndex(({ option }) => this.checkIsIncludes(option, suggestion)) === -1;
      });
      if (this.sourceSubscription && this.searchFn) {
        this.sourceSubscription.next('');
      }
    }
  }

  host_click() {
    if (!this.disabled) {
      const dom = this.searchBox.el.nativeElement.querySelector('input');
      if (dom && this.selectBox) {
        dom.focus();
        if (this.selectBox.availableOptions.length) {
          this.selectBox.resetIndex(false);
        }
      }
    }
  }

  passEvent(data) {
    const { event, type } = data;
    switch (type) {
    case 'keydown.enter':
    case 'blur':
      // keydown.enter 和 keydown 都接收会重复处理
      // 点击会聚焦input，input失焦事件不会冒泡，单独处理
      break;
    case 'keydown': {
      const hotkeys = [this.KEYS.enter, this.KEYS.tab];
      if (this.isAddBySpace) {
        hotkeys.push(this.KEYS.space);
      }
      if (hotkeys.includes(event.keyCode)) {
        event.preventDefault();
        event.stopPropagation();
        if (this.selectBox?.selectIndex !== -1) {
          this.addSuggestionByIndex(this.selectBox.selectIndex, this.availableOptions[this.selectBox.selectIndex]);
        } else if (this.generateOptionFromInput) {
          this.addTag();
        }
      }
      break;
    }
    default:
      this.inputEvent = { event, type };
    }
  }

  addSuggestionByIndex(index, value) {
    if (
      index < 0 ||
      index >= this.availableOptions.length ||
      this.maxTags <= this.selectedItems.length ||
      this.selectedItems.findIndex(({ option }) => this.checkIsIncludes(option, value)) !== -1
    ) {
      return;
    }
    this.canAdd(value).then((result) => {
      if (!result) {
        return;
      }
      const tag = this.availableOptions[index];
      const isCreated = tag.isDevuiTagsInputCreated;
      delete tag.isDevuiTagsInputCreated;
      this.checkMaxTags(tag);
      this.onChange(this.selectedItems.map((tagItem) => tagItem.option));
      this.valueChange.emit(tag);
      if (!isCreated) {
        const suggestionListIndex = this._suggestionList.findIndex((item) => this.checkIsIncludes(item, value));
        this._suggestionList.splice(suggestionListIndex, 1);
      }
      this.delayResetNewTag();
      this.sourceSubscription.next('');
    });
  }

  removeTag(data) {
    const { index } = data;
    // 立即移除会导致toggle-menu-container无法判断event.target是否在容器中，从而关闭下拉菜单
    setTimeout(() => {
      if (index < 0 || index >= this.selectedItems.length) {
        return;
      }
      // onPush下 数组长度变化不会触发变更检测
      this.availableOptions = [...this.availableOptions, this.selectedItems[index]?.option];
      this._suggestionList = [...this._suggestionList, this.selectedItems[index]?.option];
      const tag = this.selectedItems[index].option;
      this.selectedItems.splice(index, 1);
      if (this.selectedItems.length === 0) {
        this.selectBoxContainer.updatePosition();
      }
      this.onChange(this.selectedItems.map((tagItem) => tagItem.option));
      this.valueChange.emit(tag);
    });
  }

  tagIsValid() {
    const tag = this.newTag;
    const result =
      tag &&
      tag.length >= this.minLength &&
      tag.length <= this.maxLength &&
      (this.showSuggestion ? this._suggestionList.findIndex((item) => this.checkIsIncludes(item, tag, true)) === -1 : true) &&
      this.selectedItems.findIndex(({ option }) => this.checkIsIncludes(option, tag, true)) === -1 &&
      !this.isEmptyString(tag);
    this.newTagValid = tag === '' || !!result;
    return result;
  }

  isEmptyString(tag) {
    const temp = tag.match(/\s/g);
    if (temp) {
      return tag.length === temp.length;
    } else {
      return false;
    }
  }

  addTag() {
    this.canAdd()
      .then((result) => {
        if (result && this.maxTags > this.selectedItems.length) {
          if (this.tagIsValid()) {
            const obj = {};
            obj[this.displayProperty] = this.newTag;
            this.checkMaxTags(obj);
            this.onChange(this.selectedItems.map((tagItem) => tagItem.option));
            this.valueChange.emit(this.newTag);
          }
        } else {
          this.newTagValid = false;
        }
      })
      .finally(() => {
        if (this.newTag && this.newTagValid) {
          this.delayResetNewTag();
          this.sourceSubscription.next('');
        }
      });
  }

  canAdd(value?) {
    let checkResult = Promise.resolve(true);
    if (this.checkBeforeAdd) {
      const result: any = this.checkBeforeAdd(value || this.newTag);
      if (typeof result !== 'undefined') {
        if (result.then) {
          checkResult = result;
        } else if (result.subscribe) {
          checkResult = (result as Observable<boolean>).toPromise();
        } else {
          checkResult = Promise.resolve(result);
        }
      }
    }
    return checkResult;
  }

  checkMaxTags(tag) {
    this.selectedItems.push({ id: this.selectedItems.length, option: tag });
    if (this.selectedItems.length >= this.maxTags) {
      this.isOpen = false;
    }
  }

  setValue({ option, index }) {
    this.addSuggestionByIndex(index, option);
  }

  searchInputValueChange(event) {
    if (this.selectBox) {
      this.selectBox.selectIndex = -1;
    }
    this.newTag = (event || '').trim();
    this.searchChange.emit(this.newTag);
    this.sourceSubscription.next(this.newTag);
  }

  toggleChangeFn(event) {
    if (!event) {
      this.onTouch();
      this.cdr.detectChanges();
    }
    this.isOpen = event;
  }

  delayResetNewTag() {
    setTimeout(() => {
      // 放在timeout里是因为如果用空格添加tag，会导致添加之后输入框里有个空格。
      this.newTag = '';
    }, 50);
  }
}
