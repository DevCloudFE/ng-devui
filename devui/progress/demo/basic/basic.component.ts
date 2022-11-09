import { Component } from '@angular/core';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
})
export class BasicComponent {
  showContentConfig = {
    showInnerContent: false,
    showOuterContent: true,
    showCenterContent: false,
  };
}
