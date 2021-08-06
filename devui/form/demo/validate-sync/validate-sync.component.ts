import { Component } from '@angular/core';
import { DValidateRules, FormLayout } from 'ng-devui/form';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'd-form-demo-validate-sync',
  templateUrl: './validate-sync.component.html',
})
export class ValidateSyncComponent {
  layoutDirection: FormLayout = FormLayout.Vertical;
  msgs: Array<Object> = [];

  existUsernames = ['123', '123456', 'DevUI'];

  formData = {
    userName: '',
    password: '',
    confirmPassword: '',
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
          message: 'The user name cannot contain characters except uppercase and lowercase letters.',
        },
      ],
      asyncValidators: [{ sameName: this.checkName.bind(this), message: 'Duplicate name.' }],
    },
    passwordRules: {
      validators: [{ required: true }, { minlength: 6 }, { maxlength: 15 }, { pattern: /^[a-zA-Z0-9]+(\s+[a-zA-Z0-9]+)*$/ }],
      message: 'Enter a password that contains 6 to 15 digits and letters.',
    },
    confirmPasswordRules: [
      { required: true },
      { sameToPassWord: this.sameToPassWord.bind(this), message: 'Ensure that the two passwords are the same.' },
      { minlength: 6 },
      { maxlength: 15 },
      { pattern: /^[a-zA-Z0-9]+(\s+[a-zA-Z0-9]+)*$/, message: 'The password must contain only letters and digits.' },
    ],
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

  sameToPassWord(value) {
    return value === this.formData.password;
  }

  showToast(type: any, title: string, msg: string) {
    this.msgs = [{ severity: type, summary: title, detail: msg }];
  }
}
