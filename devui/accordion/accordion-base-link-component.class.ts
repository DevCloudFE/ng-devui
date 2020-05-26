import { HostListener, Directive } from '@angular/core';
import { AccordionLinkableItem, AccordionOptions } from './accordion.type';
import { AccordionBaseItemComponent } from './accordion-base-item-component.class';

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
