import { Component } from '@angular/core';
import { ModalService } from 'ng-devui/modal';
import { ModalAlertComponent } from './modal-alert.component';
import { ModalNoBtnComponent } from './modal-no-btn.component';

@Component({
    selector: 'd-customize',
    templateUrl: './customize.component.html',
    standalone: false
})
export class CustomizeComponent {
  constructor(private modalService: ModalService) {}

  openModal() {
    const results = this.modalService.open({
      id: 'modal-modal',
      width: '300px',
      backdropCloseable: false,
      component: ModalAlertComponent,
      onClose: () => {
        console.log('on modal closed.');
      },
      data: {
        content: 'Error: This is an error message, please take a look.',
        cancelBtnText: 'Ok',
        onClose: (event) => {
          results.modalInstance.hide();
        },
      },
    });
    console.log(results);
  }

  openModalWithoutBtn() {
    const results = this.modalService.open({
      id: 'modal-no-btn',
      width: '300px',
      backdropCloseable: true,
      component: ModalNoBtnComponent,
      onClose: () => {
        console.log('on modal closed.');
      },
      data: {
        content: 'Error: This is an error message, please take a look.',
        cancelBtnText: 'Ok',
        onClose: (event) => {
          results.modalInstance.hide();
        },
      },
    });
    console.log(results);
  }
}
