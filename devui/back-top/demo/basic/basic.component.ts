import { Component } from '@angular/core';

@Component({
  selector: 'd-back-top-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})

export class  BasicComponent {
  isShow = false;
  constructor() {}

  backTop(event) {
    console.log(event);
  }
}
