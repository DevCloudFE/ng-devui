import { Component } from '@angular/core';

@Component({
    selector: 'd-basic-demo',
    styleUrls: ['./basic.component.scss'],
    templateUrl: './basic.component.html',
    standalone: false
})
export class BasicComponent {
  selectedTime1;
  selectedTime2 = '22:32:58';
  selectedTime3;

  timeChange($event) {
    console.log('change', $event);
  }

  modelChange($event) {
    console.log('model', $event);
  }
}
