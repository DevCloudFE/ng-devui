import { Component, OnInit } from '@angular/core';
import { StepsGuideService } from 'ng-devui/steps-guide';
import { basicData, positionData } from '../fakeData';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
})
export class BasicComponent implements OnInit {
  currentStep: any;
  currentStepOutPut: any;
  steps = basicData;
  constructor(private stepService: StepsGuideService) {}

  ngOnInit() {
    this.stepService.currentIndex.subscribe((index) => (this.currentStep = index));
    /* 由于整个demo是在一个页面内显示多个操作指引序列，因此需要在初始化时重置显示状态 */
    localStorage.setItem('devui_guide_step-position-demo', '0'); /* 设置第三个序列为不显示状态 */
    localStorage.setItem('devui_guide_step-custom-demo', '0'); /* 设置第二个序列为不显示状态 */
    this.stepService.setSteps(this.steps); /* 将步骤数据设置为第一个序列的内容 */
    this.stepService.setCurrentIndex(0); /* 设置当前序列显示步骤为第一个步骤 */
    this.stepService.showGuide(true); /* 显示当前序列 */
  }

  reset(index = 0) {
    this.stepService.showGuide(false);
    localStorage.setItem('devui_guide_step-custom-demo', '0');
    localStorage.setItem('devui_guide_step-position-demo', '0');
    localStorage.removeItem('devui_guide_step-basic-demo');
    this.stepService.setSteps(this.steps);
    this.stepService.setCurrentIndex(index);
  }

  close() {
    this.stepService.showGuide(false);
  }

  beforeChange = (currentIndex, targetIndex) => {
    /* 当前步骤为第三步，切换至第二步时，阻止步骤显示，显示第一步 */
    if (currentIndex === 2 && targetIndex === 1) {
      this.stepService.setCurrentIndex(0);
      return false;
    }
  }

  operateChange(response) {
    this.currentStepOutPut = response;
    if (response.clickType === 'close' && response.currentIndex === 2) {
      localStorage.removeItem('devui_guide_step-position-demo');
      this.stepService.setSteps(positionData);
      this.stepService.setCurrentIndex(0);
    }
  }
}
