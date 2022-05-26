import { Component } from '@angular/core';
import { DialogService } from 'ng-devui/modal';

@Component({
  selector: 'd-autofocus',
  templateUrl: './autofocus.component.html',
})
export class AutofocusComponent {
  constructor(private dialogService: DialogService) {}

  openWarningDialog(dialogtype?: string) {
    const results = this.dialogService.open({
      id: 'dialog-service',
      width: '400px',
      maxHeight: '600px',
      title: '',
      html: true,
      content: '<div style="color:#8a6d3b;">Press Enter to close</div>',
      backdropCloseable: true,
      dialogtype: dialogtype,
      buttons: [
        {
          btnwidth: '84px',
          cssClass: 'primary',
          text: 'Close',
          autofocus: true,
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
            console.log('cancel');
          },
        },
      ],
    });
  }
}
