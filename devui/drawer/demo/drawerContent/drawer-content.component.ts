import { Component, Input } from '@angular/core';

@Component({
  templateUrl: './drawer-content.component.html',
  styleUrls: ['./drawer-content.component.css']
})
export class DrawerContentComponent {
  @Input() items;
  @Input() fullScreen;
  @Input() close;
  @Input() changeWidth;
  constructor() {
  }

}
