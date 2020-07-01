import {
  ChangeDetectorRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewContainerRef,
  HostBinding,
  SimpleChanges,
  OnChanges,
  Renderer2
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, Observable, Subscription, of } from 'rxjs';
import { map, filter, debounceTime, switchMap, tap } from 'rxjs/operators';
import { PositionService } from 'ng-devui/position';
import { AutoCompletePopupComponent } from './auto-complete-popup.component';
import { AutoCompleteConfig } from './auto-complete-config';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';

@Directive({
  selector: '[dAutoComplete]',
  exportAs: 'autoComplete',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AutoCompleteDirective),
    multi: true
  }]
})
export class AutoCompleteDirective implements OnInit, OnDestroy, OnChanges, ControlValueAccessor {
  @HostBinding('attr.autocomplete') autocomplete = 'off';
  @HostBinding('attr.autocapitalize') autocapitalize = 'off';
  @HostBinding('attr.autocorrect') autocorrect = 'off';
  @Input() disabled: boolean;
  @Input() cssClass: string;
  @Input() delay = 300;
  @Input() minLength: number;
  @Input() itemTemplate: TemplateRef<any>;
  @Input() noResultItemTemplate: TemplateRef<any>;
  @Input() searchingTemplate: TemplateRef<any>;
  @Input() set isSearching (isSearching) {
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
  @Input() formatter: (item: any) => string;
  @Input() sceneType = ''; // sceneType使用场景：select(下拉框) suggest(联想)
  @Input() tipsText = ''; // 提示文字
  /*
 overview: border none multiline single
 */
  @Input() overview: string;
  @Input() latestSource: any[]; // 最近输入
  @Input() source: any[];
  @Input() valueParser: (item: any) => any;
  @Input() searchFn: (term: string, target?: AutoCompleteDirective) => Observable<any[]>;
  @Input() dropdown: boolean;
  @Input() maxHeight = 300;
  @Input() disabledKey: string;
  /**
   *  【可选】启用数据懒加载，默认不启用
   */
  @Input() enableLazyLoad = false;
  @Input() allowEmptyValueSearch = false;  // 在value为空时，是否允许进行搜索
  @Output() loadMore = new EventEmitter<any>();
  @Output() selectValue = new EventEmitter<any>();
  @Output() transInputFocusEmit = new EventEmitter<any>(); // input状态传给父组件函数
  @Output() changeDropDownStatus = new EventEmitter<any>();
  KEYBOARD_EVENT_NOT_REFRESH = ['escape', 'enter', 'arrowup', 'arrowdown',
    /*ie 10 edge */ 'esc', 'up', 'down'];
  popupRef: ComponentRef<AutoCompletePopupComponent>;

  popTipsText = '';
  position: any;
  focus = false;

  private valueChanges: Observable<any[]>;
  private value: any;
  private placement = 'bottom-left';
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
    private changeDetectorRef: ChangeDetectorRef) {
    this.minLength = this.autoCompleteConfig.autoComplete.minLength;
    this.itemTemplate = this.autoCompleteConfig.autoComplete.itemTemplate;
    this.noResultItemTemplate = this.autoCompleteConfig.autoComplete.noResultItemTemplate;
    this.formatter = this.autoCompleteConfig.autoComplete.formatter;
    this.valueParser = this.autoCompleteConfig.autoComplete.valueParser;
  }

