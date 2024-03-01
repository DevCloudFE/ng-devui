import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { AlertCarouselItemComponent } from './alert-carousel-item.component';
import { AlertType } from './alert.types';

@Component({
  selector: 'd-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  preserveWhitespaces: false,
})
export class AlertComponent implements OnChanges, OnDestroy, AfterViewInit {
  @Input() type: AlertType = 'info';
  @Input() cssClass: string;
  @Input() closeable = true;
  @Input() showIcon = true;
  @Input() autoplay = false;
  @Input() autoplaySpeed = 3000;
  @Input() transitionSpeed = 500;
  @Input() operationTemplate: TemplateRef<any>;
  @Input() set dismissTime(time: number) {
    setTimeout(() => {
      this.close();
    }, time);
  }
  @Output() closeEvent = new EventEmitter<AlertComponent>();
  @ViewChild('carouselContainer') box: ElementRef<any>;
  @ContentChildren(AlertCarouselItemComponent) carouselItems: QueryList<AlertCarouselItemComponent>;
  hide = false;
  autoplayHeight: string;
  carouselNum: number;
  currentIndex = 1;
  scheduledId: any;
  SINGLE_LINE_HEIGHT = '24px';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges) {
    const { autoplay, autoplaySpeed, transitionSpeed } = changes;
    if ((autoplay || autoplaySpeed) && (!this.autoplay || !this.autoplaySpeed)) {
      this.clearScheduledTransition();
    } else {
      this.autoScheduleTransition();
    }
    if (transitionSpeed && this.transitionSpeed) {
      this.renderer.setStyle(this.box.nativeElement, 'transition', `top ${this.transitionSpeed}ms ease`);
    }
  }

  ngAfterViewInit(): void {
    this.renderCarouselItem();
    this.carouselItems.changes.subscribe(() => this.renderCarouselItem());
  }

  ngOnDestroy() {
    this.clearScheduledTransition();
  }

  renderCarouselItem() {
    this.carouselNum = this.carouselItems.length;
    if (this.carouselNum > 1) {
      if (!this.autoplayHeight) {
        const itemHeights = this.carouselItems.map((item) => {
          const rect = item?.el.nativeElement.getBoundingClientRect();
          return rect?.height || 0;
        });
        const maxHeight = Math.max(...itemHeights);
        this.autoplayHeight = maxHeight ? `${maxHeight}px` : this.SINGLE_LINE_HEIGHT;
      }
      this.el.nativeElement.style.setProperty('--devui-alert-carousel-item-height', this.autoplayHeight);
      this.renderer.setStyle(this.box.nativeElement, 'transition', `top ${this.transitionSpeed}ms ease`);
      this.autoScheduleTransition();
    }
  }

  next = (): void => {
    if (this.currentIndex < this.carouselNum) {
      this.currentIndex++;
    } else {
      this.currentIndex = 1;
    }
    this.translatePosition(this.currentIndex - 1);
    this.autoScheduleTransition();
  };

  autoScheduleTransition() {
    this.clearScheduledTransition();
    if (this.autoplay && this.autoplaySpeed) {
      this.scheduledId = setTimeout(() => this.next(), this.autoplaySpeed);
    }
  }

  clearScheduledTransition() {
    if (this.scheduledId) {
      clearTimeout(this.scheduledId);
      this.scheduledId = undefined;
    }
  }

  translatePosition(size: number) {
    this.renderer.setStyle(this.box.nativeElement, 'top', `${-size * 100}%`);
  }

  close = (): void => {
    this.clearScheduledTransition();
    this.closeEvent.emit(this);
    this.hide = true;
  };
}
