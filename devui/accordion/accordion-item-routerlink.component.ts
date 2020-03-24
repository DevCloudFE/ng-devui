import { AccordionComponent } from './accordion.component';
import { Component, ViewEncapsulation, HostBinding, ViewChild, HostListener} from '@angular/core';
import { AccordionBaseLinkComponent } from './accordion-base-link-component.class';
import { RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'd-accordion-item-routerlink',
  templateUrl: './accordion-item-routerlink.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccordionItemRouterlinkComponent extends AccordionBaseLinkComponent {
  @ViewChild(RouterLinkActive, { static: false }) routerLinkActiveDirective: RouterLinkActive;
  @HostBinding('class.devui-router-active')
  get routerLinkActived(): boolean {
    return !!(this.routerLinkActiveDirective && this.routerLinkActiveDirective.isActive);
  }

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
}
