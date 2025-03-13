import { Component } from '@angular/core';
@Component({
    selector: 'd-demo-checkbox-basic',
    templateUrl: './checkbox-basic.component.html',
    styleUrls: ['./checkbox-basic.component.css'],
    standalone: false
})
export class CheckboxBasicComponent {
  public checked = false;
  halfCheck = true;
  halfCheck2 = true;
  allCheck = false;
  allCheck2 = false;
  number = 1;

  onCheckbox1Change(value) {
    console.log('checkbox1 checked:', value);
  }

  onCheckbox2Change(value) {
    console.log('checkbox2 checked:', value);
  }

  onHalfCheckboxChange(value) {
    this.halfCheck = !this.allCheck;
    console.log('halfCheckbox checked:', value);
  }

  onHalfCheckboxChange2(value) {
    this.halfCheck2 = !this.allCheck2;
    console.log('halfCheckbox checked:', value);
  }
}
