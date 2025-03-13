import { Component } from '@angular/core';
import { StepsGuideService } from 'ng-devui/steps-guide';
import { customData, positionData } from '../fakeData';

@Component({
    selector: 'd-position',
    templateUrl: './position.component.html',
    styleUrls: ['./position.component.scss'],
    standalone: false
})
export class PositionComponent {
  currentStep: any;
  currentStepOutPut: any;
  steps = positionData;

  constructor(private stepService: StepsGuideService) {}

  reset(index = 0) {
    this.stepService.showGuide(false);
    localStorage.setItem('devui_guide_step-basic-demo', '0');
    localStorage.setItem('devui_guide_step-custom-demo', '0');
    localStorage.removeItem('devui_guide_step-position-demo');
    this.stepService.setSteps(this.steps);
    this.stepService.setCurrentIndex(index);
  }

  close() {
    this.stepService.showGuide(false);
  }

  operateChange(response) {
    this.currentStepOutPut = response;
    if (response.clickType === 'close' && response.currentIndex === 7) {
      localStorage.removeItem('devui_guide_step-custom-demo');
      this.stepService.setSteps(customData);
      this.stepService.setCurrentIndex(0);
    }
  }
}
