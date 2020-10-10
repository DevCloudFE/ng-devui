import { Component, OnInit } from '@angular/core';
import { StepsGuideService } from 'ng-devui/steps-guide';

@Component({
  selector: 'd-custom',
  templateUrl: './custom.component.html',
  styles: [`d-button { margin-right: 4px }`]
})
export class CustomComponent implements OnInit {
  observerDom: any;
  targetElement = document.querySelectorAll('.main-nav-item')[0];
  steps = [
    {
      title: '自定义偏移位置',
      content: '根据绑定元素位置做一定的位移，用于定位在与该元素邻近但不便于绑定的元素'
    },
    {
      title: '自定义元素弹出',
      content: '指定一个元素展示引导弹出位置，与绑定元素无关'
    },
    {
      title: '监听 dom 变化修正定位',
      content: `点击本页面中的展开代码按钮，页面出现滚动条，绑定在头部菜单的指引信息会随着宽度变化自动定位`
    }
  ];
  config = {
    hidePreStep: false,
    hideStepNav: true
  };

  constructor(private stepService: StepsGuideService) { }

  ngOnInit() {
    /* 用于判断内容变化的dom，可选择最接近变化范围的容器，
    在angular组件或路由下可能不能正确触发，可选择更外层容器尝试 */
    this.observerDom = document.querySelector('.examples-viewer-wrapper');
  }

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
