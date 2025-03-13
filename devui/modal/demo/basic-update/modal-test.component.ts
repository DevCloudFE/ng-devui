import { Component, Input } from '@angular/core';
@Component({
    selector: 'd-modal-test',
    templateUrl: './modal-test.component.html',
    standalone: false
})
export class ModalTestComponent {
  @Input() data: any;

  onMouseover() {
    this.data.statusChange();
  }
}
