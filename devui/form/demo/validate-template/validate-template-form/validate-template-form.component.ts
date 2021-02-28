import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'd-form-demo-validate-template-form',
  templateUrl: './validate-template-form.component.html'
})
export class ValidateTemplateFormComponent {
  planFormData = {
    planName: '',
    planDescription: '',
    planExerciseDate: [{ 'id': '1', 'label': 'Mon'}],
    planVerifier: null,
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

  checkName(value) {
    let res = true;
    if (this.existPlanNames.indexOf(value) !== -1) {
      res = false;
    }
    return of(res).pipe(delay(500));
  }

  validateDate(value): Observable<string | null> {
    let message = null;
    for (const item of value) {
      if (item.id === '2') {
        message = 'The task queue on the current execution day (Tuesday) is full.';
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
