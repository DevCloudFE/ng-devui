import { Directive, EmbeddedViewRef, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { isEqual } from 'lodash-es';

@Directive({
  selector: '[dStrTplOutlet]'
})
export class StrTplOutletDirective<T = Record<string, any>> implements OnChanges {
  private embeddedViewRef: EmbeddedViewRef<T> | null = null;
  @Input() dStrTplOutlet: TemplateRef<T> | string;
  @Input() dStrTplOutletContext: T;
  constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<T>) { }
  ngOnChanges(changes: SimpleChanges): void {
    const { dStrTplOutlet, dStrTplOutletContext } = changes;
    if (dStrTplOutlet) {
      this.viewContainer.clear();
      const template = (this.dStrTplOutlet instanceof TemplateRef) ? this.dStrTplOutlet : this.templateRef;
      this.embeddedViewRef = this.viewContainer.createEmbeddedView(template, this.dStrTplOutletContext);
    }

    if (dStrTplOutletContext && !dStrTplOutletContext.firstChange && this.embeddedViewRef) {
      const isTemplateRef = this.dStrTplOutlet instanceof TemplateRef;
      const newCtx = isTemplateRef ? this.dStrTplOutletContext : {};
      const oldCtx = this.embeddedViewRef.context;
      if (!isEqual(newCtx, oldCtx)) {
        for (const propName of Object.keys(newCtx)) {
          oldCtx[propName] = newCtx[propName];
        }
      }
    }
  }
}
