
export type SpriteMode = 'default' | 'sprite';

export interface SpriteOption {
  top: string;
  left: string;
  zIndex: number;
}
export interface NavMenu {
  originEle: HTMLElement;
  label: string;
  level: string;
  scrollPosition: {
    top: number;
    startLine: number
  };
}
