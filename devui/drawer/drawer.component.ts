import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Directive, ElementRef, HostBinding, HostListener, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { isNumber, parseInt, trim } from 'lodash-es';
import { fromEvent, Observable, Subscription } from 'rxjs';

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
      state('void', style({display: 'none'})),
      state('in', style({display: 'block', opacity: 0.6})),
      transition('* => *', animate('300ms ease')),
    ]),
    trigger('flyInOut', [
      state('void', style({transform: 'translateX(100%)', right: 0})),
      state('in', style({transform: 'translateX(0)', right: 0})),
      transition('* => *', animate('300ms ease')),
    ]),
  ]
})
export class DrawerComponent implements OnInit {
  animateState = 'void';
  @Input() width = '300px';
  @Input() isCover = true;
  @Input() fullScreen = false;
  @ViewChild(DrawerContentDirective) drawerContentHost: DrawerContentDirective;
  @Input() backdropCloseable: boolean;
  @Input() escKeyCloseable: boolean;
  @Input() beforeHidden: () => boolean | Promise<boolean> | Observable<boolean>;
  @Input() clickDoms: any = [];
  _width: string;
  // 全屏时用来记录之前的宽度，因为没遮罩的情况下width不能是百分比
  oldWidth: string;
  _isCover: boolean;
  subscription: Subscription;

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    if (this.width.indexOf('%') >= 0) {
      const widthStr = trim(this.width, '%');
      const widthNum = parseInt(widthStr, 10);
      this._width = isNumber(widthNum) ? (widthNum * window.outerWidth / 100 + 'px') : '0px';
    } else {
      this._width = this.width;
    }
    this.oldWidth = this._width;
    this._isCover = this.isCover === undefined ? true : this.isCover;
  }

  @HostListener('document:keydown.escape', ['$event']) keydownHandler(event: KeyboardEvent) {
    if (this.escKeyCloseable && !this.isHaveDialogOrUpload()) {
      this.hide();
    }
  }

  onAnimationEnd(event) {
    if (event.toState === 'void') {
      this.onHidden();
    }
  }

  // Will overwrite by drawer service
  onHidden() {

  }

  show() {
    document.querySelector('body').classList.add('modal-open');
    this.animateState = 'in';
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
          if (this.animateState === 'in' && (!this.elementRef.nativeElement.contains(target) && document.contains(target))
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
      document.querySelector('body').classList.remove('modal-open');
      this.animateState = 'void';
      if (this.subscription) {
        this.subscription.unsubscribe();
        this.subscription = undefined;
      }
    });
  }

  // Will overwrite by drawer service
    destroy() {}

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

  toggleFullScreen() {
    if (this._width === this.oldWidth) {
      this._width = this._isCover ? '100%' : window.outerWidth + 'px';
    } else {
      this._width = this.oldWidth;
    }
  }
}
