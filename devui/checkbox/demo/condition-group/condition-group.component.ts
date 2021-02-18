import { Component } from '@angular/core';
@Component({
  selector: 'd-checkbox-condition-group',
  templateUrl: './condition-group.component.html',
})
export class CheckboxConditionGroupComponent {
  optionsForbidden = ['data1', 'data2', 'intercept', 'intercept2', 'data5', 'data6', 'data7'];
  valuesForbidden = ['data2', 'intercept'];

  onCheckboxChange(value) {
    console.log('checkbox2 checked:', value);
  }

  beforeChange(label) {
    return !label.includes('intercept');
  }
}
