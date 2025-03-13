import { Component, HostBinding, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccordionBaseComponent } from './accordion-base-component.class';
import { ACCORDION } from './accordion-token';
import { AccordionService } from './accordion.service';
import { AccordionBaseMenu, AccordionMenuItem } from './accordion.type';
@Component({
    selector: 'd-accordion-menu',
    templateUrl: './accordion-menu.component.html',
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false,
    standalone: false
})
export class AccordionMenuComponent extends AccordionBaseComponent<AccordionBaseMenu<AccordionMenuItem>> implements OnInit, OnDestroy {
  childListSub: Subscription;
  accordionListFromView: any; // AccordionListComponent

  @HostBinding('class.devui-accordion-menu-item') defaultClasses = true;

  @HostBinding('class.open')
  get open() {
    return this.keyOpen === undefined && this.accordion.autoOpenActiveMenu ? this.childActivated : this.keyOpen;
  }

  @HostBinding('class.devui-router-active')
  get routerLinkActivated() {
    return this.accordionListFromView && this.accordionListFromView.routerLinkActivated;
  }

  @HostBinding('class.devui-has-active-item')
  get hasActiveChildren() {
    return this.accordionListFromView && this.accordionListFromView.hasActiveChildren;
  }

  get keyOpen() {
    return this.item && this.item[this.accordion.openKey];
  }

  get children() {
    return this.item && this.item[this.accordion.childrenKey];
  }

  get childActivated() {
    return this.routerLinkActivated || this.hasActiveChildren;
  }

  get menuItemTemplate() {
    return this.accordion.menuItemTemplate;
  }

  constructor(@Inject(ACCORDION) public accordion: any, private accordionService: AccordionService) {
    super(accordion);
  }

  ngOnInit(): void {
    this.childListSub = this.accordionService.getChildListInstance().subscribe(({ listInstance, parent }) => {
      // list的parent与menu的item为同一数据，通过该属性匹配父子关系，避免互相嵌套导致循环依赖
      if (parent === this.item) {
        // 延时赋值规避脏检查后值改变报错
        setTimeout(() => {
          this.accordionListFromView = listInstance;
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.childListSub) {
      this.childListSub.unsubscribe();
    }
  }

  toggle(event) {
    this.accordion.menuToggleFn({
      item: this.item,
      open: !this.open,
      parent: this.parent,
      event: event,
    });
  }
}
