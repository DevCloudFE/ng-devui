import { Injector, TemplateRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

export type LoadingType = Observable<any> | Promise<any> | Array<Promise<any>> | Array<Observable<any>> | Subscription;
export type LoadingStyle = 'default' | 'infinity';
export interface ILoadingViewPosition {
  top?: string;
  left?: string;
}
export interface ILoadingOptions {
  target?: Element;
  zIndex?: number;
  message?: string;
  backdrop?: boolean;
  loadingTemplateRef?: TemplateRef<any>;
  positionType?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  view?: {
    top?: string;
    left?: string;
  };
  injector?: Injector;
  loadingStyle?: LoadingStyle;
}
