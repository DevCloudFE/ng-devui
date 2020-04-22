import { Component } from '@angular/core';
import { ModalService } from 'ng-devui/modal';
import { ModalAlertComponent } from './modal-alert.component';

@Component({
  selector: 'd-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.css']
})
export class CustomizeComponent {

  constructor(private modalService: ModalService) {

  }

  openModal() {
    const results = this.modalService.open({
      id: 'modal-modal',
      width: '300px',
      backdropCloseable: false,
      showAnimate: false,
      component: ModalAlertComponent,
      onClose: () => {
        console.log('on modal closed.');
      },
      data: {
        content: 'Error: This is an error message, please take a look.',
        cancelBtnText: '我知道了',
        onClose: (event) => {
          results.modalInstance.hide();
        },
      },
    });
    console.log(results);
  }

}
