import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DFormGroupRuleDirective, DValidateRules } from 'ng-devui/form';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'd-form-demo-validate-cross-component',
  templateUrl: './validate-cross-component.component.html',
})
export class ValidateCrossComponentComponent implements OnInit {
  formData = {
    userName: '',
    childUser: null,
  };

  userFormGroup = new FormGroup({
    username: new FormControl(this.formData.userName),
    childUser: new FormControl(this.formData.childUser),
  });

  formRules: { [key: string]: DValidateRules } = {
    rule: { message: 'The form verification failed, please check.' },
    usernameRules: {
      validators: [
        { required: true },
        { minlength: 3 },
        { maxlength: 128 },
        {
          pattern: /^[a-zA-Z0-9]+(\s+[a-zA-Z0-9]+)*$/,
          message: 'Please do not include characters other than uppercase and lowercase letters.',
        },
      ],
      asyncValidators: [{ sameName: this.checkName.bind(this), message: 'Duplicate name.' }],
    },
  };

  existUsernames = ['123', '123456', 'DevUI'];

  @ViewChild('userForm') userFormDir: DFormGroupRuleDirective;

  msgs: Array<Object> = [];

  constructor() {}

  ngOnInit() {
    this.userFormGroup.valueChanges.subscribe((val) => {
      this.formData = val;
    });
  }

  submitForm() {
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
            this.showToast('success', 'Success', 'registration success.');
          }
        });
    } else {
      this.showToast('error', 'Error', 'Please check whether all verification items are passed.');
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
