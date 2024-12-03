import { AnimationEvent } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ResizeDirective } from 'ng-devui/splitter';
import { backdropFadeInOut, flyInOut } from 'ng-devui/utils';
import { isNumber, parseInt, trim } from 'lodash-es';
import { Observable, Subject, Subscription, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';

@Directive({
  selector: '[dDrawerContentHost]',
})
export class DrawerContentDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

@Component({
  selector: 'd-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  animations: [backdropFadeInOut, flyInOut],
  preserveWhitespaces: false,
})
export class DrawerComponent implements OnInit, OnDestroy {
  animateState = 'void';
  @Input() id: string;
  @Input() width = '300px';
  @Input() zIndex: number;
  @Input() isCover = true;
  /**
   * @deprecated
   */
  @Input() fullScreen = false;
  @Input() showAnimation = true;
  @ViewChild(DrawerContentDirective, { static: true }) drawerContentHost: DrawerContentDirective;
  @Input() backdropCloseable: boolean;
  @Input() escKeyCloseable: boolean;
  @Input() beforeHidden: () => boolean | Promise<boolean> | Observable<boolean>;
  @Input() clickDoms: any = [];
  // Will overwrite by drawer service
  @Input() afterOpened: Function;
  @Input() position: 'right' | 'left' = 'right';
  @Input() bodyScrollable = true; // drawer打开body是否可滚动
  @Input() resizable = false;
  @ViewChild('drawerContainer', { static: true }) drawerContainer: ElementRef;
  @ViewChild('resizeBar', { read: ResizeDirective }) resizeCmp: ResizeDirective;
  _width: string;
  // 全屏时用来记录之前的宽度，因为没遮罩的情况下width不能是百分比
  oldWidth: string;
  _isCover: boolean;
  subscription: Subscription;
  isFullScreen: boolean;

  animationDone = new Subject<AnimationEvent>();
  animationDoneSub: Subscription;
  resizeSub: Subscription;
  windowResizeSub: Subscription;
  documentOverFlow: boolean;
  scrollTop: number;
  scrollLeft: number;
  document: Document;

  contentTemplate: TemplateRef<any>;
  _right: string;
  _curWidth;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private doc: any,
    private cdr: ChangeDetectorRef
  ) {
    this.document = this.doc;
  }

  ngOnInit() {
    this.setWidth(this.width);
    this._isCover = this.isCover === undefined ? true : this.isCover;

    // some browsers(ie11 & edge) fire the animation done event twice
    this.animationDoneSub = this.animationDone
      .pipe(
        distinctUntilChanged((x, y) => {
          return x.fromState === y.fromState && x.toState === y.toState;
        })
      )
      .subscribe((event) => {
        this.onAnimationEnd(event);
      });
  }
  setWidth(width: string) {
    if (typeof window === 'undefined') {
      return;
    }
    if (width.indexOf('%') >= 0) {
      const widthStr = trim(width, '%');
      const widthNum = parseInt(widthStr, 10);
      this._width = isNumber(widthNum) ? (widthNum * window.innerWidth) / 100 + 'px' : '0px';
      if (!this.windowResizeSub) {
        this.windowResizeSub = fromEvent(window, 'resize')
          .pipe(debounceTime(100))
          .subscribe(() => {
            if (!this.isFullScreen) {
              this.setWidth(this.width);
            }
          });
      }
    } else {
      this._width = width;
    }
    this._right = parseInt(this._width) > window.innerWidth ? -(parseInt(this._width) - (window.innerWidth - 100)) + 'px' : '0px';
    this.oldWidth = this._width;
  }

  ngOnDestroy() {
    if (this.animationDoneSub) {
      this.animationDoneSub.unsubscribe();
    }
    if (this.resizeSub) {
      this.resizeSub.unsubscribe();
    }

    if (this.windowResizeSub) {
      this.windowResizeSub.unsubscribe();
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
  onHidden() {}

  show() {
    if (this.document.documentElement.scrollHeight > this.document.documentElement.clientHeight) {
      this.documentOverFlow = true;
      this.scrollTop = this.document.documentElement.scrollTop || this.document.body.scrollTop;
      this.scrollLeft = this.document.documentElement.scrollLeft || this.document.body.scrollLeft;
      this.renderer.addClass(this.document.body, 'devui-body-scrollblock');
      this.renderer.setStyle(this.document.body, 'top', `-${this.scrollTop}px`);
      this.renderer.setStyle(this.document.body, 'left', `-${this.scrollLeft}px`);
    }
    if (!this.bodyScrollable && this.documentOverFlow) {
      this.renderer.addClass(this.document.body, 'devui-body-overflow-hidden');
    }
    this.animateState = 'in';
    const activeElement = this.document.activeElement;
    if (activeElement && typeof (activeElement as any).blur === 'function') {
      (activeElement as any).blur();
    }
    setTimeout(() => {
      this.handleResizeWidth();
    }, 0);
    this.isCover = this.isCover === undefined ? true : this.isCover;
    if (!this.backdropCloseable || this.isCover) {
      return;
    }
    const documentClick = fromEvent<KeyboardEvent>(document, 'click');
    setTimeout(() => {
      this.subscription = documentClick.subscribe((event: Event) => {
        if (this.clickDoms && this.clickDoms.length > 0) {
          this.clickDoms.forEach((dom) => {
            if (dom !== null && dom.contains(event.target)) {
              this.hide();
              return;
            }
          });
        } else {
          const target: any = event.target;
          // 一定要document.contains(event.target)，因为event.target可能已经不在document里了，这个时候就不能进hide了
          if (
            this.animateState === 'in' &&
            !this.elementRef.nativeElement.contains(target) &&
            this.document.body.contains(target) &&
            !this.isHaveDialogOrUpload()
          ) {
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
      this.hideOperation();
    });
  }

  hideDirectly() {
    this.hideOperation();
  }

  private hideOperation() {
    if (this.documentOverFlow) {
      this.renderer.removeStyle(this.document.body, 'top');
      this.renderer.removeStyle(this.document.body, 'left');
      this.renderer.removeClass(this.document.body, 'devui-body-scrollblock');
      this.renderer.removeClass(this.document.body, 'devui-body-overflow-hidden');
      this.document.documentElement.scrollTop = this.scrollTop;
      this.document.body.scrollTop = this.scrollTop;
      this.document.documentElement.scrollLeft = this.scrollLeft;
      this.document.body.scrollLeft = this.scrollLeft;
    }
    this.animateState = 'void';
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }

  // Will overwrite by drawer service
  destroy() {}

  isHaveDialogOrUpload() {
    const dialog: any = this.document.getElementsByClassName('modal-dialog');
    const upload: any = this.document.getElementById('d-upload-temp');
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
    if (typeof window === 'undefined') {
      return;
    }
    const drawerContainerEle = this.drawerContainer.nativeElement;
    if (this._width === this.oldWidth) {
      if (fullScreen === true || fullScreen === undefined) {
        this.isFullScreen = true;
        this._width = this._isCover ? '100%' : window.innerWidth + 'px';
        this.renderer.setStyle(
          drawerContainerEle,
          'transition',
          this.showAnimation ? `width .3s cubic-bezier(0.5, 0.05, 0.5, 0.95)` : 'none'
        );
        if (!this._isCover) {
          const resizeEv = fromEvent(window, 'resize');
          const result = resizeEv.pipe(debounceTime(100));
          this.resizeSub = result.subscribe((ev) => {
            this._width = window.innerWidth + 'px';
          });
        }
      }
    } else {
      if (!fullScreen) {
        this.isFullScreen = false;
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

  private stopPropagation = ({ originalEvent: event }) => {
    event.stopPropagation();
    if (event.cancelable) {
      event.preventDefault();
    }
  };

  private moveStream = (resize) => (mouseDown) =>
    resize.dragEvent.pipe(
      takeUntil(resize.releaseEvent),
      map(({ pageX, pageY }) => ({
        originalX: mouseDown.pageX,
        originalY: mouseDown.pageY,
        pageX,
        pageY,
      }))
    );

  public handleResizeWidth() {
    if (this.resizable) {
      this.resizeCmp.pressEvent
        .pipe(
          tap(this.stopPropagation),
          filter(() => {
            this._curWidth = this._width;
            return this.resizable;
          }),
          switchMap(this.moveStream(this.resizeCmp))
        )
        .subscribe(({ pageX, originalX }) => {
          this.showAnimation = false;
          let tmpWidth;
          if (this.position === 'left') {
            tmpWidth = parseInt(this._curWidth, 10) + pageX - originalX + 'px';
          } else {
            tmpWidth = parseInt(this._curWidth, 10) + originalX - pageX + 'px';
          }
          this.setWidth(tmpWidth);

          this.cdr.detectChanges();
        });

      this.resizeCmp.releaseEvent.subscribe(() => {
        this.showAnimation = true;
      });
    }
  }
}
