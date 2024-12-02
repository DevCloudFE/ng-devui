import { Component } from '@angular/core';

@Component({
  selector: 'd-append',
  templateUrl: './append.component.html',
  styles: [
    `
      d-button {
        margin-right: 4px;
      }
    `,
  ],
})
export class AppendComponent {
  msgs: Array<Object> = [];

  showToast(type: string) {
    this.msgs = [{ severity: type, summary: 'Summary', content: 'This is a test text. This is a test text. This is a test text.' }];
  }
}
