export interface Mention {
  startPos: number;
  endPos: number;
  mention: string;
}

export interface MentionOnSearchTypes {
  value: string;
  trigger: string;
}

export interface MentionPositions {
  x?: number;
  y?: number;
}

export type Mode = 'default' | 'extend';

export type PostionType = 'top' | 'bottom';
