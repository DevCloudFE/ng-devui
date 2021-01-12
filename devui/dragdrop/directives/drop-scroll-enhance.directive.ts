import { AfterViewInit, Directive, ElementRef, Input, NgZone, OnDestroy } from '@angular/core';
import { fromEvent, merge as mergeStatic, Subscription } from 'rxjs';
import { tap, throttleTime } from 'rxjs/operators';
import { DragDropService } from '../services/drag-drop.service';
import { Utils } from '../shared/utils';
import { DropScrollAreaOffset, DropScrollDirection, DropScrollEnhanceTimingFunctionGroup, DropScrollOrientation,
  DropScrollSpeed, DropScrollSpeedFunction, DropScrollTriggerEdge } from './drop-scroll-enhance.type';

@Directive({
  selector: '[dDropScrollEnhanced]',
  exportAs: 'dDropScrollEnhanced'
})
export class DropScrollEnhancedDirective implements AfterViewInit, OnDestroy {
  @Input() minSpeed: DropScrollSpeed = 50;
  @Input() maxSpeed: DropScrollSpeed = 1000;
  @Input() responseEdgeWidth: string | ((total: number) => string)  = '100px';
  @Input() speedFn: DropScrollSpeedFunction = DropScrollEnhanceTimingFunctionGroup.default;
  @Input() direction: DropScrollDirection = 'v';
  @Input() viewOffset: {
    forward?: DropScrollAreaOffset; // 仅重要边和次要边有效
    backward?: DropScrollAreaOffset;
  };
  @Input() dropScrollScope: string | Array<string>;
  @Input() backSpaceDroppable = true;

  private forwardScrollArea: HTMLElement;
  private backwardScrollArea: HTMLElement;
  private subscription: Subscription = new Subscription();
  private forwardScrollFn: (event: DragEvent) => void;
  private backwardScrollFn: (event: DragEvent) => void;
  private lastScrollTime;
  private animationFrameId: number;

  constructor(private el: ElementRef, private zone: NgZone, private dragDropService: DragDropService) {}

