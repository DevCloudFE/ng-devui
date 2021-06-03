import { ComponentFactoryResolver, Injectable, Injector, Renderer2, RendererFactory2, Type } from '@angular/core';
import { OverlayContainerRef } from 'ng-devui/overlay-container';
import { assign } from 'lodash-es';
import { Message, ToastComponent } from './toast.component';
export interface IToastOptions {
  value?: Array<Message>;
  life?: number;
  lifeMode?: string;
  style?: object;
  styleClass?: string;
  sticky?: boolean;
  injector?: Injector;
  component?: Type<any>;
  componentFactoryResolver?: ComponentFactoryResolver;
}
@Injectable({
  providedIn: 'root',
})
export class ToastService {
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
    value,
    life = 5000,
    lifeMode = 'global',
    sticky = false,
    style,
    styleClass,
    injector,
    component,
    componentFactoryResolver,
  }: IToastOptions = {}) {
    const finalComponentFactoryResolver = componentFactoryResolver || this.componentFactoryResolver;
    const toastRef = this.overlayContainerRef.createComponent(
      finalComponentFactoryResolver.resolveComponentFactory(ToastComponent),
      injector
    );
    assign(toastRef.instance, {
      lifeMode: lifeMode,
      sticky: sticky,
      style: style,
      styleClass: styleClass,
      value: value,
      life: life,
    });

    toastRef.instance.close = (index?: number | Message) => {
      if (index !== undefined && index > -1) {
        toastRef.instance.removeIndexThrottle(index as number);
      } else if (index !== undefined) {
        toastRef.instance.removeMsgThrottle(index);
      } else {
        setTimeout(() => {
          toastRef.instance.removeAll();
          setTimeout(() => {
            if (toastRef) {
              toastRef.destroy();
            }
          }, 300);
        });
      }
    };
    toastRef.instance.onHidden = () => {
      if (toastRef?.hostView) {
        toastRef.hostView.destroy();
      }
    };
    toastRef.instance.show();
    return {
      toastInstance: toastRef.instance,
    };
  }
}
