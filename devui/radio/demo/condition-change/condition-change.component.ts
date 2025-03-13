import { Component } from '@angular/core';

@Component({
    selector: 'd-condition-change',
    templateUrl: './condition-change.component.html',
    standalone: false
})
export class ConditionChangeComponent {
  items = ['Item1', 'Item2', 'Item3'];
  chosenItem = 'Item1';

  beforeChange = (item: string): boolean => {
    return item !== 'Item2';
  };

  valueChange(item): void {
    console.log(item);
  }
}
