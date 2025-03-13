import { Component } from '@angular/core';
@Component({
    selector: 'd-demo-condition-change',
    templateUrl: './condition-change.component.html',
    styleUrls: ['./condition-change.component.scss'],
    standalone: false
})
export class CheckboxConditionChangeComponent {
  public checked = false;
  halfCheck = true;
  allCheck = false;
  number = 1 ;

  onCheckbox1Change(value) {
    console.log('checkbox1 checked:', value);
  }

  beforeChange(label) {
    return label === '条件判断回调允许选中';
  }
}
