import { Component } from '@angular/core';
import { LoadingService } from 'ng-devui/loading';
@Component({
  selector: 'd-full-screen',
  templateUrl: './full-screen.component.html',
  styleUrls: ['./full-screen.component.scss'],
})
export class FullScreenComponent {
  resultTarget: any;
  isShow: boolean;
  constructor(private loadingService: LoadingService) {}

  openFullScreen() {
    /*
    返回一个对象 内含loading实例。2000毫秒之后关闭这个loading实例。
    */
    const results = this.loadingService.open();
    console.log('results', results);

    setTimeout(() => {
      results.loadingInstance.close();
    }, 2000);
  }

  openTargetLoading() {
    const dm = document.querySelector('#me');
    this.resultTarget = this.loadingService.open({
      target: dm,
      message: 'One moment please...',
      positionType: 'relative',
      zIndex: 1,
    });
    console.log('resultTarget', this.resultTarget);
    this.isShow = true;
  }
  closeTargetLoading() {
    this.resultTarget.loadingInstance.close();
    this.isShow = false;
  }
}
