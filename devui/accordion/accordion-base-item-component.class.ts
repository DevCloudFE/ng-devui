import { HostBinding, Directive } from '@angular/core';
import { AccordionBaseItem, AccordionOptions } from './accordion.type';
import { AccordionBaseComponent } from './accordion-base-component.class';

@Directive()
export abstract class AccordionBaseItemComponent<T extends AccordionBaseItem> extends AccordionBaseComponent<T> {
  get itemTemplate() {
    return this.accordion.itemTemplate;
  }
  @HostBinding('class.active')
  get active() {
    return this.item && this.item[this.accordion.activeKey];
  }
  @HostBinding('class.devui-accordion-item-title')
  @HostBinding('class.devui-over-flow-ellipsis')
  defaultClasses = true;
  constructor(protected accordion: AccordionOptions) {
    super(accordion);
  }
}
