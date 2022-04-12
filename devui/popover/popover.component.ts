import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { PositionService } from 'ng-devui/position';
import { directionFadeInOut } from 'ng-devui/utils';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PopoverType, PositionType } from './popover.types';

interface PopoverStyle {
  backgroundColor?: string;
}

@Component({
  selector: 'd-popover',
  templateUrl: './popover.component.html',
  styleUrls: [`./popover.component.scss`],
  animations: [directionFadeInOut],
})
export class PopoverComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @Input() triggerElementRef: ElementRef;
  currentPosition: PositionType = 'top';
  connectionBias: string;
  _position: PositionType | PositionType[] = ['top', 'left', 'bottom', 'right'];
  @Input() get position() {
    return this._position;
  }
  set position(pos) {
    this._position = pos;
    this.currentPosition = Array.isArray(pos) ? pos[0] : pos;
  }
  @Input() content: string | HTMLElement | TemplateRef<any>;
  @Input() showAnimation = true;
  @Input() scrollElement: Element;
  @Input() appendToBody: boolean;
  @Input() zIndex = 1060;
  @Input() popType: PopoverType;
  @Input() popMaxWidth: number;
  @Input() popoverStyle: PopoverStyle;

  /**
   * @deprecated Use mouseLeaveDelay to replace.
   */
  @Input() set hoverDelayTime(delayTime: any) {
    this.mouseLeaveDelay = delayTime;
  }

  // 防止每次鼠标不小心经过目标元素就会显示出PopOver的内容，所以增加适当的延迟。
  @Input() mouseEnterDelay = 150;

  // 因为鼠标移出之后如果立刻消失会很突然，所以增加略小一些的延迟，使得既不突然也反应灵敏
  @Input() mouseLeaveDelay = 100;
  animateState: string;

  @HostBinding('style.display') get display() {
    return this.content ? 'block' : 'none';
  }
  @HostBinding('class') get class() {
    return 'devui-popover ' + this.currentPosition + ' ' + this.connectionBias + ' devui-popover-' + this.popType;
  }
  @HostBinding('@directionFadeInOut') get state() {
    return this.animateState;
  }
  @HostBinding('@.disabled') get disabled() {
    return !this.showAnimation;
  }
  get template() {
    return this.content instanceof TemplateRef ? this.content : null;
  }

  subs: Subscription = new Subscription();
  SCROLL_REFRESH_INTERVAL = 100;

  constructor(
    private renderer: Renderer2,
    private positionService: PositionService,
    public elementRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.elementRef.nativeElement.style.zIndex = this.zIndex;
  }

  ngAfterViewInit() {
    this.updatePosition();
    if (this.appendToBody) {
      if (!this.scrollElement) {
        this.scrollElement = this.positionService.getScrollParent(this.triggerElementRef.nativeElement);
      }
      this.subs.add(
        fromEvent(this.scrollElement || window, 'scroll')
          .pipe(debounceTime(this.SCROLL_REFRESH_INTERVAL))
          .subscribe(() => {
            this.updatePosition();
          })
      );
      this.subs.add(
        fromEvent(window, 'resize')
          .pipe(debounceTime(this.SCROLL_REFRESH_INTERVAL))
          .subscribe(() => {
            this.updatePosition();
          })
      );
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['content']) {
      if (this.content !== undefined) {
        this.updatePosition();
      }
    }
  }

  show() {}

  hide() {
    this.animateState = 'void';
  }

  // will be overwrite by directive
  onHidden() {}

  @HostListener('@directionFadeInOut.done', ['$event'])
  onAnimationEnd(event) {
    if (event.toState === 'void') {
      this.onHidden();
    }
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  updatePosition() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'visibility', 'hidden');
    this.renderer.setStyle(this.elementRef.nativeElement, 'transform', 'translate(0, -99999px)');
    const rect = this.positionService.positionElements(
      this.triggerElementRef.nativeElement,
      this.elementRef.nativeElement,
      this.position,
      this.appendToBody
    );
    setTimeout(() => {
      // 预防脏检查
      this.currentPosition = rect.placementPrimary;
      this.animateState = this.currentPosition;
      this.connectionBias = `bias-${rect.placementSecondary}`;
      if (rect.placementSecondary === 'center') {
        if (rect.placementPrimary === 'left' || rect.placementPrimary === 'right') {
          this.connectionBias = 'bias-vertical-center';
        } else {
          this.connectionBias = 'bias-horizontal-center';
        }
      }
      this.renderer.setStyle(this.elementRef.nativeElement, 'left', `${rect.left}px`);
      this.renderer.setStyle(this.elementRef.nativeElement, 'top', `${rect.top}px`);
      // 移除样式
      this.renderer.removeStyle(this.elementRef.nativeElement, 'visibility');
      this.renderer.removeStyle(this.elementRef.nativeElement, 'transform');
    });
  }

  public updatePositionAndDetectChange() {
    this.updatePosition();
    this.cdr.detectChanges();
  }
}
