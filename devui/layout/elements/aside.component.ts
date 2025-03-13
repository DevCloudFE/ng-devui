import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'd-aside',
    exportAs: 'dAside',
    template: '<ng-content></ng-content>',
    standalone: false
})
export class AsideComponent {
  @HostBinding('class.d-aside') default = true;
}
