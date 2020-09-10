import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DialogService, ModalService } from 'ng-devui/modal';

@Component({
  selector: 'd-template',
  templateUrl: './template.component.html',
  styles: ['d-button { margin-right: 5px; }']
})
export class TemplateComponent implements OnInit {
  @ViewChild('dialogContent', { static: true }) dialogContent: TemplateRef<any>;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  dialogData = {
    name: 'Tom',
    age: 10,
    address: 'Chengdu',
  };

  modalData = {
    content: 'Error: This is an error message, please take a look.',
  };

  constructor(private dialogService: DialogService, private modalService: ModalService) { }

  ngOnInit() {}

  openTempleteDialog() {
    const results = this.dialogService.open({
      id: 'template',
      width: '346px',
      maxHeight: '600px',
      showAnimate: true,
      title: 'Dialog Template Content',
      contentTemplate: this.dialogContent,
      backdropCloseable: true,
      onClose: () => {
        console.log('on dialog closed');
      },
      buttons: [
        {
          cssClass: 'primary',
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
      ]
    });
  }

  openTempleteModal() {
    const results = this.modalService.open({
      id: 'modal-modal',
      width: '300px',
      backdropCloseable: false,
      showAnimate: false,
      contentTemplate: this.modalContent,
      onClose: () => {
        console.log('on modal closed.');
      }
    });
  }
}
