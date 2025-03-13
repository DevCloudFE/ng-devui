import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef
} from '@angular/core';
import { PositionService } from 'ng-devui/position';
import { PositionType } from 'ng-devui/tooltip';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'd-read-tip',
    templateUrl: './read-tip.component.html',
    styleUrls: ['./read-tip.component.scss'],
    animations: [
        trigger('state', [
            state('void', style({ opacity: 0 })),
            state('visible', style({ opacity: 1 })),
            transition('* => visible', animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
            transition('visible => *', animate('150ms cubic-bezier(0.4, 0.0, 1, 1)')),
        ]),
    ],
    standalone: false
})
export class ReadTipComponent implements OnInit, AfterViewInit, AfterContentChecked, OnDestroy {
  @Input() triggerElementRef: ElementRef;
  @Input() position: PositionType | PositionType[] = 'top';
  @Input() content: string | HTMLElement | TemplateRef<any>;
  @Input() customData: any;
  @Input() title: string | HTMLElement;
  @Input() showAnimate = false;
  @Input() scrollElement: Element;
  @Input() appendToBody: boolean;
  @Input() zIndex = 1060;
  @Input() popMaxWidth: number;
  @Input() overlayClassName: string;

  subs: Subscription = new Subscription();
  SCROLL_REFRESH_INTERVAL = 100;
  currentPosition: PositionType;
  connectionBias: string;
  animateState: string = this.showAnimate ? 'void' : '';

  @HostBinding('style.display') get display() {
    return this.content ? 'block' : 'none';
  }
  @HostBinding('class') get class() {
    return 'devui-popover ' + this.currentPosition + ' ' + this.connectionBias;
  }

  @HostBinding('@state') get state() {
    return this.animateState;
  }

  get template() {
    return this.content instanceof TemplateRef ? this.content : null;
  }

  constructor(
    private renderer: Renderer2,
    private positionService: PositionService,
    public elementRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.style.zIndex = this.zIndex;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.updatePosition();
    });

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

  ngAfterContentChecked() {
    this.updatePosition();
  }

  show() {
    this.animateState = 'visible';
  }

  hide() {
    this.animateState = 'void';
  }

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
    this.currentPosition = rect.placementPrimary;
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
  }
}
