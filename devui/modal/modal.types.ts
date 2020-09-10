import { Observable } from 'rxjs';
import { Type, ComponentFactoryResolver, Injector, TemplateRef } from '@angular/core';

export interface IModalOptions {
  id?: string;
  zIndex?: number;
  component?: Type<any>;
  width?: string;
  showAnimate?: boolean;
  data?: any;
  handler?: Function;
  backdropCloseable?: boolean;
  componentFactoryResolver?: ComponentFactoryResolver;
  injector?: Injector;
  onClose?: Function;
  beforeHidden?: () => boolean | Promise<boolean> | Observable<boolean>;
  placement?: 'center' | 'top' | 'bottom';
  offsetX?: string;
  offsetY?: string;
  bodyScrollable?: boolean;
  contentTemplate?: TemplateRef<any>;
  escapable?: boolean;
}

export interface IDialogOptions {
  id?: string;
  title: string;
  zIndex?: number;
  content?: string | Type<any>;
  html?: boolean;
  buttons: Array<{
    id?: string;
    cssClass?: string;
    text: string;
    handler: ($event: Event) => void;
    btnwidth?: string;
    autofocus?: boolean;
    disabled?: boolean;
  }>;
  width?: string;
  backdropCloseable?: boolean;
  maxHeight?: string;
  showAnimate?: boolean;
  data?: any;
  componentFactoryResolver?: ComponentFactoryResolver;
  injector?: Injector;
  onClose?: Function;
  beforeHidden?: () => boolean | Promise<boolean> | Observable<boolean>;
  dialogtype?: string;
  draggable?: boolean;
  showCloseBtn?: boolean;
  placement?: 'center' | 'top' | 'bottom';
  offsetX?: string;
  offsetY?: string;
  bodyScrollable?: boolean;
  contentTemplate?: TemplateRef<any>;
  escapable?: boolean;
}
