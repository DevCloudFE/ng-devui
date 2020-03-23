import { Directive, forwardRef, HostListener, Inject, Input, OnDestroy, OnInit, HostBinding } from '@angular/core';
import { AnchorDirective } from './anchor.directive';
import { AnchorBoxDirective } from './anchor-box.directive';

@Directive({
  selector: '[dAnchorLink]',
})
export class AnchorLinkDirective implements OnInit, OnDestroy {
  @HostBinding('class') get anchorActiveClass() {
    return (this.anchorBlock && this.anchorBlock.isActive) ? (this.anchorActive || '') : '';
  }
  private _anchorName;
  @Input('dAnchorLink')
  set anchorName(anchor: string) {
    this._anchorName = anchor;
    this.bindAnchorAfterBoxReady();
  }
  get anchorName() { return this._anchorName; }

  @Input() anchorActive: string;

  boxElement: AnchorBoxDirective;
  anchorBlock: AnchorDirective;
  bindingAnchorTimer;
  subscription;

  constructor(@Inject(forwardRef(() => AnchorBoxDirective)) box: AnchorBoxDirective) {
      this.boxElement = box;
  }

  ngOnInit() {
      this.subscribeAnchorMapChange();
  }

  ngOnDestroy() {
      if ( this.subscription) {
          this.subscription.unsubscribe();
      }
  }

  subscribeAnchorMapChange() {
    if (this.boxElement) {
      this.subscription = this.boxElement.refreshAnchorMap.subscribe(() => {
        if (this.bindingAnchorTimer) {
          clearTimeout(this.bindingAnchorTimer);
          this.bindingAnchorTimer = undefined;
        }
        this.bindAnchorAfterBoxReady();
      });
    }
  }

  bindAnchorAfterBoxReady = () => {
    if (this.boxElement.anchorMap) {
      setTimeout(() => {this.anchorBlock = this.boxElement.anchorMap[this.anchorName]; }, 0);
    } else {
      this.bindingAnchorTimer = setTimeout(this.bindAnchorAfterBoxReady, 500);
    }
  }

  @HostListener ('click')
  scrollToAnchor() {
    if ( !this.anchorBlock) {
      return;
    }
    const callback = () => {
      setTimeout(() => { this.boxElement.forceActiveAnchor(this.anchorName, 'anchor-link'); }, 120);
    };
    ((container: Element, anchor: Element) => {
      let containerScrollTop = container.scrollTop;
      if (container === document.documentElement) {
        containerScrollTop += document.body.scrollTop;
      }
      this.scrollAnimate(
        container,
        containerScrollTop,
        (containerScrollTop + anchor.getBoundingClientRect().top - (this.boxElement.view && this.boxElement.view.top || 0)),
        undefined, undefined, callback
      );
    })( this.boxElement.scrollTarget || document.documentElement, this.anchorBlock.element);
  }

  scrollAnimate(target, currentTopValue, targetTopValue, timeGap: number = 40, scrollTime: number = 450, callback?) {
    const startTimeStamp = Date.now();
    const drawAnimateFrame = () => {
      const currentTime = Date.now() - startTimeStamp;
      if (currentTime - timeGap > scrollTime ) {
        target.scrollTop = targetTopValue;
        if (target === document.documentElement) {
          // 兼容写法，老浏览器/老API模式需要document.body滚动，新的需要documentElement滚动
          document.body.scrollTop = targetTopValue;
        }
        if (callback) {
            callback();
        }
      } else {
        const tempTopValue = this.easeInOutCubic(currentTime, currentTopValue, targetTopValue, scrollTime);
        target.scrollTop = tempTopValue;
        if (target === document.documentElement) {
          document.body.scrollTop = tempTopValue;
        }
        setTimeout(() => {requestAnimationFrame(drawAnimateFrame); }, timeGap);
      }
    };
    requestAnimationFrame(drawAnimateFrame);
  }

  easeInOutCubic(t: number, b: number, c: number, d: number): number {
    const cc = c - b;
    let tt = t / (d / 2);
    if (tt < 1) {
      return cc / 2 * tt * tt * tt + b;
    } else {
      return cc / 2 * ((tt -= 2) * tt * tt + 2) + b;
    }
  }
}
