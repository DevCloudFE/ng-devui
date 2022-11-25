import { NgTemplateOutlet } from '@angular/common';
import { Component, HostListener, Inject, ViewEncapsulation } from '@angular/core';
import { AccordionBaseItemComponent } from './accordion-base-item-component.class';
import { ACCORDION } from './accordion-token';
import type { AccordionBaseItem } from './accordion.type';

@Component({
  selector: 'd-accordion-item',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './accordion-item.component.html',
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class AccordionItemComponent extends AccordionBaseItemComponent<AccordionBaseItem> {
  constructor(@Inject(ACCORDION) protected accordion: any) {
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
