import { Component } from '@angular/core';
import { DialogService } from 'ng-devui/modal';
import { ModalCasesComponent } from './modal-cases.component';

@Component({
  selector: 'd-cases',
  templateUrl: './cases.component.html',
})
export class CasesComponent {

  constructor(private dialogService: DialogService) {}

  openStandardDialog(dialogtype?: string) {
    const results = this.dialogService.open({
      id: 'dialog-service',
      width: '600px',
      maxHeight: '600px',
      title: '新建标签',
      content: ModalCasesComponent,
      backdropCloseable: true,
      dialogtype: dialogtype,
      onClose: () => {
        console.log('on dialog closed');
      },
      buttons: [
        {
          cssClass: 'primary',
          text: '确定',
          disabled: true,
          handler: ($event: Event) => {
            console.log('tag created');
            results.modalInstance.hide();
          },
        },
        {
          id: 'btn-cancel',
          cssClass: 'common',
          text: '取消',
          handler: ($event: Event) => {
            results.modalInstance.hide();
          },
        },
      ],
      data: {
        canConfirm: (value: boolean) => {
          results.modalInstance.updateButtonOptions([{disabled: !value}]);
        }
      },
    });
    console.log(results.modalContentInstance);
  }
}
