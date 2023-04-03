import { Component } from '@angular/core';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html',
})
export class BasicComponent {
  items = ['Item1', 'Item2', 'Item3'];
  chosenItem = 'Item1';

  valueChange(item): void {
    console.log(item);
  }
}
