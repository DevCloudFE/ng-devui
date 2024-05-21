import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html',
  styles: [
    `
      d-button {
        margin-right: 4px;
      }
    `,
  ],
})
export class BasicComponent {
  @ViewChild('customTemplate') customTemplate: TemplateRef<any>;
  msgs: Array<Object> = [];

  get host() {
    return window.location.origin;
  }

  showToast(type: any) {
    switch (type) {
    case 'link':
      this.msgs = [
        /*
            TODO:
            The detail parameter will be deleted in the next major version.
          */
        { severity: 'info', summary: 'Relative', detail: `<a href="/home" target="_blank">Back to Home Page</a>` },
        { severity: 'info', summary: 'Absolute', content: this.customTemplate, myInfo: 'Devui' },
      ];
      break;
    case 'multiple':
      this.msgs = [
        { severity: 'info', summary: 'Summary', content: 'This is a test text. This is a test text. This is a test text.' },
        { severity: 'info', summary: 'Summary', content: 'This is a test text. This is a test text. This is a test text.' },
      ];
      break;
    case 'noTitle':
      this.msgs = [{ severity: 'warn', content: 'This is a test text. This is a test text. This is a test text.' }];
      break;
    case 'plainText':
      this.msgs = [{ severity: 'info', content: 'data：<id:gc5aa71bfd86943db9e3e8f34dc347a15><label:content>' }];
      break;
    default:
      this.msgs = [{ severity: type, summary: 'Summary', content: 'This is a test text. This is a test text. This is a test text.' }];
    }
  }
}
