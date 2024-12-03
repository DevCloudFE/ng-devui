import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { backdropFadeInOut, wipeInOutAnimation } from 'ng-devui/utils';
import { isUndefined } from 'lodash-es';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { ModalContainerDirective } from './modal.directive';

@Component({
  selector: 'd-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [backdropFadeInOut, wipeInOutAnimation],
  preserveWhitespaces: false,
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() showAnimation = true;
  @Input() width: string;
  @Input() zIndex: number;
  @Input() backDropZIndex: number;
  @Input() backdropCloseable: boolean;
  @Input() beforeHidden: () => boolean | Promise<boolean> | Observable<boolean>;
  @Input() draggable: boolean;
  @Input() placement: 'center' | 'top' | 'bottom' | 'unset' = 'center';
  @Input() offsetX: string;
  @Input() offsetY: string;
  @Input() bodyScrollable = true; // 打开弹窗body是否可滚动
  @Input() escapable: boolean; // 是否支持esc键关闭弹窗
  @Input() cssClass: string;
  @ViewChild(ModalContainerDirective, { static: true }) modalContainerHost: ModalContainerDirective;
  @ViewChild('dialog', { static: true }) dialogElement: ElementRef;
  animateState = '';
  draggableHandleEl: HTMLElement;
  scrollTop: number;
  scrollLeft: number;
  documentOverFlow: boolean;

  mouseDwonEl: ElementRef;
  ignoreBackDropClick = false;
  pressEscToClose: Subscription = new Subscription();

  contentTemplate: TemplateRef<any>;
  document: Document;

  maximized = false;
  _oldWidth: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, @Inject(DOCUMENT) private doc: any) {
    this.backdropCloseable = isUndefined(this.backdropCloseable) ? true : this.backdropCloseable;
    this.document = this.doc;
  }

  ngOnInit() {
    if (this.escapable) {
      this.pressEscToClose.add(
        fromEvent(window, 'keydown').subscribe((event: any) => {
          if (event.keyCode === 27) {
            this.hide();
          }
        })
      );
    }

    const handle = this.elementRef.nativeElement.querySelector('#d-modal-header');
    if (handle) {
      this.draggableHandleEl = handle;
    }

    this._oldWidth = this.width;
  }

  ngOnDestroy(): void {
    if (this.pressEscToClose) {
      this.pressEscToClose.unsubscribe();
      this.pressEscToClose = null;
    }
  }

  // Will overwrite this method in modal service
  onHidden() {}

  updateButtonOptions<T>(buttonOptions: Array<T>) {}

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

  onModalClick = ($event) => {
    // 一定要document.contains($event.target)，因为$event.target可能已经不在document里了，这个时候就不能进hide了,使用document.body兼容IE
    if (
      this.backdropCloseable &&
      !this.ignoreBackDropClick &&
      !this.dialogElement.nativeElement.contains($event.target) &&
      this.document.body.contains($event.target)
    ) {
      this.hide();
    }
    this.ignoreBackDropClick = false;
  };

  modalMouseDown = ($event) => {
    this.mouseDwonEl = $event.target;
  };

  modalMouseUp = ($event) => {
    if ($event.target !== this.mouseDwonEl) {
      this.ignoreBackDropClick = true;
    }
  };

  maximize() {
    this.maximized = !this.maximized;
    if (this.maximized) {
      this.width = '100vw';
      this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
    } else {
      this.width = this._oldWidth;
      this.renderer.setStyle(this.document.body, 'overflow', 'auto');
    }
  }

  onAnimationEnd($event) {
    if ($event.fromState !== 'void' && this.animateState === 'void') {
      this.onHidden();
    }
  }

  show() {
    this.documentOverFlow = this.document.documentElement.scrollHeight > this.document.documentElement.clientHeight;
    if (this.documentOverFlow) {
      this.scrollTop = this.document.documentElement.scrollTop || this.document.body.scrollTop;
      this.scrollLeft = this.document.documentElement.scrollLeft || this.document.body.scrollLeft;
      this.renderer.addClass(this.document.body, 'devui-body-scrollblock');
      this.renderer.setStyle(this.document.body, 'top', `-${this.scrollTop}px`);
      this.renderer.setStyle(this.document.body, 'left', `-${this.scrollLeft}px`);
    }
    this.bodyScrollBlock(true);
    this.dialogElement.nativeElement.focus();
    if (this.showAnimation) {
      this.animateState = 'in';
    }
  }

  hide() {
    this.canHideModel().then((canHide) => {
      if (!canHide) {
        return;
      }
      this.bodyScrollBlock(false);
      this.animateState = 'void';
    });
  }

  bodyScrollBlock(toggle: boolean) {
    if (this.bodyScrollable || !this.documentOverFlow) {
      return;
    }
    if (toggle) {
      this.renderer.addClass(this.document.documentElement, 'devui-body-scrollblock-modal');
      this.renderer.setStyle(this.document.documentElement, 'top', `-${this.scrollTop}px`);
      this.renderer.setStyle(this.document.documentElement, 'left', `-${this.scrollLeft}px`);
    } else {
      this.renderer.removeClass(this.document.documentElement, 'devui-body-scrollblock-modal');
      this.renderer.removeStyle(this.document.documentElement, 'top');
      this.renderer.removeStyle(this.document.documentElement, 'left');
      this.document.documentElement.scrollLeft = this.scrollLeft;
      this.document.documentElement.scrollTop = this.scrollTop;
    }
  }

  resolveTransformTranslate() {
    let autoOffsetYByPlacement;
    switch (this.placement) {
    case 'top':
      autoOffsetYByPlacement = '40px';
      break;
    case 'bottom':
      autoOffsetYByPlacement = '-40px';
      break;
    case 'center':
    default:
      autoOffsetYByPlacement = 0;
      break;
    }
    if (this.placement !== 'unset') {
      const offsetX = this.offsetX ? this.offsetX : '0';
      const offsetY = this.offsetY ? this.offsetY : autoOffsetYByPlacement;
      return 'translate(' + offsetX + ',' + offsetY + ')';
    } else {
      return 'unset';
    }
  }
}
