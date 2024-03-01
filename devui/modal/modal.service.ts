import { DOCUMENT } from '@angular/common';
import {
  ComponentFactoryResolver,
  Inject,
  Injectable,
  Renderer2, RendererFactory2
} from '@angular/core';
import { OverlayContainerRef } from 'ng-devui/overlay-container';
import { DevConfigService } from 'ng-devui/utils';
import { assign, isUndefined } from 'lodash-es';
import { ModalComponent } from './modal.component';
import { IModalOptions } from './modal.types';

@Injectable()
export class ModalService {
  private renderer: Renderer2;
  document: Document;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private overlayContainerRef: OverlayContainerRef, private rendererFactory: RendererFactory2,
              private devConfigService: DevConfigService,
              @Inject(DOCUMENT) private doc: any) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.document = this.doc;
  }

  open({
    id,
    component,
    injector,
    width,
    zIndex,
    backDropZIndex,
    data,
    handler,
    showAnimation,
    /**
     * @deprecated
     */
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
    escapable = true,
    cssClass
  }: IModalOptions) {
    const finalComponentFactoryResolver = componentFactoryResolver || this.componentFactoryResolver;
    const modalRef = this.overlayContainerRef.createComponent(
      finalComponentFactoryResolver.resolveComponentFactory(ModalComponent),
      injector
    );
    const componentConfig = this.devConfigService.getConfigForComponent('modal') || {};
    const showAnimationApiConfig = this.devConfigService.getConfigForApi('showAnimation');
    const bodyScrollableApiConfig = this.devConfigService.getConfigForApi('bodyScrollable');
    showAnimation = showAnimation ?? showAnimate ?? componentConfig.showAnimation ?? showAnimationApiConfig;
    bodyScrollable = bodyScrollable ?? componentConfig.bodyScrollable ?? bodyScrollableApiConfig ?? true;

    assign(modalRef.instance, {
      id,
      width,
      zIndex,
      backDropZIndex,
      showAnimation,
      beforeHidden,
      backdropCloseable: isUndefined(backdropCloseable) ? true : backdropCloseable,
      placement,
      offsetX,
      offsetY,
      bodyScrollable,
      contentTemplate,
      escapable,
      cssClass
    });

    let modalContentInstance;
    if (component) {
      modalContentInstance = modalRef.instance.modalContainerHost.viewContainerRef
        .createComponent(finalComponentFactoryResolver.resolveComponentFactory(component), 0, injector);
      assign(modalContentInstance.instance, { data, handler });
    }

    modalRef.instance.onHidden = () => {
      if (modalRef.instance.documentOverFlow) {
        this.renderer.removeStyle(this.document.body, 'top');
        this.renderer.removeStyle(this.document.body, 'left');
        this.renderer.removeClass(this.document.body, 'devui-body-scrollblock');
        this.renderer.removeClass(this.document.body, 'devui-body-overflow-hidden');
        this.document.documentElement.scrollTop = modalRef.instance.scrollTop;
        this.document.body.scrollTop = modalRef.instance.scrollTop;
        this.document.documentElement.scrollLeft = modalRef.instance.scrollLeft;
        this.document.body.scrollLeft = modalRef.instance.scrollLeft;
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
