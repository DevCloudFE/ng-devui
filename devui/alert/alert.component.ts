import { NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { AlertType } from './alert.types';

@Component({
  selector: 'd-alert',
  standalone: true,
  imports: [NgIf],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  preserveWhitespaces: false,
})
export class AlertComponent {
  @Input() type: AlertType = 'info';
  @Input() cssClass: string;
  @Input() closeable = true;
  /**
   * @deprecated
   */
  @Input() content: HTMLElement | string;
  @Input() showIcon = true;
  @Output() closeEvent = new EventEmitter<AlertComponent>();
  @Input() set dismissTime(time) {
    setTimeout(() => {
      this.close();
    }, time);
  }

  hide = false;

  close() {
    this.closeEvent.emit(this);
    this.hide = true;
  }
}
