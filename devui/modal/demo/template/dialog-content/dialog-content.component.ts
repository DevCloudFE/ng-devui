import { Component, OnInit, Input } from '@angular/core';
import { ModalComponent } from 'ng-devui/modal';
@Component({
  selector: 'd-dialog-content',
  templateUrl: './dialog-content.component.html'
})
export class DialogContentComponent {
  @Input() data: any;
  @Input() modalInstance: ModalComponent;
  constructor() {
  }
}
