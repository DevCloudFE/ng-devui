import { Directive, forwardRef, HostBinding, HostListener, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { scrollAnimate } from 'ng-devui/utils';
import { AnchorBoxDirective } from './anchor-box.directive';
import { AnchorDirective } from './anchor.directive';
import { AnchorActiveChangeSource } from './anchor.type';

@Directive({
  selector: '[dAnchorLink]',
})
export class AnchorLinkDirective implements OnInit, OnDestroy {
  @HostBinding('class') get anchorActiveClass() {
    return this.anchorBlock && this.anchorBlock.isActive ? this.anchorActive || '' : '';
  }
  private _anchorName;
  @Input('dAnchorLink')
  set anchorName(anchor: string) {
    this._anchorName = anchor;
    this.bindAnchorAfterBoxReady();
  }
  get anchorName() {
    return this._anchorName;
  }

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
    if (this.subscription) {
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
      setTimeout(() => {
        this.anchorBlock = this.boxElement.anchorMap[this.anchorName];
      }, 0);
    } else {
      this.bindingAnchorTimer = setTimeout(this.bindAnchorAfterBoxReady, 500);
    }
  }

  @HostListener('click')
  scrollToAnchor(activeChangeBy?: AnchorActiveChangeSource) {
    if (typeof document === 'undefined') {
      return;
    }
    if (!this.anchorBlock) {
      return;
    }
    const callback = () => {
      setTimeout(() => {
        this.boxElement.forceActiveAnchor(this.anchorName, activeChangeBy || 'anchor-link');
        this.boxElement.isScrollingToTarget = false;
      }, 120);
    };
    ((container: Element, anchor: Element) => {
      let containerScrollTop = container.scrollTop;
      let containerOffsetTop = container.getBoundingClientRect().top;
      if (container === document.documentElement) {
        containerScrollTop += document.body.scrollTop; // scrollTop兼容性问题
        containerOffsetTop = 0; // offsettop抵消
      }
      scrollAnimate(
        container,
        containerScrollTop,
        containerScrollTop +
          anchor.getBoundingClientRect().top -
          containerOffsetTop -
          ((this.boxElement.view && this.boxElement.view.top) || 0),
        undefined,
        undefined,
        callback
      );
    })(this.boxElement.scrollTarget || document.documentElement, this.anchorBlock.element);
    this.boxElement.isScrollingToTarget = true;
  }
}
