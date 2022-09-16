import { Component } from '@angular/core';

@Component({
  selector: 'd-callback',
  templateUrl: './callback.component.html',
})
export class CallbackComponent {
  count = 0;

  constructor() {}

  onChange(state) {
    console.log(state);
    this.count++;
  }
}
