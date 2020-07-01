import { Component } from '@angular/core';
@Component({
  selector: 'd-checkbox-condition-group',
  templateUrl: './condition-group.component.html',
})
export class CheckboxConditionGroupComponent {
  optionsForbidden = ['data1', 'data2', '禁用', '禁用2', 'data5', 'data6', 'data7'];
  valuesForbidden = ['data2', '禁用'];

  onCheckboxChange(value) {
    console.log('checkbox2 checked:', value);
  }

  beforeChange(label) {
    return !label.includes('禁用');
  }
}
