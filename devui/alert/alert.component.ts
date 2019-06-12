import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { AlertType } from './alert.types';

@Component({
  selector: 'ave-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input() type: AlertType = 'info';
  @Input() closeable = true;
  @Input() content: HTMLElement | string;
  @Output() closeEvent: EventEmitter<any> = new EventEmitter;

  @Input() set dismissTime(time) {
    setTimeout(() => {
      this.close();
    }, time);
  }

  hide = false;

  constructor() {
  }

  close() {
    this.closeEvent.emit(this);
    this.hide = true;
  }
}
