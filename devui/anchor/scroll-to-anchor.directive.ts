import { AfterViewInit, ChangeDetectorRef, ContentChildren, Directive, ElementRef,
   forwardRef, Host, HostListener, Inject, Input, OnDestroy, OnInit, QueryList } from '@angular/core';
import { Subject } from 'rxjs';
import { reqAnimFrame } from './polyfill/request-animation';
/* tslint:disable */
@Directive({
  selector: '[aveAnchor]'
})
export class TargetAnchorDirective implements AfterViewInit, OnDestroy {
    @Input('aveAnchor') anchor: string;
    isActive: boolean;
    element;
    boxElement: ScrollToAnchorBoxDirective;
    scrollListenTarget: Element;
    REACH_TOP_VISION_OFFSET = 50;

    private THROTTLE_DELAY = 100;
    private THROTTLE_TRIGER = 600;
    private scrollPreStart;
    private scrollTimmer;

    constructor(private el: ElementRef, @Host() @Inject(forwardRef(() => ScrollToAnchorBoxDirective )) box: ScrollToAnchorBoxDirective ) {
        this.element = this.el.nativeElement;
        this.boxElement = box;
        // console.log('find box', this.boxElement);
    }

    ngAfterViewInit() {
        this.checkActiveStatus();
        if (this.boxElement) {
            this.scrollListenTarget = this.boxElement.scrollTarget || window; // window有scroll事件，document.documentElement没有scroll事件
        }
        this.scrollListenTarget.addEventListener('scroll', this.throttle);
    }

    ngOnDestroy() {
        this.scrollListenTarget.removeEventListener('scroll', this.throttle);
    }

    @HostListener('click') // 鼠标落入范围，激活anchor
    beFocused() {
        this.boxElement.forceActiveAnchor(this.anchor);
    }

    // @HostListener('window:scroll') // TODO：节流性能优化 done; // TODO:  this._ngZone.runOutsideAngular // 容器滚动的时候window不滚动，改为动态绑定
    throttle = () => {
        const fn = this.checkActiveStatus;
        const time = Date.now();
        // console.log('触发');
        if (this.scrollTimmer) {
            // console.log('重入');
            clearTimeout(this.scrollTimmer);
        }
        if (!this.scrollPreStart) {
            // console.log('计时');
            this.scrollPreStart = time;
        }
        if (time - this.scrollPreStart > this.THROTTLE_TRIGER) {
            // console.log('超时', time , this.scrollPreStart);
            fn();
            this.scrollPreStart = null;
            this.scrollTimmer = null;
        } else {
            // console.log('延时');
            this.scrollTimmer = setTimeout(() => {
                // console.log('延时触发', Date.now(), this.scrollPreStart);
                fn();
                this.scrollPreStart = null;
                this.scrollTimmer = null;
            }, this.THROTTLE_DELAY);
        }
    }

    checkActiveStatus = () => {
        // console.log('performance test');
        const top = this.element.getBoundingClientRect().top -  (this.boxElement.view.top || 0);
        const bottom = this.element.getBoundingClientRect().bottom - (this.boxElement.view.top || 0);
        // let reachBottom = this.element.getBoundingClientRect().bottom +  (this.boxElement.view.bottom || 0)
        //                 - document.documentElement.getBoundingClientRect().bottom;

        // 首个个特殊处理
        if (this.anchor === this.boxElement.defaultAnchor) {
           this.isActive = bottom > this.REACH_TOP_VISION_OFFSET  ? true : false;
           return;
        }

        // // 触及底部特殊处理
        // if (this.anchor === this.boxElement.lastAnchor) {
        //    this.isActive = reachBottom >= 0  ? true : false;
        //     if (this.isActive) { return; }
        // }

        // 默认处理
        this.isActive = bottom > this.REACH_TOP_VISION_OFFSET  && top < this.REACH_TOP_VISION_OFFSET ? true : false;
    }
}

@Directive({
  selector: '[aveAnchorLink]',
  host: {'[class]': 'anchorBlock?.isActive? anchorActive : ""'}, /* TODO: 研究改成hostbinding的方法，hostbinding绑定动态class名*/
})
export class ScrollToAnchorDirective implements OnInit, OnDestroy {
    private _anchorName;
    @Input('aveAnchorLink')
    set anchorName(anchor: string) {
        this._anchorName = anchor;
        this.bindAnchorAfterBoxReady();
    };
    get anchorName() { return this._anchorName; }

    @Input() anchorActive: string;
    // @Input() scrollTarget: Element;

    boxElement: ScrollToAnchorBoxDirective;
    anchorBlock: TargetAnchorDirective;
    bindingAnchorTimmer;
    subscription;

    // @HostBinding ('class.' + this.anchorActive)
    // isAnchorActive = this.anchorBlock && this.anchorBlock.isActive;

