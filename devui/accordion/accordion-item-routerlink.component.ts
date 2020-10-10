import { AccordionComponent } from './accordion.component';
import { Component, ViewEncapsulation, HostBinding, ViewChild, HostListener, SimpleChanges, OnChanges} from '@angular/core';
import { AccordionBaseLinkComponent } from './accordion-base-link-component.class';
import { RouterLinkActive, Router, UrlTree, Params } from '@angular/router';

@Component({
  selector: 'd-accordion-item-routerlink',
  templateUrl: './accordion-item-routerlink.component.html',
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class AccordionItemRouterlinkComponent extends AccordionBaseLinkComponent implements OnChanges {
  @ViewChild(RouterLinkActive) routerLinkActiveDirective: RouterLinkActive;
  @HostBinding('class.devui-router-active')
  get routerLinkActived(): boolean {
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

  public path: string;
  public queryParams: Params;
  public fragment: string;

  constructor(protected accordion: AccordionComponent, private router: Router) {
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item']) {
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
