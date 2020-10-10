import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild, TemplateRef } from '@angular/core';
import { DocumentRef } from 'ng-devui/window-ref';
import { isUndefined } from 'lodash-es';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { ModalContainerDirective } from './modal.directive';

@Component({
  selector: 'd-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('backdropAnimation', [
      state('void', style({ opacity: 0 })),
      state('in', style({ opacity: 0.2 })),
      transition('void => in', animate('400ms  cubic-bezier(0.23, 1, 0.32, 1)')),
      transition('in => void', animate('300ms cubic-bezier(0.755, 0.05, 0.855, 0.06)')),
    ]),
    trigger('modalAnimation', [
      state('void', style({ opacity: 0, transform: 'scale(0.9)' })),
      state('in', style({ opacity: 1, transform: 'scale(1)' })),
      transition('void => in', animate('400ms  cubic-bezier(0.23, 1, 0.32, 1)')),
      transition('in => void', animate('300ms cubic-bezier(0.755, 0.05, 0.855, 0.06)')),
    ])
  ],
  preserveWhitespaces: false,
})
export class ModalComponent implements OnInit, OnDestroy {

  @Input() id: string;
  @Input() showAnimate: boolean;
  @Input() width: string;
  @Input() zIndex: number;
  @Input() backdropCloseable: boolean;
  @Input() beforeHidden: () => boolean | Promise<boolean> | Observable<boolean>;
  @Input() draggable: boolean;
  @Input() placement: 'center' | 'top' | 'bottom' = 'center';
  @Input() offsetX: string;
  @Input() offsetY: string;
  @Input() bodyScrollable: boolean; // 打开弹窗body是否可滚动
  @Input() escapable: boolean; // 是否支持esc键关闭弹窗
  @ViewChild(ModalContainerDirective, { static: true }) modalContainerHost: ModalContainerDirective;
  @ViewChild('dialog', { static: true }) dialogElement: ElementRef;
  animateState: string = this.showAnimate ? 'void' : '';
  draggableHandleEl: HTMLElement;
  scrollTop: number;
  scrollLeft: number;
  documentOverFlow: boolean;

  mouseDwonEl: ElementRef;
  ignoreBackDropClick = false;
  pressEscToClose: Subscription = new Subscription();

  contentTemplate: TemplateRef<any>;

  constructor(private documentRef: DocumentRef, private renderer: Renderer2) {
    this.backdropCloseable = isUndefined(this.backdropCloseable)
      ? true
      : this.backdropCloseable;
  }

  ngOnInit() {
    if (this.escapable) {
      this.pressEscToClose.add(fromEvent(window, 'keydown').subscribe((event) => {
        if (event['keyCode'] === 27) {
          this.hide();
        }
      }));
    }

    const handle = document.getElementById('d-modal-header');
    if (handle) {
      this.draggableHandleEl = handle;
    }
  }

  // Will overwrite this method in modal service
  onHidden() {
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

  onModalClick = ($event) => {
    // 一定要document.contains($event.target)，因为$event.target可能已经不在document里了，这个时候就不能进hide了,使用document.body兼容IE
    if (this.backdropCloseable && !this.ignoreBackDropClick &&
      (!this.dialogElement.nativeElement.contains($event.target) && document.body.contains($event.target))) {
      this.hide();
    }
    this.ignoreBackDropClick = false;
  }

  modalMouseDown = ($event) => {
    this.mouseDwonEl = $event.target;
  }

  modalMouseUp = ($event) => {
    if ($event.target !== this.mouseDwonEl) {
      this.ignoreBackDropClick = true;
    }
  }

  hide() {
    this.canHideModel().then((canHide) => {
      if (!canHide) {
        return;
      }

      this.animateState = 'void';
      this.onHidden();
    });
  }

  show() {
    if (!this.bodyScrollable) {
      if (document.documentElement.scrollHeight > document.documentElement.clientHeight) {
        this.documentOverFlow = true;
        this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        this.scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
        this.renderer.addClass(this.documentRef.body, 'devui-body-scrollblock');
        this.renderer.setStyle(this.documentRef.body, 'top', `-${this.scrollTop}px`);
        this.renderer.setStyle(this.documentRef.body, 'left', `-${this.scrollLeft}px`);
      }
    }

    this.dialogElement.nativeElement.focus();
    if (this.showAnimate) {
      this.animateState = 'in';
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
        autoOffsetYByPlacement = '0';
        break;
    }
    const offsetX = !!this.offsetX ? this.offsetX : '0';
    const offsetY = !!this.offsetY ? this.offsetY : autoOffsetYByPlacement;
    return 'translate(' + offsetX + ',' + offsetY + ')';
  }
  ngOnDestroy(): void {
    if (this.pressEscToClose) {
      this.pressEscToClose.unsubscribe();
      this.pressEscToClose = null;
    }
  }
}