    constructor( @Host() @Inject(forwardRef(() => ScrollToAnchorBoxDirective )) box: ScrollToAnchorBoxDirective,
                private cdr: ChangeDetectorRef ) {
        this.boxElement = box;
        // console.log('find box', this.boxElement);
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
                // console.log('refresh anchor map', this.boxElement.anchorMap);
                if (this.bindingAnchorTimmer) {
                    clearTimeout(this.bindingAnchorTimmer);
                    this.bindingAnchorTimmer = undefined;
                }
                this.bindAnchorAfterBoxReady();
            });
            // console.log(this.subscription);
        }
    }

    bindAnchorAfterBoxReady = () => {
        if (this.boxElement.anchorMap) {
            setTimeout(() => {this.anchorBlock = this.boxElement.anchorMap[this.anchorName]; }, 0); // setTimeout 0s 是为了不能在一个周期内刷新数据，容易引起问题。
            // console.log('bind anchor', this.anchorBlock);
        } else {
            // console.log('Retry binding after half secend');
            // TODO:重入要clear
            this.bindingAnchorTimmer = setTimeout(this.bindAnchorAfterBoxReady, 500);
        }
    }

    @HostListener ('click')
    scrollToAnchor() {
        if ( !this.anchorBlock) {
            return;
        }
        const callback = () => {
            setTimeout(() => { this.boxElement.forceActiveAnchor(this.anchorName); }, 0); // setTimeout 0s 是为了不能在一个周期内刷新数据，等滚动后刷新。
        };
        ((container: Element, anchor: Element) => {
            // container.scrollTop = (container.scrollTop + anchor.getBoundingClientRect().top - (this.boxElement.view.top || 0));
            this.scrollAnimate(
                container,
                container.scrollTop,
                (container.scrollTop + anchor.getBoundingClientRect().top - (this.boxElement.view.top || 0)),
                undefined, undefined, callback
            );
        })( this.boxElement.scrollTarget || document.documentElement, this.anchorBlock.element);
    }

    scrollAnimate(target, currentTopValue, targetTopValue, timeGap: number = 40, scrollTime: number = 450, callback?) {
        const startTimeStamp = Date.now();
        const drawAnimateFrame = () => {
            const currentTime = Date.now() - startTimeStamp;
            if (currentTime > scrollTime ) {
                target.scrollTop = targetTopValue;
                if (callback) {
                    callback();
                }
            } else {
                target.scrollTop = this.easeInOutCubic(currentTime, currentTopValue, targetTopValue, scrollTime);
                // setTimeout(drawAnimateFrame, timeGap);
                 reqAnimFrame(drawAnimateFrame);
            }
        };
        // setTimeout(drawAnimateFrame, 10);
        reqAnimFrame(drawAnimateFrame);
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
// log
// 1. [基本功能]支持点击链接滑动到对应锚点
// 2. [基本功能]支持当前锚点到了可视区域顶部的时候自动激活锚点绑定的链接，可选激活class名字
// 3. [体验优化]支持点击的链接对应的锚点无法到达窗口时也可以强制激活链接
// 4. [体验优化]支持当锚点内被点击后， 自动激活对应的链接
// 5. [体验优化]支持设置默认锚点，默认锚点会在页面没有到达该位置前默认激活
// 6. [体验优化]增加滑动方案（参考ngzorro）
// 7. [性能优化]锚点滚动时候自动检测激活状态增加节流
// 8. [动态加载]支持锚点与锚点的链接异步加载

/* tslint:disable */
@Directive({
  selector: '[aveAnchorBox]'
})
export class ScrollToAnchorBoxDirective {
    @Input() view: {
        top?: number,
        bottom?: number
    };
    @Input() defaultAnchor: string;
    @Input() scrollTarget;
    refreshAnchorMap: Subject<any> = new Subject<any>();
    /* 查询获取锚点元素 */
    anchorMap: {
        [anchor: string]: TargetAnchorDirective;
    };
    // lastAnchor;
    _anchorList: QueryList<TargetAnchorDirective>;
    @ContentChildren(TargetAnchorDirective, {descendants: true})
    set anchorList(list: QueryList<TargetAnchorDirective>) {
        this.anchorMap = {};
        this._anchorList = list;
        this._anchorList.toArray().forEach(targetAnchor => {
            this.anchorMap[targetAnchor.anchor] = targetAnchor;
        });
        // let last = this._anchorList.toArray().pop();
        // if (last) {
        //     this.lastAnchor = last.anchor;
        // }
        // console.log('scan anchor', this.anchorMap);
        this.refreshAnchorMap.next();
    }
    get anchroList() {
        return this._anchorList;
    }

    constructor() {
    }

    forceActiveAnchor(anchorName: string, deactiveOtherAnchord = true) {
        this.anchorMap[anchorName].isActive = true;
        if (deactiveOtherAnchord) {
            Object.keys(this.anchorMap).filter(name => name !== anchorName)
                                       .map(name => this.anchorMap[name])
                                       .forEach(anchor => {anchor.isActive = false; });
        }
    }
}


