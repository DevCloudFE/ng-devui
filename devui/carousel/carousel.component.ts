import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { CarouselItemComponent } from './carousel-item.component';

export type ArrowTrigger = 'hover' | 'never' | 'always';
export type DotTrigger = 'click' | 'hover';
export type DotPosition = 'bottom' | 'top';
@Component({
  selector: 'd-carousel',
  exportAs: 'dCarousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class CarouselComponent implements OnInit, AfterContentInit, OnChanges, OnDestroy {
  // 切换箭头的显示方式
  @Input() arrowTrigger: ArrowTrigger = 'hover';
  // 是否自动播放
  @Input() autoplay = false;
  // 默认自动播放间隔时间
  @Input() autoplaySpeed = 3000;
  // 卡片切换动画速度，单位ms
  @Input() transitionSpeed = 500;
  // 卡片高度
  @Input() height = '100%';
  // 是否显示面板指示器
  @Input() showDots = true;
  // 面板指示器位置
  @Input() dotPosition: DotPosition = 'bottom';
  // 指示器触发滚动方式
  @Input() dotTrigger: DotTrigger = 'click';
  // 当前激活面板索引，默认从0开始
  @Input() activeIndex = 0;
  // 卡片切换时，返回当前卡片索引，索引从0开始
  @Output() activeIndexChange = new EventEmitter<number>();
  @ContentChildren(CarouselItemComponent) items: QueryList<CarouselItemComponent>;

  showArrow = false;
  // 卡片容器
  private itemContainer;
  // 卡片数量
  private itemCount;
  // 自动调度id
  private scheduledId;
  // 记录当前页码
  private currentIndex;
  constructor(private el: ElementRef, private renderer: Renderer2, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.showArrow = this.arrowTrigger === 'always';
    this.itemContainer = this.el.nativeElement.querySelector('.devui-carousel-item-container');
  }

  ngOnChanges(changes: SimpleChanges) {
    const { arrowTrigger, activeIndex } = changes;
    if (arrowTrigger && !arrowTrigger.isFirstChange()) {
      this.showArrow = this.arrowTrigger === 'always';
    }
    if (activeIndex && activeIndex.currentValue !== this.currentIndex && !activeIndex.isFirstChange()) {
      this.translatePosition(this.activeIndex);
    }
    if (!this.autoplay || !this.autoplaySpeed) {
      this.clearScheduledTransition();
    } else {
      this.autoScheduleTransition();
    }
  }

  // 切换箭头监听事件，用于处理hover方式
  arrowMouseEvent(type) {
    if (this.arrowTrigger !== 'hover') {
      return;
    }
    if (type === 'enter') {
      this.showArrow = true;
    } else {
      this.showArrow = false;
    }
  }

  // 向前切换
  prev() {
    this.goTo(this.activeIndex - 1);
  }

  // 向后切换
  next() {
    this.goTo(this.activeIndex + 1);
  }

  // 指定跳转位置
  goTo(index) {
    if (index === this.activeIndex) {
      return;
    }
    this.renderer.setStyle(this.itemContainer, 'transition', `left ${this.transitionSpeed}ms ease`);
    if (index < 0 && this.activeIndex === 0) {
      // 第一个卡片向前切换
      this.activeIndex = this.itemCount - 1;
      const targetEl = this.el.nativeElement.querySelectorAll('d-carousel-item')[this.activeIndex];
      this.adjustPosition(targetEl, true);
      this.translatePosition(-1);
      this.adjustTransition(targetEl);
    } else if (index >= this.itemCount && this.activeIndex === this.itemCount - 1) {
      // 最后一个卡片向后切换
      this.activeIndex = 0;
      const targetEl = this.el.nativeElement.querySelectorAll('d-carousel-item')[this.activeIndex];
      this.adjustPosition(targetEl, false);
      this.translatePosition(this.itemCount);
      this.adjustTransition(targetEl);
    } else {
      const idx = index > this.itemCount - 1 ? this.itemCount - 1 : index;
      this.activeIndex = index < 0 ? 0 : idx;
      this.translatePosition(this.activeIndex);
    }
    this.activeIndexChange.emit(this.activeIndex);
    this.currentIndex = this.activeIndex;
    this.cdr.detectChanges();
    this.autoScheduleTransition();
  }

  // 指示器触发切换函数
  switchStep(index, type) {
    if (type === this.dotTrigger) {
      this.goTo(index);
    }
  }

  // 调整首尾翻页后的动画
  private adjustTransition(targetEl) {
    setTimeout(() => {
      this.renderer.removeStyle(this.itemContainer, 'transition');
      this.renderer.removeStyle(targetEl, 'transform');
      this.translatePosition(this.activeIndex);
    }, this.transitionSpeed);
  }

  // 调整首尾翻动时的位置
  private adjustPosition(targetEl, firstToLast: boolean) {
    const wrapperRect = this.el.nativeElement.querySelector('.devui-carousel-item-wrapper').getBoundingClientRect();
    this.renderer.setStyle(targetEl, 'transform', `translateX(${(firstToLast ? -this.itemCount : this.itemCount) * wrapperRect.width}px)`);
  }

  // 翻页位移
  private translatePosition(size: number) {
    this.renderer.setStyle(this.itemContainer, 'left', `${-size * 100}%`);
  }

  // 初始化container的宽度
  private initCarouselWidth() {
    this.itemCount = this.items.length;
    this.renderer.setStyle(this.itemContainer, 'width', `${this.itemCount * 100}%`);
  }

  // 自动轮播调度任务
  private autoScheduleTransition() {
    this.clearScheduledTransition();
    if (this.autoplay && this.autoplaySpeed) {
      this.scheduledId = setTimeout(() => {
        this.next();
      }, this.autoplaySpeed);
    }
  }

  // 清除自动轮播任务
  private clearScheduledTransition() {
    if (this.scheduledId) {
      clearTimeout(this.scheduledId);
      this.scheduledId = null;
    }
  }

  ngAfterContentInit() {
    this.initCarouselWidth();
    this.translatePosition(this.activeIndex);
    this.renderer.setStyle(this.itemContainer, 'transition', `left ${this.transitionSpeed}ms ease`);
    // contentChildren 变化时，触发重新设置pane
    this.items.changes.subscribe((items) => {
      if (items.length !== this.itemCount) {
        this.activeIndex = 0;
        this.initCarouselWidth();
        this.translatePosition(this.activeIndex);
      }
    });
  }

  ngOnDestroy() {
    // 组件销毁时清理掉当前的定时任务
    this.clearScheduledTransition();
  }
}
