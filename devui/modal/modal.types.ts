import { ComponentFactoryResolver, Injector, TemplateRef, Type } from '@angular/core';
import { Observable } from 'rxjs';

export interface IModalOptions {
  id?: string;
  zIndex?: number;
  backDropZIndex?: number;
  component?: Type<any>;
  width?: string;
  showAnimation?: boolean;
  showAnimate?: boolean;
  data?: any;
  handler?: Function;
  backdropCloseable?: boolean;
  componentFactoryResolver?: ComponentFactoryResolver;
  injector?: Injector;
  onClose?: Function;
  beforeHidden?: () => boolean | Promise<boolean> | Observable<boolean>;
  placement?: 'center' | 'top' | 'bottom' | 'unset';
  offsetX?: string;
  offsetY?: string;
  bodyScrollable?: boolean;
  contentTemplate?: TemplateRef<any>;
  escapable?: boolean;
  cssClass?: string;
}

export interface IDialogOptions {
  id?: string;
  title?: string;
  zIndex?: number;
  backDropZIndex?: number;
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
  showAnimation?: boolean;
  showAnimate?: boolean;
  data?: any;
  componentFactoryResolver?: ComponentFactoryResolver;
  injector?: Injector;
  onClose?: Function;
  onMaximize?: Function;
  beforeHidden?: () => boolean | Promise<boolean> | Observable<boolean>;
  dialogtype?: string;
  draggable?: boolean;
  showMaximizeBtn?: boolean;
  showCloseBtn?: boolean;
  placement?: 'center' | 'top' | 'bottom' | 'unset';
  offsetX?: string;
  offsetY?: string;
  bodyScrollable?: boolean;
  contentTemplate?: TemplateRef<any>;
  escapable?: boolean;
}
