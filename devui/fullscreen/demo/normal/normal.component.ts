import { Component } from '@angular/core';

@Component({
  selector: 'd-fullscreen-demo-normal',
  templateUrl: './normal.component.html'
})
export class FullscreenDemoNormalComponent {
  btnIcon = 'icon-frame-expand';
  btnContent = '全屏';

  launchFullscreen({isFullscreen}) {
    if (isFullscreen) {
      this.btnIcon = 'icon-frame-contract';
      this.btnContent = '退出全屏';
    } else {
      this.btnIcon = 'icon-frame-expand';
      this.btnContent = '全屏';
    }
  }
}
