import { Directive, EmbeddedViewRef, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { isEqual } from 'lodash-es';

@Directive({
  selector: '[strTplOutlet]'
  })
export class StrTplOutletDirective<T = Record<string, any>> implements OnChanges {
  private embeddedViewRef: EmbeddedViewRef<T> | null = null;
  @Input() strTplOutlet: TemplateRef<T> | string;
  @Input() strTplOutletContext: T;
  constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<T>) { }
  ngOnChanges(changes: SimpleChanges): void {
    const { strTplOutlet, strTplOutletContext } = changes;
    if (strTplOutlet) {
      this.viewContainer.clear();
      const template = (this.strTplOutlet instanceof TemplateRef) ? this.strTplOutlet : this.templateRef;
      this.embeddedViewRef = this.viewContainer.createEmbeddedView(template, this.strTplOutletContext);
    }

    if (strTplOutletContext && !strTplOutletContext.firstChange && this.embeddedViewRef) {
      // console.log('wat strTplOutletContext', strTplOutletContext);
      const isTemplateRef = this.strTplOutlet instanceof TemplateRef;
      const newCtx = isTemplateRef ? this.strTplOutletContext : {};
      const oldCtx = this.embeddedViewRef.context;
      if (!isEqual(newCtx, oldCtx)) {
        for (const propName of Object.keys(newCtx)) {
          oldCtx[propName] = newCtx[propName];
        }
      }
    }
  }
}
