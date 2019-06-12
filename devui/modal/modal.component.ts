import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostBinding, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { isUndefined } from 'lodash-es';
import { Observable } from 'rxjs';
import { DocumentRef } from '../window-ref/document-ref.service';
import { ModalContainerDirective } from './modal.directive';

@Component({
  selector: 'ave-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      state('in', style({ opacity: 0.2 })),
      transition('void => in', animate('200ms linear')),
      transition('in => void', animate('200ms linear')),
    ]),
    trigger('flyInOut', [
      state('void', style({ top: '-100%' })),
      state('in', style({ top: '0' })),
      transition('void => in', animate('200ms ease-in-out')),
      transition('in => void', animate('200ms ease-in-out')),
    ])
  ]
})
export class ModalComponent implements OnInit {
  @Input() id: string;
  @Input() showAnimate: boolean;
  @Input() width: string;
  @Input() backdropCloseable: boolean;
  @Input() beforeHidden: () => boolean | Promise<boolean> | Observable<boolean>;
  @Input() draggable: boolean;

  @ViewChild(ModalContainerDirective) modalContainerHost: ModalContainerDirective;
  @ViewChild('dialog') dialogElement: ElementRef;
  @HostBinding('attr.ave-ui') aveUi = true;
  animateState: string = this.showAnimate ? 'void' : '';
  draggableHandleEl: HTMLElement;

  mouseDwonEl: ElementRef;
  ignoreBackDropClick = false;

  constructor(private documentRef: DocumentRef, private renderer: Renderer2) {
    this.backdropCloseable = isUndefined(this.backdropCloseable)
      ? true
      : this.backdropCloseable;
  }

  ngOnInit() {
    const handle = document.getElementById('ave-modal-header');
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
      this.renderer.removeClass(this.documentRef.body, 'modal-open');
      if (!this.showAnimate) {
        this.onHidden();
        return;
      }
      this.animateState = 'void';
    });
  }

  show() {
    this.renderer.addClass(this.documentRef.body, 'modal-open');
    if (!this.showAnimate) {
      return;
    }
    this.animateState = 'in';
    this.dialogElement.nativeElement.focus();
  }
}
