import { Component, OnInit } from '@angular/core';
import { StepsGuideService } from 'ng-devui/steps-guide';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html',
  styles: [`d-button { margin:0 4px 8px 0 }`]
})
export class BasicComponent implements OnInit {
  currentStep: any;
  nextStep: any;
  steps = [
    {
      title: '方向',
      content: '引导信息位置一共有八个方向可选择，请根据业务需要选择不同方向'
    },
    {
      title: '层级',
      content: '引导信息的窗口在 body 而非绑定元素中，可以通过设定 zIndex 避免被遮挡'
    },
    {
      title: '关闭',
      content: '点击右上关闭按钮会关闭整个指引序列，点击 close 按钮同样效果'
    },
    {
      title: '显示',
      content: '点击 show 按钮会从头开始重新显示该序列'
    },
    {
      title: '插入',
      content: '可以在多个页面设置同一个指引序列，也可以在同一页面设置多个指引序列，比如本页面'
    },
    {
      title: '实例',
      content: '操作指引通过同一个 StepsGuideService 实例实现步骤切换，尽量避免出现多个实例，或使用 setCurrentIndex 调整显示'
    },
    {
      title: '自定义显示位置',
      content: '引导信息的位置可以通过 leftFix 和 topFix 微调，精确定位，参见自定义 - custom position'
    },
    {
      title: '自定义显示元素',
      content: '引导信息也可以显示在非绑定元素上，参见自定义 - custom target'
    }
  ];

  constructor(private stepService: StepsGuideService) {
    this.stepService.currentIndex.subscribe(index => {
      this.currentStep = index;
    });
  }

  ngOnInit() {
    localStorage.setItem('devui_guide_step-custom-demo', '0');
    localStorage.removeItem('devui_guide_step-basic-demo');
    this.stepService.setSteps(this.steps);
    this.stepService.setCurrentIndex(0);
  }

  reset() {
    this.stepService.showGuide(false);
    localStorage.setItem('devui_guide_step-custom-demo', '0');
    localStorage.removeItem('devui_guide_step-basic-demo');
    this.stepService.setSteps(this.steps);
    this.stepService.setCurrentIndex(0);
  }

  close() {
    this.stepService.showGuide(false);
  }

  stepChange(step) {
    console.log(step);
  }

  operateChange(response) {
    if (response.clickType === 'close' && response.currentIndex === 7) {
      localStorage.removeItem('devui_guide_step-custom-demo');
      const steps = [
        {
          title: '自定义偏移位置',
          content: '根据绑定元素位置做一定的位移，用于定位在与该元素邻近但不便于绑定的元素'
        },
        {
          title: '自定义元素弹出',
          content: '指定一个元素展示引导弹出位置，与绑定元素无关'
        }
      ];
      this.stepService.setSteps(steps);
      this.stepService.setCurrentIndex(0);
    }
  }
}
