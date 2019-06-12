import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges,
     ViewChild, HostListener, ElementRef, AfterViewInit , OnDestroy, HostBinding} from '@angular/core';

export type StickyStatus =  'normal' | 'follow' | 'stay' | 'remain';

@Component({
    selector: 'ave-sticky',
    template: `
        <div #stickyWrapper [style.zIndex]="zIndex">
          <ng-content></ng-content>
        </div>
    `,
})

export class StickyComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    @HostBinding('style.position') hostPosition = 'relative';
    @Input() zIndex: number;
    @Input() container: Element; // 默认值父容器
    @Input() view: {
        top?: number,
        bottom?: number,
    };
    @Input() scrollTarget;

    @Output() statusChange: EventEmitter<StickyStatus> = new EventEmitter();
    @ViewChild('stickyWrapper') wrapper;

    _prevStatus: StickyStatus = undefined;
    _status: StickyStatus = 'normal';
    set status(status: StickyStatus) {
        if (status !== this._status) {
            this._prevStatus = this._status;
            this._status = status;
            this.statusProcess(this._status);
        }
    }
    get stauts() {
        return this._status;
    }

    parentNode;
    containerLeft; // 用于监听是否是横向滚动

    private THROTTLE_DELAY = 16;
    private THROTTLE_TRIGER = 100;
    private scrollPreStart;
    private scrollTimmer;

    constructor(private el: ElementRef) {
    }

    ngOnChanges(changes: SimpleChanges): void {


    }

    ngOnInit() {
        this.parentNode = this.el.nativeElement.parentNode;
        if ( !this.container) {
            this.container = this.parentNode;
        }
    }

    ngAfterViewInit() {
        this.scrollTarget = this.scrollTarget || window; // window有scroll事件，document.documentElement没有scroll事件
        this.scrollTarget.addEventListener('scroll', this.throttle);
        this.initScrollStatus(this.scrollTarget);
    }

    ngOnDestroy() {
        this.scrollTarget.removeEventListener('scroll', this.throttle);
    }

    statusProcess(status) {
        switch (status) {
            case 'normal':
                this.wrapper.nativeElement.style.top = 'auto';
                this.wrapper.nativeElement.style.left = 'auto';
                this.wrapper.nativeElement.style.position = 'static';
                break;
            case 'follow':
                this.wrapper.nativeElement.style.top = (this.view && this.view.top || 0 ) + 'px';
                this.wrapper.nativeElement.style.left = this.wrapper.nativeElement.getBoundingClientRect().left + 'px';
                this.wrapper.nativeElement.style.position = 'fixed';
                break;
            case 'stay':
                this.wrapper.nativeElement.style.top =
                     this.calculateRelativePosition(this.wrapper.nativeElement, this.parentNode, 'top') + 'px';
                this.wrapper.nativeElement.style.left = 'auto';
                this.wrapper.nativeElement.style.position = 'relative';
                break;
            case 'remain':
                if ( this.wrapper.nativeElement.style.position !== 'fixed' || this.wrapper.nativeElement.style.position !== 'absolute') {
                    this.wrapper.nativeElement.style.top =
                        this.calculateRelativePosition(this.wrapper.nativeElement, this.parentNode, 'top') + 'px';
                    this.wrapper.nativeElement.style.left = 'auto';
                    this.wrapper.nativeElement.style.position = 'absolute'; // 要先转为absolute再计算，否则如果处于非fixed影响计算
                }
                this.wrapper.nativeElement.style.top =
                    this.calculateRemainPosition(this.wrapper.nativeElement, this.parentNode, this.container) + 'px';
                this.wrapper.nativeElement.style.left =
                    this.calculateRelativePosition(this.wrapper.nativeElement, this.parentNode, 'left') + 'px';
                this.wrapper.nativeElement.style.position = 'relative';
                break;
            default:
                break;
        }
    }

    @HostListener('window:resize')
    // @HostListener('window:scroll') 改为动态绑定
    throttle = () => {
        const fn = this.scrollAndResizeHock;
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
    scrollAndResizeHock = () => {
        if (this.container.getBoundingClientRect().left - (this.containerLeft || 0)  !== 0) {
            // console.log('stay');
            this.status = 'stay';
            this.containerLeft = this.container.getBoundingClientRect().left;
        } else {
            // console.log('handle');
            this.scrollHandler();
        }
    }

    scrollHandler = () => {
       const computedStyle = window.getComputedStyle(this.container);
       if (this.parentNode.getBoundingClientRect().top > (this.view && this.view.top || 0)) {
            this.status = 'normal';   // 全局滑动（container!==parentNode）时候增加预判
       } else if (this.container.getBoundingClientRect().top
           + parseInt(computedStyle.paddingTop, 10)
           + parseInt(computedStyle.borderTopWidth, 10)
               >= (this.view && this.view.top || 0)) {
           this.status = 'normal';
       } else if (this.container.getBoundingClientRect().bottom
           - parseInt(computedStyle.paddingBottom, 10)
           - parseInt(computedStyle.borderBottomWidth, 10)
           - this.wrapper.nativeElement.getBoundingClientRect().height
               < (this.view && this.view.top || 0) + (this.view && this.view.bottom || 0)
               ) {
           this.status = 'remain';
       } else if ((this.container.getBoundingClientRect().top + parseInt(computedStyle.paddingTop, 10) < (this.view && this.view.top || 0))
         ) {
           this.status = 'follow';
        }
    }

    calculateRelativePosition(element, relativeElement, direction) {
        const key = {
            'left': ['left', 'Left'],
            'top': ['top', 'Top']
        };
        if (window && window.getComputedStyle) {
            const computedStyle = window.getComputedStyle(relativeElement);
            return element.getBoundingClientRect()[key[direction][0]]
                    - relativeElement.getBoundingClientRect()[key[direction][0]]
                    - parseInt(computedStyle['padding' + key[direction][1]], 10)
                    - parseInt(computedStyle['border' + key[direction][1] + 'Width'], 10);
        }
    }
    calculateRemainPosition(element, relativeElement, container) {
        if (window && window.getComputedStyle) {
            const computedStyle = window.getComputedStyle(container);
            const result = container.getBoundingClientRect().height
                    - element.getBoundingClientRect().height
                    + container.getBoundingClientRect().top
                    - relativeElement.getBoundingClientRect().top
                    - parseInt(computedStyle['paddingTop'], 10)
                    - parseInt(computedStyle['borderTopWidth'], 10)
                    - parseInt(computedStyle['paddingBottom'], 10)
                    - parseInt(computedStyle['borderBottomWidth'], 10);
                    // - (this.offset && this.offset.bottom || 0);
                    // console.log(
                    //   container.getBoundingClientRect().height,
                    //   element.getBoundingClientRect().height,
                    //   container.getBoundingClientRect().top,
                    //   relativeElement.getBoundingClientRect().top,
                    //   result);
            return result < 0 ? 0 : result;
        }
    }

    // calculateHScrollPosition(element, relativeElement, container) {
    //     if (window && window.getComputedStyle) {
    //         let computedStyle = window.getComputedStyle(container);
    //         let result =  parseInt(computedStyle['paddingLeft'], 10)
    //                 + parseInt(computedStyle['borderLeftWidth'], 10);
    //         return result < 0 ? 0 : result;
    //     }
    // }

    initScrollStatus(target) {
      const scrollTargets = target === window ? [document.documentElement, document.body] : [target];
      let flag = false;
      scrollTargets.forEach(scrollTarget => {
        if (scrollTarget.scrollTop && scrollTarget.scrollTop > 0) {
            flag = true;
        }
      });
      if (flag) {
        setTimeout(this.scrollHandler); // setTimeout是因为要等一个宏观的页面数据刷新完，否则页面其他部分数据加载完可能会有跳变可能会导致定位计算有问题。
      }

    }

    /**
     * 提供给业务自己触发
     * 用法：
     * 1.捕获所有sticky：```@ViewChildren(StickyComponent) stickies;```
     * 2.触发刷新：当需要手动触发更新的时候，比如订阅数据返回后页面高度发生变化可以调用 ```stickies.forEach(sticky => sticky.recalculatePosition());```
     * 慎用，少用， 使用太多会影响性能。
     */
    public recalculatePosition() {
      this.initScrollStatus(this.scrollTarget);
    }
}
// TODO :
// ☑ 1. 监听节流 done
// ☑ 2. 增加滑动动画 (节流后的会出现位置闪现 增加滑动动画弥补效果) delete 没有必要了 状态切换不需要动画了
// ☑ 3. 监听窗口resize重新恢复normal然后重新计算, 横向滚动变为stay状态
// 4. 代码优化!!
// ☑ 5. scroll监听对象要支持传入
// 6. 增加offset支持
// ☑ 7. 增加初始状态滚动初始化（用于滚动条处于非初始状态的时候的页面刷新或路由切换）
// ☑ 8.还有一种情况，内容更新影响dom高度但不影响scroll位置的，需要业务自己触发
