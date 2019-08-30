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
import { map, filter, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { DevUIConfig } from 'ng-devui/devui.config';
import { AutoCompletePopupComponent } from './auto-complete-popup.component';

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
  @HostBinding('attr.autocomplete')
  @HostBinding('attr.autocapitalize')
  @HostBinding('attr.autocorrect')
  internalFormControalFunction = 'off';

  @HostBinding('class.devui-input')
  @Input() formClass = true;

  @Input() disabled: boolean;
  @Input() cssClass: string;
  @Input() delay: number;
  @Input() minLength: number;
  @Input() itemTemplate: TemplateRef<any>;
  @Input() noResultItemTemplate: TemplateRef<any>;
  @Input() formatter: (item: any) => string;
  @Input() source: any[];
  @Input() valueParser: (item: any) => any;
  @Input() searchFn: (term: string, target?: AutoCompleteDirective) => Observable<any[]>;
  @Input() isMultiple: boolean;
  @Input() dropdown: boolean;
  @Input() maxHeight: number;
  @Output() selectValue = new EventEmitter<any>();
  KEYBOARD_EVENT_NOT_REFLASH = ['escape',  'enter', 'arrowup',  'arrowdown',
  /*ie 10 edge */ 'esc', 'up', 'down'];
  popupRef: ComponentRef<AutoCompletePopupComponent>;
  private valueChanges: Observable<any[]>;
  private value: any;
  private placement = 'bottom-left';
  private subscription: Subscription;
  private onChange = (_: any) => null;
  private onTouched = () => null;

  constructor(private elementRef: ElementRef,
              private viewContainerRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              private renderer: Renderer2,
              private injector: Injector,
              private devuiConfig: DevUIConfig,
              private changeDetectorRef: ChangeDetectorRef) {
    this.valueChanges = this.registerInputEvent(elementRef);
    this.delay = this.devuiConfig.autoComplete.delay;
    this.minLength = this.devuiConfig.autoComplete.minLength;
    this.itemTemplate = this.devuiConfig.autoComplete.itemTemplate;
    this.noResultItemTemplate = this.devuiConfig.autoComplete.noResultItemTemplate;
    this.formatter = this.devuiConfig.autoComplete.formatter;
    this.valueParser = this.devuiConfig.autoComplete.valueParser;
  }

  ngOnInit() {
    this.subscription = this.valueChanges
      .subscribe(source => this.onSourceChange(source));

    const factory = this.componentFactoryResolver.resolveComponentFactory(AutoCompletePopupComponent);
    this.popupRef = this.viewContainerRef.createComponent(factory, this.viewContainerRef.length, this.injector);


    this.fillPopup(this.source);

    if (this.source) {
      this.searchFn = (term) => {
        return of(this.source.filter(lang => lang.toLowerCase().indexOf(term.toLowerCase()) !== -1));
      };
    }

    this.popupRef.instance.registerOnChange(item => {
      const value = this.valueParser(item);
      this.writeValue(value);
      this.onChange(value);
      this.hidePopup();
      this.selectValue.emit(item);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && this.popupRef && changes.source) {
      this.fillPopup(this.source);
    }
  }

  writeValue(obj: any): void {
    this.value = obj || '';
    this.writeInputValue(this.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
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

  @HostListener('blur', [])
  onBlur() {
    this.onTouched();
  }

  @HostListener('keydown.esc', ['$event'])
  onEscKeyup($event) {
    this.hidePopup();
  }

  @HostListener('keydown.Enter', ['$event'])
  onEnterKeyDown($event) {
    if (!this.popupRef.instance.source) {
      return;
    }
    this.hidePopup();
    if (this.popupRef) {
      $event.preventDefault();
      $event.stopPropagation();
      this.popupRef.instance.selectCurrentItem();
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
    if (this.popupRef && !this.popupRef.instance.isOpen) {
      return;
    }

    const hostElement = this.elementRef.nativeElement;
    if (!hostElement.contains($event.target) || this.isMultiple) {
      this.hidePopup();
    }
  }

  onSourceChange(source) {
    if ((source && source.length) || this.noResultItemTemplate) {
      const pop = this.popupRef.instance;
      pop.reset();
      this.fillPopup(source, this.value);
      pop.isOpen = true;
      this.changeDetectorRef.markForCheck();
    }
  }

  private hidePopup() {
    if (this.popupRef) {
      this.popupRef.instance.isOpen = false;
    }
  }

  private showPopup() {
    if (this.popupRef) {
      this.popupRef.instance.isOpen = true;
    }
  }

  private fillPopup(source?: any, term?: string) {
    const pop = this.popupRef.instance;
    pop.source = source;
    pop.maxHeight = this.maxHeight;
    pop.term = term;
    ['formatter', 'itemTemplate', 'noResultItemTemplate', 'cssClass', 'dropdown']
      .forEach(key => {
        if (this[key] !== undefined) {
          pop[key] = this[key];
        }
      });
  }

  private writeInputValue(value: any) {
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', this.formatter(value || ''));
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
        filter((e: KeyboardEvent) => this.KEYBOARD_EVENT_NOT_REFLASH.indexOf(e.key.toLocaleLowerCase()) === -1),
        map((e: any) => e.target.value),
        tap(term => this.onTouched()),
        filter(term => !this.disabled && this.searchFn && term.length >= 0),
        debounceTime(this.delay),
        tap(term => this.onTermChange(term)),
        switchMap(term => this.searchFn(term, this))
      );
  }
}

