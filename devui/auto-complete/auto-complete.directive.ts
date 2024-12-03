import { CdkOverlayOrigin, ConnectedPosition, ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';
import {
  ChangeDetectorRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { PositionService } from 'ng-devui/position';
import {
  addClassToOrigin,
  AppendToBodyDirection,
  AppendToBodyDirectionsConfig,
  AppendToBodyScrollStrategyType,
  DevConfigService,
  removeClassFromOrigin,
  WithConfig
} from 'ng-devui/utils';
import { fromEvent, Observable, of, Subject, Subscription } from 'rxjs';
import { debounceTime, filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { AutoCompleteConfig } from './auto-complete-config';
import { AutoCompletePopupComponent } from './auto-complete-popup.component';

// select(下拉框) select-extend(editable-select用,下拉聚焦时不搜索，变更inputValue后手动搜索) suggest(联想)
export type autoCompleteSceneType = '' | 'select' | 'select-extend' | 'suggest';

@Directive({
  selector: '[dAutoComplete]',
  exportAs: 'autoComplete',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutoCompleteDirective),
      multi: true,
    },
  ],
})
export class AutoCompleteDirective implements OnInit, OnDestroy, OnChanges, ControlValueAccessor {
  @HostBinding('attr.autocomplete') autocomplete = 'off';
  @HostBinding('attr.autocapitalize') autocapitalize = 'off';
  @HostBinding('attr.autocorrect') autocorrect = 'off';
  @Input() disabled: boolean;
  /**
   * @deprecated
   */
  @Input() cssClass: string;
  @Input() delay = 300;
  @Input() @WithConfig() showGlowStyle = true;
  @HostBinding('class.devui-glow-style') get hasGlowStyle() {
    return this.showGlowStyle;
  }
  /**
   * @deprecated
   */
  @Input() minLength: number;
  @Input() itemTemplate: TemplateRef<any>;
  @Input() noResultItemTemplate: TemplateRef<any>;
  @Input() searchingTemplate: TemplateRef<any>;
  @Input() set isSearching(isSearching) {
    if (this.popupRef && this.searchingTemplate) {
      const pop = this.popupRef.instance;
      pop.isSearching = isSearching;
      pop.searchingTemplate = this.searchingTemplate;
      if (isSearching) {
        pop.isOpen = true;
      }
    }
  }

  @Input() appendToBody = false;
  @Input() appendToBodyDirections: Array<AppendToBodyDirection | ConnectedPosition> = ['rightDown', 'leftDown', 'rightUp', 'leftUp'];
  @Input() @WithConfig() appendToBodyScrollStrategy: AppendToBodyScrollStrategyType;
  @Input() cdkOverlayOffsetY = 0; // 内部使用不开放
  @Input() dAutoCompleteWidth: number;
  @Input() formatter: (item: any) => string;
  @Input() sceneType: autoCompleteSceneType = '';
  @Input() tipsText = ''; // 提示文字
  /*
 overview: border none multiline single
 */
  @Input() overview: string;
  @Input() latestSource: any[]; // 最近输入
  @Input() source: any[];
  @Input() valueParser: (item: any) => any;
  @Input() searchFn: (term: string, target?: AutoCompleteDirective) => Observable<any[]>;
  /**
   * @deprecated
   */
  @Input() dropdown: boolean;
  @Input() maxHeight = 300;
  @Input() disabledKey: string;
  @Input() @WithConfig() showAnimation = true;
  /**
   *  【可选】启用数据懒加载，默认不启用
   */
  @Input() enableLazyLoad = false;
  @Input() retainInputValue = false;
  @Input() allowEmptyValueSearch = false; // 在value为空时，是否允许进行搜索
  @Input() customViewTemplate: TemplateRef<any>;
  @Input() customViewDirection: 'bottom' | 'right' | 'left' | 'top' = 'bottom';
  @Output() loadMore = new EventEmitter<any>();
  @Output() selectValue = new EventEmitter<any>();
  @Output() transInputFocusEmit = new EventEmitter<any>(); // input状态传给父组件函数
  /**
   * @deprecated
   */
  @Output() changeDropDownStatus = new EventEmitter<any>();
  @Output() toggleChange = new EventEmitter<boolean>();
  @Output() hoverItem: EventEmitter<any> = new EventEmitter();
  KEYBOARD_EVENT_NOT_REFRESH = ['escape', 'enter', 'arrowup', 'arrowdown', /* ie 10 edge */ 'esc', 'up', 'down'];
  popupRef: ComponentRef<AutoCompletePopupComponent>;
  i18nText: I18nInterface['autoComplete'];
  popTipsText = '';
  position: any;
  focus = false;
  scrollStrategy: ScrollStrategy;
  SELECT_TYPES = ['select', 'select-extend'];

