import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnDestroy } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';
import { AnchorService } from './anchor.service';
import { AnchorActiveChangeSource, IAnchorBox } from './anchor.type';

@Directive({
    selector: '[dAnchor]',
    standalone: false
})
export class AnchorDirective implements AfterViewInit, OnDestroy {
  @Input('dAnchor') anchor: string;
  @Input() anchorActive = 'active';
  _isActive: boolean;
  set isActive(active: boolean) {
    this._isActive = active;
    this.activeChangeSubject.next(active);
    if (active) {
      this.anchorService.setCurrentActive(this.anchor);
    } else if (this.anchorService.currentActiveAnchor === this.anchor) {
      this.anchorService.setCurrentActive('');
    }
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

  constructor(private el: ElementRef, private anchorService: AnchorService) {
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
        setTimeout(() => {
          this.element.classList.add(this.lastActiveBy);
        }, 0);
      } else {
        this.element.classList.remove(this.anchorActive);
      }
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
  };

  checkActiveStatus = (activeChangeBy?: AnchorActiveChangeSource) => {
    if (this.boxElement.isScrollingToTarget) {
      return;
    }
    const dom = this.boxElement.scrollTarget;
    const fix = dom && dom instanceof Element ? dom.getBoundingClientRect().top : 0;
    const top = this.element.getBoundingClientRect().top - fix - ((this.boxElement.view && this.boxElement.view.top) || 0);
    const bottom = this.element.getBoundingClientRect().bottom - fix - ((this.boxElement.view && this.boxElement.view.top) || 0);
    const currentActiveAnchor = this.anchorService.currentActiveAnchor;

    if (this.anchor === this.boxElement.defaultAnchor && (!currentActiveAnchor || currentActiveAnchor === this.boxElement.defaultAnchor)) {
      this.activeChangeBy = activeChangeBy || 'scroll';
      this.isActive = bottom > this.REACH_TOP_VISION_OFFSET;
      return;
    }

    this.activeChangeBy = activeChangeBy || 'scroll';
    this.isActive = bottom > this.REACH_TOP_VISION_OFFSET && top < this.REACH_TOP_VISION_OFFSET;
  };

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
