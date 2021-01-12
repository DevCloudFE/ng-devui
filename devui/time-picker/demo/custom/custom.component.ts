import { Component } from '@angular/core';
import { unshiftString } from 'ng-devui/utils';

@Component({
  selector: 'd-custom-demo',
  styleUrls: ['./custom.component.scss'],
  templateUrl: './custom.component.html'
})
export class CustomComponent {
  selectedTime1;

  timeChange($event) {
    console.log('change', $event);
  }

  modelChange($event) {
    console.log('model', $event);
  }

  getTime() {
    return {
      time: `${this.pad(new Date().getHours())}:${this.pad(new Date().getMinutes())}:${this.pad(new Date().getSeconds())}`,
    };
  }

  pad(num) {
    return unshiftString(num + '', 2, '0');
  }

  choose(picker) {
    picker.chooseTime(this.getTime());
    picker.hide();
  }
}
