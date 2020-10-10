import {Directive, ElementRef, Host, HostBinding, HostListener, OnInit, Renderer2} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {animate, AnimationBuilder, AnimationMetadata, AnimationPlayer, style} from '@angular/animations';
import {WindowRef} from 'ng-devui/window-ref';
import {DropDownDirective} from './dropdown.directive';

@Directive({
  selector: '[dDropDownMenu]',
  exportAs: 'd-dropdown-menu',
})
export class DropDownMenuDirective implements OnInit {
  player: AnimationPlayer;
  @HostBinding('style.display') diplay = 'none';
  @HostBinding('attr.tabIndex') tabIndex = -1;
  @HostBinding('class.devui-dropdown-menu') addClass = true;
  @HostBinding('class.devui-dropdown-overlay') addDropDownClass = true;
  keydownEscapeEvent$ = fromEvent(document.body, 'keydown').pipe(
    // chrome 为 Escape , ie 11为Esc
    filter(event => (<KeyboardEvent>event).key === 'Escape' || (<KeyboardEvent>event).key === 'Esc')
  );
  keydownEscapeSub: Subscription;
  popDirectionCache: 'top' | 'bottom';
  private currentValue: any = false;
  constructor(@Host() private dropdown: DropDownDirective, private el: ElementRef, private render: Renderer2,
  private windowRef: WindowRef, private builder: AnimationBuilder) {
    this.dropdown.visibleSubject.subscribe(value => {
      if (value !== this.currentValue) {
        this.currentValue = value;
        if (this.keydownEscapeSub) {
          this.keydownEscapeSub.unsubscribe();
        }
        if (value) {
          this.keydownEscapeSub = this.keydownEscapeEvent$.subscribe(event => {
            if (event.defaultPrevented) {return; }
            this.hide(event);
          });
        }
        if (this.dropdown.appendToBody) {
          this.render.setStyle(this.el.nativeElement, 'display', 'block');
          return;
        }
        if (this.player) { // 此处保留一个防止点击过快
          this.player.finish();
        }
        if (value) {
          this.render.setStyle(this.el.nativeElement, 'display', 'block');
        }
        const direction = this.calcPopDirection(value);
        const metadata = value ? this.fadeIn(direction) : this.fadeOut(direction);
        const factory = this.builder.build(metadata);
        this.player = factory.create(this.el.nativeElement);
        const player = this.player;
        this.player.onDone(() => {
          if (!value) {
            this.render.setStyle(this.el.nativeElement, 'display', 'none');
          }
          player.destroy();
          if (this.player === player) {
            this.player = undefined;
          }
        });
        this.player.play();
      }
    });
  }

  ngOnInit() {
    this.dropdown.dropDownMenu = this;
  }

  calcPopDirection(value) {
    const dropdownMenuElement = this.el.nativeElement;
    const elementHeight = dropdownMenuElement.offsetHeight;
    const bottomDistance = this.windowRef.innerHeight - this.dropdown.el.nativeElement.getBoundingClientRect().bottom;
    const isBottomEnough = bottomDistance >= elementHeight;
    if (!value) {
      return this.popDirectionCache;
    } else {
      if (!isBottomEnough) {
        this.render.setStyle(dropdownMenuElement, 'bottom', 'calc(100% - 1px)');
        this.render.setStyle(dropdownMenuElement, 'top', 'auto');
        this.popDirectionCache = 'top';
        this.changeFormWithDropDown(this.popDirectionCache);
        return 'top';
      } else {
        this.render.removeStyle(dropdownMenuElement, 'bottom');
        this.render.removeStyle(dropdownMenuElement, 'top');
        this.popDirectionCache = 'bottom';
        this.changeFormWithDropDown(this.popDirectionCache);
        return 'bottom';
      }
    }
  }

