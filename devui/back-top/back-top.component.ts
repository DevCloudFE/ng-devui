import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component,
  ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef
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
  constructor(private cdr: ChangeDetectorRef, private el: ElementRef) {}

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
    (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) : this.scrollTarget.scrollTop;
    if (this.isVisible !== (this.currScrollTop >= this.visibleHeight)) {
      this.isVisible = !this.isVisible;
    }
  }

  goTop() {
    if (this.target === window) {
      document.documentElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      document.body.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
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
