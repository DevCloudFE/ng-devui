import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'd-content',
    template: '<ng-content></ng-content>',
    styleUrls: ['./content.component.scss'],
    standalone: false
})
export class ContentComponent {
  @HostBinding('class.d-content') default = true;
}
