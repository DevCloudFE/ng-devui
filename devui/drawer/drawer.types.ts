import {
  ComponentFactoryResolver,
  Injector,
  TemplateRef,
  Type
} from '@angular/core';
import { Observable } from 'rxjs';
import { DrawerComponent } from './drawer.component';

export interface IDrawerOptions {
  drawerContentComponent?: Type<any>;
  componentFactoryResolver?: ComponentFactoryResolver;
  injector?: Injector;
  id?: string;
  width?: string;
  zIndex?: number;
  isCover?: boolean;
  clickDoms?: any;
  fullScreen?: boolean; // @deprecated
  data?: any;
  backdropCloseable?: boolean;
  escKeyCloseable?: boolean;
  onClose?: Function;
  afterOpened?: Function;
  destroyOnHide?: boolean;
  position?: string;
  beforeHidden?: () => boolean | Promise<boolean> | Observable<boolean>;
  bodyScrollable?: boolean;
  showAnimation?: boolean;
  contentTemplate?: TemplateRef<any>;
  resizable?: boolean;
}

export interface IDrawerOpenResult {
  drawerInstance: DrawerComponent;
  drawerContentInstance: any;
}
