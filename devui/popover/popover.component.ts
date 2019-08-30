import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterContentChecked, AfterViewInit, Component, ElementRef,
  HostBinding, HostListener, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { PositionService } from 'ng-devui/position';
import { PositionType } from 'ng-devui/tooltip';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PopoverType } from './popover.types';

@Component({
  selector: 'd-popover',
  templateUrl: './popover.component.html',
  styleUrls: [`./popover.component.scss`],
  animations: [
    trigger('state', [
      state('void', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition(
        '* => visible',
        animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')
      ),
      transition('visible => *', animate('150ms cubic-bezier(0.4, 0.0, 1, 1)'))
    ])
  ]
})
export class PopoverComponent
  implements OnInit, AfterViewInit, AfterContentChecked, OnDestroy {
  @Input() triggerElementRef: ElementRef;
  @Input() position: PositionType;
  @Input() content: string;
  @Input() showAnimate = false;
  @Input() scrollElement: Element;
  @Input() appendToBody: boolean;
  @Input() zIndex = 1060;
  @Input() popType: PopoverType;
  animateState: string = this.showAnimate ? 'void' : '';

  @HostBinding('style.display') display = 'block';
  @HostBinding('class') get class() {
    return 'devui-popover ' + this.position + ' devui-popover-' + this.popType;
  }
  @HostBinding('@state') get state() {
    return this.animateState;
  }

  subs: Subscription = new Subscription();
  SCROLL_REFRESH_INTERVAL = 100;

  constructor(
    private renderer: Renderer2,
    private positionService: PositionService,
    public elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.elementRef.nativeElement.style.zIndex = this.zIndex;
  }

  ngAfterViewInit() {
    this.updatePosition();

    if (this.appendToBody) {
      if (!this.scrollElement) {
        this.scrollElement = this.positionService.getScrollParent(
          this.triggerElementRef.nativeElement
        );
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

  ngAfterContentChecked() {
    this.updatePosition();
  }

  show() {
    this.animateState = 'visible';
  }

  hide() {
    this.animateState = 'void';
  }

  // will be overwrite by directive
  onHidden() {}

  @HostListener('@state.done', ['$event'])
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
    const rect = this.positionService.positionElements(
      this.triggerElementRef.nativeElement,
      this.elementRef.nativeElement,
      this.position,
      this.appendToBody
    );
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'left',
      `${rect.left}px`
    );
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'top',
      `${rect.top}px`
    );
  }
}
