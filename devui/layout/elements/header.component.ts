import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'd-header',
    template: '<ng-content></ng-content>',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent {
  @HostBinding('class.d-header') default = true;
}
