import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component,
  ElementRef, EventEmitter, Inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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
  @Output() backTopEvent =  new EventEmitter<boolean>();

  currScrollTop = 0;
  isVisible = false;
  SCROLL_REFRESH_INTERVAL = 100;
  target: HTMLElement | Window;
  subs: Subscription = new Subscription();
  document: Document;
  constructor(private cdr: ChangeDetectorRef, private el: ElementRef, @Inject(DOCUMENT) private doc: any) {
    this.document = this.doc;
  }

  ngOnInit() {
    this.addScrollEvent();
    this.showButton();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['scrollTarget']) {
      if (this.subs) {
        this.subs.unsubscribe();
      }
      this.subs = new Subscription();
      this.addScrollEvent();
    }
  }

  addScrollEvent() {
    this.subs.add(
      fromEvent(this.getScrollTarget(), 'scroll')
      .pipe(debounceTime(this.SCROLL_REFRESH_INTERVAL))
      .subscribe(() => {
        this.showButton();
        this.cdr.detectChanges();
      })
    );
  }

  getScrollTarget() {
    if (this.scrollTarget) {
      this.el.nativeElement.querySelector('.devui-backtop').style.position = 'absolute';
      this.scrollTarget.parentElement.style.position = 'relative';
    }
    this.target = this.scrollTarget || window;
    return this.target;
  }

  showButton() {
    this.currScrollTop = this.target === window ?
    (window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop) : this.scrollTarget.scrollTop;
    if (this.isVisible !== (this.currScrollTop >= this.visibleHeight)) {
      this.isVisible = !this.isVisible;
    }
  }

  goTop() {
    if (this.target === window) {
      this.document.documentElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      this.document.body.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    } else {
      this.scrollTarget.style.scrollBehavior = 'smooth';
      this.scrollTarget.scrollTop = 0;
    }
    this.backTopEvent.emit(true);
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
