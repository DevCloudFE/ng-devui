import { Component } from '@angular/core';
import { DValidateRules } from 'ng-devui/form';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'd-form-demo-user-register',
  templateUrl: './user-register.component.html',
})
export class UserRegisterComponent {
  msgs: Array<Object> = [];

  existUsernames = ['123', '123456', 'DevUI'];

  formData = {
    userName: '',
    password: '',
  };

  formRules: { [key: string]: DValidateRules } = {
    rule: { message: 'The form verification failed, please check.', messageShowType: 'text' },
    usernameRules: {
      validators: [
        { required: true },
        { minlength: 3 },
        { maxlength: 128 },
        {
          pattern: /^[a-zA-Z0-9]+(\s+[a-zA-Z0-9]+)*$/,
          message: {
            'zh-cn': '仅允许输入数字与大小写字母',
            'en-us': 'The user name cannot contain characters except uppercase and lowercase letters.'
          },
        },
      ],
      asyncValidators: [{ sameName: this.checkName.bind(this), message: {
        'zh-cn': '用户名重名',
        'en-us': 'Duplicate name.'
      }
    }],
    },
    passwordRules: {
      validators: [{ required: true }, { minlength: 6 }, { maxlength: 15 }, { pattern: /^[a-zA-Z0-9]+(\s+[a-zA-Z0-9]+)*$/ }],
      message: 'Enter a password that contains 6 to 15 digits and letters.',
    },
  };

  maxUsers(num) {
    return (val) => {
      return !val || val.length <= num;
    };
  }
  submitForm({ valid, directive }) {
    console.log(directive);
    // do something for submitting
    if (valid) {
      console.log(this.formData);
      of(this.formData)
        .pipe(
          map((val) => 'success'),
          delay(500)
        )
        .subscribe((res) => {
          if (res === 'success') {
            this.showToast('success', 'Success', 'Registration succeeded.');
          }
        });
    } else {
      this.showToast('error', 'Error', 'Check whether all validation items pass.');
    }
  }

  checkName(value) {
    let res = true;
    if (this.existUsernames.indexOf(value) !== -1) {
      res = false;
    }
    return of(res).pipe(delay(500));
  }

  showToast(type: any, title: string, msg: string) {
    this.msgs = [{ severity: type, summary: title, detail: msg }];
  }
}
