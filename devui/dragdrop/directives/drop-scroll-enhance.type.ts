export type DropScrollEdgeDistancePercent = number; // 单位 px / px
export type DropScrollSpeed = number; // 单位 px/ s
export type DropScrollSpeedFunction = (x: DropScrollEdgeDistancePercent) => DropScrollSpeed;
export type DropScrollDirection = 'h' | 'v'; // 'both' 暂不支持双向滚动
export enum DropScrollOrientation {
  forward = 0, // 进， 右/下
  backward = 1, // 退， 左/上
}
export interface DropScrollAreaOffset {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  widthOffset?: number;
  heightOffset?: number;
}

export type DropScrollTriggerEdge = 'left' | 'right' | 'top' | 'bottom';

export const DropScrollEnhanceTimingFunctionGroup = {
  default: (x: number) => Math.ceil((1 - x) * 18) * 100,
};
