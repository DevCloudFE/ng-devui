import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'd-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.scss'],
})
export class ModalHeaderComponent {
  @Input() title: string;
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();
  close(event) {
    this.closeEvent.emit(event);
  }
}
