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
    offsetY: -7, // 菜单顶部有个padding:5px,margin:2px刚好让子菜单第一项对齐父菜单
  }, {
    originX: 'end',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'bottom',
    offsetY: 7,
  }, {
    originX: 'start',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'top',
    offsetY: -7,
  }, {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'bottom',
    offsetY: 7,
  }];
}
