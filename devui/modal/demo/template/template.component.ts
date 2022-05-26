import { Component, TemplateRef, ViewChild } from '@angular/core';
import { DialogService, ModalService } from 'ng-devui/modal';

@Component({
  selector: 'd-template',
  templateUrl: './template.component.html',
})
export class TemplateComponent {
  @ViewChild('dialogContent', { static: true }) dialogContent: TemplateRef<any>;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  dialogData = {
    name: 'Tom',
    age: 10,
    address: 'Chengdu',
  };

  modalData = { content: 'Error: This is an error message, please take a look.' };

  constructor(private dialogService: DialogService, private modalService: ModalService) {}

  openTemplateDialog() {
    const results = this.dialogService.open({
      id: 'template',
      width: '346px',
      maxHeight: '600px',
      title: 'Dialog Template Content',
      contentTemplate: this.dialogContent,
      backdropCloseable: true,
      onClose: () => {
        console.log('on dialog closed');
      },
      buttons: [
        {
          cssClass: 'primary',
          text: 'Ok',
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
  }

  openTemplateModal() {
    const results = this.modalService.open({
      id: 'modal-modal',
      width: '300px',
      backdropCloseable: false,
      contentTemplate: this.modalContent,
      onClose: () => {
        console.log('on modal closed.');
      },
    });
  }
}
