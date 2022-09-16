import { Component } from '@angular/core';

@Component({
  selector: 'd-condition-change',
  templateUrl: './condition-change.component.html',
})
export class ConditionChangeComponent {
  valuesChange = ['Item1', 'Item2', 'Item3'];
  chooseChange = 'Item1';

  constructor() {}

  beforeChange(value) {
    return value !== 'Item2';
  }

  valueChange(value) {
    console.log(value);
  }
}
