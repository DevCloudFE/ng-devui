
export type SpriteMode = 'default' | 'sprite';

export interface SpriteOption {
  top: string;
  left: string;
  zIndex: number;
}
export interface NavMenu {
  originEle: HTMLElement;
  label: string;
  level: number;
  element: HTMLElement;
  scrollPosition: {
    top: number;
    startLine: number;
  };
}
