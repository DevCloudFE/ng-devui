import { Component, Input } from '@angular/core';

@Component({
  selector: 'd-modal-test',
  templateUrl: './modal-test.component.html',
})
export class ModalTestComponent {
  @Input() data: any;
  @Input() handler: Function;

  close($event) {
    this.handler($event);
  }
}
