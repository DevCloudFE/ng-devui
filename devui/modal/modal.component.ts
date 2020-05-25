import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
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
  ]
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

  @ViewChild(ModalContainerDirective, { static: true }) modalContainerHost: ModalContainerDirective;
  @ViewChild('dialog', { static: true }) dialogElement: ElementRef;
  animateState: string = this.showAnimate ? 'void' : '';
  draggableHandleEl: HTMLElement;

  mouseDwonEl: ElementRef;
  ignoreBackDropClick = false;
  pressEscToClose: Subscription = new Subscription();
  constructor(private documentRef: DocumentRef, private renderer: Renderer2) {
    this.backdropCloseable = isUndefined(this.backdropCloseable)
      ? true
      : this.backdropCloseable;
  }

  ngOnInit() {
    this.pressEscToClose.add(fromEvent(window, 'keydown').subscribe((event) => {
      if (event['keyCode'] === 27) {
        this.hide();
      }
    }));
    const handle = document.getElementById('d-modal-header');
    if (handle) {
      this.draggableHandleEl = handle;
    }
  }

  onAnimationDone(event) {
    if (event.toState === 'void') {
      this.onHidden();
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
      if (!this.bodyScrollable) {
        this.renderer.removeClass(this.documentRef.body, 'modal-open');
      }

      if (!this.showAnimate) {
        this.onHidden();
        return;
      }
      this.animateState = 'void';
    });
  }

  show() {
    if (!this.bodyScrollable) {
      this.renderer.addClass(this.documentRef.body, 'modal-open');
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
    this.pressEscToClose.unsubscribe();
  }
}
