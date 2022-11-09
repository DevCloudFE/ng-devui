import { IStepElementDetail } from '../user-guide.types';

export class PanelPostion {
  top: number;
  left: number;
  arrowTopBias: number;
  arrowLeftBias: number;

  availablePosition: string;
  alignDirection: string;
  step: IStepElementDetail;
  document: Document;

  constructor(document) {
    this.document = document;
  }

  calculateAvailablePosition(curStepRect, panelRect) {
    if (this.step.position !== undefined) {
      this.availablePosition = this.step.position.split('-')[0];
    } else {
      if (curStepRect.bottom + panelRect.height + 10 <= this.document.documentElement.clientHeight) {
        this.availablePosition = 'bottom';
      } else if (curStepRect.top - panelRect.height - 10 > 0) {
        this.availablePosition = 'top';
      } else if (curStepRect.right + panelRect.width + 10 <= this.document.documentElement.clientWidth) {
        this.availablePosition = 'right';
      } else if (curStepRect.left - panelRect.width - 10 > 0) {
        this.availablePosition = 'left';
      }
    }
  }

  calculateTopAndLeft(curStepRect, panelRect) {
    if (this.availablePosition === 'bottom') {
      this.top = curStepRect.bottom + 10;
      this.arrowTopBias = 3;
    } else if (this.availablePosition === 'top') {
      this.arrowTopBias = panelRect.height - 3;
      this.top = curStepRect.top - panelRect.height - 10;
    } else if (this.availablePosition === 'right') {
      this.left = curStepRect.right + 10;
      this.arrowLeftBias = -3;
    } else if (curStepRect.left - panelRect.width - 10 > 0) {
      this.left = curStepRect.left - panelRect.width - 10;
      this.arrowLeftBias = panelRect.width - 3;
    }
  }

  calculateAlignDirection(curStepRect, panelRect) {
    if (this.step.position !== undefined) {
      this.alignDirection = this.step.position.split('-')[1] || 'middle';
    } else {
      if (this.availablePosition === 'bottom' || this.availablePosition === 'top') {
        this.calculateTopBottomAlign(curStepRect, panelRect);
      } else if (this.availablePosition === 'left' || this.availablePosition === 'right') {
        this.calculateLeftRightAlign(curStepRect, panelRect);
      }
    }
  }

  calculateTopBottomAlign(curStepRect, panelRect) {
    if (
      panelRect.width < curStepRect.width ||
        (curStepRect.left + curStepRect.width / 2 - panelRect.width / 2 > 0 &&
          curStepRect.left + curStepRect.width / 2 + panelRect.width / 2 < this.document.documentElement.clientWidth)
    ) {
      this.alignDirection = 'middle';
    } else if (curStepRect.left + panelRect.width < this.document.documentElement.clientWidth) {
      this.alignDirection = 'left';
    } else if (curStepRect.right - panelRect.width > 0) {
      this.alignDirection = 'right';
    }
  }

  calculateLeftRightAlign(curStepRect, panelRect) {
    if (
      panelRect.height < curStepRect.height ||
        (curStepRect.top + curStepRect.height / 2 - panelRect.height / 2 > 0 &&
          curStepRect.top + curStepRect.height / 2 + panelRect.height / 2 < this.document.documentElement.clientHeight)
    ) {
      this.alignDirection = 'middle';
    } else if (curStepRect.top + panelRect.height < this.document.documentElement.clientWidth) {
      this.alignDirection = 'top';
    } else if (curStepRect.bottom - panelRect.height > 0) {
      this.alignDirection = 'bottom';
    }
  }

  calculateBias(curStepRect, panelRect) {
    if (this.availablePosition === 'bottom' || this.availablePosition === 'top') {
      this.calculateTopBottomBias(curStepRect, panelRect);
    } else if (this.availablePosition === 'left' || this.availablePosition === 'right') {
      this.calculateLeftRightBias(curStepRect, panelRect);
    }
  }

  calculateTopBottomBias(curStepRect, panelRect) {
    if (this.alignDirection === 'middle') {
      this.left = curStepRect.left + curStepRect.width / 2 - panelRect.width / 2;
      this.arrowLeftBias = panelRect.width / 2 - 3;
    } else if (this.alignDirection === 'left') {
      this.left = curStepRect.left;
      this.arrowLeftBias = 6;
    } else if (this.alignDirection === 'right') {
      this.left = curStepRect.right - panelRect.width;
      this.arrowLeftBias = panelRect.width - 12;
    }
  }

  calculateLeftRightBias(curStepRect, panelRect) {
    if (this.alignDirection === 'middle') {
      this.top = curStepRect.top + curStepRect.height / 2 - panelRect.height / 2;
      this.arrowTopBias = panelRect.height / 2;
    } else if (this.alignDirection === 'top') {
      this.top = curStepRect.top;
      this.arrowTopBias = 12;
    } else if (this.alignDirection === 'bottom') {
      this.top = curStepRect.bottom - panelRect.height;
      this.arrowTopBias = panelRect.height - 12;
    }
  }

  getRealClientRect(step) {
    const stepRect = step.element?.getBoundingClientRect();
    const realRect = {
      top: stepRect?.top - (step?.highlightOffset ? step.highlightOffset[0] : 0),
      right: stepRect?.right + (step?.highlightOffset ? step.highlightOffset[1] : 0),
      left: stepRect?.left - (step?.highlightOffset ? step.highlightOffset[3] : 0),
      bottom: stepRect?.bottom + (step?.highlightOffset ? step.highlightOffset[2] : 0),
      width: stepRect?.width + (step?.highlightOffset ? step.highlightOffset[3] + step.highlightOffset[1] : 0),
      height: stepRect?.height + (step?.highlightOffset ? step.highlightOffset[0] + step.highlightOffset[2] : 0),
    };
    return realRect;
  }

  calculatePosition(step) {
    const panel = this.document.querySelector('.user-guide-panel') as HTMLElement;
    const panelRect = panel.getBoundingClientRect();
    this.step = step;

    const curStepRect = this.getRealClientRect(step);

    this.calculateAvailablePosition(curStepRect, panelRect);
    this.calculateTopAndLeft(curStepRect, panelRect);
    this.calculateAlignDirection(curStepRect, panelRect);
    this.calculateBias(curStepRect, panelRect);

    if (this.step.type === 'tip') {
      const panelArrow = this.document.querySelector('.user-guide-panel-arrow') as HTMLElement;
      panelArrow.style.cssText = `
          top: ${this.arrowTopBias}px;
          left: ${this.arrowLeftBias}px;
        `;
    }

    panel.style.cssText = `
          top: ${this.top}px;
          left: ${this.left}px;
        `;
  }
}
