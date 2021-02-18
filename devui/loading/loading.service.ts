import { ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { OverlayContainerRef } from 'ng-devui/overlay-container';
import { LoadingBackdropComponent } from './loading-backdrop.component';
import { LoadingComponent } from './loading.component';
import { ILoadingOptions } from './loading.types';
@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private renderer: Renderer2;
  constructor(
    private overlayContainerRef: OverlayContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }
  // loading 服务内的函数，外部就可以传入ILoadingOptions类型的参数调用它
  open({
    target = document.body,
    backdrop = true,
    message,
    loadingTemplateRef,
    positionType = 'relative',
    view,
    injector,
    zIndex,
  }: ILoadingOptions = {}) {
    const finalComponentFactoryResolver = this.componentFactoryResolver;

    let positionTypeOld = '';
    positionTypeOld = '' || target['style']['position'];
    let backdropRef: ComponentRef<LoadingBackdropComponent>;
    if (backdrop) {
      backdropRef = this.overlayContainerRef.createComponent(
        finalComponentFactoryResolver.resolveComponentFactory(LoadingBackdropComponent),
        injector
      );
      Object.assign(backdropRef.instance, {
        backdrop: backdrop,
        zIndex: zIndex,
        target: target ? target : document.body,
      });
      const viewRef = backdropRef.hostView;
      (viewRef as EmbeddedViewRef<any>).rootNodes.forEach((node) => target.appendChild(node));
    }

    const loadingRef = this.overlayContainerRef.createComponent(
      finalComponentFactoryResolver.resolveComponentFactory(LoadingComponent),
      injector
    );

    Object.assign(loadingRef.instance, {
      message: message,
      zIndex: zIndex,
      loadingTemplateRef: loadingTemplateRef,
      top: view ? view.top : '50%',
      left: view ? view.left : '50%',
      isCustomPosition: !!view,
      target: target ? target : document.body,
    });

    this.renderer.setStyle(target, 'position', positionType);

    const viewRef1 = loadingRef.hostView;
    (viewRef1 as EmbeddedViewRef<any>).rootNodes.forEach((node) => target.appendChild(node));

    loadingRef.instance.close = () => {
      if (loadingRef) {
        loadingRef.destroy();
      }
      if (backdropRef) {
        backdropRef.destroy();
        backdropRef = null;
      }
      this.renderer.setStyle(target, 'position', positionTypeOld);
    };

    //  返回一个对象内含2个实例loadingInstance和backdropInstance
    return {
      loadingInstance: loadingRef.instance,
      backdropInstance: backdropRef ? backdropRef.instance : null,
    };
  }
}
