import { DOCUMENT } from '@angular/common';
import {
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  Injectable,
  Renderer2, RendererFactory2
} from '@angular/core';
import { OverlayContainerRef } from 'ng-devui/overlay-container';
import { DevConfigService } from 'ng-devui/utils/globalConfig';
import { assign, isUndefined } from 'lodash-es';
import { ModalContainerComponent } from './modal-container.component';
import { ModalComponent } from './modal.component';
import { IDialogOptions } from './modal.types';

@Injectable()
export class DialogService {
  contentRef: ComponentRef<any>;
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
    width,
    zIndex,
    backDropZIndex,
    backdropCloseable,
    maxHeight,
    showAnimation,
    showAnimate,
    title,
    content,
    html,
    data,
    buttons,
    injector,
    componentFactoryResolver,
    beforeHidden,
    onClose,
    dialogtype = 'standard',
    showCloseBtn = true,
    draggable = true,
    placement = 'center',
    offsetX,
    offsetY,
    bodyScrollable = true,
    contentTemplate,
    escapable = true
  }: IDialogOptions) {
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
      showAnimation = showAnimate ;
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
      // set backdropCloseable default value "true" when not passing it
      backdropCloseable: isUndefined(backdropCloseable) ? true : backdropCloseable,
      draggable,
      placement,
      offsetX,
      offsetY,
      bodyScrollable,
      escapable
    });

    const modalContainerRef = modalRef.instance.modalContainerHost.viewContainerRef
      .createComponent(finalComponentFactoryResolver.resolveComponentFactory(ModalContainerComponent), 0, injector);
    assign(modalContainerRef.instance, { title, buttons, maxHeight, dialogtype, showCloseBtn });

    if (contentTemplate) {
      assign(modalContainerRef.instance, { contentTemplate });
    } else {
      if (typeof content === 'string') {
        assign(modalContainerRef.instance, { content, html });
      } else {
        this.contentRef = modalContainerRef.instance.modalContentHost.viewContainerRef
          .createComponent(finalComponentFactoryResolver.resolveComponentFactory(content));
        assign(this.contentRef.instance, { data }, dialogtype);
      }
    }

    modalContainerRef.instance.onClose = () => {
      modalRef.instance.hide();
    };

    modalRef.instance.updateButtonOptions = buttonOptions => modalContainerRef.instance.updateButtonOptions(buttonOptions);

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
      modalContentInstance: this.contentRef ? this.contentRef.instance : null,
    };
  }
}
