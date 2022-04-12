import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'd-panel-body',
  template: `<ng-content></ng-content>`,
  preserveWhitespaces: false,
})
export class PanelBodyComponent {
  @HostBinding('class.d-panel-body') default = true;
}
