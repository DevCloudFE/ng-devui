import {Directive, OnDestroy, Input, Output, HostBinding, EventEmitter, ElementRef,
  SimpleChanges, OnChanges, AfterContentInit
} from '@angular/core';
import {CdkOverlayOrigin} from '@angular/cdk/overlay';
import {Subject, Observable, merge, fromEvent, Subscription} from 'rxjs';
import {debounceTime, mapTo, filter} from 'rxjs/operators';
import {DropDownService} from './dropdown.service';

@Directive({
  selector: '[dDropDown]',
  exportAs: 'd-dropdown',
  providers: [DropDownService]
})
export class DropDownDirective implements OnDestroy, OnChanges, AfterContentInit {
  private hoverSubscription: Subscription;
  /**
   * 控制是否打开dropdown，绑定一个devui-dropdown-open class
   */
  @HostBinding('class.devui-dropdown-open')
  @Input() get isOpen(): boolean {
      return this._isOpen;
  }
  set isOpen(value) {
    this._isOpen = !!value;
    if (this.disabled) {
      return;
    }
    if (this.isOpen) {
      this.visibleSubject.next(true);
      this.focusToggleElement();
      this.dropdownService.open(this);
    } else {
      this.visibleSubject.next(false);
      this.dropdownService.close(this);
    }
    this.toggleEvent.emit(this.isOpen);
  }
  @HostBinding('class.devui-dropdown') addClass = true;
  @Input() disabled = null;

  /**
   * dropdown触发方式
   */
  @Input() trigger: 'click' | 'hover' = 'click';
  /**
   * 关闭区域，默认点击菜单链接也会关闭，blank点击其他空白区域才关闭
   */
  @Input() closeScope: 'all' | 'blank' = 'all';

  @Output() toggleEvent: EventEmitter<boolean> = new EventEmitter();

  visibleSubject = new Subject<boolean>();

  private _isOpen = false;

  // drop menu html
  public menuEl: ElementRef;
  // drop down toggle element
  public toggleEl: ElementRef;

  public cdkConnectedOverlayOrigin: CdkOverlayOrigin;

  private _appendToBody: boolean;

  public set appendToBody(bool: boolean) {
    this._appendToBody = (bool === true);
    this.updateCdkConnectedOverlayOrigin();
  }
  public get appendToBody() {
    return this._appendToBody;
  }

  constructor(private dropdownService: DropDownService, public el: ElementRef) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('trigger')) {
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

  public set dropDownMenu(dropdownMenu) {
    // init drop down menu
    this.menuEl = dropdownMenu.el;
  }

  public set dropDownToggle(dropdownToggle) {
    // init toggle element
    this.toggleEl = dropdownToggle.el;
    this.updateCdkConnectedOverlayOrigin();
  }

  public toggle(): boolean {
    return this.isOpen = !this.isOpen;
  }

  public focusToggleElement() {
    if (this.toggleEl) {
      this.toggleEl.nativeElement.focus();
    }
  }

  updateCdkConnectedOverlayOrigin() {
    if (this.toggleEl && this.appendToBody === true) {
      this.cdkConnectedOverlayOrigin = new CdkOverlayOrigin(this.toggleEl);
    } else {
      this.cdkConnectedOverlayOrigin = undefined;
    }
  }

  subscribeHoverAction(observable: Observable<boolean>): void {
    if (!!!this.hoverSubscription) {
      this.hoverSubscription = observable.pipe(
        debounceTime(50),
      ).subscribe(isOpen => {
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

  handleHoverSubscriptionIfTriggerIsHover () {
    if (this.trigger === 'hover') {
      const states: Observable<boolean> = merge(
        fromEvent(this.el.nativeElement, 'mouseenter').pipe(mapTo(true)),
        fromEvent(this.el.nativeElement, 'mouseleave').pipe(filter((event: MouseEvent) => {
          return !(this.isOpen && this.appendToBody === true && this.menuEl.nativeElement &&
            (this.menuEl.nativeElement.parentElement === event.relatedTarget ||
              this.menuEl.nativeElement.parentElement.contains(event.relatedTarget))
          );
        }), mapTo(false))
      );
      this.subscribeHoverAction(states);
    } else {
      this.unsubscribeHoverAction();
    }
  }
}
