import { Component } from '@angular/core';
import { DialogService } from 'ng-devui/modal';
@Component({
  selector: 'd-warning',
  templateUrl: './warning.component.html',
})
export class WarningComponent {

  constructor(private dialogService: DialogService) { }

  openWarningDialog(dialogtype?: string) {
    const results = this.dialogService.open({
      id: 'dialog-service',
      width: '400px',
      maxHeight: '600px',
      showAnimate: false,
      title: '',
      html: true,
      content: '即将离开此页！',
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
}
