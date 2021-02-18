import { Component } from '@angular/core';
import { DialogService } from 'ng-devui/modal';

@Component({
  selector: 'd-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.css'],
})
export class TipsComponent {
  constructor(private dialogService: DialogService) { }

  openSuccessDialog(dialogtype?: string) {
    const results = this.dialogService.open({
      id: 'dialog-service',
      width: '346px',
      maxHeight: '600px',
      title: '',
      content: 'Delete [Git] repository successfully.',
      backdropCloseable: true,
      dialogtype: dialogtype,
      buttons: [
        {
          cssClass: 'primary',
          text: 'Ok',
          handler: ($event: Event) => {
            results.modalInstance.hide();
          },
        }
      ],
    });
  }

  openFailedDialog(dialogtype?: string) {
    const results = this.dialogService.open({
      id: 'dialog-service',
      width: '346px',
      maxHeight: '600px',
      title: '',
      content: 'It is failed. if you want to resolve it,please contact the supportor.',
      backdropCloseable: true,
      dialogtype: dialogtype,
      buttons: [
        {
          cssClass: 'primary',
          text: 'Ok',
          handler: ($event: Event) => {
            results.modalInstance.hide();
          }
        }
      ],
    });
  }

  openWarningDialog(dialogtype?: string) {
    const results = this.dialogService.open({
      id: 'dialog-service',
      width: '400px',
      maxHeight: '600px',
      title: '',
      html: true,
      content: 'Leaving this page!',
      backdropCloseable: true,
      dialogtype: dialogtype,
      buttons: [
        {
          cssClass: 'primary',
          text: 'Ok',
          handler: ($event: Event) => {
            results.modalInstance.hide();
          },
        }
      ],
    });
  }

  openInfoDialog(dialogtype?: string) {
    const results = this.dialogService.open({
      id: 'dialog-service',
      zIndex: 1050,
      width: '346px',
      maxHeight: '600px',
      title: '',
      content: ' You signed in with another tab or window. Reload to refresh your session.',
      backdropCloseable: true,
      dialogtype: dialogtype,
      buttons: [
        {
          cssClass: 'primary',
          text: 'Ok',
          handler: ($event: Event) => {
            results.modalInstance.hide();
          }
        }
      ]
    });
  }
}
