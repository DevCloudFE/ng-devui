import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { assign, isUndefined } from 'lodash-es';
import { OverlayContainerRef } from 'ng-devui/overlay-container';
import { DrawerComponent } from './drawer.component';
import { IDrawerOpenResult, IDrawerOptions } from './drawer.types';

@Injectable()
export class DrawerService {
  constructor(
    private overlayContainerRef: OverlayContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  open({
    drawerContentComponent,
    injector,
    componentFactoryResolver,
    width,
    fullScreen,
    data,
    isCover,
    clickDoms,
    onClose,
    backdropCloseable,
    escKeyCloseable,
    beforeHidden,
    destroyOnHide = true
  }: IDrawerOptions): IDrawerOpenResult {
    const componentFactoryResolver_ = componentFactoryResolver || this.componentFactoryResolver;
    const drawerRef = this.overlayContainerRef.createComponent(
      componentFactoryResolver_.resolveComponentFactory(DrawerComponent),
      injector
    );
    assign(drawerRef.instance, {
      width,
      isCover,
      clickDoms,
      fullScreen,
      beforeHidden,
      escKeyCloseable,
      backdropCloseable: isUndefined(backdropCloseable) ? true : backdropCloseable
    });

    const drawerContentRef = drawerRef.instance.drawerContentHost.viewContainerRef.createComponent(
      componentFactoryResolver_.resolveComponentFactory(drawerContentComponent),
      0,
      injector
    );
    assign(drawerContentRef.instance, data);

    drawerRef.instance.onHidden = () => {
      if (onClose) {
        onClose();
      }
      if (destroyOnHide) {
        drawerRef.hostView.destroy();
      }
    };

    drawerRef.instance.destroy = () => {
      if (!destroyOnHide && drawerRef.instance.animateState === 'void') {
        drawerRef.hostView.destroy();
      }
    };

    drawerRef.instance.show();
    return {
      drawerInstance: drawerRef.instance,
      drawerContentInstance: drawerContentRef.instance
    };
  }
}
