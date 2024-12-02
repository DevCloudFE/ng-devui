import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectorRef,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  Output,
  QueryList,
  SimpleChanges,
  SkipSelf,
} from '@angular/core';
import { addClassToOrigin, DevConfigService, formWithDropDown, removeClassFromOrigin, WithConfig } from 'ng-devui/utils';
import { fromEvent, merge, Observable, ReplaySubject, Subscription } from 'rxjs';
import { debounceTime, delay, filter, mapTo, tap } from 'rxjs/operators';
import { DropDownService } from './dropdown.service';

@Directive({
  selector: '[dDropDown]',
  exportAs: 'd-dropdown',
  providers: [DropDownService],
})
export class DropDownDirective implements OnDestroy, OnChanges, AfterContentInit {
  @ContentChildren(forwardRef(() => DropDownDirective), { descendants: true }) dropdownChildren: QueryList<DropDownDirective>;
  private hoverSubscription: Subscription;
  /**
   * 控制是否打开dropdown，绑定一个devui-dropdown-open class
   */
  @HostBinding('class.devui-dropdown-open')
  @Input() set isOpen(value) {
    this._isOpen = !!value;
    if (this.disabled) {
      return;
    }
    if (this.isOpen) {
      this.visibleSubject.next(true);
      this.focusToggleElement();
      this.dropdownService.open(this);
      addClassToOrigin(this.toggleEl);
      setTimeout(() => {
        this.startAnimation = true;
        this.cdr.detectChanges();
      });
    } else {
      this.startAnimation = false;
      this.visibleSubject.next(false);
      this.dropdownService.close(this);
      removeClassFromOrigin(this.toggleEl);
    }
    this.toggleEvent.emit(this.isOpen);
  }
  get isOpen(): boolean {
    return this._isOpen;
  }
  mouseenterFlag = false;
  startAnimation = false;

  @HostBinding('class.devui-dropdown') addClass = true;
  @Input() disabled = false;
  @HostBinding('class.devui-dropdown-animation')
  @Input() @WithConfig() showAnimation = true;
  /**
   * dropdown触发方式
   */
  @Input() trigger: 'click' | 'hover' | 'manually' = 'click';
  /**
   * 关闭区域，默认点击菜单链接也会关闭，blank点击其他空白区域才关闭
   */
  @Input() closeScope: 'all' | 'blank' | 'none' = 'all';
  @Input() closeOnMouseLeaveMenu = false;
  @Input() autofocusToggleElement = true;
  @Output() toggleEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  visibleSubject = new ReplaySubject<boolean>(1);

  private _isOpen = false;

  // drop menu html
  public menuEl: ElementRef;
  // drop down toggle element
  public toggleEl: ElementRef;

  public cdkConnectedOverlayOrigin: CdkOverlayOrigin;

  private _appendToBody: boolean;
  document: Document;

  public set appendToBody(bool: boolean) {
    this._appendToBody = bool === true;
    this.updateCdkConnectedOverlayOrigin();
  }
  public get appendToBody() {
    return this._appendToBody;
  }

  public set dropDownMenu(dropdownMenu) {
    // init drop down menu
    this.menuEl = dropdownMenu.el;
  }

  public set dropDownToggle(dropdownToggle) {
    // init toggle element
    this.toggleEl = dropdownToggle.el;
    this.updateCdkConnectedOverlayOrigin();
  }

  constructor(
    private dropdownService: DropDownService,
    private cdr: ChangeDetectorRef,
    public el: ElementRef,
    private devConfigService: DevConfigService,
    @Optional() @SkipSelf() public parentDropdown: DropDownDirective,
    @Inject(DOCUMENT) private doc: any
  ) {
    this.document = this.doc;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (Object.prototype.hasOwnProperty.call(changes, 'trigger')) {
      this.handleHoverSubscriptionIfTriggerIsHover();
    }
  }

  ngOnDestroy() {
    this.dropdownService.close(this);
    this.unsubscribeHoverAction();
  }

  ngAfterContentInit() {
    this.handleHoverSubscriptionIfTriggerIsHover();
  }

  public toggle(): boolean {
    this.isOpen = !this.isOpen;
    return this.isOpen;
  }

  public focusToggleElement() {
    if (this.toggleEl && this.autofocusToggleElement) {
      this.toggleEl.nativeElement.focus();
    }
  }

  updateCdkConnectedOverlayOrigin() {
    if (this.toggleEl && this.appendToBody === true) {
      this.cdkConnectedOverlayOrigin = new CdkOverlayOrigin(formWithDropDown(this.toggleEl) || this.toggleEl.nativeElement);
    } else {
      this.cdkConnectedOverlayOrigin = undefined;
    }
  }

  subscribeHoverAction(observable: Observable<boolean>): void {
    if (!this.hoverSubscription) {
      this.hoverSubscription = observable.pipe(debounceTime(50)).subscribe((isOpen) => {
        if (this.mouseenterFlag) {
          this.mouseenterFlag = false;
          return;
        }
        if (!this.disabled && this.isOpen !== isOpen) {
          this.isOpen = isOpen;
        }
      });
    }
  }

  private unsubscribeHoverAction() {
    if (this.hoverSubscription) {
      this.hoverSubscription.unsubscribe();
      this.hoverSubscription = null;
    }
  }

  handleHoverSubscriptionIfTriggerIsHover() {
    if (this.trigger === 'hover') {
      const states: Observable<boolean> = merge(
        fromEvent(this.el.nativeElement, 'mouseenter').pipe(mapTo(true)),
        fromEvent(this.el.nativeElement, 'mouseleave').pipe(
          delay(200),
          filter((event: any) => {
            if (this.isOpen && this.appendToBody === true) {
              // 冒泡模拟的relatedTarget， 和作用于dropdown本身event.relatedTarget
              // menu（子） -> toggle（父） 冒泡模拟的用于离开菜单的时候判断不判断overlay的div层，即只判断menuEl.nativeElement
              // toggle（父） -> menu（子） 离开元素本身的需要判断是否落入了overlay的div层，即只判断menuEl.nativeElement.parentElement
              const relatedTarget = event.relatedTarget || (event.originEvent && event.originEvent.relatedTarget);
              return  !(this.menuEl?.nativeElement && relatedTarget &&
                  (this.menuEl?.nativeElement.parentElement?.contains(event.relatedTarget)
                  || this.menuEl?.nativeElement.parentElement?.parentElement?.contains(event.relatedTarget) // 套了两层div增加判断
                  || this.menuEl?.nativeElement.contains(relatedTarget)
                  || this.dropdownChildren.some(
                    children =>
                      children !== this
                      // appendToBody的时候可能会没有实例化不在document上需要做判断有没有parentElement
                      && (children.menuEl?.nativeElement.parentElement?.contains(event.relatedTarget)
                      || children.menuEl?.nativeElement.contains(relatedTarget))
                  ))
              );
            } else {
              return true;
            }
          }),
          tap((event) => {
            if (this.parentDropdown) {
              this.simulateEventDispatch(event, this.parentDropdown.el.nativeElement);
            }
          }),
          mapTo(false))
      );
      this.subscribeHoverAction(states);
    } else {
      this.unsubscribeHoverAction();
    }
  }

  simulateEventDispatch($event, target?) {
    const event: any = this.document.createEvent('MouseEvents');
    event.initEvent($event.type, true, true);
    event.originEvent = $event.originEvent || $event;

    if (!target) {
      target = this.el.nativeElement;
    }

    target.dispatchEvent(event);
  }
}
