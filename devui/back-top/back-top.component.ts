import { Component, OnInit, OnChanges, OnDestroy, Input, Output, TemplateRef, EventEmitter } from '@angular/core';
import { ChangeDetectionStrategy, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'd-back-top',
  templateUrl: './back-top.component.html',
  styleUrls: ['./back-top.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class BackTopComponent implements OnInit, OnChanges, OnDestroy {
  @Input() customTemplate: TemplateRef<any>;
  @Input() visibleHeight = 300;
  @Input() bottom = '50px';
  @Input() right = '30px';
  @Input() scrollTarget: HTMLElement;
  @Output() backTopEvent: EventEmitter<any> = new EventEmitter<any>();

  currScrollTop = 0;
  isVisible = false;
  private destroy$ = new Subject();
  SCROLL_REFRESH_INTERVAL = 100;
  target: HTMLElement | Window;
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.addScrollEvent();
    this.showButton();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['scrollTarget']) {
      this.addScrollEvent();
    }
  }

  addScrollEvent() {
    this.destroy$.next();
    fromEvent(this.getScrollTarget(), 'scroll')
    .pipe(debounceTime(this.SCROLL_REFRESH_INTERVAL), takeUntil(this.destroy$))
    .subscribe(() => {
      this.showButton();
      this.cdr.detectChanges();
    });
  }

  getScrollTarget() {
    this.target = this.scrollTarget || window;
    return this.target;
  }

  showButton() {
    this.currScrollTop = this.target === window ?
    (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) : this.scrollTarget.scrollTop;
    if (this.isVisible !== (this.currScrollTop >= this.visibleHeight)) {
      this.isVisible = !this.isVisible;
    }
  }

  goTop() {
    if (this.target === window) {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    } else {
      this.scrollTarget.style.scrollBehavior = 'smooth';
      this.scrollTarget.scrollTop = 0;
    }
    this.backTopEvent.emit(true);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
