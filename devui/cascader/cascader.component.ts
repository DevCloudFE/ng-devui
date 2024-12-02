import { ConnectedPosition } from '@angular/cdk/overlay';
import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
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
import { DropDownAppendToBodyComponent, DropDownDirective } from 'ng-devui/dropdown';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { DevConfigService, WithConfig } from 'ng-devui/utils';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { CascaderService } from './cascader.service';
import { CascaderItem } from './cascader.type';

const DEBOUNCE_TIME = 200;

@Component({
  selector: 'd-cascader',
  templateUrl: './cascader.component.html',
  styleUrls: ['./cascader.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CascaderComponent),
      multi: true,
    },
    CascaderService,
  ],
  preserveWhitespaces: false,
})
export class CascaderComponent implements OnInit, OnDestroy, OnChanges, ControlValueAccessor {
  @ViewChild('mainDropdown') mainDropdown: DropDownDirective;
  @ViewChild('innerInput') innerInput: ElementRef;
  @ViewChild('outerInput') outerInput: ElementRef;
  @ViewChild(DropDownAppendToBodyComponent, { static: false }) dropdownComp: DropDownAppendToBodyComponent;
  @Input() options: CascaderItem[] = [];
  @Input() width = 200;
  @Input() dropdownWidth: number;
  @Input() placeholder = '';
  @Input() trigger: 'click' | 'hover' = 'hover';
  @Input() disabled = false;
  @Input() multiple = false;
  @Input() showPath = false;
  @Input() allowClear = false;
  @Input() allowSearch = false;
  @Input() canSelectParent = false;
  @Input() checkboxRelation = { upward: true, downward: true };
  @Input() dropDownItemTemplate: TemplateRef<any>;
  @Input() dropdownHeaderTemplate: TemplateRef<any>;
  @Input() hostTemplate: TemplateRef<any>;
  @Input() dropdownPanelClass = '';
  @Input() appendToBody = true;
  @Input() tagMaxWidth = '200px';
  @Input() @WithConfig() showAnimation = true;
  @Input() @WithConfig() styleType = 'default';
  @Input()
  set loadChildrenFn(fn: (value: CascaderItem) => Promise<CascaderItem[]> | Observable<CascaderItem[]>) {
    this.isLazyLoad = !!fn;
    if (fn) {
      this.cascaderSrv.loadChildrenFn = fn;
    }
  }
  @Output() toggleEvent = new EventEmitter<boolean>();

  @Input() @WithConfig() showGlowStyle = true;
  @HostBinding('class.devui-glow-style') get hasGlowStyle() {
    return this.showGlowStyle;
  }

