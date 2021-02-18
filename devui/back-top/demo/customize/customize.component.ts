import { Component } from '@angular/core';

@Component({
  selector: 'd-back-top-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.scss']
})

export class CustomizeComponent {
  constructor() {}

  backTop(event) {
    console.log(event);
  }
}
