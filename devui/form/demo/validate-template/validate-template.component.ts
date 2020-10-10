import { Component, OnInit } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { DValidateRules } from 'ng-devui/form';

@Component({
  selector: 'd-form-demo-validate-template',
  templateUrl: './validate-template.component.html',
  styleUrls: ['./validate-template.component.scss']
})
export class ValidateTemplateComponent implements OnInit {

  isAlphabetPattern = /^[a-zA-Z]+(\s+[a-zA-Z]+)*$/;
  singleInput1Data = '';
  singleInput2Data = '';
  singleSelectData1 = null;
  singleSelectData2 = null;
  singleSelectData3 = null;

  planFormData = {
    planName: '',
    planDescription: '',
    planExerciseDate: [{ 'id': '1', 'label': '周一'}],
    planVerifier: null,
  };

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

  checkboxOptions = [
    { 'id': '1', 'label': '周一'},
    { 'id': '2', 'label': '周二'},
    { 'id': '3', 'label': '周三'},
    { 'id': '4', 'label': '周四'},
    { 'id': '5', 'label': '周五'},
    { 'id': '6', 'label': '周六'},
  ];

  verifierOptions = [
    { 'id': '1', 'name': '管理员1'},
    { 'id': '2', 'name': '管理员2'},
    { 'id': '3', 'name': '管理员3'},
    { 'id': '4', 'name': '管理员4'},
    { 'id': '5', 'name': '管理员5'},
    { 'id': '6', 'name': '管理员6'},
  ];

  constructor() { }

  ngOnInit() {
  }

  validateDate(value): Observable<string | null> {
    let message = null;
    for (const item of value) {
      if (item.id === '2') {
        message = '当前执行日（星期二）任务队列已满';
      }
    }
    // 模拟后端接口返回
    return of(message).pipe(
      delay(500)
    );
  }

  submitPlanForm() {
    // do something for submitting
    console.log(this.formData);
  }

  resetPlanForm() {
    console.log(this.formData);
  }

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

  inputErrorChange({ errorMessage, showError, errors }) {
    console.log(errorMessage);
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
