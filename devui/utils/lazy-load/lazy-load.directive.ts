import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Directive({ selector: '[dLazyLoad]' })
export class LazyLoadDirective implements OnDestroy, OnChanges, AfterViewInit {
  // 启用懒加载，默认不启用
  @Input() enableLazyLoad = false;
  // 懒加载模式，默认列表模式
  @Input() contentMode: 'img' | 'list' = 'list';
  // 滚动监听的目标，默认是宿主，
  @Input() target: HTMLElement | Window;
  // 图片懒加载模式的图片地址
  @Input() imgLoadSrc: string;
  // 懒加载滚动方向
  @Input() direction: 'vertical' | 'horizontal' = 'vertical';
  // 加载更多
  @Output() loadMore = new EventEmitter<any>();

  scrollSubscription: Subscription;

  // 触发懒加载的距离
  loadFactor = 5;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const element = this.target ? this.target : this.el.nativeElement;
    if (changes?.enableLazyLoad) {
      if (changes.enableLazyLoad.currentValue) {
        const scrollEvent = fromEvent(element, 'scroll');
        let scrollEventFormat = scrollEvent;
        if (this.contentMode === 'list') {
          scrollEventFormat = scrollEvent.pipe(debounceTime(300), distinctUntilChanged());
        }
        this.scrollSubscription = scrollEventFormat.subscribe((event) => this.scrollList(event));
      } else if (this.scrollSubscription) {
        this.scrollSubscription.unsubscribe();
      } else {
        return;
      }
    }
  }

  ngAfterViewInit() {
    if (this.contentMode === 'img') {
      setTimeout(() => {
        const target = this.target ? this.target : this.el.nativeElement;
        const mockEvent = { target };
        this.scrollList(mockEvent);
      });
    }
  }

  ngOnDestroy() {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }

  scrollList(event) {
    const targetEl = event.target.scrollingElement ? event.target.scrollingElement : event.target;
    const { clientWidth, clientHeight, scrollLeft, scrollTop, scrollWidth, scrollHeight } = targetEl;
    if (this.contentMode === 'img') {
      const rect = this.el.nativeElement.getBoundingClientRect();
      const imgCondition =
        this.direction === 'vertical'
          ? rect.top >= 0 && clientHeight >= rect.top + this.loadFactor
          : rect.left >= 0 && clientWidth >= rect.left + this.loadFactor;
      if (imgCondition) {
        if (this.imgLoadSrc) {
          this.el.nativeElement.src = this.imgLoadSrc;
        }
        this.loadMore.emit(event);
        this.scrollSubscription.unsubscribe();
      }
    } else {
      const etcCondition =
        this.direction === 'vertical'
          ? scrollTop !== 0 && scrollTop + clientHeight + this.loadFactor >= scrollHeight
          : scrollLeft !== 0 && scrollLeft + clientWidth + this.loadFactor >= scrollWidth;
      if (etcCondition) {
        this.loadMore.emit(event);
      }
    }
  }
}
