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
  // tslint:disable-next-line: deprecation // ie11不支持code
  keydownEscapeEvent$ = fromEvent(document.body, 'keydown').pipe(filter(event => (<KeyboardEvent>event).keyCode === 27));
  keydownEscapeSub: Subscription;
  popDirectionCache: 'top' | 'bottom';
  private currentValue: any;
  constructor(@Host() private dropdown: DropDownDirective, private el: ElementRef, private render: Renderer2,
  private windowRef: WindowRef, private builder: AnimationBuilder) {
    this.dropdown.visibleSubject.subscribe(value => {
      if (value !== this.currentValue) {
        this.currentValue = value;
        this.render.setStyle(this.el.nativeElement, 'display', 'block');
        if (value) {
          this.keydownEscapeSub = this.keydownEscapeEvent$.subscribe(event => {
            this.hide(event);
          });
        } else {
          if (this.keydownEscapeSub) {
            this.keydownEscapeSub.unsubscribe();
          }
        }
        if (this.dropdown.appendToBody) {
          return;
        }
        if (this.player) {
          this.player.destroy();
        }
        const direction = this.calcPopDirection(value);
        const metadata = value ? this.fadeIn(direction) : this.fadeOut(direction);
        const factory = this.builder.build(metadata);
        this.player = factory.create(this.el.nativeElement);
        this.player.play();
      }
    });
  }

  ngOnInit() {
    this.dropdown.dropDownMenu = this;
  }

  calcPopDirection(value) {
    const selectMenuElement = this.el.nativeElement;
    const elementHeight = selectMenuElement.offsetHeight;
    const bottomDistance = this.windowRef.innerHeight - this.dropdown.el.nativeElement.getBoundingClientRect().bottom;
    const isBottomEnough = bottomDistance >= elementHeight;
    if (!value) {
      return this.popDirectionCache;
    } else {
      if (!isBottomEnough) {
        this.render.setStyle(selectMenuElement, 'bottom', '100%');
        this.render.setStyle(selectMenuElement, 'top', 'auto');
        this.popDirectionCache = 'top';
        return 'top';
      } else {
        this.render.removeStyle(selectMenuElement, 'bottom');
        this.render.removeStyle(selectMenuElement, 'top');
        this.popDirectionCache = 'bottom';
        return 'bottom';
      }
    }
  }

  @HostListener('mouseleave', ['$event'])
  public mouseLeave(event: MouseEvent) {
    event.stopPropagation();
    if (this.dropdown.appendToBody && this.dropdown.trigger === 'hover') {
      if (this.dropdown.toggleEl.nativeElement === event.relatedTarget
        || this.dropdown.toggleEl.nativeElement.contains(event.relatedTarget)) {
        return;
      } else {
        this.dropdown.isOpen = false;
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
            style({transform: 'translateZ(0) scaleY(1)', opacity: 1, transformOrigin: '0% 100%'})),
        ];
      case 'bottom':
      default:
        return [
          style({transform: 'translateZ(0) scaleY(0)', opacity: 0, transformOrigin: '0% 0%'}),
          animate('200ms cubic-bezier(0.23, 1, 0.32, 1)',
            style({transform: 'translateZ(0) scaleY(1)', opacity: 1, transformOrigin: '0% 0%'})),
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
            style({transform: 'translateZ(0) scaleY(0)', opacity: 0, transformOrigin: '0% 100%'}))
        ];
      case 'bottom':
      default:
        return [
          style({transform: 'translateZ(0) scaleY(1)', opacity: 1, transformOrigin: '0% 0%'}),
          animate('200ms cubic-bezier(0.755, 0.05, 0.855, 0.06)',
            style({transform: 'translateZ(0) scaleY(0)', opacity: 0, transformOrigin: '0% 0%'}))
        ];
    }
  }
}
