import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { delay, filter } from 'rxjs/operators';

@Directive({
    selector: '[dObserveVisibility]',
    standalone: false
})
export class ObserveVisibilityDirective
implements OnDestroy, OnInit, AfterViewInit {
  @Input() debounceTime = 0;
  @Input() threshold = 1;
  @Input() root: HTMLElement;
  @Input() rootMargin = '0px';
  @Output() show = new EventEmitter<HTMLElement>();
  @Output() hide = new EventEmitter<HTMLElement>();

  private observer: IntersectionObserver | undefined;
  private subject$ = new Subject<{
    entry: IntersectionObserverEntry;
    observer: IntersectionObserver;
  }>();

  constructor(private element: ElementRef) { }

  ngOnInit() {
    this.createObserver();
  }

  ngAfterViewInit() {
    this.startObservingElements();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = undefined;
    }

    this.subject$.next({entry: null, observer: null});
    this.subject$.complete();
  }

  private isVisible(element: HTMLElement) {
    return new Promise(resolve => {
      const observer = new IntersectionObserver(([entry]) => {
        resolve(entry.intersectionRatio === 1);
        observer.disconnect();
      });

      observer.observe(element);
    });
  }

  private createObserver() {
    const options = {
      root: this.root,
      rootMargin: this.rootMargin,
      threshold: this.threshold,
    };

    const isIntersecting = (entry: IntersectionObserverEntry) =>
      entry.isIntersecting || entry.intersectionRatio > 0;

    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (isIntersecting(entry)) {
          this.subject$.next({ entry, observer });
        }
      });
    }, options);
  }

  private startObservingElements() {
    if (!this.observer) {
      return;
    }

    this.observer.observe(this.element.nativeElement);

    this.subject$
      .pipe(delay(this.debounceTime), filter(Boolean))
      .subscribe(async ({ entry, observer }) => {
        const target = entry.target as HTMLElement;
        const isStillVisible = await this.isVisible(target);

        if (isStillVisible) {
          this.show.emit(target);
        } else {
          this.hide.emit(target);
        }
      });
  }
}