  private destroy$ = new Subject<void>();
  private valueChanges: Observable<any[]>;
  private value: any;
  private subscription: Subscription;
  private onChange = (_: any) => null;
  private onTouched = () => null;

  constructor(
    private autoCompleteConfig: AutoCompleteConfig,
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private renderer: Renderer2,
    private injector: Injector,
    private positionService: PositionService,
    private changeDetectorRef: ChangeDetectorRef,
    private i18n: I18nService,
    private devConfigService: DevConfigService,
    private scrollStrategyOption: ScrollStrategyOptions
  ) {
    this.scrollStrategy = this.scrollStrategyOption.reposition();
  }

  ngOnInit() {
    this.init();
    this.setI18nText();
    this.valueChanges = this.registerInputEvent(this.elementRef);
    // 调用时机：input keyup
    this.subscription = this.valueChanges.subscribe((source) => this.onSourceChange(source));

    // 动态的创建了popup组件，
    const factory = this.componentFactoryResolver.resolveComponentFactory(AutoCompletePopupComponent);
    this.popupRef = this.viewContainerRef.createComponent(factory, this.viewContainerRef.length, this.injector);
    this.popupRef.instance.hoverItem.subscribe((item) => this.hoverItem.emit(item));
    this.fillPopup(this.source);

    if (!this.searchFn) {
      this.searchFn = (term) => {
        return of(this.source.filter((item) => this.formatter(item).toLowerCase().indexOf(term.toLowerCase()) !== -1));
      };
    }

    // 调用时机：选中回车或者鼠标单击下拉选项
    this.popupRef.instance.registerOnChange((item) => {
      if (item.type === 'loadMore') {
        this.loadMore.emit(item.value);
        return;
      }
      this.writeValue(item.value);
      this.onChange(item.value);
      this.hidePopup();
      this.selectValue.emit(item.value);
      if (this.overview && this.overview !== 'single') {
        setTimeout(() => {
          // 这里稍微延迟一下，等待光标的位置发生变化，好重新获取光标的位置
          this.restLatestSource();
        }, 0);
      }
    });

    this.setPositions();
  }

  ngOnChanges(changes: SimpleChanges) {
    const { appendToBodyDirections, appendToBodyScrollStrategy, source } = changes;
    const globalScrollStrategy = this.devConfigService.getConfigForApi('appendToBodyScrollStrategy');
    if (source && this.popupRef) {
      this.fillPopup(this.source);
    }
    if (appendToBodyDirections) {
      this.setPositions();
    }
    if (this.appendToBodyScrollStrategy && (appendToBodyScrollStrategy || globalScrollStrategy)) {
      const func = this.scrollStrategyOption[this.appendToBodyScrollStrategy];
      this.scrollStrategy = func();
      if (this.popupRef) {
        this.popupRef.instance.scrollStrategy = this.scrollStrategy;
      }
    }
  }

  init() {
    this.minLength = this.minLength ?? this.autoCompleteConfig.autoComplete.minLength;
    this.itemTemplate = this.itemTemplate || this.autoCompleteConfig.autoComplete.itemTemplate;
    this.noResultItemTemplate = this.noResultItemTemplate || this.autoCompleteConfig.autoComplete.noResultItemTemplate;
    this.formatter = this.formatter || this.autoCompleteConfig.autoComplete.formatter;
    this.valueParser = this.valueParser || this.autoCompleteConfig.autoComplete.valueParser;
  }

  setPositions() {
    if (this.popupRef) {
      this.popupRef.instance.overlayPositions =
        this.appendToBodyDirections && this.appendToBodyDirections.length > 0
          ? this.appendToBodyDirections
            .map((position) => {
              if (typeof position === 'string') {
                return AppendToBodyDirectionsConfig[position];
              } else {
                return position;
              }
            })
            .filter((position) => position !== undefined)
          : undefined;
    }
  }

