export interface IProgressItem {
  color: string;
  content?: string;
  percentage: number;
  percentageText?: string;
  strokePath?: { [key: string]: string };
  [key: string]: any;
}

export interface IGradientColor {
  color: string;
  percentage: string;
}

export interface ShowContentConfig {
  showInnerContent?: boolean;
  showOuterContent?: boolean;
  showCenterContent?: boolean;
}
