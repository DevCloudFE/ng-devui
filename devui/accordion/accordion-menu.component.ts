import { Component, forwardRef, HostBinding, Inject, ViewEncapsulation } from '@angular/core';
import { AccordionBaseComponent } from './accordion-base-component.class';
import { ACCORDION_MENU } from './accordion-menu-token';
import { ACCORDION } from './accordion-token';
import { AccordionBaseMenu, AccordionMenuItem } from './accordion.type';
@Component({
  selector: 'd-accordion-menu',
  templateUrl: './accordion-menu.component.html',
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  providers: [{
    provide: ACCORDION_MENU,
    useExisting: forwardRef(() => AccordionMenuComponent)
  }]
})
export class AccordionMenuComponent extends AccordionBaseComponent<AccordionBaseMenu<AccordionMenuItem>> {
  @HostBinding('class.devui-accordion-menu-item')
  defaultClasses = true;

  public accordionListFromView: any; // AccordionListComponent

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

  constructor(@Inject(ACCORDION) public accordion: any) {
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
