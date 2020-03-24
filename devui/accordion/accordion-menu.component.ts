import { Component, ViewEncapsulation, HostBinding } from '@angular/core';
import { AccordionBaseComponent } from './accordion-base-component.class';
import { AccordionBaseMenu, AccordionMenuItem } from './accordion.type';
import { AccordionListComponent } from './accordion-list.component';
import { AccordionComponent } from './accordion.component';

@Component({
  selector: 'd-accordion-menu',
  templateUrl: './accordion-menu.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccordionMenuComponent extends AccordionBaseComponent<AccordionBaseMenu<AccordionMenuItem>> {
  @HostBinding('class.devui-accordion-menu-item')
  defaultClasses = true;

  public accordionListFromView: AccordionListComponent;

  get menuItemTemplate() {
    return this.accordion.menuItemTemplate;
  }

  @HostBinding('class.open')
  get open() {
    return (this.keyOpen === undefined && this.accordion.autoOpenActiveMenu)
      ? this.childActived
      : this.keyOpen;
  }
  get keyOpen() {
    return this.item && this.item[this.accordion.openKey];
  }

  get children() {
    return this.item && this.item[this.accordion.childrenKey];
  }
  get childActived() {
    return this.routerLinkActived || this.hasActiveChildren;
  }

  @HostBinding('class.devui-router-active')
  get routerLinkActived() {
    return this.accordionListFromView && this.accordionListFromView.routerLinkActived;
  }

  @HostBinding('class.devui-has-active-item')
  get hasActiveChildren() {
    return this.accordionListFromView && this.accordionListFromView.hasActiveChildren;
  }

  constructor(public accordion: AccordionComponent) {
    super(accordion);
  }

  toggle(event) {
    this.accordion.menuToggleFn({
      item: this.item,
      open: !this.open,
      parent: this.parent,
      event: event
    });
  }
}
