import { Component } from '@angular/core';
import { HelperUtils } from 'ng-devui/common';

@Component({
  selector: 'd-common-helper-jump',
  templateUrl: './helper-jump.component.html',
})
export class HelperJumpDemoComponent {
  downError: string;

  goto() {
    HelperUtils.jumpOuterUrl('//angular.io');
  }
}
