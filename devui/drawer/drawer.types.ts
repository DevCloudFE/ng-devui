import { Observable } from 'rxjs';
import {
  Type,
  ComponentFactoryResolver,
  Injector
} from '@angular/core';
import { DrawerComponent } from './drawer.component';

export interface IDrawerOptions {
  drawerContentComponent: Type<any>;
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
}

export interface IDrawerOpenResult {
  drawerInstance: DrawerComponent;
  drawerContentInstance: any;
}
