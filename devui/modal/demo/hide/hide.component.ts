import { Component } from '@angular/core';
import { DialogService } from 'ng-devui/modal';
import { ModalFormComponent } from './modal-form.component';

@Component({
    selector: 'd-hide',
    templateUrl: './hide.component.html',
    standalone: false
})
export class HideComponent {
  constructor(private dialogService: DialogService) {}

  openPreventCloseDialog() {
    const results = this.dialogService.open({
      id: 'dialog-service',
      width: '500px',
      maxHeight: '500px',
      title: 'This is title',
      content: ModalFormComponent,
      dialogtype: 'standard',
      beforeHidden: () => this.beforeHidden(),
      backdropCloseable: true,
      buttons: [
        {
          cssClass: 'primary',
          text: 'Save',
          handler: ($event: Event) => {
            results.modalInstance.hide();
          },
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
        title: '',
        content: 'Do you want to save the modification before closing the page?',
        backdropCloseable: false,
        dialogtype: 'warning',
        buttons: [
          {
            cssClass: 'primary',
            text: 'Save',
            handler: ($event: Event) => {
              results.modalInstance.hide();
              resolve(true);
            },
          },
          {
            id: 'btn-cancel',
            cssClass: 'common',
            text: 'Cancel',
            handler: ($event: Event) => {
              results.modalInstance.hide();
              resolve(true);
            },
          },
        ],
      });
    });
  }
}
