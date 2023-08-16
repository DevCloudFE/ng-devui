import { Component } from '@angular/core';

@Component({
  selector: 'd-callback',
  templateUrl: './callback.component.html',
  styles: [
    `
      d-toggle {
        margin-bottom: 8px;
      }
    `,
  ],
})
export class CallbackComponent {
  count = 0;

  onChange(state) {
    console.log(state);
    this.count++;
  }
}
