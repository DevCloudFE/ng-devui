import { Component } from '@angular/core';
import { DialogService } from 'ng-devui/modal';
import { ModalTestComponent } from './modal-test.component';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html',
})
export class BasicComponent {

  constructor(private dialogService: DialogService) {}

  openstandardDialog(dialogtype?: string) {
    const results = this.dialogService.open({
      id: 'dialog-service',
      width: '346px',
      maxHeight: '600px',
      title: 'Start Snapshot Version',
      content: ModalTestComponent,
      backdropCloseable: true,
      dialogtype: dialogtype,
      onClose: () => {
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
    console.log(results.modalContentInstance);
  }

  openDialogWithoutAnimation(dialogtype?: string) {
    const results = this.dialogService.open({
      id: 'dialog-service',
      width: '346px',
      maxHeight: '600px',
      title: 'Start Snapshot Version',
      showAnimate: false,
      content: ModalTestComponent,
      backdropCloseable: true,
      dialogtype: dialogtype,
      onClose: () => {
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
    console.log(results.modalContentInstance);
  }
}
