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
    { 'id': '1', 'name': '管理员1'},
    { 'id': '2', 'name': '管理员2'},
    { 'id': '3', 'name': '管理员3'},
    { 'id': '4', 'name': '管理员4'},
    { 'id': '5', 'name': '管理员5'},
    { 'id': '6', 'name': '管理员6'},
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
          message = `当前管理员${item.id}繁忙`;
        }
      });
    }

    // 模拟后端接口返回
    return of(message).pipe(
      delay(300)
    );
  }
}
