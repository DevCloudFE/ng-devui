import { Component } from '@angular/core';
import { DialogService } from 'ng-devui/modal';

@Component({
  selector: 'd-tips',
  templateUrl: './tips.component.html',
  styles: ['.btn-group d-button:not(first-child) { margin-left: 8px }'],
})
export class TipsComponent {
  config = {
    id: 'dialog-service',
    width: '346px',
    maxHeight: '600px',
    zIndex: 1050,
    backdropCloseable: true,
    html: true,
  };
  content = {
    success: 'Delete [Git] repository successfully.',
    failed: 'It is failed. if you want to resolve it, please contact the <u>support</u>.',
    warning: '<strong>Leaving this page!</strong>',
    info: 'You signed in with another tab or window. Reload to refresh your session.',
  };

  constructor(private dialogService: DialogService) {}

  openDialog(dialogtype?: string) {
    const results = this.dialogService.open({
      ...this.config,
      dialogtype: dialogtype,
      content: this.content[dialogtype],
      buttons: [
        {
          cssClass: 'primary',
          text: 'Ok',
          handler: ($event: Event) => {
            results.modalInstance.hide();
          },
        },
      ],
    });
  }
}
