import { Component } from '@angular/core';

@Component({
    selector: 'd-alert-basic',
    templateUrl: './basic.component.html',
    styles: [
        `
      d-alert {
        margin-bottom: 16px;
      }
    `,
    ],
    standalone: false
})
export class BasicComponent {}
