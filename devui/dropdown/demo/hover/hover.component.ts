import { Component } from '@angular/core';

@Component({
    selector: 'd-dropdown-demo-hover',
    templateUrl: './hover.component.html',
    styleUrls: ['./hover.component.scss'],
    standalone: false
})
export class DropDownDemoHoverComponent {

  onToggle(event) {
    console.log(event);
  }
}
