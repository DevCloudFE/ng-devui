import {
  Injectable,
  ApplicationRef,
  Injector,
  ElementRef,
  ViewRef,
  EmbeddedViewRef,
  TemplateRef,
  ComponentFactory,
  ComponentRef
} from '@angular/core';

import { DocumentRef } from '../window-ref/document-ref.service';

@Injectable()
export class OverlayContainerRef {

  constructor(private _appRef: ApplicationRef,
              private documentRef: DocumentRef,
              private _injector: Injector) {
  }


  insert(viewRef: ViewRef): ViewRef {
    this._appRef.attachView(viewRef);
    this.documentRef.body.appendChild((viewRef as EmbeddedViewRef<any>).rootNodes[0]);
    return viewRef;
  }

  remove(viewRef: ViewRef) {
    viewRef.destroy();
  }

  createEmbeddedView<C>(templateRef: TemplateRef<any>, context?: C) {
    const viewRef = templateRef.createEmbeddedView(context || {});
    return this.insert(viewRef);
  }

  createComponent<C>(componentFactory: ComponentFactory<C>,
                     injector?: Injector,
                     projectableNodes?: any[][]) {
    const componentRef = componentFactory.create(injector || this._injector, projectableNodes) as ComponentRef<C>;
    this.insert(componentRef.hostView);
    return componentRef;
  }
}
