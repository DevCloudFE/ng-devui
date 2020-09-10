export type StepsGuidePositionType = 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right' | 'left' | 'right';

export interface StepItem {
  title: string; // 引导标题
  content: string; // 引导介绍内容
}

export interface GuideOptions {
  triggerElement: HTMLElement;
  pageName: string;
  title: string; // 引导标题
  content: string; // 引导介绍内容
  stepsCount: number; // 总步骤数
  stepIndex: number; // 当前步骤序号
  position: StepsGuidePositionType;
  leftFix: number;
  topFix: number;
  scrollElement?: Element;
  zIndex?: number;
}

export interface ExtraConfig {
  hidePreStep: boolean; // 隐藏上一步
  hideStepNav: boolean; // 隐藏步骤显示
}

export interface OperateResponse {
  currentIndex: number; // 当前索引
  clickType: 'prev' | 'next' | 'close';
}
