import { Component } from '@angular/core';

@Component({
    selector: 'd-format-demo',
    styleUrls: ['./format.component.scss'],
    templateUrl: './format.component.html',
    standalone: false
})
export class FormatComponent {
  selectedTime1 = '12:27:50';
  formatOptions = ['hh:mm:ss', 'mm:HH:SS', 'hh:mm', 'MM:ss'];
  format = 'hh:mm:ss';

  timeChange($event) {
    console.log('change', $event);
  }

  modelChange($event) {
    console.log('model', $event);
  }
}
