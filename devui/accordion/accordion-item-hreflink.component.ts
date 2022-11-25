import { NgTemplateOutlet } from '@angular/common';
import { Component, HostListener, Inject, ViewEncapsulation } from '@angular/core';
import { AccordionBaseLinkComponent } from './accordion-base-link-component.class';
import { ACCORDION } from './accordion-token';

@Component({
  selector: 'd-accordion-item-hreflink',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './accordion-item-hreflink.component.html',
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class AccordionItemHreflinkComponent extends AccordionBaseLinkComponent {
  constructor(@Inject(ACCORDION) protected accordion: any) {
    super(accordion);
  }
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.disabled) {
      this.accordion.linkItemClickFn({
        item: this.item,
        parent: this.parent,
        event: event
      });
    }
  }
}
