import {
  Injectable,
  ComponentFactoryResolver,
  ComponentRef,
} from '@angular/core';
import { ModalComponent } from './modal.component';
import { OverlayContainerRef } from '../overlay-container';
import {assign, isUndefined} from 'lodash-es';
import { IModalOptions } from './modal.types';

@Injectable()
export class ModalService {
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private overlayContainerRef: OverlayContainerRef) {
  }

  open({
    id,
    component,
    injector,
    width,
    data,
    handler,
    showAnimate,
    backdropCloseable,
    componentFactoryResolver,
    onClose,
    beforeHidden,
  }: IModalOptions) {
    const finalComponentFactoryResolver = componentFactoryResolver || this.componentFactoryResolver;

    const modalRef = this.overlayContainerRef.createComponent(
      finalComponentFactoryResolver.resolveComponentFactory(ModalComponent),
      injector
    );
    assign(modalRef.instance, {
      id,
      width,
      showAnimate,
      beforeHidden,
      backdropCloseable: isUndefined(backdropCloseable) ? true : backdropCloseable,
    });

    const modalContentInstance = modalRef.instance.modalContainerHost.viewContainerRef
      .createComponent(finalComponentFactoryResolver.resolveComponentFactory(component), 0, injector);
    assign(modalContentInstance.instance, { data, handler });

    modalRef.instance.onHidden = () => {
      if (onClose) {
        onClose();
      }
      modalRef.hostView.destroy();
    };

    modalRef.instance.show();

    return {
      modalInstance: modalRef.instance,
      modalContentInstance: modalContentInstance.instance
    };
  }
}
