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
    id,
    width,
    fullScreen,
    data,
    isCover,
    clickDoms,
    onClose,
    afterOpened,
    backdropCloseable,
    escKeyCloseable,
    beforeHidden,
    destroyOnHide = true,
    position = 'right',
    bodyScrollable
  }: IDrawerOptions): IDrawerOpenResult {
    const componentFactoryResolver_ = componentFactoryResolver || this.componentFactoryResolver;
    const drawerRef = this.overlayContainerRef.createComponent(
      componentFactoryResolver_.resolveComponentFactory(DrawerComponent),
      injector
    );
    assign(drawerRef.instance, {
      id,
      width,
      isCover,
      clickDoms,
      fullScreen,
      beforeHidden,
      afterOpened,
      escKeyCloseable,
      position,
      backdropCloseable: isUndefined(backdropCloseable) ? true : backdropCloseable,
      bodyScrollable
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
        setTimeout(() => {
          drawerRef.hostView.destroy();
        });
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
