import { Component } from '@angular/core';
import { DialogService } from 'ng-devui/modal';
import { ModalTestComponent } from '../modal-test.component';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html',
})
export class BasicComponent {
  config = {
    id: 'dialog-service',
    width: '346px',
    maxHeight: '600px',
    title: 'Start Snapshot Version',
    content: ModalTestComponent,
    backdropCloseable: true,
    onClose: () => console.log('on dialog closed'),
    data: {
      name: 'Tom',
      age: 10,
      address: 'Chengdu',
    },
  };

  constructor(private dialogService: DialogService) {}

  openDialog(dialogtype?: string, showAnimation?: boolean) {
    const results = this.dialogService.open({
      ...this.config,
      dialogtype: dialogtype,
      showAnimation: showAnimation,
      placement: 'unset',
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
    });
    console.log(results.modalContentInstance);
  }
}
