import { Component } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'd-form-demo-validate-template-form',
  templateUrl: './validate-template-form.component.html'
})
export class ValidateTemplateFormComponent {
  planFormData = {
    planName: '',
    planDescription: '',
    planExerciseDate: [{ 'id': '1', 'label': '周一'}],
    planVerifier: null,
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
    console.log(this.planFormData);
  }

  resetPlanForm() {
    console.log(this.planFormData);
  }
}
