import { Component } from '@angular/core';
import { FormLayout } from 'ng-devui/form';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'd-form-demo-validate-template-form',
    templateUrl: './validate-template-form.component.html',
    styleUrls: ['./validate-template-form.component.scss'],
    standalone: false
})
export class ValidateTemplateFormComponent {
  layoutDirection: FormLayout = FormLayout.Vertical;
  planFormData = {
    planName: '',
    planDescription: '',
    planExerciseDate: [{ 'id': '1', 'label': 'Mon'}],
    planVerifier: null,
    password: '',
  };

  existPlanNames = ['123', '123456', 'DevUI'];

  checkboxOptions = [
    { 'id': '1', 'label': 'Mon' },
    { 'id': '2', 'label': 'Tue' },
    { 'id': '3', 'label': 'Wed' },
    { 'id': '4', 'label': 'Thur' },
    { 'id': '5', 'label': 'Fri' },
    { 'id': '6', 'label': 'Sat' },
  ];

  verifierOptions = [
    { 'id': '1', 'name': 'Administrator1'},
    { 'id': '2', 'name': 'Administrator2'},
    { 'id': '3', 'name': 'Administrator3'},
    { 'id': '4', 'name': 'Administrator4'},
    { 'id': '5', 'name': 'Administrator5'},
    { 'id': '6', 'name': 'Administrator6'},
  ];

  nameValid = {
    same: true,
    length: true
  };

  checkName(value) {
    let res = true;
    this.nameValid.same = this.existPlanNames.indexOf(value) === -1;
    if (!this.nameValid.same) {
      res = false;
    }

    this.nameValid.length = (value.length > 3 && value.length < 10);

    if (!this.nameValid.length) {
      res = false;
    }
    return of(res).pipe(delay(500));
  }

  validateDate(value): Observable<string | null> {
    let message = null;
    for (const item of value) {
      if (item.id === '2') {
        message = {
          'zh-cn': `当前日期队列已满`,
          'en-us': 'The task queue on the current execution day (Tuesday) is full.'
        };
      }
    }
    // Returned by the simulated backend interface
    return of(message).pipe(
      delay(300)
    );
  }

  submitPlanForm({valid, directive, data, errors}) {
    console.log('Valid:', valid, 'Directive:', directive, 'data', data, 'errors', errors);
    if (valid) {
      // do something
    } else {
      // error tip
    }
  }

  resetPlanForm() {
    console.log(this.planFormData);
  }
}
