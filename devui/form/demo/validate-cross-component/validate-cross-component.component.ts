import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DFormGroupRuleDirective, DValidateRules } from 'ng-devui/form';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'd-form-demo-validate-cross-component',
  templateUrl: './validate-cross-component.component.html'
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

  formRules: {[key: string]: DValidateRules} = {
    rule: { message: '表单校验不通过，请检查' },
    usernameRules: {
      validators: [
        { required: true, message: '用户名不能为空' },
        { minlength: 3, message: '用户名长度至少为3' },
        { maxlength: 128, message: '用户名长度不能超过128' },
        { pattern: /^[a-zA-Z0-9]+(\s+[a-zA-Z0-9]+)*$/, message: '用户名请勿包含大小写字母以外其他字符' }
      ],
      asyncValidators: [
        { sameName: this.checkName.bind(this), message: '当前用户名已存在' }
      ]
    }
  };

  existUsernames = ['123', '123456', 'DevUI'];

  @ViewChild('userForm') userFormDir: DFormGroupRuleDirective;

  msgs: Array<Object> = [];

  constructor() { }

  ngOnInit() {
    this.userFormGroup.valueChanges.subscribe((val) => {
      this.formData = val;
    });
  }

  submitForm() {
    // do something for submitting
    if (this.userFormDir.isReady) {
      console.log(this.formData);
      of(this.formData).pipe(
        map((val) => 'success'),  // 模拟接口处理
        delay(500)
      ).subscribe((res) => {
        if (res === 'success') {
          this.showToast('success', '成功', '注册成功');
        }
      });
    } else {
      this.showToast('error', '错误', '请检查所有校验项是否通过');
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
