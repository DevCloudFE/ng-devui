import {
  Component,
  forwardRef, Host, HostBinding, Inject, Input, OnDestroy, OnInit,
  Optional, QueryList, SkipSelf, ViewChildren, ViewEncapsulation
} from '@angular/core';
import { expandCollapse, expandCollapseForDomDestroy } from 'ng-devui/utils';
import { AccordionItemRouterlinkComponent } from './accordion-item-routerlink.component';
import { ACCORDION_LIST } from './accordion-list-token';
import { ACCORDION_MENU } from './accordion-menu-token';
import { ACCORDION } from './accordion-token';
import { AccordionMenuItem } from './accordion.type';

@Component({
  selector: 'd-accordion-list',
  templateUrl: './accordion-list.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [expandCollapse, expandCollapseForDomDestroy],
  preserveWhitespaces: false,
  providers: [{
    provide: ACCORDION_LIST,
    useExisting: forwardRef(() => AccordionListComponent)
  }]
})
export class AccordionListComponent implements OnInit, OnDestroy {

  constructor(@Optional() @Host() @SkipSelf() @Inject(ACCORDION_MENU) private parentComponent: any,
              @Inject(ACCORDION) private accordion: any) {}
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
  get routerLinkActived(): boolean {
    return (!!this.accordionItemRouterlinkQueryList
        && this.accordionItemRouterlinkQueryList.some(airlc => this.isLinkRouterActive(airlc))
    ) || (
      !!this.accordionMenuQueryList
        && this.accordionMenuQueryList.some(amc => this.isMenuRouterActive(amc))
    );
  }
  get hasActiveChildren(): boolean {
    return (!!this.accordionMenuQueryList
        && this.accordionMenuQueryList.some(amc => this.isMenuDataActive(amc)))
      || (!!this.data && !!this.data.length
        && this.data.some(item => this.isItemData(item) && this.isItemDataActive(item))
      );
  }
  @Input() data: Array<AccordionMenuItem>;
  @Input() deepth = 0;
  @Input() parent: AccordionMenuItem;
  @ViewChildren(ACCORDION_MENU) accordionMenuQueryList: QueryList<any>;
  @ViewChildren(AccordionItemRouterlinkComponent) accordionItemRouterlinkQueryList: QueryList<AccordionItemRouterlinkComponent>;
  6;
  ngOnInit(): void {
    if (this.parentComponent) {
      setTimeout(() => {this.parentComponent.accordionListFromView = this; });
    }
  }
  ngOnDestroy(): void {
    if (this.parentComponent) {
      this.parentComponent.accordionListFromView = undefined;
    }
  }
  private isLinkRouterActive(airlc: AccordionItemRouterlinkComponent): boolean {
    return airlc.routerLinkActived;
  }
  private isMenuRouterActive(amc: any): boolean {
    return amc.routerLinkActived;
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
  menuToggleItemFn = (item: any , event?: any) => {
    this.accordion.menuToggleFn({
      item: item,
      open: !item[this.accordion.openKey],
      parent: this.parent.parent,
      event: event
    });
  };
  itemClickItemFn = (item: any, event?: any) => {
    this.accordion.itemClickFn({
      item: item,
      parent: this.parent,
      event: event
    });
  };
}
