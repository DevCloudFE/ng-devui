import { DOCUMENT } from '@angular/common';
import { ComponentFactoryResolver, Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { assign, isUndefined } from 'lodash-es';
import { OverlayContainerRef } from 'ng-devui/overlay-container';
import { DevConfigService } from 'ng-devui/utils/globalConfig';
import { ModalComponent } from './modal.component';
import { IModalOptions } from './modal.types';

@Injectable()
export class ModalService {
  private renderer: Renderer2;
  document: Document;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private overlayContainerRef: OverlayContainerRef,
    private rendererFactory: RendererFactory2,
    private devConfigService: DevConfigService,
    @Inject(DOCUMENT) private doc: any
  ) {
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
    showAnimate,
    backdropCloseable,
    componentFactoryResolver,
    onClose,
    beforeHidden,
    placement = 'center',
    offsetX,
    offsetY,
    bodyScrollable = true,
    contentTemplate,
    escapable = true,
  }: IModalOptions) {
    const finalComponentFactoryResolver = componentFactoryResolver || this.componentFactoryResolver;

    const modalRef = this.overlayContainerRef.createComponent(
      finalComponentFactoryResolver.resolveComponentFactory(ModalComponent),
      injector
    );
    let showAnimateValue = true;
    const componentConfig = this.devConfigService.getConfigForComponent('modal') || {};
    const configValue = componentConfig['showAnimation'];
    const apiConfig = this.devConfigService.getConfigForApi('showAnimation');
    if (configValue !== undefined) {
      showAnimateValue = configValue;
    } else if (apiConfig !== undefined) {
      showAnimateValue = apiConfig;
    }

    if (showAnimation !== undefined) {
    } else if (showAnimate !== undefined) {
      showAnimation = showAnimate;
    } else {
      showAnimation = showAnimateValue;
    }
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
    });

    let modalContentInstance;
    if (component) {
      modalContentInstance = modalRef.instance.modalContainerHost.viewContainerRef.createComponent(
        finalComponentFactoryResolver.resolveComponentFactory(component),
        0,
        injector
      );
      assign(modalContentInstance.instance, { data, handler });
    }

    modalRef.instance.onHidden = () => {
      if (!modalRef.instance.bodyScrollable) {
        modalRef.instance.cb();
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
      modalContentInstance: modalContentInstance ? modalContentInstance.instance : null,
    };
  }
}
