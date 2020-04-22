import { Component, OnInit } from '@angular/core';
import { DialogService } from 'ng-devui/modal';
import { ModalTestComponent } from './modal-test.component';



@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html',
})
export class BasicComponent implements OnInit {
  constructor(private dialogService: DialogService) {

  }

  openstandardDialog(dialogtype?: string) {
    const results = this.dialogService.open({
      id: 'dialog-service',
      width: '346px',
      maxHeight: '600px',
      showAnimate: false,
      title: 'Start Snapshot Version',
      content: ModalTestComponent,
      backdropCloseable: true,
      dialogtype: dialogtype,
      onClose: () => {
        console.log('on dialog closed');
      },
      buttons: [
        {
          cssClass: 'stress',
          text: '确定',
          handler: ($event: Event) => {
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
        name: 'Tom',
        age: 10,
        address: 'Chengdu'
      },
    });
  }

  ngOnInit() {
  }

}
