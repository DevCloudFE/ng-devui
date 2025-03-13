import { Component } from '@angular/core';

@Component({
    selector: 'd-basic',
    templateUrl: './basic.component.html',
    standalone: false
})
export class BasicComponent {
  items = ['Item1', 'Item2', 'Item3'];
  chosenItem = 'Item1';

  valueChange(item: string): void {
    console.log(item);
  }
}
