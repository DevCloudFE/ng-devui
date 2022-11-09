import { TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

export type GuidePositionType =  'left' | 'right' | 'top' | 'bottom' | 'bottom-left'| 'bottom-right'| 'top-left'| 'top-right'|
'left-top'| 'left-bottom'| 'right-top'| 'right-bottom';

export interface IStepElement {
  element?: string;
  title: string;
  content?: string | TemplateRef<any>;
  position?: GuidePositionType;
  type?: 'normal' | 'interactable' | 'tip';
  eventType?: 'clickable' | 'inputable' | 'exit';
  highlightOffset?: Array<Number>;
  inputData?: string;
  waitingTime?: number;
  beforeChange?: Function;
  showPrevButton?: boolean;
}
export interface IStep {
  title: string;
  desc?: string;
  defaultStart?: boolean;
  showDots?: boolean;
  maxContentWidth?: number;
  onExit?: Function;
  detail: Array<IStepElement>;
}

export interface IStepElementDetail {
  element?: object;
  title: string;
  content?: string | TemplateRef<any>;
  position?: GuidePositionType;
  top: number;
  left: number;
  width: number;
  height: number;
  type: 'normal' | 'interactable' | 'tip';
  eventType?: 'clickable' | 'inputable' | 'exit';
  inputData?: string;
  waitingTime?: number;
  beforeChange?: Function | Promise<boolean> | Observable<boolean>;
}
