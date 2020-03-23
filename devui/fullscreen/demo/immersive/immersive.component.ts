import { Component } from '@angular/core';

@Component({
  selector: 'd-fullscreen-demo-immersive',
  templateUrl: './immersive.component.html'
})
export class FullscreenDemoImmersiveComponent {
  btnContent = '全屏';

  launchFullscreen({isFullscreen}) {
    if (isFullscreen) {
      this.btnContent = '退出全屏';
    } else {
      this.btnContent = '全屏';
    }
  }
}
