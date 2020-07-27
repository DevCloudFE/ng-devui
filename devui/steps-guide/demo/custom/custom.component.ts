import { Component } from '@angular/core';
import { StepsGuideService } from '../../steps-guide.service';

@Component({
  selector: 'd-custom',
  templateUrl: './custom.component.html',
  styles: [`d-button { margin-right: 5px }`]
})
export class CustomComponent {
  targetElement = document.querySelectorAll('.main-nav-item')[0];
  steps = [
    {
      title: '自定义偏移位置',
      content: '根据绑定元素位置做一定的位移，用于定位在与该元素邻近但不便于绑定的元素'
    },
    {
      title: '自定义元素弹出',
      content: '指定一个元素展示引导弹出位置，与绑定元素无关'
    }
  ];
  config = {
    hidePreStep: false,
    hideStepNav: true
  };

  constructor(private stepService: StepsGuideService) { }

  reset() {
    this.stepService.showGuide(false);
    localStorage.setItem('devui_guide_step-basic-demo', '0');
    this.stepService.setSteps(this.steps);
    /* 由于showGuide方法是针对当前显示的操作指引序列进行开关，当在一个页面内显示多个操作指引序列时（比如本示例），
    无法用来在多个序列间切换。可以使用removeItem和setCurrentIndex组合来达到showGuide(true) 的效果。 */
    localStorage.removeItem('devui_guide_step-custom-demo');
    this.stepService.setCurrentIndex(0);
  }

  close() {
    this.stepService.showGuide(false);
  }
}
