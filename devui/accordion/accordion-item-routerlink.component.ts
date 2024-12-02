import { Component, HostBinding, HostListener, Inject, OnChanges, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { Params, Router, RouterLinkActive, UrlTree } from '@angular/router';
import { AccordionBaseLinkComponent } from './accordion-base-link-component.class';
import { ACCORDION } from './accordion-token';

@Component({
  selector: 'd-accordion-item-routerlink',
  templateUrl: './accordion-item-routerlink.component.html',
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class AccordionItemRouterlinkComponent extends AccordionBaseLinkComponent implements OnChanges {
  @ViewChild(RouterLinkActive) routerLinkActiveDirective: RouterLinkActive;
  @HostBinding('class.devui-router-active')
  get routerLinkActivated(): boolean {
    return !!(this.routerLinkActiveDirective && this.routerLinkActiveDirective.isActive);
  }

  private set urlTree(urlTree: UrlTree) {
    if (urlTree) {
      this.queryParams = urlTree.queryParams;
      this.fragment = urlTree.fragment;
    } else {
      this.queryParams = undefined;
      this.fragment = undefined;
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.disabled) {
      this.accordion.linkItemClickFn({
        item: this.item,
        parent: this.parent,
        event: event,
      });
    }
  }

  path: string;
  queryParams: Params;
  fragment: string;

  constructor(@Inject(ACCORDION) protected accordion: any, private router: Router) {
    super(accordion);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.item) {
      if (this.link) {
        this.urlTree = this.router.parseUrl(this.link);
        const handelPath = (url: string) => {
          let path = url;
          const index = url.indexOf('?');
          if (index > -1) {
            path = url.slice(0, index);
          }
          return path;
        };
        this.path = handelPath(this.link);
      } else {
        this.urlTree = undefined;
        this.path = undefined;
      }
    }
  }
}
