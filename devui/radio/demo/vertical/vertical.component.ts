import { Component } from '@angular/core';

@Component({
  selector: 'd-vertical',
  templateUrl: './vertical.component.html',
})
export class VerticalComponent {
  weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  chosenItem = 'Wednesday';

  valueChange(value: string): void {
    console.log(value);
  }
}
