import { Component } from '@angular/core';

@Component({
  selector: 'd-demo-dropdown-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
})
export class BasicComponent {
  rotateDegrees = 0;
  constructor() {}

  onToggle(event) {
    console.log(event);
    this.rotateDegrees = event ? 180 : 0;
  }
}
