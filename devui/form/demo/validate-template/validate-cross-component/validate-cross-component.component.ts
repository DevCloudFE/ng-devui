import { Component, ViewChild } from '@angular/core';
import { DFormGroupRuleDirective, DValidateRules, FormLayout } from 'ng-devui/form';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'd-form-demo-template-cross-component',
  templateUrl: './validate-cross-component.component.html'
})
export class CrossComponentComponent {
  layoutDirection: FormLayout = FormLayout.Vertical;

  formData = {
    userName: '',
    userGroup: {}
  };

  formRules: {[key: string]: DValidateRules} = {
    rule: { message: 'The form verification failed, please check.' },
    usernameRules: {
      validators: [
        { required: true },
        { minlength: 3 },
        { maxlength: 128 },
        {
          pattern: /^[a-zA-Z0-9]+(\s+[a-zA-Z0-9]+)*$/,
          message: 'The user name cannot contain characters except uppercase and lowercase letters.'
        }
      ],
      asyncValidators: [
        { sameName: this.checkName.bind(this), message: 'Duplicate name.' }
      ]
    }
  };

  existUsernames = ['123', '123456', 'DevUI'];

  @ViewChild('userForm') userFormDir: DFormGroupRuleDirective;

  msgs: Array<Object> = [];

  submitForm() {
    console.log(this.formData);
    // do something for submitting
    if (this.userFormDir.isReady) {
      of(this.formData).pipe(
        map((val) => 'success'),
        delay(500)
      ).subscribe((res) => {
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
