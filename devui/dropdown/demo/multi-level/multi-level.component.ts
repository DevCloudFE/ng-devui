import { ConnectedPosition } from '@angular/cdk/overlay';
import { Component } from '@angular/core';

@Component({
  selector: 'd-dropdown-demo-multi-level',
  templateUrl: './multi-level.component.html',
  styleUrls: ['./multi-level.component.scss'],
})
export class DropDownDemoMultiLevelComponent {
  subMenuDirections: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: -4, // margin:2px刚好让子菜单第一项对齐父菜单
    },
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetY: 9, // 菜单底部有个padding: 5px，margin:2px刚好让菜单对齐父菜单
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'top',
      offsetY: -4,
    },
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'bottom',
      offsetY: 9,
    },
  ];
}
