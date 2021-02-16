import {
    ApplicationRef,
    Component,
    EmbeddedViewRef,
    TemplateRef,
    ViewChild,
} from '@angular/core';

import {forEach} from 'lodash-es';

@Component({
    selector: 'd-portal',
    template: `
                   <ng-template #templateRef>
                        <ng-content></ng-content>
                    </ng-template>`,
    preserveWhitespaces: false,
})
export class PortalComponent {
    viewRef: EmbeddedViewRef<any>;
    portalContainer: HTMLElement;
    @ViewChild('templateRef', { static: true }) templateRef: TemplateRef<any>;

    constructor(private appRef: ApplicationRef) {
    }

    addContent() {
        this.portalContainer = document.createElement('div');
        this.viewRef = this.templateRef.createEmbeddedView(this);
        forEach(this.viewRef.rootNodes, (node) => {
            this.portalContainer.appendChild(node);
        });
        this.appRef.attachView(this.viewRef);
        document.body.appendChild(this.portalContainer);
    }

    open() {
        this.close();
        this.addContent();
    }

    close() {
        if (this.viewRef && this.portalContainer) {
            document.body.removeChild(this.portalContainer);
            this.viewRef.destroy();
            this.viewRef = null;
            this.portalContainer = null;
        }
    }
}
