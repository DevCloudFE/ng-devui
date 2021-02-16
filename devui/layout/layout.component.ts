import { Component, ContentChildren, HostBinding, QueryList } from '@angular/core';
import { AsideComponent } from './elements/aside.component';

@Component({
  selector: 'd-layout',
  template: '<ng-content></ng-content>',
  styleUrls: ['./layout.component.scss'],
  preserveWhitespaces: false,
})
export class LayoutComponent {
  @ContentChildren(AsideComponent) listOfSideBarComponent: QueryList<AsideComponent>;
  @HostBinding('class.d-layout-aside')
  get layoutSideBar(): boolean {
    return this.listOfSideBarComponent && this.listOfSideBarComponent.length > 0;
  }

  @HostBinding('class.d-layout') default = true;
}
