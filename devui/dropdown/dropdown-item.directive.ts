import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[dDropDownMenuItem]',
  exportAs: 'd-dropdown-menu-item',
})
export class DropDownMenuItemDirective {
  @HostBinding('class.devui-dropdown-item') itemClass = true;
}
