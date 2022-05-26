import { Component, Input } from '@angular/core';
import { FormLayout } from 'ng-devui/form';
@Component({
  selector: 'd-modal-cases',
  templateUrl: './modal-cases.component.html',
  styles: ['textarea { height: 100px; resize: none }'],
})
export class ModalCasesComponent {
  @Input() data: any;
  branch = 'develop';
  tagName = '';
  des = '';
  layoutDirection: FormLayout = FormLayout.Vertical;

  formChange() {
    if (this.branch && this.tagName) {
      this.data.canConfirm(true);
    } else {
      this.data.canConfirm(true);
    }
  }
}
