
export type Mode = 'default' | 'sprite';

export interface SpriteOption {
  top: string;
  left: string;
  zIndex: number;
}
export interface NavMenu {
  originEle: HTMLElement;
  label: string;
  level: string;
  scrollPosition: [number, number];
}
