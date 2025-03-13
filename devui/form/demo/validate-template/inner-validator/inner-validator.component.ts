import { Component } from '@angular/core';

@Component({
    selector: 'd-form-demo-inner-validator',
    templateUrl: './inner-validator.component.html',
    standalone: false
})
export class InnerValidatorComponent {
  isAlphabetPattern = /^[a-zA-Z]+(\s+[a-zA-Z]+)*$/;
  singleInput1Data = '';
}