  subMenuDirections: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetX: 0,
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetX: 0,
    },
  ];

  isLazyLoad: boolean;

  unsubscribe$ = new Subject<void>();

  searchValueChange = new Subject<string>();

  multipleValueList: CascaderItem[] = [];
  lazyloadValue = [];

  timer;
  showTextValue;
  showSearchPanel: boolean;
  showSearchInput = false;
  onChange = Function.prototype;
  onTouched = Function.prototype;

  get columnList() {
    return this.cascaderSrv.columnList;
  }

  get searchResultList() {
    return this.cascaderSrv.searchResultList;
  }

  i18nCommonText: I18nInterface['common'];
  i18nSubscription: Subscription;

  constructor(private cascaderSrv: CascaderService, private i18n: I18nService, private devConfigService: DevConfigService) {}

  // 获取整颗树的公共方法
  public getOptionTree(): CascaderItem[] {
    return this.cascaderSrv.options;
  }

  ngOnInit() {
    this.dropdownWidth = this.dropdownWidth ? this.dropdownWidth : this.width;
    this.cascaderSrv.canSelectParent = this.canSelectParent;
    this.cascaderSrv.initOptions(this.options);
    this.cascaderSrv.isMultiple = this.multiple;
    this.cascaderSrv.isLazyLoad = this.isLazyLoad;
    this.cascaderSrv.checkboxRelation = this.checkboxRelation;
    this.initObservale();
    this.initI18n();
  }

  ngOnChanges(changes: SimpleChanges) {
    const { options, canSelectParent } = changes;
    if (options && !options.firstChange) {
      this.cascaderSrv.initOptions(this.options);
    } else if (canSelectParent && !canSelectParent.firstChange) {
      this.cascaderSrv.canSelectParent = this.canSelectParent;
    }
  }

  initI18n(): void {
    this.i18nCommonText = this.i18n.getI18nText().common;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nCommonText = data.common;
    });
  }

  valueChanges(value: string): void {
    this.searchValueChange.next(value);
  }

  chooseSearchResult(option): void {
    if (option.checked) {
      return;
    }
    if (this.multiple) {
      // 多选模式下更新数据后需要刷新dropdown位置和重新聚焦input
      option.checked = true;
      this.writeValue([...this.cascaderSrv.multipleValue, option.valueList]);
      this.onChange(this.cascaderSrv.multipleValue);
      this.mainDropdown.updateCdkConnectedOverlayOrigin();
      if (this.innerInput) {
        this.innerInput.nativeElement.focus();
      }
    } else {
      this.writeValue(option.valueList);
      this.onChange(option.valueList);
      this.mainDropdown.isOpen = false;
    }
  }

  initObservale(): void {
    this.cascaderSrv.closeMianDropdown.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      if (this.mainDropdown) {
        this.mainDropdown.isOpen = false;
      }
    });

    this.cascaderSrv.currentValueChange.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      this.writeValue(res);
      this.onChange(res);
    });

    this.cascaderSrv.openDrawer.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      this.rePosition();
    });

    if (this.multiple) {
      this.cascaderSrv.updateTagList.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
        const targetIndex = this.multipleValueList.findIndex((t) => t.value === res.option.value);
        if (res.isAdd) {
          if (targetIndex === -1) {
            this.multipleValueList.push(res.option);
            this.updateMultipleValuePathList();
          }
        } else if (targetIndex !== -1) {
          this.multipleValueList.splice(targetIndex, 1);
        }

        if (res.isEmit) {
          this.onChange(this.cascaderSrv.currentMultipleValue);
        }

        // 当taglist变化导致input高度变化时，更新相对位置
        setTimeout(() => {
          this.mainDropdown.updateCdkConnectedOverlayOrigin();
        });
      });
    }

    if (this.allowSearch) {
      this.searchValueChange
        .pipe(
          takeUntil(this.unsubscribe$),
          debounceTime(DEBOUNCE_TIME),
          distinctUntilChanged(),
          filter((t) => t !== '')
        )
        .subscribe((value) => {
          clearTimeout(this.timer);
          if (this.mainDropdown && !this.mainDropdown.isOpen) {
            this.mainDropdown.isOpen = true;
          }

          if (this.multiple && this.innerInput) {
            this.innerInput.nativeElement.focus();
          }
          this.cascaderSrv.searchResultList = [];
          this.cascaderSrv.searchByString(value);
          this.showSearchPanel = true;
        });
    }

    if (this.isLazyLoad) {
      this.cascaderSrv.updateShowText.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
        if (this.multiple) {
          this.multipleValueList = this.getMultipleValueFromValueList(this.lazyloadValue);
          this.cascaderSrv.multipleValue = this.lazyloadValue;
        } else {
          this.showTextValue = this.showPath
            ? this.getPathLabelFormValue(this.cascaderSrv._currentValue)
            : this.getLabelFromValue(this.cascaderSrv._currentValue);
        }
      });
    }
  }

  deleteTag(tagEvent, option: CascaderItem): void {
    tagEvent.event.stopPropagation();
    this.cascaderSrv.updateOptionCheckedStatus(option.value, false, this.checkboxRelation.upward, this.checkboxRelation.downward);
    this.multipleValueList = this.multipleValueList.filter((t) => t.value !== option.value);
    this.onChange(this.cascaderSrv.currentMultipleValue);
    // 当taglist变化导致input高度变化时，更新相对位置
    setTimeout(() => {
      this.mainDropdown.updateCdkConnectedOverlayOrigin();
    });
  }

  registerOnChange(fn: () => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  writeValue(value: Array<number | string> | Array<number | string>[]): void {
    if (!this.multiple) {
      if (!value) {
        this.showTextValue = '';
      } else {
        this.showTextValue = this.showPath
          ? this.getPathLabelFormValue(value as Array<number | string>)
          : this.getLabelFromValue(value as Array<number | string>);
        this.cascaderSrv._currentValue = value as Array<number | string>;
        this.cascaderSrv.updateOptionByValue();
      }
    } else {
      if (!value) {
        this.multipleValueList = [];
      } else {
        this.cascaderSrv.currentMultipleValue = value as Array<number | string>[];
        this.lazyloadValue = value;
        this.multipleValueList = this.getMultipleValueFromValueList(value as Array<number | string>[]);
        this.updateMultipleValuePathList();
      }
    }
  }

  updateMultipleValuePathList() {
    if (!this.showPath) {
      return;
    }
    const valueList = this.cascaderSrv.currentMultipleValue;
    valueList.forEach((item, index) => {
      const value = item[item.length - 1];
      const target = this.multipleValueList.find((t) => t.value === value);
      if (target) {
        target.pathLabel = this.getPathLabelFormValue(item);
      }
    });
  }

  // 从路径数组中获取所有tag的值，并让对应checkbox激活
  getMultipleValueFromValueList(valueList: Array<number | string>[]): CascaderItem[] {
    const targetList = [];
    valueList.forEach((value) => {
      let cur: CascaderItem;
      let cacheTarget: CascaderItem;
      let list = this.cascaderSrv.options;
      for (let i = 0; i < value.length; i++) {
        cur = list.find((l) => l.value === value[i]);
        cacheTarget = cur;
        if (this.isLazyLoad && cur && !cur.children?.length && !cur.isLeaf) {
          this.cascaderSrv.lazyloadMultipleChild(cur, i);
          break;
        } else {
          list = (cur && cur.children) || [];
        }
      }
      if (cur && cur.isLeaf) {
        targetList.push(cur);
        cacheTarget = null;
        this.cascaderSrv.updateOptionCheckedStatus(cur.value, true, this.checkboxRelation.upward, this.checkboxRelation.downward);
      }

      if (cacheTarget) {
        targetList.push(cacheTarget);
        this.cascaderSrv.updateOptionCheckedStatus(cacheTarget.value, true, this.checkboxRelation.upward, this.checkboxRelation.downward);
      }
    });

    return targetList;
  }

  // 获取路径末的label
  getLabelFromValue(value: Array<number | string>): string {
    let cur;
    let list = this.cascaderSrv.options;
    value.forEach((item) => {
      cur = list.find((t) => t.value === item) || '';
      list = cur.children || [];
    });

    return (cur && cur.label) || '';
  }

  // 将value数组转换为路径字符串
  getPathLabelFormValue(value: Array<number | string>): string {
    let path = '';
    let cur;
    let list = this.cascaderSrv.options;

    value.forEach((item, index) => {
      cur = list.find((t) => t.value === item) || '';
      if (cur) {
        path = path === '' ? path + cur.label : path + ' / ' + cur.label;
      } else if (this.cascaderSrv.columnList.length === index + 1) {
        path = path === '' ? path + item : path + ' / ' + item;
      }
      list = cur.children || [];
    });

    return path;
  }

  clearTags(): void {
    if (this.multiple) {
      this.multipleValueList = [];
      this.cascaderSrv.resetStatus.next();
      this.cascaderSrv.resetNodeStatus();
      this.cascaderSrv.currentMultipleValue = [];
    } else {
      this.cascaderSrv.currentValue = [];
    }
    this.onChange([]);
  }

  onToggle(isOpen: boolean): void {
    this.toggleEvent.emit(isOpen);
    if (isOpen && this.multiple) {
      this.cascaderSrv.clearTargetActive(this.cascaderSrv.options.find((t) => t.active));
      this.cascaderSrv.columnList.splice(1);
      if (this.innerInput) {
        this.innerInput.nativeElement.focus();
      }
    }

    if (isOpen && !this.multiple && this.allowSearch) {
      this.outerInput.nativeElement.focus();
    }

    if (!isOpen && this.allowSearch) {
      if (!this.cascaderSrv.currentValue.length) {
        this.showTextValue = null;
      } else {
        this.writeValue(this.cascaderSrv.currentValue);
      }
      // 在动画结束后再设置参数，防止panel中内容突变，动画时间200
      this.timer = setTimeout(() => {
        this.showSearchPanel = false;
      }, 200);
    }

    if (isOpen) {
      this.rePosition();
    }
  }

  // 防止位置超出overlay边界
  rePosition(): void {
    if (typeof window === undefined || !this.appendToBody) {
      return;
    }
    setTimeout(() => {
      this.dropdownComp.reposition();
      const width = this.dropdownComp.overlay.overlayRef?.overlayElement.clientWidth;
      const offsetX = this.dropdownComp.overlay.overlayRef?.overlayElement.offsetLeft;
      const offsetRight = window.innerWidth - width - offsetX - 20;
      this.subMenuDirections.forEach((t) => {
        t.offsetX = offsetRight < 0 ? offsetRight : 0;
      });
      this.dropdownComp.reposition();
    }, 0);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.searchValueChange.complete();
  }
}
