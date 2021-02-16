import { Component, OnInit } from '@angular/core';
import { DialogService } from 'ng-devui/modal';
import { ModalOneComponent } from '../modal-one/modal-one.component';

@Component({
  selector: 'd-form-demo-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  providers: [DialogService]

})
export class ModalComponent implements OnInit {

  constructor(private dialogService: DialogService) {
  }

  ngOnInit() {

  }

  openstandardDialog(dialogtype?: string) {
    const results = this.dialogService.open({
      id: 'dialog-service',
      width: '700px',
      maxHeight: '467px',
      title: '弹框表单',
      content: ModalOneComponent,
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

}
