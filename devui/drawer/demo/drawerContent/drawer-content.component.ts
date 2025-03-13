import { Component, Input } from '@angular/core';

@Component({
    templateUrl: './drawer-content.component.html',
    styleUrls: ['./drawer-content.component.scss'],
    standalone: false
})
export class DrawerContentComponent {
  @Input() items;
  @Input() fullScreen;
  @Input() close;
  @Input() changeWidth;
  isFullScreen = false;
  constructor() {
  }
  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
    this.fullScreen();
  }
}
