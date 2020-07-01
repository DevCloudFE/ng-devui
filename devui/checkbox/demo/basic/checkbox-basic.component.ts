import { Component } from '@angular/core';
@Component({
    selector: 'd-demo-checkbox-basic',
    templateUrl: './checkbox-basic.component.html',
    styleUrls: ['./checkbox-basic.component.css']
})
export class CheckboxBasicComponent {
  public checked = false;
  halfCheck = true;
  allCheck = false;
  number = 1 ;

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
}
