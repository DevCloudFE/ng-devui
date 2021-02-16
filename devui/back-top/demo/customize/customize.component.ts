import { Component } from '@angular/core';

@Component({
  selector: 'd-back-top-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.scss']
})

export class CustomizeComponent {
  isShow1 = false;
  isShow2 = false;
  constructor() {}

  backTop(event) {
    console.log(event);
  }
}
