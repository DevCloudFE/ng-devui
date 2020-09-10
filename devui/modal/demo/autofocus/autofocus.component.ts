import { Component } from '@angular/core';
import { DialogService } from 'ng-devui/modal';
@Component({
  selector: 'd-autofocus',
  templateUrl: './autofocus.component.html',
})
export class AutofocusComponent {
  constructor(private dialogService: DialogService) {

  }

  openWarningDialog(dialogtype?: string) {
    const results = this.dialogService.open({
      id: 'dialog-service',
      width: '400px',
      maxHeight: '600px',
      showAnimate: false,
      title: '',
      html: true,
      content: '<div style="color:#8a6d3b;">回车直接关闭</div>',
      backdropCloseable: true,
      dialogtype: dialogtype,
      buttons: [
        {
          cssClass: 'primary',
          text: '关闭',
          autofocus: true,
          handler: ($event: Event) => {
            results.modalInstance.hide();
          },
          btnwidth: '84px'
        },
        {
          id: 'btn-cancel',
          cssClass: 'common',
          text: '取消',
          handler: ($event: Event) => {
            results.modalInstance.hide();
            console.log('cancel');
          }
        }],
    });
  }
}
