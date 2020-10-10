import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'd-modal-alert',
  templateUrl: './modal-alert.component.html',
  preserveWhitespaces: false,
})
export class ModalAlertComponent {
  @Input() data: any;

  close(event) {
    this.data.onClose(event);
  }
}
