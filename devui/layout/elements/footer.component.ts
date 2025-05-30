import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'd-footer',
    template: '<ng-content></ng-content>',
    styleUrls: ['./footer.component.scss'],
    standalone: false
})
export class FooterComponent {
  @HostBinding('class.d-footer') default = true;
}
