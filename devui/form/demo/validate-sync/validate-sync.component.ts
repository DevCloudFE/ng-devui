import { Component, OnInit } from '@angular/core';
import { DValidateRules } from 'ng-devui/form';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'd-form-demo-validate-sync',
  templateUrl: './validate-sync.component.html'
})
export class ValidateSyncComponent {

  msgs: Array<Object> = [];

  existUsernames = ['123', '123456', 'DevUI'];

  formData = {
    userName: '',
    password: '',
    confirmPassword: '',
  };

  formRules: {[key: string]: DValidateRules} = {
    rule: { message: '表单校验不通过，请检查', messageShowType: 'text' },
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
    },
    passwordRules: {
      validators: [
        { required: true },
        { minlength: 6 },
        { maxlength: 15 },
        { pattern: /^[a-zA-Z0-9]+(\s+[a-zA-Z0-9]+)*$/ }
      ],
      message: '请输入只包含数字字母的6-15位密码'
    },
    confirmPasswordRules: [
      { required: true, message: '密码不能为空' },
      { sameToPassWord: this.sameToPassWord.bind(this), message: '请保持两次输入密码一致' },
      { minlength: 6, message: '密码长度至少为6' },
      { maxlength: 15, message: '密码长度不能超过15' },
      { pattern: /^[a-zA-Z0-9]+(\s+[a-zA-Z0-9]+)*$/, message: '密码请勿包含字母数字以外其他字符' }
    ]
  };

  maxUsers(num) {
    return (val) => {
      return !val || val.length <= num;
    };
  }
  submitForm({valid, directive}) {
    console.log(directive);
    // do something for submitting
    if (valid) {
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

  sameToPassWord(value) {
    return value === this.formData.password;
  }

  showToast(type: any, title: string, msg: string) {
    this.msgs = [{ severity: type, summary: title, detail: msg }];
  }
}
