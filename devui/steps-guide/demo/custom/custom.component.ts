import { DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  OnInit
} from '@angular/core';
import { StepsGuideService } from 'ng-devui/steps-guide';
import { customData } from '../fakeData';

@Component({
  selector: 'd-custom',
  templateUrl: './custom.component.html',
  styles: [`d-button { margin-right: 4px }`]
})
export class CustomComponent implements OnInit {
  observerDom: any;
  targetElement: HTMLElement;
  steps = customData;
  config = {
    hidePreStep: false,
    hideStepNav: true,
  };

  constructor(private stepService: StepsGuideService, @Inject(DOCUMENT) private doc: any) {}

  ngOnInit() {
    this.targetElement = this.doc.querySelector('.header-menu>div:first-child');
    /* 用于判断内容变化的dom，可选择最接近变化范围的容器，
    在angular组件或路由下可能不能正确触发，可选择更外层容器尝试 */
    this.observerDom = this.doc.querySelector('.header-menu');
  }

  reset(index = 0) {
    this.stepService.showGuide(false);
    localStorage.setItem('devui_guide_step-basic-demo', '0');
    this.stepService.setSteps(this.steps);
    /* 由于showGuide方法是针对当前显示的操作指引序列进行开关，当在一个页面内显示多个操作指引序列时（比如本示例），
    无法用来在多个序列间切换。可以使用removeItem和setCurrentIndex组合来达到showGuide(true) 的效果。 */
    localStorage.removeItem('devui_guide_step-custom-demo');
    this.stepService.setCurrentIndex(index);
  }

  close() {
    this.stepService.showGuide(false);
  }
}
