import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Directive({ selector: '[dLazyLoad]' })
export class LazyLoadDirective implements OnInit, OnDestroy {

  // 启用懒加载，默认不启用
  @Input() enableLazyLoad = false;
  // 加载更多
  @Output() loadMore = new EventEmitter();

  scrollSubscription: Subscription;

  // 触发懒加载的距离
  loadFactor = 5;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    if (this.enableLazyLoad) {
      this.scrollSubscription = fromEvent(this.el.nativeElement, 'scroll').pipe(
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe(event => this.scrollList(event));
    }
  }

  ngOnDestroy() {
    // tslint:disable-next-line:no-unused-expression
    this.scrollSubscription && this.scrollSubscription.unsubscribe();
  }

  scrollList(event) {
    const targetEl = event.target;
    const clientHeight = targetEl.clientHeight;
    const scrollHeight = targetEl.scrollHeight;
    const scrollTop = targetEl.scrollTop;
    if (scrollTop !== 0 && (scrollTop + clientHeight + this.loadFactor >= scrollHeight)) {
      this.loadMore.emit(event);
    }

  }
}
