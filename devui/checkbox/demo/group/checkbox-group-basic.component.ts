import { Component } from '@angular/core';
@Component({
  selector: 'd-checkbox-group-basic',
  templateUrl: './checkbox-group-basic.component.html',
})
export class CheckboxGroupBasicComponent {
  public checked = false;
  options1 = [
    { name: 'data1', disabled: 'true', value: 1, id: 1 },
    { name: 'data2', value: 2, id: 2 },
    { name: 'data3', value: 3, id: 3 },
  ];
  values1 = [{ name: 'data2', value: 2, id: 2 }];
  options2 = ['data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7'];
  values2 = ['data1', 'data2'];

  options3 = ['data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7'];
  values3 = ['data1', 'data3'];

  options4 = ['data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7'];
  values4 = ['data2', 'data3'];

  constructor() {}
  onCheckbox1Change(value) {
    console.log('checkbox1 checked:', value);
  }

  onCheckbox2Change(value) {
    console.log('checkbox2 checked:', value);
  }

  onCheckbox3Change(value) {
    console.log('checkbox3 checked:', value);
  }
}
