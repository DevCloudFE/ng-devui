import { TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

export type PositionType =
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-left'
  | 'top-right'
  | 'left-top'
  | 'left-bottom'
  | 'right-top'
  | 'right-bottom';

export interface ReadTipOptions {
  trigger?: 'hover' | 'click'; // default is hover
  showAnimate?: boolean; // default is false
  mouseenterTime?: number;
  mouseleaveTime?: number;
  position?: PositionType | PositionType[];
  overlayClassName?: string;
  appendToBody?: boolean;
  rules: ReadTipRules;
}

export type ReadTipRules = ReadTipRule | ReadTipRule[];

export interface ReadTipRule {
  key?: string;
  selector: string;
  trigger?: 'hover' | 'click'; // default is hover
  title?: string;
  content?: string;
  showAnimate?: boolean; // default is false
  mouseenterTime?: number;
  mouseleaveTime?: number;
  position?: PositionType | PositionType[];
  overlayClassName?: string;
  appendToBody?: boolean;
  dataFn?: ({
    element,
    rule: ReadTipRule,
  }) => Observable<{ title?: string; content?: string; template?: TemplateRef<any>; customData?: any }>;
}
