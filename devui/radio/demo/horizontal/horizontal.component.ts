import { Component } from '@angular/core';

@Component({
  selector: 'd-horizontal',
  templateUrl: './horizontal.component.html',
})
export class HorizontalComponent {
  weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  chosenItem = 'Wednesday';

  valueChange(value: string): void {
    console.log(value);
  }
}
