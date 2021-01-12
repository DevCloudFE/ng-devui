import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { AccordionBaseItemComponent } from './accordion-base-item-component.class';
import { AccordionComponent } from './accordion.component';
import { AccordionBaseItem } from './accordion.type';

@Component({
  selector: 'd-accordion-item',
  templateUrl: './accordion-item.component.html',
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
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
