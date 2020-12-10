import { Component } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'd-form-demo-debounce-time',
  templateUrl: './debounce-time.component.html'
})
export class DebounceTimeComponent {
  singleInputData = '';

  sameName(value) {
    console.log('validate sameName');

    let message = null;

    if (value === 'DevUI') {
      message = '当前字段已存在';
    }

    return of(message).pipe(
      delay(500)
    );
  }
}
