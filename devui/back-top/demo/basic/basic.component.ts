import { Component } from '@angular/core';

@Component({
    selector: 'd-back-top-basic',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    standalone: false
})

export class  BasicComponent {
  constructor() {}

  backTop(event) {
    console.log(event);
  }
}
