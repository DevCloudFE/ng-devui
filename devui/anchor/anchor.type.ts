export interface IAnchorBox {
  scrollTarget: Element | Window;
  defaultAnchor: string;
  forceActiveAnchor: Function;
  view: {
    top?: number,
    bottom?: number
  };
}
export type AnchorActiveChangeSource = 'anchor-link' | 'scroll' | 'click-inside' | 'initial';
