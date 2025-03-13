import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  Component,
  EmbeddedViewRef,
  Inject,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { forEach } from 'lodash-es';

@Component({
    selector: 'd-portal',
    template: `
                   <ng-template #templateRef>
                        <ng-content></ng-content>
                    </ng-template>`,
    preserveWhitespaces: false,
    standalone: false
})
export class PortalComponent {
  viewRef: EmbeddedViewRef<any>;
  portalContainer: HTMLElement;
  @ViewChild('templateRef', { static: true }) templateRef: TemplateRef<any>;
  document: Document;

  constructor(private appRef: ApplicationRef, @Inject(DOCUMENT) private doc: any) {
    this.document = this.doc;
  }

  addContent() {
    this.portalContainer = this.document.createElement('div');
    this.viewRef = this.templateRef.createEmbeddedView(this);
    forEach(this.viewRef.rootNodes, (node) => {
      this.portalContainer.appendChild(node);
    });
    this.appRef.attachView(this.viewRef);
    this.document.body.appendChild(this.portalContainer);
  }

  open() {
    this.close();
    this.addContent();
  }

  close() {
    if (this.viewRef && this.portalContainer) {
      this.document.body.removeChild(this.portalContainer);
      this.viewRef.destroy();
      this.viewRef = null;
      this.portalContainer = null;
    }
  }
}
