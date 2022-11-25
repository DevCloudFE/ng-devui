import { Directive } from '@angular/core';
import { AccordionBaseItemComponent } from './accordion-base-item-component.class';
import type { AccordionLinkableItem, AccordionOptions } from './accordion.type';

@Directive()
export abstract class AccordionBaseLinkComponent extends AccordionBaseItemComponent<AccordionLinkableItem> {
  get link() {
    return this.item && this.item[this.accordion.linkKey];
  }

  get target() {
    return this.item && this.item[this.accordion.linkTargetKey] || this.accordion.linkDefaultTarget;
  }

  get linkType() {
    return this.item && this.item[this.accordion.linkTypeKey] || '';
  }
  constructor(protected accordion: AccordionOptions) {
    super(accordion);
  }
}
