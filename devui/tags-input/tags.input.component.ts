import { Component, ElementRef, EventEmitter, forwardRef, HostListener,
  Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { isEmpty } from 'lodash-es';
import { BehaviorSubject, fromEvent, Observable, of } from 'rxjs';
import { Subscription } from 'rxjs';
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
  preserveWhitespaces: false
})

export class TagsInputComponent implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
  /**
  * 【必选】记录输入的标签
  */
  @Input() tags = [];
  /**
   * 【可选】使用的属性名
   */
  @Input() displayProperty = 'name';
  /**
   * 【可选】输入的placeholder
   */
  @Input() placeholder = '';
  /**
   * 【可选】输入标签的最小长度
   */
  @Input() minLength = 3;
  /**
   * 【可选】输入标签的最大长度
   */
  @Input() maxLength: number = Number.MAX_SAFE_INTEGER;
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
   * 【可选】下拉选项
   */
  @Input() suggestionList: any = [];
  /**
   * 是否按空格添加tag
   */
  @Input() isAddBySpace = true;
  /**
   * 大小写敏感
   */
  @Input() caseSensitivity = false;

  @Input() checkBeforeAdd: (newTag: string) => boolean | Promise<boolean> | Observable<boolean>;

  @Input() disabled = false;
  /**
 * 输出函数，当选中某个选项项后，将会调用此函数，参数为当前选择项的值。如果需要获取所有选择状态的值，请参考(ngModelChange)方法
 */
  @Output() valueChange = new EventEmitter<any>();

  @ViewChild('tagInput', { static: true }) tagInputElement: ElementRef;
  @ViewChild('inputBox', { static: true }) inputBox: ElementRef;
  @ViewChild('selectBox', { static: true }) selectBoxElement: ElementRef;

  newTag = '';
  availableOptions = [];
  newTagValid = false;
  isReduce = false;
  searchFn: (term: string) => Observable<Array<{ id: string | number, option: any }>>;
  private _showSuggestionList = false;
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
    comma: 188
  };
  private i18nSubscription: Subscription;
  public i18nCommonText: I18nInterface['common'];
  public i18nTagsInputText: I18nInterface['tagsInput'];
  // 下拉选中suggestionList的item索引
  selectIndex = 0;
  private onChange = (_: any) => null;
  private onTouch = () => null;

  constructor(private i18n: I18nService) {}

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

  set showSuggestionList(val) {
    this._showSuggestionList = val;
    const ele = this.inputBox && this.inputBox.nativeElement;
    if (ele) {
      if (val) {
        if (!ele.classList.contains('devui-dropdown-origin-open')) {
          ele.classList.add('devui-dropdown-origin-open');
        }
        if (!ele.classList.contains('devui-dropdown-origin-bottom')) {
          ele.classList.add('devui-dropdown-origin-bottom');
        }
      } else {
        if (ele.classList.contains('devui-dropdown-origin-open')) {
          ele.classList.remove('devui-dropdown-origin-open');
        }
        if (ele.classList.contains('devui-dropdown-origin-bottom')) {
          ele.classList.remove('devui-dropdown-origin-bottom');
        }
        this.onTouch();
      }
    }
  }
  get showSuggestionList() {
    return this._showSuggestionList;
  }

  ngOnInit() {
    this.setI18nText();
    this.newTag = '';
    this.searchFn = (term: any) => {
      return of((this.suggestionList ? this.suggestionList : [])
        .filter(item => term === '' ? true : this.caseSensitivity ?
        (item[this.displayProperty]).indexOf(term) !== -1 :
        (item[this.displayProperty]).toLowerCase().indexOf(term.toLowerCase()) !== -1)
      );
    };
    this.registerFilterChange();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.suggestionList && changes.suggestionList.currentValue) {
      this.reduceSuggestionList();
      if (this.sourceSubscription && this.searchFn) {
        this.sourceSubscription.next('');
      }
    }
    if (changes && changes.tags && changes.tags.currentValue) {
      this.reduceSuggestionList();
    }
  }

  private setI18nText() {
    this.i18nCommonText = this.i18n.getI18nText().common;
    this.i18nTagsInputText = this.i18n.getI18nText().tagsInput;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nCommonText = data.common;
      this.i18nTagsInputText = data.tagsInput;
    });
  }

  registerFilterChange() {
    this.sourceSubscription = new BehaviorSubject<any>('');
    this.sourceSubscription.pipe(
      map(term => {
        this.tagIsValid();
        return term;
      }),
      switchMap(term => this.searchFn(term)),
     )
     .subscribe(options => {
        this.availableOptions = options;
        if (!this.availableOptions || this.availableOptions.length <= 0) {
          this.selectIndex = -1;
        } else {
          this.selectIndex = 0;
        }
      });
    // 统一使用ngModel值，允许空格输入时需要正确处理input已有输入参数
    fromEvent(this.tagInputElement.nativeElement, 'input')
      .pipe(
        debounceTime(100)
      ).subscribe(() => this.sourceSubscription.next(this.newTag));
  }

  reduceSuggestionList() {
    if (this.isReduce) {
      return;
    }
    if (this.suggestionList.length > 0 && this.tags.length > 0) {
      this.isReduce = true;
      this.suggestionList = this.suggestionList.filter(suggestion => {
        return this.tags.findIndex(tag => this.caseSensitivity ?
          tag[this.displayProperty] === suggestion[this.displayProperty] :
          tag[this.displayProperty].toLowerCase() === suggestion[this.displayProperty].toLowerCase()) === -1;
      });
      if (this.sourceSubscription && this.searchFn) {
        this.sourceSubscription.next('');
      }
    }
  }

  host_click() {
    if (!this.disabled) {
      this.tagInputElement.nativeElement.focus();
      this.selectIndex = 0;
    }
  }

  input_keydown(event) {
    const hotkeys = [this.KEYS.enter, this.KEYS.tab, this.KEYS.up, this.KEYS.down];
    if (this.isAddBySpace) {
      hotkeys.push(this.KEYS.space);
    }
    if (hotkeys.indexOf(event.keyCode) === -1) {
      return;
    } else if (event.keyCode === this.KEYS.down) {
      // 向下选择选项
      this.select(++this.selectIndex);
    } else if (event.keyCode === this.KEYS.up) {
      // 向上选择选项
      this.select(--this.selectIndex);
    } else if (event.keyCode === this.KEYS.enter || event.keyCode === this.KEYS.tab  || event.keyCode === this.KEYS.space) {
      if (this.selectIndex !== -1) {
        // 回车或tab添加selectIndex的值
        setTimeout(() => {
          this.addSuggestionByIndex(this.selectIndex, this.availableOptions[this.selectIndex]);
        }, 50);
      } else {
        this.addTag();
      }
    } else {
      // 添加输入的值
      this.addTag();
    }
  }

  select (index) {
    if (index < 0) {
      index = this.suggestionList.length - 1;
    } else if (index >= this.suggestionList.length) {
        index = 0;
    }
    this.selectIndex = index;
  }

  input_focus(event) {
    this.showSuggestionList = true;
  }

  input_blur(event) {
    if (isEmpty(this.newTag)) {
      return;
    }
    this.addTag();
  }

  addSuggestionByIndex(index, value) {
    if (index < 0 || index >= this.availableOptions.length || this.maxTags <= this.tags.length
      || this.tags.findIndex(item => this.caseSensitivity ? item[this.displayProperty] === value[this.displayProperty]
        : item[this.displayProperty].toLowerCase() === value[this.displayProperty].toLowerCase()) !== -1) {
      return;
    }
    this.canAdd().then(result => {
      if (!result) {
        return;
      }
      this.tags.push(this.availableOptions[index]);
      this.onChange(this.tags);
      this.valueChange.emit(this.availableOptions[index]);
      const suggestionListIndex = this.suggestionList.findIndex(item =>
        this.caseSensitivity ? item[this.displayProperty]  === value[this.displayProperty] :
          item[this.displayProperty].toLowerCase() === value[this.displayProperty].toLowerCase());
      this.suggestionList.splice(suggestionListIndex, 1);
      this.newTag = '';
      this.sourceSubscription.next(this.newTag);
    });
  }

  removeTag(index) {
    if (index < 0 || index >= this.tags.length) {
      return;
    }
    this.availableOptions.push(this.tags[index]);
    this.suggestionList = this.availableOptions;
    const tag = this.tags[index];
    this.tags.splice(index, 1);
    this.onChange(this.tags);
    this.valueChange.emit(tag);
  }

  tagIsValid() {
    const tag = this.newTag;
    const tmp = this.displayProperty;
    const result = tag && tag.length >= this.minLength
      && tag.length <= this.maxLength
      && this.suggestionList.findIndex(item => this.caseSensitivity ? item[tmp] === tag
          : item[tmp].toLowerCase() === tag.toLowerCase()) === -1
      && this.tags.findIndex(item => this.caseSensitivity ?  item[tmp] === tag
          : item[tmp].toLowerCase() === tag.toLowerCase()) === -1
      && !this.isEmptyString(tag);
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
    this.canAdd().then(result => {
      if (result && this.maxTags > this.tags.length) {
        if (this.tagIsValid()) {
          const obj = {};
          obj[this.displayProperty] = this.newTag;
          this.tags.push(obj);
          this.onChange(this.tags);
          this.valueChange.emit(this.newTag);
        }
        setTimeout(() => {
          // 放在timeout里是因为如果用空格添加tag，会导致添加之后输入框里有个空格。
          this.newTag = '';
        }, 50);
      } else {
        this.newTagValid = false;
      }
    });
    this.sourceSubscription.next('');
  }

  canAdd() {
    let checkResult = Promise.resolve(true);
    if (this.checkBeforeAdd) {
      const result: any = this.checkBeforeAdd(this.newTag);
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

  @HostListener('document:click', ['$event'])
  onDocumentClick($event: Event) {
    if (!this.disabled && this.showSuggestionList && !this.selectBoxElement.nativeElement.contains($event.target)) {
      this.showSuggestionList = false;
    }
  }

  ngOnDestroy() {
    if (this.sourceSubscription) {
    this.sourceSubscription.unsubscribe();
    }
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();
    }
  }

}
