import { Component, Input, OnInit } from '@angular/core';
import { ModalComponent } from 'ng-devui/modal';
@Component({
    selector: 'd-dialog-content',
    templateUrl: './dialog-content.component.html',
    standalone: false
})
export class DialogContentComponent implements OnInit {
  @Input() data: any;
  @Input() modalInstance: ModalComponent;
  @Input() modalContentInstance;

  ngOnInit(): void {
    console.log('modalInstance', this.modalInstance);
    console.log('modalContentInstance', this.modalContentInstance);
  }
}