  ngAfterViewInit() {
    // 设置父元素
    this.el.nativeElement.parentNode.style.position = 'relative';
    this.el.nativeElement.parentNode.style.display = 'block';
    // 创建后退前进区域和对应的滚动函数
    this.forwardScrollArea = this.createScrollArea(this.direction, DropScrollOrientation.forward);
    this.backwardScrollArea = this.createScrollArea(this.direction, DropScrollOrientation.backward);
    this.forwardScrollFn = this.createScrollFn(this.direction, DropScrollOrientation.forward, this.speedFn);
    this.backwardScrollFn = this.createScrollFn(this.direction, DropScrollOrientation.backward, this.speedFn);
    this.zone.runOutsideAngular(() => {
      // 拖拽到其上触发滚动
      this.subscription.add(fromEvent<DragEvent>(this.forwardScrollArea, 'dragover')
        .pipe(
          tap(event => {event.preventDefault(); event.stopPropagation(); }),
          throttleTime(100, undefined, {leading: true, trailing: false})
        ).subscribe(event => this.forwardScrollFn(event)));
      this.subscription.add(fromEvent<DragEvent>(this.backwardScrollArea, 'dragover')
        .pipe(
          tap(event => {event.preventDefault(); event.stopPropagation(); }),
          throttleTime(100, undefined, {leading: true, trailing: false}))
        .subscribe(event => this.backwardScrollFn(event)));
      // 拖拽放置委托
      this.subscription.add(
        mergeStatic(
          fromEvent<DragEvent>(this.forwardScrollArea, 'drop'),
          fromEvent<DragEvent>(this.backwardScrollArea, 'drop')
        ).subscribe(event => this.delegateDropEvent(event)));
      // 拖拽离开清除参数
      this.subscription.add(
        mergeStatic(
          fromEvent(this.forwardScrollArea, 'dragleave', {passive: true}),
          fromEvent(this.backwardScrollArea, 'dragleave', {passive: true})
        ).subscribe(event => this.cleanLastScrollTime())
      );
      // 滚动过程计算区域有效性，滚动条贴到边缘的时候无效，无效的时候设置鼠标事件可用为none
      this.subscription.add(
        fromEvent(this.el.nativeElement, 'scroll', {passive: true})
        .pipe(throttleTime(300, undefined, {leading: true, trailing: true}))
        .subscribe(event => {
          this.toggleScrollToOneEnd(this.el.nativeElement, this.forwardScrollArea, this.direction, DropScrollOrientation.forward);
          this.toggleScrollToOneEnd(this.el.nativeElement, this.backwardScrollArea, this.direction, DropScrollOrientation.backward);
        })
      );
      // 窗口缩放的时候重绘有效性区域
      this.subscription.add(
        fromEvent(window, 'resize', {passive: true})
        .pipe(throttleTime(300, undefined, {leading: true, trailing: true}))
        .subscribe(event => this.resizeArea())
      );
      // dragstart的时候显示拖拽滚动边缘面板
      this.subscription.add(
        this.dragDropService.dragStartEvent.subscribe(() => {
            if (!this.allowScroll()) {return; }
            this.zone.runOutsideAngular(() => {
              setTimeout(() => {
                // 立马出现会打断边缘元素的拖拽
                this.forwardScrollArea.style.display = 'block';
                this.backwardScrollArea.style.display = 'block';
              });
            });
        })
      );
      // dragEnd或drop的时候结束了拖拽，滚动区域影藏起来
      this.subscription.add(
          mergeStatic(this.dragDropService.dragEndEvent, this.dragDropService.dropEvent)
          .subscribe(() => {
            this.forwardScrollArea.style.display = 'none';
            this.backwardScrollArea.style.display = 'none';
            this.lastScrollTime = undefined;
        })
      );
    });
    setTimeout(() => {
      this.resizeArea();
    }, 0);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  createScrollFn(direction: DropScrollDirection, orientation: DropScrollOrientation,
                 speedFn: DropScrollSpeedFunction) {
    const scrollAttr = (direction === 'v') ? 'scrollTop' : 'scrollLeft';
    const eventAttr = (direction === 'v') ? 'clientY' : 'clientX';
    const scrollWidthAttr = (direction === 'v') ? 'scrollHeight' : 'scrollWidth';
    const offsetWidthAttr = (direction === 'v') ? 'offsetHeight' : 'offsetWidth';
    const clientWidthAttr = (direction === 'v') ? 'clientHeight' : 'clientWidth';
    const rectWidthAttr = (direction === 'v') ? 'height' : 'width';
    const compareTarget = (orientation === DropScrollOrientation.forward) ? this.forwardScrollArea : this.backwardScrollArea;
    const targetAttr = this.getCriticalEdge(direction, orientation);
    const scrollElement = this.el.nativeElement;

    return (event: DragEvent) => {
      const compareTargetRect = compareTarget.getBoundingClientRect();
      const distance = event[eventAttr] - compareTargetRect[targetAttr];
      let speed = speedFn(Math.abs(distance / (compareTargetRect[rectWidthAttr] || 1)));
      if (speed < this.minSpeed) { speed = this.minSpeed; }
      if (speed > this.maxSpeed) { speed = this.maxSpeed; }
      if (distance < 0) { speed = - speed; }
      if (this.animationFrameId) {
        window.cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = undefined;
      }
      this.animationFrameId = requestAnimationFrame(() => {
        const time = new Date().getTime();
        const moveDistance = Math.ceil(speed * (time - (this.lastScrollTime || time)) / 1000);
        scrollElement[scrollAttr] -= moveDistance;
        this.lastScrollTime = time;
        // 判断是不是到尽头
        if ((scrollElement[scrollAttr] === 0 && orientation === DropScrollOrientation.backward)
        || ((scrollElement[scrollAttr]
          + (scrollElement.getBoundingClientRect())[rectWidthAttr]
          - scrollElement[offsetWidthAttr]
          + scrollElement[clientWidthAttr]
          ) === scrollElement[scrollWidthAttr]
          && orientation === DropScrollOrientation.forward)
        ) {
          compareTarget.style.pointerEvents = 'none';
          this.toggleActiveClass(compareTarget, false);
        }
        this.animationFrameId = undefined;
      });
      if (this.backSpaceDroppable) {
        Utils.dispatchEventToUnderElement(event);
      }
    };
  }
  delegateDropEvent(event: DragEvent) {
    if (this.backSpaceDroppable) {
      const ev = Utils.dispatchEventToUnderElement(event);
      if (ev.defaultPrevented) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  }
  getCriticalEdge(direction: DropScrollDirection, orientation: DropScrollOrientation): DropScrollTriggerEdge {
    return (direction === 'v' && orientation === DropScrollOrientation.forward && 'bottom')
    || (direction === 'v' && orientation === DropScrollOrientation.backward && 'top')
    || (direction !== 'v' && orientation === DropScrollOrientation.forward && 'right')
    || (direction !== 'v' && orientation === DropScrollOrientation.backward && 'left') || 'bottom';
  }
  getSecondEdge(direction: DropScrollDirection): DropScrollTriggerEdge {
    return (direction === 'v' && 'left')
    || (direction !== 'v' &&  'top') || 'left';
  }

  createScrollArea(direction: DropScrollDirection, orientation: DropScrollOrientation) {
    const area = document.createElement('div');
    area.className = 'dropover-scroll-area ' + 'dropover-scroll-area-' + this.getCriticalEdge(direction, orientation);
    // 处理大小
    area.classList.add('active');
    this.setAreaSize(area, direction, orientation);
    // 处理位置
    area.style.position = 'absolute';
    this.setAreaStyleLayout(area, direction, orientation);

    // 默认不展示
    area.style.display = 'none';
    // 附着元素
    this.el.nativeElement.parentNode.appendChild(area, this.el.nativeElement);
    return area;
  }

  setAreaSize(area: HTMLElement, direction: DropScrollDirection, orientation: DropScrollOrientation) {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const containerAttr = direction === 'v' ? 'height' : 'width';
    const responseEdgeWidth = (typeof this.responseEdgeWidth === 'string')
      ? this.responseEdgeWidth
      : this.responseEdgeWidth(rect[containerAttr]);
    const settingOffset = this.viewOffset
      && (orientation === DropScrollOrientation.forward ? this.viewOffset.forward : this.viewOffset.backward);
    let width = direction === 'v' ? (rect.width + 'px') : responseEdgeWidth;
    let height =  direction === 'v' ? responseEdgeWidth : (rect.height + 'px');
    if (settingOffset) {
      if (settingOffset.widthOffset) {
        width = 'calc(' + width + ' + ' + (settingOffset.widthOffset) + 'px)';
      }
      if (settingOffset.heightOffset) {
        height = 'calc(' + height + ' + ' + (settingOffset.heightOffset) + 'px)';
      }
    }
    area.style.width = width;
    area.style.height = height;
  }

  setAreaStyleLayout (area: HTMLElement, direction: DropScrollDirection, orientation: DropScrollOrientation) {
    const target = this.el.nativeElement;
    const relatedTarget = this.el.nativeElement.parentNode;
    const defaultOffset = {left: 0, right: 0, top: 0, bottom: 0};
    const settingOffset = this.viewOffset
      && (orientation === DropScrollOrientation.forward ? this.viewOffset.forward : this.viewOffset.backward)
      || defaultOffset;

    const criticalEdge = this.getCriticalEdge(direction, orientation);
    const secondEdge = this.getSecondEdge(direction);
    [criticalEdge, secondEdge].forEach(edge => {
      area.style[edge] = this.getRelatedPosition(target, relatedTarget, edge, settingOffset[edge]);
    });
  }

  getRelatedPosition(target, relatedTarget, edge: DropScrollTriggerEdge, offsetValue?: number) {
    const relatedComputedStyle = window.getComputedStyle(relatedTarget);
    const relatedRect = relatedTarget.getBoundingClientRect();
    const selfRect = target.getBoundingClientRect();
    const helper = {
      left: ['left', 'Left'],
      right: ['right', 'Right'],
      top: ['top', 'Top'],
      bottom: ['bottom', 'Bottom'],
    };
    let factor = 1;
    if (edge === 'right' || edge === 'bottom') { factor = -1; }
    return (selfRect[helper[edge][0]] - relatedRect[helper[edge][0]]
          + parseInt(relatedComputedStyle['border' +  helper[edge][1] + 'Width'], 10)) * factor
          + (offsetValue || 0)
          + 'px';
  }

  resizeArea() {
    [{area: this.forwardScrollArea, orientation: DropScrollOrientation.forward},
     {area: this.backwardScrollArea, orientation: DropScrollOrientation.backward}
    ]
     .forEach(item => {
      this.setAreaSize(item.area, this.direction, item.orientation);
      this.setAreaStyleLayout(item.area, this.direction, item.orientation);
    });
  }

  toggleScrollToOneEnd(scrollElement: any, toggleElement: HTMLElement, direction: DropScrollDirection, orientation: DropScrollOrientation) {
    const scrollAttr = (direction === 'v') ? 'scrollTop' : 'scrollLeft';
    const scrollWidthAttr = (direction === 'v') ? 'scrollHeight' : 'scrollWidth';
    const offsetWidthAttr = (direction === 'v') ? 'offsetHeight' : 'offsetWidth';
    const clientWidthAttr = (direction === 'v') ? 'clientHeight' : 'clientWidth';
    const rectWidthAttr = (direction === 'v') ? 'height' : 'width';
    if ((scrollElement[scrollAttr] === 0 && orientation === DropScrollOrientation.backward) || (
      Math.abs(
        scrollElement[scrollAttr]
        + (scrollElement.getBoundingClientRect())[rectWidthAttr]
        - scrollElement[scrollWidthAttr]
        - scrollElement[offsetWidthAttr]
        + scrollElement[clientWidthAttr]
      ) < 1
      && orientation === DropScrollOrientation.forward
    )) {
      toggleElement.style.pointerEvents = 'none';
      this.toggleActiveClass(toggleElement, false);
    } else {
      toggleElement.style.pointerEvents = 'auto';
      this.toggleActiveClass(toggleElement, true);
    }
  }

  cleanLastScrollTime() {
    if (this.animationFrameId) {
      window.cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = undefined;
    }
    this.lastScrollTime = undefined;
  }

  toggleActiveClass(target, active) {
    if (active) {
      target.classList.remove('inactive');
      target.classList.add('active');
    } else {
      target.classList.remove('active');
      target.classList.add('inactive');
    }
  }

  allowScroll(): boolean {
    if (!this.dropScrollScope) { return true; }
    let allowed = false;
    if (typeof this.dropScrollScope === 'string') {
      if (typeof this.dragDropService.scope === 'string') {
        allowed = this.dragDropService.scope === this.dropScrollScope;
      }
      if (this.dragDropService.scope instanceof Array) {
        allowed = this.dragDropService.scope.indexOf(this.dropScrollScope) > -1;
      }
    }
    if (this.dropScrollScope instanceof Array) {
      if (typeof this.dragDropService.scope === 'string') {
        allowed = this.dropScrollScope.indexOf(this.dragDropService.scope) > -1;
      }
      if (this.dragDropService.scope instanceof Array) {
        allowed = this.dropScrollScope.filter((item) => {
          return this.dragDropService.scope.indexOf(item) !== -1;
        }).length > 0;
      }
    }
    return allowed;
  }
}