  changeFormWithDropDown(position) {
    const ele = this.formWithDropDown();
    let formBorder;
    if (ele && !ele.classList.contains('devui-dropdown-origin-open')) {
      ele.classList.add('devui-dropdown-origin-open');
    }
    if (position === 'bottom') {
      formBorder = 'top';
    } else {
      formBorder = 'bottom';
    }
    if (ele && !ele.classList.contains(`devui-dropdown-origin-${position}`)) {
      ele.classList.add(`devui-dropdown-origin-${position}`);
      ele.classList.remove(`devui-dropdown-origin-${formBorder}`);
    }
  }

  formWithDropDown() {
    if (this.dropdown && this.dropdown.toggleEl) {
      if (!this.dropdown.toggleEl.nativeElement.classList.contains('devui-dropdown-origin')) {
        const parentEle = this.dropdown.toggleEl.nativeElement.parentElement;
        if (parentEle && parentEle.classList.contains('devui-dropdown-origin')) {
          return this.dropdown.toggleEl.nativeElement.parentElement;
        } else {
          return this.dropdown.toggleEl.nativeElement;
        }
      } else {
        return this.dropdown.toggleEl.nativeElement;
      }
    }
  }

  @HostListener('mouseleave', ['$event'])
  public mouseLeave(event: MouseEvent) {
    event.stopPropagation();
    if ((this.dropdown.appendToBody && this.dropdown.trigger === 'hover')
    || (this.dropdown.trigger === 'click' && this.dropdown.closeOnMouseLeaveMenu)) {
    if (this.dropdown.toggleEl.nativeElement.contains(event.relatedTarget)
      || this.dropdown.dropdownChildren.some(
        children =>
          children.menuEl !== this.el
          && children.menuEl.nativeElement.parentElement
          && children.menuEl.nativeElement.parentElement.contains(event.relatedTarget))) {
      return;
    } else {
      if (this.dropdown.trigger === 'hover') {
        this.dropdown.simulateEventDispatch(event);
      } else {
        const relatedTarget = event['originEvent'] &&　event['originEvent'].relatedTarget;
        if (relatedTarget && (
            this.dropdown.toggleEl.nativeElement.contains(relatedTarget)
            || this.dropdown.dropdownChildren.some(children => children.menuEl.nativeElement.contains(relatedTarget))
          )) {
          return;
        }
        this.dropdown.isOpen = false;
      }
    }
  }
    return false;
  }

  private fadeIn(direction): AnimationMetadata[] {
    switch (direction) {
      case 'top':
        return [
          style({transform: 'translateZ(0) scaleY(0)', opacity: 0, transformOrigin: '0% 100%'}),
          animate('200ms cubic-bezier(0.23, 1, 0.32, 1)',
            style({transform: 'translateZ(0) scaleY(1)', opacity: 1, transformOrigin: '0% 100%'})
          ),
        ];
      case 'bottom':
      default:
        return [
          style({transform: 'translateZ(0) scaleY(0)', opacity: 0, transformOrigin: '0% 0%'}),
          animate('200ms cubic-bezier(0.23, 1, 0.32, 1)',
            style({transform: 'translateZ(0) scaleY(1)', opacity: 1, transformOrigin: '0% 0%'})
          ),
        ];
    }
  }

  public hide = (event: Event) => {
    this.dropdown.toggle();
  }

  private fadeOut(direction): AnimationMetadata[] {
    switch (direction) {
      case 'top':
        return [
          style({transform: 'translateZ(0) scaleY(1)', opacity: 1, transformOrigin: '0% 100%'}),
          animate('200ms cubic-bezier(0.755, 0.05, 0.855, 0.06)',
            style({transform: 'translateZ(0) scaleY(0)', opacity: 0, transformOrigin: '0% 100%'})
          )
        ];
      case 'bottom':
      default:
        return [
          style({transform: 'translateZ(0) scaleY(1)', opacity: 1, transformOrigin: '0% 0%'}),
          animate('200ms cubic-bezier(0.755, 0.05, 0.855, 0.06)',
            style({transform: 'translateZ(0) scaleY(0)', opacity: 0, transformOrigin: '0% 0%'})
          )
        ];
    }
  }
}
