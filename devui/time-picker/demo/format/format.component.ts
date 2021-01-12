import { Component } from '@angular/core';

@Component({
  selector: 'd-format-demo',
  styleUrls: ['./format.component.scss'],
  templateUrl: './format.component.html'
})
export class FormatComponent {
  selectedTime1 = '22:32:58';
  formatOptions = ['hh:mm:ss', 'mm:HH:SS', 'hh:mm', 'MM:ss'];
  format = 'hh:mm:ss';

  timeChange($event) {
    console.log('change', $event);
  }

  modelChange($event) {
    console.log('model', $event);
  }
}
