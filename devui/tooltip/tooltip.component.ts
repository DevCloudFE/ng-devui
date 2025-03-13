import {
  AfterViewInit, Component, ElementRef, HostBinding, HostListener, Input, OnDestroy,
  Renderer2
} from '@angular/core';
import { PositionService } from 'ng-devui/position';
import { directionFadeInOut } from 'ng-devui/utils';
import { fromEvent, Subscription } from 'rxjs';
import { PositionType } from './tooltip.types';

@Component({
    selector: 'd-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss'],
    animations: [
        directionFadeInOut
    ],
    preserveWhitespaces: false,
    standalone: false
})
export class TooltipComponent implements AfterViewInit, OnDestroy {
  @Input() content: string;
  _position: PositionType | PositionType[];
  @Input() get position() {
    return this._position;
  }
  set position(pos) {
    this._position = pos;
    this.currentPosition = Array.isArray(pos) ? pos[0] : pos;
  }
  currentPosition: PositionType;
  @Input() triggerElementRef: ElementRef;
  @Input()  showAnimation  = true;
  scrollElement: Element;
  animateState: string ;

  @HostBinding('style.display') display = 'block';
  @HostBinding('class') get class() {
    return 'devui-tooltip ' + this.currentPosition;
  }

  @HostBinding('@directionFadeInOut') get state() {
    return this.animateState;
  }
  @HostBinding('@.disabled') get disabled() {
    return !this.showAnimation;
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
    this.animateState = this.currentPosition;
  }

  onHide() {
    this.animateState = 'void';
  }

  // will be overwrite by tooltip directive
  onHidden() {
  }

  @HostListener('@directionFadeInOut.done', ['$event'])
  onAnimationEnd(event) {
    if (event.toState === 'void') {
      this.onHidden();
    }
  }

  updatePosition() {
    // 解决tooltip自身大小导致出现滚动条，影响位置计算
    this.renderer2.setStyle(this.tooltip.nativeElement, 'visibility', 'hidden');
    this.renderer2.setStyle(this.tooltip.nativeElement, 'transform', 'translate(0, -99999px)');
    const rect = this.positionService.positionElements(this.triggerElementRef.nativeElement,
      this.tooltip.nativeElement, this.position, true);
    setTimeout(() => { // 预防脏检查
      this.currentPosition = rect.placementPrimary;
    });
    this.renderer2.setStyle(this.tooltip.nativeElement, 'left', `${rect.left}px`);
    this.renderer2.setStyle(this.tooltip.nativeElement, 'top', `${rect.top}px`);
    // 移除样式
    this.renderer2.removeStyle(this.tooltip.nativeElement, 'visibility');
    this.renderer2.removeStyle(this.tooltip.nativeElement, 'transform');
  }
}
