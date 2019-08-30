import { Component } from '@angular/core';
@Component({
  selector: 'd-demo-checkbox-group',
  templateUrl: './checkbox-demo-group.component.html',
})
export class CheckboxDemoGroupComponent {
  public checked = false;
  options1 = [{ name: 'Beijing', disabled: 'true', value: 1, id: 1 },
    { name: 'Chengdu', value: 2, id: 2 },
    { name: 'Shenzhen', value: 3, id: 3 }];
  values1 = [
    { name: 'Chengdu', value: 2, id: 2 },
  ];
  options2 = ['C#', 'C', 'C++', 'CPython', 'Java', 'JavaScript', 'Go'];
  values2 = ['C#', 'C'];

  constructor() {
  }
  onCheckbox1Change(value) {
    console.log('checkbox1 checked:', value);
  }

  onCheckbox2Change(value) {
    console.log('checkbox2 checked:', value);
  }
}
