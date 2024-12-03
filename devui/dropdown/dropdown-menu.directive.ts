import { animate, AnimationBuilder, AnimationMetadata, AnimationPlayer, style } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Host, HostBinding, HostListener, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AnimationCurves, AnimationDuration } from 'ng-devui/utils';
import { WindowRef } from 'ng-devui/window-ref';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DropDownDirective } from './dropdown.directive';

@Directive({
  selector: '[dDropDownMenu]',
  exportAs: 'd-dropdown-menu',
})
export class DropDownMenuDirective implements OnInit, OnDestroy {
  player: AnimationPlayer;
  @HostBinding('style.display') display = 'none';
  @HostBinding('attr.tabIndex') tabIndex = -1;
  @HostBinding('class.devui-dropdown-menu') addClass = true;
  subscription: Subscription;
  keydownEscapeEvent$;
  keydownEscapeSub: Subscription;
  popDirectionCache: 'top' | 'bottom';
  private currentValue: any = false;
  constructor(@Host() private dropdown: DropDownDirective, private el: ElementRef, private render: Renderer2,
              private windowRef: WindowRef, private builder: AnimationBuilder, @Inject(DOCUMENT) private doc: any) {
    this.keydownEscapeEvent$ = fromEvent(this.doc.body, 'keydown').pipe(
      // chrome 为 Escape , ie 11为Esc
      filter(event => (<KeyboardEvent>event).key === 'Escape' || (<KeyboardEvent>event).key === 'Esc')
    );
  }

  ngOnInit() {
    this.dropdown.dropDownMenu = this;
    this.subscription = this.dropdown.visibleSubject.subscribe(value => {
      if (value !== this.currentValue) {
        this.currentValue = value;
        if (this.keydownEscapeSub) {
          this.keydownEscapeSub.unsubscribe();
        }
        if (value) {
          this.keydownEscapeSub = this.keydownEscapeEvent$.subscribe(event => {
            if (event.defaultPrevented) { return; }
            this.hide(event);
          });
        }
        if (this.dropdown.appendToBody) {
          this.render.setStyle(this.el.nativeElement, 'display', 'block'); // 立马生效不等host binding绑定
          this.display = 'block';
          return;
        }
        if (this.player) { // 此处保留一个防止点击过快
          this.player.finish();
        }
        if (this.dropdown.showAnimation) {
          const direction = this.calcPopDirection(value);
          const metadata = value ? this.fadeIn(direction) : this.fadeOut(direction);
          const factory = this.builder.build(metadata);
          this.player = factory.create(this.el.nativeElement);
          const player = this.player;
          this.player.onDone(() => {
            if (!value) {
              this.render.setStyle(this.el.nativeElement, 'display', 'none');
              this.display = 'none';
            }
            player.destroy();
            if (this.player === player) {
              this.player = undefined;
            }
          });
          this.player.onStart(() => {
            if (value) {
              this.render.setStyle(this.el.nativeElement, 'display', 'block');
              this.display = 'block';
            }
          });
          this.player.play();
        } else {
          this.render.setStyle(this.el.nativeElement, 'display', value ? 'block' : 'none');
          this.display = value ? 'block' : 'none';
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.keydownEscapeSub) {
      this.keydownEscapeSub.unsubscribe();
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
        this.render.setStyle(dropdownMenuElement, 'bottom', '100%');
        this.render.setStyle(dropdownMenuElement, 'top', 'auto');
        this.popDirectionCache = 'top';
        return 'top';
      } else {
        this.render.removeStyle(dropdownMenuElement, 'bottom');
        this.render.removeStyle(dropdownMenuElement, 'top');
        this.popDirectionCache = 'bottom';
        return 'bottom';
      }
    }
  }

  @HostListener('mouseenter', ['$event'])
  public mouseEnter(event: MouseEvent) {
    this.dropdown.mouseenterFlag = true;
  }

  @HostListener('mouseleave', ['$event'])
  public mouseLeave(event: MouseEvent) {
    event.stopPropagation();
    this.dropdown.mouseenterFlag = false;
    if ((this.dropdown.appendToBody && this.dropdown.trigger === 'hover')
      || (this.dropdown.trigger === 'click' && this.dropdown.closeOnMouseLeaveMenu)) {
      if (this.dropdown.toggleEl?.nativeElement.contains(event.relatedTarget)
        || this.dropdown.dropdownChildren.some(
          children =>
            children.menuEl !== this.el
            && children.menuEl?.nativeElement.parentElement?.contains(event.relatedTarget))) {
        return;
      } else {
        if (this.dropdown.trigger === 'hover') {
          this.dropdown.simulateEventDispatch(event);
        } else {
          const relatedTarget = (event as any).originEvent?.relatedTarget;
          if (relatedTarget && (
            this.dropdown.toggleEl?.nativeElement.contains(relatedTarget)
            || this.dropdown.dropdownChildren.some(children => children.menuEl?.nativeElement.contains(relatedTarget))
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
        style({transform: 'scaleY(0.8) translateY(4px)', opacity: 0.8, transformOrigin: '0% 100%'}),
        animate(`200ms ${AnimationCurves.EASE_IN}`,
          style({transform: 'scaleY(0.9999) translateY(0)', opacity: 1, transformOrigin: '0% 100%'})),
      ];
    case 'bottom':
    default:
      return [
        style({transform: 'scaleY(0.8)  translateY(-4px)', opacity: 0.8, transformOrigin: '0% 0%'}),
        animate(`200ms ${AnimationCurves.EASE_OUT}`,
          style({transform: 'scaleY(0.9999)  translateY(0)', opacity: 1, transformOrigin: '0% 0%'})),
      ];
    }
  }

  public hide = (event: Event) => {
    this.dropdown.toggle();
  };

  private fadeOut(direction): AnimationMetadata[] {
    switch (direction) {
    case 'top':
      return [
        style({transform: 'scaleY(0.9999)  translateY(0)', opacity: 1, transformOrigin: '0% 100%'}),
        animate(`${AnimationDuration.BASE} ${AnimationCurves.EASE_IN}`,
          style({transform: 'scaleY(0.8)  translateY(4px)', opacity: 0.8, transformOrigin: '0% 100%'}))
      ];
    case 'bottom':
    default:
      return [
        style({transform: 'scaleY(0.9999)  translateY(0)', opacity: 1, transformOrigin: '0% 0%'}),
        animate(`${AnimationDuration.BASE} ${AnimationCurves.EASE_IN}`,
          style({transform: 'scaleY(0.8)  translateY(-4px)', opacity: 0.8, transformOrigin: '0% 0%'}))
      ];
    }
  }
}
