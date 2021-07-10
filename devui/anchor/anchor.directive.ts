import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnDestroy } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';
import { AnchorActiveChangeSource, IAnchorBox } from './anchor.type';

@Directive({
  selector: '[dAnchor]',
})
export class AnchorDirective implements AfterViewInit, OnDestroy {
  @Input('dAnchor') anchor: string;
  @Input() anchorActive = 'active';
  _isActive: boolean;
  set isActive(active: boolean) {
    this._isActive = active;
    this.activeChangeSubject.next(active);
  }
  get isActive() {
    return this._isActive;
  }
  activeChangeBy: AnchorActiveChangeSource;
  activeChangeSubscription: Subscription;
  activeChangeSubject = new ReplaySubject(1);
  lastActiveBy: string;

  element: HTMLElement;
  _boxElement: IAnchorBox;
  set boxElement(box: IAnchorBox) {
    this._boxElement = box;
    this.updateScrollListenTarget();
  }
  get boxElement() {
    return this._boxElement;
  }

  scrollListenTarget: Element | Window;
  REACH_TOP_VISION_OFFSET = 50;

  private THROTTLE_DELAY = 100;
  private THROTTLE_TRIGGER = 600;
  private scrollPreStart;
  private scrollTimer;

  constructor(private el: ElementRef) {
    this.element = this.el.nativeElement;
  }

  ngAfterViewInit() {
    this.activeChangeSubscription = this.activeChangeSubject.asObservable().subscribe((active) => {
      if (this.lastActiveBy) {
        this.element.classList.remove(this.lastActiveBy);
      }
      if (active) {
        this.element.classList.add(this.anchorActive);
        this.lastActiveBy = 'anchor-active-by-' + this.activeChangeBy;
        // setTimeout是为了this.lastActiveBy每次都能被再次触发
        setTimeout(() => {
          this.element.classList.add(this.lastActiveBy);
        }, 0);
      } else {
        this.element.classList.remove(this.anchorActive);
      }
    });
    setTimeout(() => {
      this.checkActiveStatus('initial');
    });
  }

  ngOnDestroy() {
    this.scrollListenTarget.removeEventListener('scroll', this.throttle);
    if (this.activeChangeSubscription) {
      this.activeChangeSubscription.unsubscribe();
    }
  }

  @HostListener('click') // 鼠标落入范围，激活anchor
  beFocused() {
    this.boxElement.forceActiveAnchor(this.anchor, 'click-inside');
    this.boxElement.isScrollingToTarget = false;
  }

  throttle = () => {
    const fn = this.checkActiveStatus;
    const time = Date.now();
    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer);
    }
    if (!this.scrollPreStart) {
      this.scrollPreStart = time;
    }
    if (time - this.scrollPreStart > this.THROTTLE_TRIGGER) {
      fn();
      this.scrollPreStart = null;
      this.scrollTimer = null;
    } else {
      this.scrollTimer = setTimeout(() => {
        fn();
        this.scrollPreStart = null;
        this.scrollTimer = null;
      }, this.THROTTLE_DELAY);
    }
  }

  checkActiveStatus = (activeChangeBy?: AnchorActiveChangeSource) => {
    if (this.boxElement.isScrollingToTarget) {
      return;
    }
    const top = this.element.getBoundingClientRect().top - ((this.boxElement.view && this.boxElement.view.top) || 0);
    const bottom = this.element.getBoundingClientRect().bottom - ((this.boxElement.view && this.boxElement.view.top) || 0);

    // 首个个特殊处理
    if (this.anchor === this.boxElement.defaultAnchor) {
      this.activeChangeBy = activeChangeBy || 'scroll';
      this.isActive = bottom > this.REACH_TOP_VISION_OFFSET;
      return;
    }

    // 默认处理
    this.activeChangeBy = activeChangeBy || 'scroll';
    this.isActive = bottom > this.REACH_TOP_VISION_OFFSET && top < this.REACH_TOP_VISION_OFFSET;
  }

  updateScrollListenTarget() {
    if (this.scrollListenTarget) {
      return;
    }
    if (this.boxElement && typeof window !== 'undefined') {
      this.scrollListenTarget = this.boxElement.scrollTarget || window; // window有scroll事件，document.documentElement没有scroll事件
    }
    this.scrollListenTarget.addEventListener('scroll', this.throttle, { passive: true });
  }
}
