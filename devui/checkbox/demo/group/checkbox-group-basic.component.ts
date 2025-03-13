import { Component } from '@angular/core';
@Component({
    selector: 'd-checkbox-group-basic',
    templateUrl: './checkbox-group-basic.component.html',
    standalone: false
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

  options5 = [
    'data00000000000000001',
    'data2',
    'data3',
    'data4',
    'data5',
    'data6',
    'data7',
    'data8',
    'data9',
    'data10',
    'data11',
    'data12',
    'data13',
    'data14',
    'data15',
  ];
  values5 = ['data2', 'data12'];

  options6 = ['data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7'];
  values6 = ['data3'];

  onCheckbox1Change(value) {
    console.log('checkbox1 checked:', value);
  }

  onCheckbox2Change(value) {
    console.log('checkbox2 checked:', value);
  }

  onCheckbox3Change(value) {
    console.log('checkbox3 checked:', value);
  }

  onCheckbox4Change(value) {
    console.log('checkbox4 checked:', value);
  }

  onCheckbox6Change(value) {
    console.log('checkbox6 checked:', value);
  }
}
