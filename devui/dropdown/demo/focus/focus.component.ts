import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-dropdown-demo-focus',
  templateUrl: './focus.component.html',
  styleUrls: ['./focus.component.css']
})
export class DropDownDemoFocusComponent {
  showExample = false;
  onToggle(event) {
    console.log(event);
  }
}
