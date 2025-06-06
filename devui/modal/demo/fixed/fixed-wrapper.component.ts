import { Component, Renderer2 } from '@angular/core';
import { DialogService } from 'ng-devui/modal';
import { DocumentRef } from 'ng-devui/window-ref';
import { ModalTestComponent } from '../modal-test.component';

@Component({
    selector: 'd-fixed-wrapper',
    templateUrl: './fixed-wrapper.component.html',
    standalone: false
})
export class FixedWrapperComponent {
  scrollTop: number;

  constructor(
    private dialogService: DialogService,
    private documentRef: DocumentRef,
    private renderer: Renderer2
  ) {}

  openStandardDialog(dialogtype?: string) {
    this.setHtmlStyle();
    const results = this.dialogService.open({
      id: 'dialog-service',
      width: '346px',
      maxHeight: '600px',
      title: 'Start Snapshot Version',
      content: ModalTestComponent,
      backdropCloseable: true,
      dialogtype: dialogtype,
      onClose: () => {
        this.removeHtmlStyle();
        console.log('on dialog closed');
      },
      buttons: [
        {
          cssClass: 'primary',
          text: 'Ok',
          disabled: false,
          handler: ($event: Event) => {
            results.modalInstance.hide();
          },
        },
        {
          id: 'btn-cancel',
          cssClass: 'common',
          text: 'Cancel',
          handler: ($event: Event) => {
            results.modalInstance.hide();
          },
        },
      ],
      data: {
        name: 'Tom',
        age: 10,
        address: 'Chengdu',
      },
    });
  }

  setHtmlStyle() {
    this.scrollTop = this.documentRef.documentElement.scrollTop;
    this.renderer.setStyle(this.documentRef.documentElement, 'top', `-${this.scrollTop}px`);
    this.renderer.setStyle(this.documentRef.documentElement, 'position', 'fixed');
    this.renderer.setStyle(this.documentRef.documentElement, 'width', `100%`);
    this.renderer.setStyle(this.documentRef.documentElement, 'overflow-y', `scroll`);
  }

  removeHtmlStyle() {
    this.renderer.removeStyle(this.documentRef.documentElement, 'position');
    this.renderer.removeStyle(this.documentRef.documentElement, 'width');
    this.renderer.removeStyle(this.documentRef.documentElement, 'overflow');
    this.renderer.removeStyle(this.documentRef.documentElement, 'top');
    this.documentRef.documentElement.scrollTop = this.scrollTop;
  }
}
