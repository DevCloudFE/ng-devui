import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, fromEvent, fromEventPattern, Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { PanelPostion } from './utils/calculate-panel-position';
import { disableClick, documentRealHeight } from './utils/help-functions';

@Injectable()
export class UserGuideCoreService implements OnDestroy {
  private steps = []; // 用户输入的指引步骤
  private stepsDetails = []; // 经过处理加入细节的指引步骤
  private currentStep;
  private prevStep;
  private nextStep;
  private isStart = false;
  private _destory = new Subject<void>();
  private onExit;
  private interactableEvent = {
    eventType: null,
    element: null,
    eventFunction: null,
  };

  private _showOverlayState = {
    showMaskLayer: false,
    showNormalOverlay: false,
    showTopOverlay: false,
    showBottomOverlay: false,
    showLeftOverlay: false,
    showRightOverlay: false,
    showBorder: false,
  };

  private currentType; // 当前指引步骤的展现形式
  private currentDirection;

  public onResize: Observable<Event>;
  public onScroll;

  curContent = new BehaviorSubject('start');
  curSubContent = new BehaviorSubject('');
  curStep = new BehaviorSubject(-1);
  canNext = new BehaviorSubject(true);
  canPrev = new BehaviorSubject(true);
  canFinish = new BehaviorSubject(false);
  isFinished = new BehaviorSubject(false);
  showButtons = new BehaviorSubject(true);
  showOverlayState = new BehaviorSubject(this._showOverlayState);
  showOperateZone = new BehaviorSubject(false);
  showPrevButton = new BehaviorSubject(true);
  curStepType = new BehaviorSubject('normal');
  document: Document;
  panelPostion;

