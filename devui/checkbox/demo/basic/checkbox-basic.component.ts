import { Component } from '@angular/core';
@Component({
    selector: 'ave-demo-checkbox-basic',
    templateUrl: './checkbox-basic.component.html',
    styleUrls: ['./checkbox-basic.component.css']
})
export class CheckboxBasicComponent {
    public checked = false;
    number = 1 ;
    checkeOrNull = true;
    constructor() {
    }
    onCheckbox1Change(value) {
        console.log('checkbox1 checked:', value);
    }

    onCheckbox2Change(value) {
        console.log('checkbox2 checked:', value);
    }
}