  ngOnInit() {
    this.valueChanges = this.registerInputEvent(this.elementRef);
    // 调用时机：input keyup
    this.subscription = this.valueChanges
      .subscribe(source => this.onSourceChange(source));

    // 动态的创建了popup组件，
    const factory = this.componentFactoryResolver.resolveComponentFactory(AutoCompletePopupComponent);
    this.popupRef = this.viewContainerRef.createComponent(factory, this.viewContainerRef.length, this.injector);

    this.fillPopup(this.source);

    if (!this.searchFn) {
      this.searchFn = (term) => {
        return of(this.source.filter(lang => this.formatter(lang).toLowerCase().indexOf(term.toLowerCase()) !== -1));
      };
    }

    // 调用时机：选中回车或者鼠标单击下拉选项
    this.popupRef.instance.registerOnChange(item => {
      if (item.type === 'loadMore') {
        this.loadMore.emit(item.value);
        return;
      }
      const value = this.valueParser(item.value);
      this.writeValue(value);
      this.onChange(value);
      this.hidePopup();
      this.selectValue.emit(item.value);
      if (this.overview && this.overview !== 'single') {
        setTimeout(() => { // 这里稍微延迟一下，等待光标的位置发生变化，好重新获取光标的位置
          this.restLatestSource();
        }, 0);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && this.popupRef && changes.source) {
      this.fillPopup(this.source);
    }
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
      if (this.sceneType !== 'select' && !this.allowEmptyValueSearch) { // 下拉场景不展示最近输入
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
      this.searchFn('').subscribe(source => {
        const t = this.latestSource.slice(-5); // 最近输入只支持最多5个，截取后5项
        tempSource = t.filter(data => {
          if (!data.label) {
            return source.find(item => item === data);
          } else {
            return source.find(item => item.label === data.label);
          }
        });

        const pop = this.popupRef.instance;
        pop.reset();
        this.popTipsText = '最近输入';
        this.fillPopup(tempSource);
        this.openPopup();
        this.changeDetectorRef.markForCheck();
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
        this.openPopup();
      }
      this.changeDetectorRef.markForCheck();
    } else {
      this.hidePopup();
    }
  }

  public openPopup() {
    const ele = this.elementRef && this.elementRef.nativeElement;
    this.popupRef.instance.isOpen = true;
    if (ele && !ele.classList.contains('devui-dropdown-origin-open')) {
      ele.classList.add('devui-dropdown-origin-open');
    }
    if (ele && !ele.classList.contains('devui-dropdown-origin-bottom')) {
      ele.classList.add('devui-dropdown-origin-bottom');
    }
    this.changeDropDownStatus.emit(true);
  }

  writeValue(obj): void {
    this.value = this.formatter(obj) || '';
    this.writeInputValue(this.value);
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
  }

  @HostListener('focus', ['$event'])
  onFocus($event) {
    this.focus = true;
    this.transInputFocusEmit.emit({
      focus: true,
      popupRef: this.popupRef
    });
    const isOpen = this.sceneType !== 'select';
    if (this.sceneType === 'select') {
      this.searchFn('').subscribe(source => {
        this.showSource(source, isOpen, false);
      });
    }
  }

  @HostListener('blur', ['$event'])
  onBlur($event) {
    this.focus = false;
    // this.hidePopup();    // TODO: 直接做失焦关闭，与点击操作将有冲突，存在click未完成已经blur，这个改动需要考虑
    this.onTouched();
  }

  @HostListener('keydown.esc', ['$event'])
  onEscKeyup($event) {
    this.hidePopup();
  }

  @HostListener('keydown.Enter', ['$event'])
  onEnterKeyDown($event) {
    if (!this.popupRef.instance.source || !this.popupRef.instance.isOpen) {
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
        popupRef: this.popupRef
      });
    }

    // TODO: sceneType为'select'时，自定义了太多处理，十分不优雅，需要合一化
    const hostElement = this.elementRef.nativeElement;
    if (this.popupRef && this.popupRef.instance.isOpen) {
      if (!hostElement.contains($event.target) && this.sceneType === 'select'
      || this.sceneType !== 'select') {
        this.hidePopup();
      }
      if (!hostElement.contains($event.target)) {
        this.transInputFocusEmit.emit({
          focus: false,
          popupRef: this.popupRef
        });
      }
    } else if (hostElement.contains($event.target) && this.sceneType !== 'select') {
      if (!this.elementRef.nativeElement.value && !this.allowEmptyValueSearch) {
        this.showLatestSource();
      } else {
        this.searchFn(this.elementRef.nativeElement.value).subscribe(source => {
          this.showSource(source, true, false);
        });
      }
    }
  }

  public hidePopup() {
    if (this.popupRef) {
      this.popupRef.instance.isOpen = false;
      const ele = this.elementRef && this.elementRef.nativeElement;
      if (ele && ele.classList.contains('devui-dropdown-origin-open')) {
        ele.classList.remove('devui-dropdown-origin-open');
      }
      if (ele && ele.classList.contains('devui-dropdown-origin-bottom')) {
        ele.classList.remove('devui-dropdown-origin-bottom');
      }
      this.changeDropDownStatus.emit(false);
    }
  }

  private fillPopup(source?, term?: string) {
    this.position = this.positionService.position(this.elementRef.nativeElement);
    const pop = this.popupRef.instance;
    pop.source = source;
    pop.maxHeight = this.maxHeight;
    pop.term = term;
    pop.disabledKey = this.disabledKey;
    pop.enableLazyLoad = this.enableLazyLoad;
    if (this.appendToBody) {
      pop.appendToBody = true;
      pop.origin = new CdkOverlayOrigin(this.elementRef);
      pop.width = this.elementRef.nativeElement.offsetWidth;
    } else {
      pop.appendToBody = false;
    }
    ['formatter', 'itemTemplate', 'noResultItemTemplate', 'cssClass', 'dropdown', 'popTipsText', 'position', 'overview']
      .forEach(key => {
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
    return fromEvent(elementRef.nativeElement, 'keyup')
      .pipe(
        filter((e: KeyboardEvent) => {
          return this.KEYBOARD_EVENT_NOT_REFRESH.indexOf(e.key.toLocaleLowerCase()) === -1;
        }),
        map((e: any) => e.target.value),
        tap(term => this.onTouched()),
        filter(term => !this.disabled && this.searchFn && term.length >= 0),
        debounceTime(this.delay),
        tap(term => this.onTermChange(term)),
        switchMap(term => this.searchFn(term, this))
      );
  }
}

