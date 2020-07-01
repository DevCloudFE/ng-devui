import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-condition-change',
  templateUrl: './condition-change.component.html',
})
export class ConditionChangeComponent implements OnInit {
  valuesChange = ['Item1', 'Item2', 'Item3'];
  chooseChange = 'Item1';

  constructor() {}

  ngOnInit() {}

  beforeChange(value) {
    return value !== 'Item2';
  }

  valueChange(value) {
    console.log(value);
  }
}
