import { Component, HostBinding, ViewChild } from '@angular/core';
import { HelperUtils } from '../../helper-utils';

@Component({
  selector: 'd-common-helper-jump',
  templateUrl: './helper-jump.component.html',
})
export class HelperJumpDemoComponent {
  @ViewChild('btn2') btn;
  downError: string;
  constructor() {}

  goto() {
    HelperUtils.jumpOuterUrl('https://angular.io');
  }

  timeoutGoto() {
    const tempwindow = window.open();
    setTimeout(() => {
      tempwindow.location.href = 'https://angular.io';
    }, 3000);
  }
}
