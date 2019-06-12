import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, Input, OnDestroy, Renderer2 } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { PositionService } from '../position';
import { PositionType } from './tooltip.types';

@Component({
  selector: 'ave-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  animations: [
    trigger('state', [
      state('void', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('* => visible', animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
      transition('visible => *', animate('150ms cubic-bezier(0.4, 0.0, 1, 1)')),
    ]),
  ],
})
export class TooltipComponent implements AfterViewInit, OnDestroy {
  @Input() content: string;
  @Input() position: PositionType = 'bottom';
  @Input() triggerElementRef: ElementRef;
  @Input() showAnimate = false;
  @Input() scrollElement: Element;
  @HostBinding('attr.ave-ui') aveUi = true;
  @HostBinding('style.display') display = 'block';
  animateState: string = this.showAnimate ? 'void' : 'visible';

  @HostBinding('class') get class() {
    return 'tooltip ' + this.position;
  }

  @HostBinding('@state') get state() {
    return this.animateState;
  }

  _onScroll: Subscription;

  constructor(
    private positionService: PositionService,
    private tooltip: ElementRef,
    private renderer2: Renderer2
  ) {
  }

  ngAfterViewInit() {
    this.updatePosition();
    this.scrollElement = this.positionService.getScrollParent(this.triggerElementRef.nativeElement);
    this._onScroll = fromEvent((this.scrollElement || window), 'scroll')
      .subscribe(() => {
        this.updatePosition();
      });
  }

  ngOnDestroy() {
    if (this._onScroll) {
      this._onScroll.unsubscribe();
    }
  }

  onShow() {
    this.animateState = 'visible';
  }

  onHide() {
    this.animateState = 'void';
  }

  // will be overwrite by tooltip directive
  onHidden() {
  }

  @HostListener('@state.done', ['$event'])
  onAnimationEnd(event) {
    if (event.toState === 'void') {
      this.onHidden();
    }
  }


  updatePosition() {
    const rect = this.positionService.positionElements(this.triggerElementRef.nativeElement,
      this.tooltip.nativeElement, this.position, true);
    this.renderer2.setStyle(this.tooltip.nativeElement, 'left', `${rect.left}px`);
    this.renderer2.setStyle(this.tooltip.nativeElement, 'top', `${rect.top}px`);
  }
}

