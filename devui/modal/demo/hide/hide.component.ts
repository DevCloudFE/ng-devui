import { Component } from '@angular/core';
import { DialogService } from 'ng-devui/modal';
import { ModalFormComponent } from './modal-form.component';

@Component({
  selector: 'd-hide',
  templateUrl: './hide.component.html'
})
export class HideComponent {
  constructor(private dialogService: DialogService) {

  }

  openPreventCloseModal() {
    const results = this.dialogService.open({
      id: 'dialog-service',
      width: '500px',
      maxHeight: '500px',
      showAnimate: false,
      title: 'This is title',
      content: ModalFormComponent,
      dialogtype: 'standard',
      beforeHidden: () => this.beforeHidden(),
      backdropCloseable: true,
      buttons: [
        {
          cssClass: 'primary',
          text: '保存',
          handler: ($event: Event) => {
            results.modalInstance.onHidden();
          }
        },
      ],
    });
  }

  beforeHidden(): Promise<boolean> {
    return new Promise((resolve) => {
      const results = this.dialogService.open({
        id: 'dialog-service',
        width: '300px',
        maxHeight: '600px',
        showAnimate: false,
        title: '',
        content: '关闭页面前是否保存修改内容？',
        backdropCloseable: false,
        dialogtype: 'warning',
        buttons: [
          {
            cssClass: 'primary',
            text: '保存',
            handler: ($event: Event) => {
              results.modalInstance.hide();
              resolve(true);
            }
          },
          {
            id: 'btn-cancel',
            cssClass: 'common',
            text: '不保存',
            handler: ($event: Event) => {
              results.modalInstance.hide();
              resolve(true);
            }
          },
        ]
      });
    });
  }
}
