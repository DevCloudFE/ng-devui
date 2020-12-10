import {
  Injectable,
  ComponentFactoryResolver,
  ComponentRef,
  Renderer2, RendererFactory2
} from '@angular/core';
import {ModalComponent} from './modal.component';
import {OverlayContainerRef} from 'ng-devui/overlay-container';
import {assign, isUndefined} from 'lodash-es';
import {IDialogOptions} from './modal.types';
import {ModalContainerComponent} from './modal-container.component';

@Injectable()
export class DialogService {
  contentRef: ComponentRef<any>;
  private renderer: Renderer2;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private overlayContainerRef: OverlayContainerRef, private rendererFactory: RendererFactory2) {
      this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  open({
    id,
    width,
    zIndex,
    backdropCloseable,
    maxHeight,
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
    bodyScrollable,
    contentTemplate,
    escapable = true
  }: IDialogOptions) {
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
    assign(modalContainerRef.instance, {title, buttons, maxHeight, dialogtype, showCloseBtn});

    if (contentTemplate) {
      assign(modalContainerRef.instance, {contentTemplate});
    } else {
      if (typeof content === 'string') {
        assign(modalContainerRef.instance, {content, html});
      } else {
        this.contentRef = modalContainerRef.instance.modalContentHost.viewContainerRef
          .createComponent(finalComponentFactoryResolver.resolveComponentFactory(content));
        assign(this.contentRef.instance, {data}, dialogtype);
      }
    }

    modalContainerRef.instance.onClose = () => {
      modalRef.instance.hide();
    };

    modalRef.instance.updateButtonOptions = buttonOptions => modalContainerRef.instance.updateButtonOptions(buttonOptions);

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
      modalContentInstance: this.contentRef ? this.contentRef.instance : null,
    };
  }
}
