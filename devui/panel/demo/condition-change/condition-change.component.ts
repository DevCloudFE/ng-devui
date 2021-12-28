import { Component } from '@angular/core';

@Component({
  selector: 'd-condition-change',
  templateUrl: './condition-change.component.html',
  styleUrls: ['./condition-change.component.scss']
})
export class ConditionChangeComponent {
  isCollapsed = true;
  panelToggle = true;
  beforeToggle = (isOpened) => {
    return isOpened ? this.panelToggle : true;
  };
}
