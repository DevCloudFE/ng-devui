import {
  Component,
  Input
} from '@angular/core';
import { IButtonStyle } from 'ng-devui/button';

@Component({
  selector: 'd-modal-footer',
  templateUrl: './modal-footer.component.html',
  styleUrls: ['./modal-footer.component.scss'],
  preserveWhitespaces: false,
})
export class ModalFooterComponent {
  @Input() buttons: Array<{
    id?: string;
    cssClass?: IButtonStyle;
    text: string;
    handler: ($event: Event) => void;
    btnwidth?: string;
    autofocus?: boolean;
    disabled: boolean;
  }>;
}
