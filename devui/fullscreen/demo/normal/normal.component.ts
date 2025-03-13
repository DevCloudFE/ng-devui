import { Component } from '@angular/core';

@Component({
    selector: 'd-fullscreen-demo-normal',
    templateUrl: './normal.component.html',
    standalone: false
})
export class FullscreenDemoNormalComponent {
  btnIcon = 'icon-frame-expand';
  btnContent = '全屏';

  launchFullscreen({ isFullscreen }) {
    if (isFullscreen) {
      this.btnIcon = 'icon-frame-contract';
      this.btnContent = 'Exit';
    } else {
      this.btnIcon = 'icon-frame-expand';
      this.btnContent = 'FullScreen';
    }
  }
}
