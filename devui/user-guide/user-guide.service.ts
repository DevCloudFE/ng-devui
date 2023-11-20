import {
  ComponentFactoryResolver,
  ComponentRef, Injectable
} from '@angular/core';
import { OverlayContainerRef } from 'ng-devui/overlay-container';
import { UserGuideCoreService } from './user-guide-core.service';
import { UserGuideUIComponent } from './user-guide-ui.component';

@Injectable()
export class UserGuideService {
  private steps;
  private currentTutorial: number;
  private firstOpenShow: string;

  modalRef: ComponentRef<UserGuideUIComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private overlayContainerRef: OverlayContainerRef,
              private userGuideCoreService: UserGuideCoreService) { }

  setSteps(steps) {
    this.firstOpenShow = localStorage.getItem('devui-user-guide-first-open-show') || 'true';

    this.steps = steps;

    setTimeout(() => {
      for (let i = 0; i < this.steps.length; i++) {
        if (this.steps[i]?.defaultStart === true && this.firstOpenShow === 'true') {
          this.start(i);

          try {
            localStorage.setItem('devui-user-guide-first-open-show', 'false');
          } catch (error) {
            console.error(error);
          }
          break;
        }
      }
    }, 0);
  }

  start(index: number) {
    this.userGuideCoreService.setSteps(this.steps[index].detail);
    if (this.steps[index].onExit) {
      this.userGuideCoreService.setExitFunction(this.steps[index].onExit);
    }
    this.userGuideCoreService.isFinished.subscribe((item) => {
      this.steps[index].isFinished = item;
      if (item === true) {
        if (this.modalRef) {
          this.modalRef.hostView.destroy();
        }
      }
    });
    this.userGuideCoreService.start();
    this.createGuide(index);

    this.userGuideCoreService.next();

    this.currentTutorial = index;

    try {
      localStorage.setItem('devui-user-guide-last-tutorial', index.toString());
    } catch (error) {
      console.error(error);
    }
  }

  goStep(index: number) {
    let realStep = index;
    for (let i = 0 ; i < index; i++) {
      if (this.steps[this.currentTutorial].detail[i].type === 'interactable'
        && this.steps[this.currentTutorial].detail[i].eventType === 'clickable') {
        realStep = i;
        break;
      }
    }
    this.userGuideCoreService.goStep(realStep);
  }

  createGuide(index: number) {
    this.modalRef = this.overlayContainerRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(UserGuideUIComponent)
    );
    this.modalRef.instance.showDots = this.steps[index]?.showDots;
    this.modalRef.instance.maxContentWidth = this.steps[index]?.maxContentWidth ? this.steps[index]?.maxContentWidth : 320;
    this.modalRef.instance.isCover = this.steps[index]?.isCover === undefined ? true: this.steps[index]?.isCover;
    this.modalRef.instance.extraConfig = this.steps[index]?.extraConfig;
    this.modalRef.instance.close = () => {
      if (this.modalRef) {
        this.modalRef.hostView.destroy();
      }
    };

    const panel = document.querySelector('.user-guide-panel') as HTMLElement;
    panel.style.visibility = 'hidden';
  }

  showDot(item: string) {
    const dotAttachElement = document.getElementById(item) || document.querySelector(item);
    const dot = document.createElement('span');
    dot.className = 'devui-userguide-dot';
    dot.style.cssText = `
      width: 6px;
      height: 6px;
      border-radius: 100%;
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(50%,-50%);
      background: var(--devui-brand);
    `;
    dotAttachElement.append(dot);
  }

  removeDot() {
    const dot = document.querySelector('.devui-userguide-dot');
    dot.remove();
  }

  updateCurrentStepElement() {
    this.userGuideCoreService.updateCurrentStepElement();
  }

  getCurrentStep() {
    return this.userGuideCoreService.getCurrentStep();
  }

  getCurrentDirection() {
    return this.userGuideCoreService.getCurrentDirection();
  }

  exit() {
    this.userGuideCoreService.exit();
    if (this.modalRef) {
      this.modalRef.instance.close();
    }
  }

}
