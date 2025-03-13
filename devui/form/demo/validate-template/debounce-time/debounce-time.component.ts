import { Component } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'd-form-demo-debounce-time',
    templateUrl: './debounce-time.component.html',
    standalone: false
})
export class DebounceTimeComponent {
  singleInputData = '';

  sameName(value) {
    console.log('validate sameName');

    let message = null;

    if (value === 'DevUI') {
      message = 'The field already exists.';
    }

    return of(message).pipe(
      delay(500)
    );
  }
}
