import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'd-modal-footer',
  templateUrl: './modal-footer.component.html',
  styleUrls: ['./modal-footer.component.scss'],
  preserveWhitespaces: false,
})
export class ModalFooterComponent {
  @Input() buttons: Array<{
    id?: string,
    cssClass?: string,
    text: string,
    handler: ($event: Event) => void,
    btnwidth?: string,
    autofocus?: boolean,
    disabled: boolean
  }>;
}
