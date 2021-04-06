import { Component } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'd-form-demo-custom-validator',
  templateUrl: './custom-validator.component.html'
})
export class CustomValidatorComponent {
  singleSelectData = null;

  verifierOptions = [
    { 'id': '1', 'name': 'Administrator1'},
    { 'id': '2', 'name': 'Administrator2'},
    { 'id': '3', 'name': 'Administrator3'},
    { 'id': '4', 'name': 'Administrator4'},
    { 'id': '5', 'name': 'Administrator5'},
    { 'id': '6', 'name': 'Administrator6'},
  ];

  maxUsers(num) {
    return (val) => {
      return !val || val.length <= num;
    };
  }

  isUserBusy(value) {
    let message = null;
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item.id === '2') {
          message = {
            'zh-cn': `当前管理员${item.id}繁忙.`,
            'en-us': `The current administrator ${item.id} is busy.`,
          };
        }
      });
    }

    return of(message).pipe(
      delay(300)
    );
  }
}
