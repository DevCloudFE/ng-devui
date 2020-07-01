import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-condition-radio-group',
  templateUrl: './condition-radio-group.component.html',
})
export class ConditionRadioGroupComponent implements OnInit {
  values = ['Item1', 'Item2', 'Item3'];
  choose = 'Item1';

  valuesSeason = ['Spring', 'Summer', 'Autumn', 'Winter'];
  chooseSeason = 'Summer';

  constructor() {}

  ngOnInit() {}

  beforeChange(values) {
    return values.some((item) => item === 'Item2');
  }

  valueChange(value) {
    console.log(value);
  }
}
