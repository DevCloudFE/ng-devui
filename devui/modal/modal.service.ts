import {
  Injectable,
  ComponentFactoryResolver,
  Renderer2, RendererFactory2
} from '@angular/core';
import { ModalComponent } from './modal.component';
import { OverlayContainerRef } from 'ng-devui/overlay-container';
import {assign, isUndefined} from 'lodash-es';
import { IModalOptions } from './modal.types';

@Injectable()
export class ModalService {
  private renderer: Renderer2;
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private overlayContainerRef: OverlayContainerRef, private rendererFactory: RendererFactory2) {
      this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  open({
    id,
    component,
    injector,
    width,
    zIndex,
    data,
    handler,
    showAnimate,
    backdropCloseable,
    componentFactoryResolver,
    onClose,
    beforeHidden,
    placement = 'center',
    offsetX,
    offsetY,
    bodyScrollable,
    contentTemplate,
    escapable = true
  }: IModalOptions) {
    const finalComponentFactoryResolver = componentFactoryResolver || this.componentFactoryResolver;

    const modalRef = this.overlayContainerRef.createComponent(
      finalComponentFactoryResolver.resolveComponentFactory(ModalComponent),
      injector
    );
    assign(modalRef.instance, {
      id,
      width,
      zIndex,
      showAnimate,
      beforeHidden,
      backdropCloseable: isUndefined(backdropCloseable) ? true : backdropCloseable,
      placement,
      offsetX,
      offsetY,
      bodyScrollable,
      contentTemplate,
      escapable
    });

    let modalContentInstance;
    if (component) {
      modalContentInstance = modalRef.instance.modalContainerHost.viewContainerRef
      .createComponent(finalComponentFactoryResolver.resolveComponentFactory(component), 0, injector);
      assign(modalContentInstance.instance, { data, handler });
    }

    modalRef.instance.onHidden = () => {
      if (!bodyScrollable && modalRef.instance.documentOverFlow) {
        this.renderer.removeStyle(document.body, 'top');
        this.renderer.removeStyle(document.body, 'left');
        this.renderer.removeClass(document.body, 'devui-body-scrollblock');
        document.documentElement.scrollTop = modalRef.instance.scrollTop;
        document.body.scrollTop = modalRef.instance.scrollTop;
        document.documentElement.scrollLeft = modalRef.instance.scrollLeft;
        document.body.scrollLeft = modalRef.instance.scrollLeft;
      }
      if (onClose) {
        onClose();
      }
      setTimeout(() => {
        modalRef.hostView.destroy();
      });
    };

    modalRef.instance.show();

    return {
      modalInstance: modalRef.instance,
      modalContentInstance: modalContentInstance ? modalContentInstance.instance : null
    };
  }
}
