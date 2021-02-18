import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import {
  Component, Directive, ElementRef, HostListener, Input, OnDestroy,
  OnInit, Renderer2, ViewChild, ViewContainerRef
} from '@angular/core';
import { isNumber, parseInt, trim } from 'lodash-es';
import { fromEvent, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Directive({
  selector: '[dDrawerContentHost]',
})
export class DrawerContentDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}

@Component({
  selector: 'd-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ display: 'block', opacity: 0 })),
      state('in', style({ display: 'block', opacity: 1 })),
      transition('void => in', animate('100ms cubic-bezier(.0,.0,.1,.1)')),
      transition('in => void', animate('100ms 200ms cubic-bezier(.0,.0,.1,.1)'))
    ]),
    trigger('flyInOut', [
      state('left-void', style({ transform: 'translateX(-100%)', left: 0, opacity: 0.8 })),
      state('left-in', style({ transform: 'translateX(0)', left: 0, opacity: 1 })),
      state('right-void', style({ transform: 'translateX(100%)', right: 0, opacity: 0.8})),
      state('right-in', style({ transform: 'translateX(0)', right: 0, opacity: 1 })),
      // 解决初始化动效为'void'而非'left/right-void'
      transition('void => left-in', [
        style({ transform: 'translateX(-100%)', left: 0, opacity: 0.8 }),
        animate('300ms cubic-bezier(0.16,0.75,0.5,1)', style({ transform: 'translateX(0)', left: 0, opacity: 1 }))
      ]),
      transition('void => right-in', [
        style({ transform: 'translateX(100%)', right: 0, opacity: 0.8 }),
        animate('300ms cubic-bezier(0.16,0.75,0.5,1)', style({ transform: 'translateX(0)', right: 0, opacity: 1 }))
      ]),
      transition('left-void => left-in', [
        animate('300ms cubic-bezier(0.16,0.75,0.5,1)')
      ]),
      transition('right-void => right-in', [
        animate('300ms cubic-bezier(0.16,0.75,0.5,1)')
      ]),
      transition('left-in => left-void', [
        animate('300ms cubic-bezier(0.5,0,0.84,0.25)')
      ]),
      transition('right-in => right-void', [
        animate('300ms cubic-bezier(0.5,0,0.84,0.25)')
      ]),

    ]),
  ],
  preserveWhitespaces: false,
})
export class DrawerComponent implements OnInit, OnDestroy {
  animateState = 'void';
  @Input() id: string;
  @Input() width = '300px';
  @Input() zIndex: number;
  @Input() isCover = true;
  /*
  @deprecated
  */
  @Input() fullScreen = false;
  @ViewChild(DrawerContentDirective, { static: true }) drawerContentHost: DrawerContentDirective;
  @Input() backdropCloseable: boolean;
  @Input() escKeyCloseable: boolean;
  @Input() beforeHidden: () => boolean | Promise<boolean> | Observable<boolean>;
  @Input() clickDoms: any = [];
  // Will overwrite by drawer service
  @Input() afterOpened: Function;
  @Input() position: 'right' | 'left' = 'left';
  @Input() bodyScrollable = true; // drawer打开body是否可滚动
  _width: string;
  // 全屏时用来记录之前的宽度，因为没遮罩的情况下width不能是百分比
  oldWidth: string;
  _isCover: boolean;
  subscription: Subscription;

  animationDone = new Subject<AnimationEvent>();
  animationDoneSub: Subscription;
  resizeSub: Subscription;
  documentOverFlow: boolean;
  scrollTop: number;
  scrollLeft: number;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.setWidth(this.width);
    this._isCover = this.isCover === undefined ? true : this.isCover;

