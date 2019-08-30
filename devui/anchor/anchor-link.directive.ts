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
  bindingAnchorTimmer;
  subscription;

  constructor(@Inject(forwardRef(() => AnchorBoxDirective)) box: AnchorBoxDirective) {
      this.boxElement = box;
  }

  ngOnInit() {
      this.subscribeAnchroMapChange();
  }

  ngOnDestroy() {
      if ( this.subscription) {
          this.subscription.unsubscribe();
      }
  }

  subscribeAnchroMapChange() {
    if (this.boxElement) {
      this.subscription = this.boxElement.refreshAnchorMap.subscribe(() => {
        if (this.bindingAnchorTimmer) {
          clearTimeout(this.bindingAnchorTimmer);
          this.bindingAnchorTimmer = undefined;
        }
        this.bindAnchorAfterBoxReady();
      });
    }
  }

  bindAnchorAfterBoxReady = () => {
    if (this.boxElement.anchorMap) {
      setTimeout(() => {this.anchorBlock = this.boxElement.anchorMap[this.anchorName]; }, 0);
    } else {
      this.bindingAnchorTimmer = setTimeout(this.bindAnchorAfterBoxReady, 500);
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
      this.scrollAnimate(
        container,
        container.scrollTop,
        (container.scrollTop + anchor.getBoundingClientRect().top - (this.boxElement.view && this.boxElement.view.top || 0)),
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
        if (callback) {
            callback();
        }
      } else {
        target.scrollTop = this.easeInOutCubic(currentTime, currentTopValue, targetTopValue, scrollTime);
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
