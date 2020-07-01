import { ConnectedPosition } from '@angular/cdk/overlay';
import { Component } from '@angular/core';

@Component({
  selector: 'd-dropdown-demo-multi-level',
  templateUrl: './multi-level.component.html',
  styleUrls: ['./multi-level.component.css']
})
export class DropDownDemoMultiLevelComponent {
  subMenuDirections: ConnectedPosition[] = [{
    originX: 'end',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'top',
  }, {
    originX: 'end',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'bottom',
    offsetY: 5, // 菜单底部有个padding: 5px，刚好让菜单对齐父菜单
  }, {
    originX: 'start',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'top',
  }, {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'bottom',
    offsetY: 5,
  }];
}
