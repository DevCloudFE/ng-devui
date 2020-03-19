import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'd-modal-footer',
  templateUrl: './modal-footer.component.html',
  styleUrls: ['./modal-footer.component.scss'],
})
export class ModalFooterComponent {
  @Input() buttons: Array<{
    id?: string,
    cssClass?: string,
    text: string,
    handler: ($event: Event) => void,
    btnwidth?: string
  }>;
}
