export type DJustify = 'start' | 'end' | 'center' | 'around' | 'between';
export type DAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch';
export type DAlignSelf = 'start' | 'center' | 'end' | 'baseline' | 'stretch';
export type DBreakpoint = 'ss' | 'ms' | 'mm' | 'ml' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export const DBreakpoints: DBreakpoint[] = ['ss', 'ms', 'mm', 'ml', 'xs', 'sm', 'md', 'lg', 'xl'];
export const DBreakpointsMap = {
  ss: 0,
  ms: 360,
  mm: 768,
  ml: 1024,
  xs: 1280,
  sm: 1440,
  md: 1600,
  lg: 1760,
  xl: 1920,
};
export interface DMergedProperty {
  daSpan?: number;
  daOffset?: number;
  daAlign?: DAlign;
  daJustify?: DJustify;
  daAlignSelf?: DAlignSelf;
  daOrder?: number;
}

export type DResponseParameter<T> = T | {
  ss?: T;
  ms?: T;
  mm?: T;
  ml?: T;
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
};