  setI18nText() {
    this.i18nText = this.i18n.getI18nText().autoComplete;
    this.i18n
      .langChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.i18nText = data.autoComplete;
      });
  }

  restLatestSource() {
    if (this.latestSource && this.latestSource.length > 0) {
      this.writeValue('');
      this.clearInputValue();
      this.showLatestSource();
    }
  }

  // 调用时机：input keyup
  onSourceChange(source) {
    if (!this.elementRef.nativeElement.value) {
      if (!this.SELECT_TYPES.includes(this.sceneType) && !this.allowEmptyValueSearch) {
        // 下拉场景不展示最近输入
        this.showLatestSource();
      } else {
        this.showSource(source, true, true);
      }
    } else {
      this.showSource(source, true, true);
    }
  }

  private showLatestSource() {
    let tempSource = [];
    if (this.latestSource && this.latestSource.length > 0) {
      this.searchFn('').subscribe((source) => {
        const t = this.latestSource;
        tempSource = t.filter((data) => {
          if (!data.label) {
            return source.find((item) => item === data);
          } else {
            return source.find((item) => item.label === data.label);
          }
        });

        const pop = this.popupRef.instance;
        pop.reset();
        this.popTipsText = this.i18nText.latestInput;
        this.fillPopup(tempSource);
        this.openPopup();
        this.changeDetectorRef.markForCheck();
        this.updatePosition();
      });
    }

    if (tempSource.length <= 0) {
      this.hidePopup();
    }
  }

  private showSource(source, setOpen, isReset) {
    if ((source && source.length) || this.noResultItemTemplate) {
      const pop = this.popupRef.instance;
      if (isReset) {
        pop.reset();
      }
      this.popTipsText = this.tipsText || '';
      this.fillPopup(source, this.value);
      if (setOpen) {
        this.openPopup(isReset ? 0 : -1);
      }
      this.changeDetectorRef.markForCheck();
      this.updatePosition();
    } else {
      this.hidePopup();
    }
  }

  private updatePosition() {
    if (this.appendToBody) {
      setTimeout(() => {
        if (this.popupRef.instance.connectedOverlay && this.popupRef.instance.connectedOverlay.overlayRef) {
          this.popupRef.instance.connectedOverlay.overlayRef.updatePosition();
        }
      });
    }
  }

  public openPopup(activeIndex?: number) {
    const index = activeIndex >= 0 ? activeIndex : this.popupRef.instance.activeIndex;
    this.popupRef.instance.activeIndex = index;
    this.popupRef.instance.hoverIndex = index;
    this.popupRef.instance.disabled = this.disabled;
    if (!this.popupRef.instance.isOpen) {
      this.popupRef.instance.isOpen = true;
      addClassToOrigin(this.elementRef);
      this.changeDropDownStatus.emit(true);
      this.toggleChange.emit(true);
    }
  }

  writeValue(obj): void {
    this.value = this.valueParser(obj) || '';
    if (!this.retainInputValue) {
      this.writeInputValue(this.value);
    }
  }

  registerOnChange(fn): void {
    this.onChange = fn;
  }

  registerOnTouched(fn): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
    if (this.popupRef) {
      this.popupRef.instance.setDisabledState(isDisabled);
    }
  }

  ngOnDestroy() {
    this.unSubscription();
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('focus', ['$event'])
  onFocus($event) {
    this.focus = true;
    this.transInputFocusEmit.emit({
      focus: true,
      popupRef: this.popupRef,
    });
    if (this.sceneType === 'select') {
      this.searchValue(this.value ?? '', false);
    }
  }

  @HostListener('blur', ['$event'])
  onBlur($event) {
    this.focus = false;
    this.onTouched();
  }

  @HostListener('keydown.esc', ['$event'])
  onEscKeyup($event) {
    this.hidePopup();
  }

  @HostListener('keydown.Enter', ['$event'])
  onEnterKeyDown($event) {
    if (!this.popupRef.instance.source?.length || !this.popupRef.instance.isOpen) {
      return;
    }
    if (this.popupRef) {
      this.popupRef.instance.selectCurrentItem($event);
    }
  }

  @HostListener('keydown.ArrowUp', ['$event'])
  onArrowUpKeyDown($event) {
    if (this.popupRef) {
      $event.preventDefault();
      $event.stopPropagation();
      this.popupRef.instance.prev();
    }
  }

  @HostListener('keydown.ArrowDown', ['$event'])
  onArrowDownKeyDown($event) {
    if (this.popupRef) {
      $event.preventDefault();
      $event.stopPropagation();
      this.popupRef.instance.next();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick($event: Event) {
    if (this.focus) {
      this.transInputFocusEmit.emit({
        focus: this.focus,
        popupRef: this.popupRef,
      });
    }

    // TODO: sceneType为'select'时，自定义了太多处理，十分不优雅，需要合一化
    const hostElement = this.elementRef.nativeElement;
    const isInside = hostElement.contains($event.target);
    const isSelect = this.SELECT_TYPES.includes(this.sceneType);
    const value = this.elementRef.nativeElement.value;
    if (this.popupRef && this.popupRef.instance.isOpen) {
      if ((!isInside && isSelect) || !isSelect) {
        this.hidePopup();
      }
      if (!isInside) {
        this.transInputFocusEmit.emit({
          focus: false,
          popupRef: this.popupRef,
        });
      }
    } else if (isInside && !isSelect) {
      if (!value && !this.allowEmptyValueSearch) {
        this.showLatestSource();
      } else {
        this.searchValue(value, true);
      }
    }
  }

  searchValue(value: any, isOpen: boolean) {
    this.searchFn(value).subscribe((source) => {
      const searchStr = this.formatter(value) ?? '';
      if (searchStr) {
        const activeIndex = source.map((item) => this.formatter(item).toLowerCase()).indexOf(searchStr.toLowerCase());
        this.popupRef.instance.activeIndex = activeIndex > -1 ? activeIndex : 0;
      }
      this.showSource(source, isOpen, false);
    });
  }

  hidePopup = () => {
    if (this.popupRef) {
      this.popupRef.instance.isOpen = false;
      removeClassFromOrigin(this.elementRef);
      this.changeDropDownStatus.emit(false);
      this.toggleChange.emit(false);
    }
  };

  private fillPopup(source?, term?: string) {
    this.position = this.positionService.position(this.elementRef.nativeElement);
    const pop = this.popupRef.instance;
    pop.source = source;
    pop.maxHeight = this.maxHeight;
    pop.term = term;
    pop.disabledKey = this.disabledKey;
    pop.enableLazyLoad = this.enableLazyLoad;
    pop.disabled = this.disabled;
    pop.scrollStrategy = this.scrollStrategy;
    pop.hidePopup = this.hidePopup;
    if (this.appendToBody) {
      pop.appendToBody = true;
      pop.origin = new CdkOverlayOrigin(this.elementRef);
      pop.width = this.dAutoCompleteWidth ? this.dAutoCompleteWidth : this.elementRef.nativeElement.offsetWidth;
      pop.cdkOverlayOffsetY = this.cdkOverlayOffsetY;
    } else {
      pop.appendToBody = false;
    }
    [
      'formatter',
      'itemTemplate',
      'noResultItemTemplate',
      'cssClass',
      'dropdown',
      'popTipsText',
      'position',
      'overview',
      'showAnimation',
      'customViewTemplate',
      'customViewDirection',
    ].forEach((key) => {
      if (this[key] !== undefined) {
        pop[key] = this[key];
      }
    });
  }

  private writeInputValue(value) {
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
  }

  private clearInputValue() {
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', '');
  }

  private unSubscription() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  onTermChange(term) {
    this.value = term;
    if (this.popupRef) {
      this.popupRef.instance.term = term;
    }
    this.onChange(term);
  }

  private registerInputEvent(elementRef: ElementRef) {
    return fromEvent(elementRef.nativeElement, 'input').pipe(
      map((e: any) => e.target.value),
      filter((term) => !this.disabled && this.searchFn && term.length >= 0),
      debounceTime(this.delay),
      tap((term) => this.onTermChange(term)),
      switchMap((term) => this.searchFn(term, this))
    );
  }
}
