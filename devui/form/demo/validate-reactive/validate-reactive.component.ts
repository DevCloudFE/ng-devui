import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DFormGroupRuleDirective, DValidateRules, FormLayout } from 'ng-devui/form';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
    selector: 'd-form-demo-validate-reactive',
    templateUrl: './validate-reactive.component.html',
    styleUrls: ['./validate-reactive.component.scss'],
    standalone: false
})
export class ValidateReactiveComponent implements OnInit {
  layoutDirection: FormLayout = FormLayout.Vertical;
  singleSelectData = null;

  formData = {
    userName: '',
    password: '',
    confirmPassword: '',
  };

  singleSelectControl = new UntypedFormControl(null);

  userFormGroup = new UntypedFormGroup({
    username: new UntypedFormControl(this.formData.userName),
    password: new UntypedFormControl(this.formData.password),
    confirmPassword: new UntypedFormControl(this.formData.confirmPassword),
  });

  singleSelectRules: DValidateRules = {
    validators: [{ required: true }, { maxUser: this.maxUsers(3), message: 'The number of administrators cannot exceed three.' }],
  };

  formRules: { [key: string]: DValidateRules } = {
    rule: { message: 'The form verification failed, please check.' },
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

  verifierOptions = [
    { id: '1', name: 'Administrator1' },
    { id: '2', name: 'Administrator2' },
    { id: '3', name: 'Administrator3' },
    { id: '4', name: 'Administrator4' },
    { id: '5', name: 'Administrator5' },
    { id: '6', name: 'Administrator6' },
  ];

  existUsernames = ['123', '123456', 'DevUI'];

  @ViewChild('userForm') userFormDir: DFormGroupRuleDirective;

  msgs: Array<Object> = [];

  constructor() {}

  ngOnInit() {
    this.userFormGroup.valueChanges.subscribe((val) => {
      this.formData = val;
    });
  }

  submitForm({ valid, directive, data, errors }) {
    console.log('Valid:', valid, 'Directive:', directive, 'data', data, 'errors', errors);
    // do something for submitting
    if (this.userFormDir.isReady) {
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
  maxUsers(num) {
    return (val) => {
      return !val || val.length <= num;
    };
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