    // some browsers(ie11 & edge) fire the animation done event twice
    this.animationDoneSub = this.animationDone.pipe(distinctUntilChanged((x, y) => {
      return x.fromState === y.fromState && x.toState === y.toState;
    })).subscribe(event => {
      this.onAnimationEnd(event);
    });
  }
  setWidth(width: string) {
    if (width.indexOf('%') >= 0) {
      const widthStr = trim(width, '%');
      const widthNum = parseInt(widthStr, 10);
      this._width = isNumber(widthNum) ? (widthNum * window.innerWidth / 100 + 'px') : '0px';
    } else {
      this._width = width;
    }
    this.oldWidth = this._width;
  }

  ngOnDestroy() {
    if (this.animationDoneSub) {
      this.animationDoneSub.unsubscribe();
    }
    if (this.resizeSub) {
      this.resizeSub.unsubscribe();
    }
  }

  @HostListener('document:keydown.escape', ['$event']) keydownHandler(event: KeyboardEvent) {
    event.stopPropagation();
    if (this.escKeyCloseable && !this.isHaveDialogOrUpload()) {
      this.hide();
    }
  }

  onAnimationEnd(event) {
    if (this.animateState === 'void') {
      this.onHidden();
    }
    if (this.animateState === 'in' && this.afterOpened) {
      this.afterOpened();
    }
  }

  // Will overwrite by drawer service
  onHidden() {

  }

  show() {
    if (document.documentElement.scrollHeight > document.documentElement.clientHeight) {
      this.documentOverFlow = true;
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      this.scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
      this.renderer.addClass(document.body, 'devui-body-scrollblock');
      this.renderer.setStyle(document.body, 'top', `-${this.scrollTop}px`);
      this.renderer.setStyle(document.body, 'left', `-${this.scrollLeft}px`);
    }
    if (!this.bodyScrollable && this.documentOverFlow) {
      this.renderer.addClass(document.body, 'devui-body-overflow-hidden');
    }
    this.animateState = 'in';
    const activeElement = document.activeElement;
    if (activeElement && typeof (activeElement['blur']) === 'function') {
      activeElement['blur']();
    }
    this.isCover = this.isCover === undefined ? true : this.isCover;
    if (!this.backdropCloseable || this.isCover) {
      return;
    }
    const documentClick = fromEvent<KeyboardEvent>(document, 'click');
    setTimeout(() => {
      this.subscription = documentClick.subscribe((event: Event) => {
        if (this.clickDoms && this.clickDoms.length > 0) {
          this.clickDoms.forEach(dom => {
            if (dom !== null && dom.contains(event.target)) {
              this.hide();
              return;
            }
          });
        } else {
          const target: any = event.target;
          // 一定要document.contains(event.target)，因为event.target可能已经不在document里了，这个时候就不能进hide了
          if (this.animateState === 'in' && (!this.elementRef.nativeElement.contains(target) && document.body.contains(target))
            && !this.isHaveDialogOrUpload()) {
            this.hide();
          }
        }
      });
    });
  }

  hide() {
    this.canHideModel().then((canHide) => {
      if (!canHide) {
        return;
      }
      if (this.documentOverFlow) {
        this.renderer.removeStyle(document.body, 'top');
        this.renderer.removeStyle(document.body, 'left');
        this.renderer.removeClass(document.body, 'devui-body-scrollblock');
        this.renderer.removeClass(document.body, 'devui-body-overflow-hidden');
        document.documentElement.scrollTop = this.scrollTop;
        document.body.scrollTop = this.scrollTop;
        document.documentElement.scrollLeft = this.scrollLeft;
        document.body.scrollLeft = this.scrollLeft;
      }
      this.animateState = 'void';
      if (this.subscription) {
        this.subscription.unsubscribe();
        this.subscription = undefined;
      }
    });
  }

  // Will overwrite by drawer service
  destroy() { }

  isHaveDialogOrUpload() {
    const dialog: any = document.getElementsByClassName('modal-dialog');
    const upload: any = document.getElementById('d-upload-temp');
    return (dialog && dialog.length > 0) || upload;
  }

  canHideModel() {
    let hiddenResult = Promise.resolve(true);

    if (this.beforeHidden) {
      const result: any = this.beforeHidden();
      if (typeof result !== 'undefined') {
        if (result.then) {
          hiddenResult = result;
        } else if (result.subscribe) {
          hiddenResult = (result as Observable<boolean>).toPromise();
        } else {
          hiddenResult = Promise.resolve(result);
        }
      }
    }

    return hiddenResult;
  }

  private _setFullScreen(fullScreen?: boolean) {
    if (this._width === this.oldWidth) {
      if (fullScreen === true || fullScreen === undefined) {
        this._width = this._isCover ? '100%' : window.innerWidth + 'px';
        if (!this._isCover) {
          const resizeEv = fromEvent(window, 'resize');
          const result = resizeEv.pipe(debounceTime(100));
          this.resizeSub = result.subscribe(ev => {
            this._width = window.innerWidth + 'px';
          });
        }
      }
    } else {
      if (!fullScreen) {
        this._width = this.oldWidth;
        if (this.resizeSub) {
          this.resizeSub.unsubscribe();
        }
      }
    }
  }

  public toggleFullScreen() {
    this._setFullScreen();
  }

  public setFullScreen(fullScreen: boolean) {
    this._setFullScreen(fullScreen);
  }
}