  constructor(private rendererFactory2: RendererFactory2, @Inject(DOCUMENT) private doc: any) {
    const renderer = this.rendererFactory2.createRenderer(null, null);
    this.document = this.doc;
    this.panelPostion = new PanelPostion(this.document);

    this.createOnResizeObservable(renderer);
    this.onScroll = fromEvent(window, 'scroll')
      .pipe(takeUntil(this._destory), debounceTime(100))
      .subscribe(() => {
        if (this.isStart && this.stepsDetails[this.currentStep].type !== 'display') {
          this.updateCurrentStepElement();
          this.setStepShow(this.currentType, this.currentStep);
        }
      });

    this.onResize.subscribe((e: Event) => {
      if (this.isStart && this.stepsDetails[this.currentStep].type !== 'display') {
        this.updateCurrentStepElement();
        this.setStepShow(this.currentType, this.currentStep);
      }
    });

    this.curStep.subscribe((index) => {
      if (index !== -1) {
        this.canChange(index).then((canChange) => {
          if (canChange) {
            this.changeStep();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this._destory.next();
    this._destory.complete();

    if (this.curContent) {
      this.curContent.unsubscribe();
    }
    if (this.curSubContent) {
      this.curSubContent.unsubscribe();
    }
    if (this.curStep) {
      this.curStep.unsubscribe();
    }
    if (this.canNext) {
      this.canNext.unsubscribe();
    }
    if (this.canPrev) {
      this.canPrev.unsubscribe();
    }
    if (this.canFinish) {
      this.canFinish.unsubscribe();
    }
    if (this.isFinished) {
      this.isFinished.unsubscribe();
    }
    if (this.showButtons) {
      this.showButtons.unsubscribe();
    }
    if (this.showOverlayState) {
      this.showOverlayState.unsubscribe();
    }
    if (this.showOperateZone) {
      this.showOperateZone.unsubscribe();
    }
    if (this.curStepType) {
      this.curStepType.unsubscribe();
    }

    if (this.showPrevButton) {
      this.showPrevButton.unsubscribe();
    }
  }

  start() {
    if (this.steps.length === 0) {
      return;
    }

    this.generateStepsDetails();
    this.setInitialState();
  }

  private generateStepsDetails() {
    this.steps.forEach((item) => {
      if (item.element === undefined) {
        this.stepsDetails.push({
          title: item.title,
          content: item.content,
          type: 'display',
          beforeChange: item?.beforeChange,
          showPrevButton: item?.showPrevButton === undefined ? true : item.showPrevButton,
        });
      } else {
        const rect = (this.document.getElementById(item.element) || this.document.querySelector(item.element))?.getBoundingClientRect();
        this.stepsDetails.push({
          element: this.document.getElementById(item.element) || this.document.querySelector(item.element),
          title: item.title,
          content: item.content,
          position: item.position,
          highlightOffset: item?.highlightOffset,
          top: rect?.top,
          left: rect?.left,
          width: rect?.width,
          height: rect?.height,
          type: item.type === undefined ? 'normal' : item.type,
          eventType: item?.eventType,
          inputData: item?.inputData,
          waitingTime: item?.waitingTime,
          beforeChange: item?.beforeChange,
          showPrevButton: item?.showPrevButton === undefined ? true : item.showPrevButton,
        });
      }
    });
  }

  private setInitialState() {
    this.isStart = true;

    // 初始状态,令currentStep为-1
    this.currentStep = -1;
    this.prevStep = -2;
    this.nextStep = 0;
  }

  setSteps(steps) {
    this.steps = steps;
  }

  setExitFunction(exit) {
    this.onExit = exit;
  }

  updateNextStepElement() {
    for (let i = this.nextStep; i < this.steps.length; i++) {
      if (this.stepsDetails[i].type !== 'display') {
        this.stepsDetails[i].element =
          this.document.getElementById(this.steps[i].element) || this.document.querySelector(this.steps[i].element);

        const rect = this.stepsDetails[i]?.element?.getBoundingClientRect();
        this.stepsDetails[i].top = rect?.top;
        this.stepsDetails[i].left = rect?.left;
        this.stepsDetails[i].width = rect?.width;
        this.stepsDetails[i].height = rect?.height;
      }
    }
  }

  updateCurrentStepElement() {
    const cur = this.currentStep;
    this.stepsDetails[cur].element =
      this.document.getElementById(this.steps[cur].element) || this.document.querySelector(this.steps[cur].element);
    if (this.stepsDetails[cur].element) {
      const rect = this.stepsDetails[cur].element.getBoundingClientRect();
      const hasHighlightOffset = this.stepsDetails[cur].highlightOffset;
      const scrollTop = this.document.documentElement.scrollTop;
      this.stepsDetails[cur].top = rect?.top - (hasHighlightOffset ? this.stepsDetails[cur].highlightOffset[0] : 0) + scrollTop;
      this.stepsDetails[cur].left = rect?.left - (hasHighlightOffset ? this.stepsDetails[cur].highlightOffset[3] : 0);
      this.stepsDetails[cur].width =
        rect?.width + (hasHighlightOffset ? this.stepsDetails[cur].highlightOffset[3] + this.stepsDetails[cur].highlightOffset[1] : 0);
      this.stepsDetails[cur].height =
        rect?.height + (hasHighlightOffset ? this.stepsDetails[cur].highlightOffset[0] + this.stepsDetails[cur].highlightOffset[2] : 0);
    }
  }

  private canChange(index: number) {
    let changeResult = Promise.resolve(true);
    if (this.stepsDetails[index]?.beforeChange !== undefined) {
      const result: any = this.stepsDetails[index].beforeChange();
      if (typeof result !== 'undefined') {
        if (result.then) {
          changeResult = result;
        } else if (result.subscribe) {
          changeResult = (result as Observable<boolean>).toPromise();
        } else {
          changeResult = Promise.resolve(result);
        }
      }
    }
    return changeResult;
  }

  next() {
    this.changeStepState('forward');
  }

  prev() {
    this.changeStepState('backward');
  }

  exit() {
    if (this.currentStep === this.steps.length - 1) {
      this.isFinished.next(true);
      this.canFinish.next(false);
    }


    try {
      localStorage.setItem('devui-user-guide-last-step', this.currentStep);
    } catch (error) {
      console.error(error);
    }


    if (this.interactableEvent.eventType !== null) {
      this.interactableEvent.element.forEach((item, index) => {
        item.removeEventListener(this.interactableEvent.eventType[index], this.interactableEvent.eventFunction[index]);
      });
    }

    this.clearInteractableEvent();
    if (this.onExit) {
      this.onExit();
    }

    this.currentType = undefined;
    this.steps = [];
    this.stepsDetails = [];
    this.isStart = false;
    this.onExit = undefined;
  }

  goStep(index: number) {
    if (index > this.currentStep) {
      this.changeStepState('forward', Math.abs(this.currentStep - index));
    } else if (index < this.currentStep) {
      this.changeStepState('backward', Math.abs(this.currentStep - index));
    }
  }

  onBeforeChange(index: number) {
    this.clearInteractableEvent();

    this.registerInteractableEvent(index);
  }

  getCurrentStep() {
    return this.currentStep;
  }

  getCurrentDirection() {
    return this.currentDirection;
  }

  getStepLength() {
    return this.steps.length;
  }

  private registerInteractableEvent(index: number) {
    if (this.stepsDetails[index].eventType === 'clickable') {
      this.registerClickEvent(index);
    } else if (this.stepsDetails[index].eventType === 'inputable') {
      this.registerInputEvent(index);
    } else if (this.stepsDetails[index].eventType === 'exit') {
      this.registerExitEvent(index);
    }
  }

  private clearInteractableEvent() {
    if (this.interactableEvent.eventType !== null) {
      this.interactableEvent.eventType = null;
      this.interactableEvent.element = null;
      this.interactableEvent.eventFunction = null;

      this.showButtons.next(true);
      this.showOperateZone.next(false);
      this.canPrev.next(false);
    }
  }

  private registerClickEvent(index: number) {
    const clickElement = this.stepsDetails[index].element;

    this.interactableEvent.eventType = ['click'];
    this.interactableEvent.element = [clickElement];
    this.interactableEvent.eventFunction = [this.clickEventHandle.bind(this)];

    this.showButtons.next(false);

    clickElement.addEventListener('click', this.interactableEvent.eventFunction[0], { once: true });
  }

  private clickEventHandle() {
    const waitingTime = this.stepsDetails[this.currentStep].waitingTime || 300;
    this.document.body.addEventListener('click', disableClick, true);
    setTimeout(() => {
      this.updateNextStepElement();
      this.next();
    }, waitingTime);
    setTimeout(() => {
      this.document.body.removeEventListener('click', disableClick, true);
    }, 1000);
  }

  private registerInputEvent(index: number) {
    this.showOperateZone.next(true);

    setTimeout(() => {
      const inputElement = this.document.querySelector('.operate-zone') as HTMLElement;

      this.interactableEvent.eventType = ['input', 'click'];
      this.interactableEvent.element = [this.stepsDetails[this.currentStep].element, inputElement];
      this.interactableEvent.eventFunction = [this.inputEventHandle.bind(this), this.inputOperateZoneHandle.bind(this)];

      this.showButtons.next(false);

      this.stepsDetails[this.currentStep].element.addEventListener('input', this.interactableEvent.eventFunction[0], { once: true });
      inputElement.addEventListener('click', this.interactableEvent.eventFunction[1], { once: true });
    });
  }

  private inputEventHandle() {
    const operateZone = this.document.querySelector('.operate-zone') as HTMLElement;
    operateZone.innerHTML = '<p><i class="icon icon-right-o" style="color: rgb(61, 204, 166); padding-right: 4px;"></i>Good！</p>';
    this.showButtons.next(true);
  }

  private inputOperateZoneHandle() {
    this.stepsDetails[this.currentStep].element.value = this.stepsDetails[this.currentStep].inputData;
    const operateZone = this.document.querySelector('.operate-zone') as HTMLElement;
    operateZone.innerHTML = '<p><i class="icon icon-right-o" style="color: rgb(61, 204, 166); padding-right: 4px;"></i>Good！</p>';
    this.showButtons.next(true);
  }

  private registerExitEvent(index: number) {
    const clickElement = this.stepsDetails[index].element;

    this.interactableEvent.eventType = ['click'];
    this.interactableEvent.element = [clickElement];
    this.interactableEvent.eventFunction = [this.ExitEventHandle.bind(this)];

    this.showButtons.next(false);

    clickElement.addEventListener('click', this.interactableEvent.eventFunction[0], { once: true });
  }

  private ExitEventHandle() {
    this.generateOverlay('display');
    this.currentType = 'display';
    const panel = this.document.querySelector('.user-guide-panel') as HTMLElement;
    panel.style.cssText = `
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);
    `;

    const closeButton = this.document.querySelector('.user-guide-panel-close') as HTMLElement;
    closeButton.style.display = 'none';

    const carouselDots = this.document.querySelector('.devui-carousel-dots') as HTMLElement;
    if (carouselDots) {
      carouselDots.style.display = 'none';
    }

    const operateZone = this.document.querySelector('.user-guide-panel-multiple-body') as HTMLElement;
    operateZone.style.maxWidth = 'unset';
    operateZone.innerHTML = `<div style="text-align: center;">
      <i class="icon icon-right-o" style="color: rgb(61, 204, 166); font-size: 36px;"></i>
      <p style="margin-top: 4px; font-size: 16px;">Congratulations！</p></div>`;
    setTimeout(() => {
      this.exit();
    }, 2000);
  }

  private ChooseProperOverlay() {
    if (this.stepsDetails[this.currentStep].type !== this.currentType) {
      this.generateOverlay(this.stepsDetails[this.currentStep].type);
      this.currentType = this.stepsDetails[this.currentStep].type;
    }
  }

  private generateOverlay(type: string) {
    switch (type) {
    case 'normal':
      this.generateNormalOverlay();
      break;

    case 'interactable':
      this.generateInteractableOverlay();
      break;

    case 'display':
      this.generateDisplayOverlay();
      break;

    case 'tip':
      this.generateTipOverlay();
      break;

    default:
      break;
    }
  }

  private setStepShow(type: string, index: number) {
    this.curStepType.next(type);
    switch (type) {
    case 'normal':
      this.setNormalStepShow(index);
      break;

    case 'interactable':
      this.setInteractableStepShow(index);
      break;

    case 'display':
      this.setDisplayStepShow(index);
      break;

    case 'tip':
      this.setTipStepShow(index);
      break;

    default:
      break;
    }
  }

  private changeStepState(direction: string, times = 1) {
    this.currentDirection = direction;
    for (let i = 0; i < times; i++) {
      if (direction === 'forward' && this.nextStep < this.steps.length) {
        this.prevStep = this.currentStep;
        this.currentStep++;
        this.nextStep = this.currentStep + 1;
      } else if (direction === 'backward' && this.prevStep >= 0) {
        this.nextStep = this.currentStep;
        this.currentStep--;
        this.prevStep = this.currentStep - 1;
      }
    }

    this.curStep.next(this.currentStep);

    this.canNext.next(false);
    this.canPrev.next(false);
  }

  private changeStep() {
    if (this.currentStep >= 0 && this.currentStep < this.steps.length) {
      this.onBeforeChange(this.currentStep);
      this.ChooseProperOverlay();
      this.updateCurrentStepElement();
      this.setStepShow(this.currentType, this.currentStep);
    }

    if (this.nextStep === this.steps.length) {
      this.canNext.next(false);
      this.canFinish.next(true);
    } else {
      this.canNext.next(true);
      this.canFinish.next(false);
    }

    if (this.prevStep === -1) {
      this.canPrev.next(false);
    } else {
      this.canPrev.next(true);
    }
  }

  private generateNormalOverlay() {
    this._showOverlayState = {
      showMaskLayer: false,
      showNormalOverlay: true,
      showTopOverlay: true,
      showBottomOverlay: true,
      showLeftOverlay: true,
      showRightOverlay: true,
      showBorder: false,
    };

    this.showOverlayState.next(this._showOverlayState);
  }

  private setNormalStepShow(index: number) {
    this.setInteractableStepShow(index);
  }

  private generateInteractableOverlay() {
    this._showOverlayState = {
      showMaskLayer: false,
      showNormalOverlay: false,
      showTopOverlay: true,
      showBottomOverlay: true,
      showLeftOverlay: true,
      showRightOverlay: true,
      showBorder: true,
    };

    this.showOverlayState.next(this._showOverlayState);
  }

  private setInteractableStepShow(index: number) {
    const topOverlay = this.document.querySelector('.user-guide-top-overlay') as HTMLElement;
    topOverlay.style.cssText = `
      height: ${this.stepsDetails[index].top}px;
      `;

    const bottomOverlay = this.document.querySelector('.user-guide-bottom-overlay') as HTMLElement;
    bottomOverlay.style.cssText = `
      top: ${this.stepsDetails[index].top + this.stepsDetails[index].height}px;
      height: ${documentRealHeight(this.document) - (this.stepsDetails[index].top + this.stepsDetails[index].height)}px;
      `;

    const leftOverlay = this.document.querySelector('.user-guide-left-overlay') as HTMLElement;
    leftOverlay.style.cssText = `
      top: ${this.stepsDetails[index].top}px;
      width: ${this.stepsDetails[index].left}px;
      height: ${this.stepsDetails[index].height}px;
      `;

    const rightOverlay = this.document.querySelector('.user-guide-right-overlay') as HTMLElement;
    rightOverlay.style.cssText = `
      top: ${this.stepsDetails[index].top}px;
      left: ${this.stepsDetails[index].left + this.stepsDetails[index].width}px;
      width: ${this.document.documentElement.clientWidth - (this.stepsDetails[index].left + this.stepsDetails[index].width)}px;
      height: ${this.stepsDetails[index].height}px;
      `;

    const activeShadow = this.document.querySelector('.user-guide-active-shadow') as HTMLElement;
    activeShadow.style.cssText = `
      top: ${this.stepsDetails[index].top}px;
      left: ${this.stepsDetails[index].left}px;
      width: ${this.stepsDetails[index].width}px;
      height: ${this.stepsDetails[index].height}px;
      `;
    setTimeout(() => {
      this.panelPostion.calculatePosition(this.stepsDetails[this.currentStep]);
    }, 0);

    this.curContent.next(this.stepsDetails[index].title);
    this.curSubContent.next(this.stepsDetails[index].content);
    this.showPrevButton.next(this.stepsDetails[index].showPrevButton);
  }

  private generateDisplayOverlay() {
    this._showOverlayState = {
      showMaskLayer: true,
      showNormalOverlay: false,
      showTopOverlay: false,
      showBottomOverlay: false,
      showLeftOverlay: false,
      showRightOverlay: false,
      showBorder: false,
    };

    this.showOverlayState.next(this._showOverlayState);
  }

  private setDisplayStepShow(index: number) {
    const panel = this.document.querySelector('.user-guide-panel') as HTMLElement;
    panel.style.cssText = `
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);
    `;
    this.curContent.next(this.stepsDetails[index].title);
    this.curSubContent.next(this.stepsDetails[index].content);
    this.showPrevButton.next(this.stepsDetails[index].showPrevButton);
  }

  private generateTipOverlay() {
    this._showOverlayState = {
      showMaskLayer: false,
      showNormalOverlay: false,
      showTopOverlay: false,
      showBottomOverlay: false,
      showLeftOverlay: false,
      showRightOverlay: false,
      showBorder: false,
    };

    this.showOverlayState.next(this._showOverlayState);
  }

  private setTipStepShow(index: number) {
    this.setInteractableStepShow(index);
  }

  private createOnResizeObservable(renderer: Renderer2) {
    let removeResizeEventListener: () => void;
    const createResizeEventListener = (handler: (e: Event) => boolean | void) => {
      removeResizeEventListener = renderer.listen('window', 'resize', handler);
    };

    this.onResize = fromEventPattern<Event>(createResizeEventListener, () => removeResizeEventListener()).pipe(takeUntil(this._destory));
  }
}
