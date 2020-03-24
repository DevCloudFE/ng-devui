import { AccordionComponent } from './accordion.component';
import { Component, ViewEncapsulation, HostListener } from '@angular/core';
import { AccordionBaseItem } from './accordion.type';
import { AccordionBaseItemComponent } from './accordion-base-item-component.class';

@Component({
  selector: 'd-accordion-item',
  templateUrl: './accordion-item.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccordionItemComponent extends AccordionBaseItemComponent<AccordionBaseItem> {
  constructor(protected accordion: AccordionComponent) {
    super(accordion);
  }
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.disabled) {
      this.accordion.itemClickFn({
        item: this.item,
        parent: this.parent,
        event: event
      });
    }
  }
}
