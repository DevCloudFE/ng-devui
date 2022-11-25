import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, HostBinding, Inject, Input, OnDestroy, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { expandCollapse, expandCollapseForDomDestroy } from 'ng-devui/utils';
import { AccordionItemHreflinkComponent } from './accordion-item-hreflink.component';
import { AccordionItemRouterlinkComponent } from './accordion-item-routerlink.component';
import { AccordionItemComponent } from './accordion-item.component';
import { AccordionMenuComponent } from './accordion-menu.component';
import { ACCORDION } from './accordion-token';
import { AccordionService } from './accordion.service';
import type { AccordionMenuItem } from './accordion.type';

@Component({
  selector: 'd-accordion-list',
  standalone: true,
  imports: [
    AccordionListComponent,
    AccordionMenuComponent,
    AccordionItemComponent,
    AccordionItemHreflinkComponent,
    AccordionItemRouterlinkComponent,
    NgFor,
    NgIf,
    NgTemplateOutlet
  ],
  templateUrl: './accordion-list.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [expandCollapse, expandCollapseForDomDestroy],
  preserveWhitespaces: false,
})
export class AccordionListComponent implements OnInit, OnDestroy {
  @Input() data: Array<AccordionMenuItem>;
  @Input() deepth = 0;
  @Input() parent: AccordionMenuItem;
  @ViewChildren(AccordionMenuComponent) accordionMenuQueryList: QueryList<any>;
  @ViewChildren(AccordionItemRouterlinkComponent) accordionItemRouterlinkQueryList: QueryList<AccordionItemRouterlinkComponent>;
  @HostBinding('class.devui-accordion-show-animate') get animateState() {
    return this.accordion.showAnimation;
  }

  get loading() {
    return this.parent && this.parent[this.accordion.loadingKey];
  }

  get noContent() {
    return this.data === undefined || this.data === null || this.data.length === 0;
  }

  get linkTypeKey() {
    return this.accordion.linkTypeKey;
  }

  get childrenKey() {
    return this.accordion.childrenKey;
  }

  get activeKey() {
    return this.accordion.activeKey;
  }

  get itemTemplate() {
    return this.accordion.itemTemplate;
  }

  get menuItemTemplate() {
    return this.accordion.menuItemTemplate;
  }

  get innerListTemplate() {
    return this.accordion.innerListTemplate;
  }

  get loadingTemplate() {
    return this.accordion.loadingTemplate;
  }

  get noContentTemplate() {
    return this.accordion.noContentTemplate;
  }

  get linkType() {
    return this.accordion.linkType;
  }

  get i18nCommonText() {
    return this.accordion.i18nCommonText;
  }

  get showNoContent() {
    return this.accordion.showNoContent;
  }

  get linkDefaultTarget() {
    return this.accordion.linkDefaultTarget;
  }

  get routerLinkActivated(): boolean {
    return (
      (!!this.accordionItemRouterlinkQueryList && this.accordionItemRouterlinkQueryList.some((airlc) => this.isLinkRouterActive(airlc))) ||
      (!!this.accordionMenuQueryList && this.accordionMenuQueryList.some((amc) => this.isMenuRouterActive(amc)))
    );
  }

  get hasActiveChildren(): boolean {
    return (
      (!!this.accordionMenuQueryList && this.accordionMenuQueryList.some((amc) => this.isMenuDataActive(amc))) ||
      (!!this.data && !!this.data.length && this.data.some((item) => this.isItemData(item) && this.isItemDataActive(item)))
    );
  }

  constructor(@Inject(ACCORDION) private accordion: any, private accordionService: AccordionService) { }

  ngOnInit(): void {
    if (this.parent) {
      this.accordionService.setChildListInstance(this, this.parent);
    }
  }

  ngOnDestroy(): void {
    if (this.parent) {
      this.accordionService.setChildListInstance(undefined, this.parent);
    }
  }

  private isLinkRouterActive(airlc: AccordionItemRouterlinkComponent): boolean {
    return airlc.routerLinkActivated;
  }

  private isMenuRouterActive(amc: any): boolean {
    return amc.routerLinkActivated;
  }

  private isMenuDataActive(amc: any): boolean {
    return amc.hasActiveChildren;
  }

  private isItemDataActive(item: AccordionMenuItem): boolean {
    return !!item[this.activeKey];
  }

  private isItemData(item: AccordionMenuItem): boolean {
    return item[this.childrenKey] === undefined;
  }

  menuToggleItemFn = (item: any, event?: any) => {
    this.accordion.menuToggleFn({
      item: item,
      open: !item[this.accordion.openKey],
      parent: this.parent.parent,
      event: event,
    });
  };

  itemClickItemFn = (item: any, event?: any) => {
    this.accordion.itemClickFn({
      item: item,
      parent: this.parent,
      event: event,
    });
  };

  getOpenState(item, list) {
    let stateFlag = false;
    if (item && list) {
      const open = item[this.accordion.openKey];
      const childActivated = list.routerLinkActivated || list.hasActiveChildren;
      stateFlag = open === undefined && this.accordion.autoOpenActiveMenu ? childActivated : open;
    }
    return stateFlag ? 'expanded' : 'collapsed';
  }
}
