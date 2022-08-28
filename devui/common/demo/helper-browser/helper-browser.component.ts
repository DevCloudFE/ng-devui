import { Component, OnInit } from '@angular/core';
import { HelperUtils } from 'ng-devui';

@Component({
  selector: 'd-common-helper-browser',
  templateUrl: './helper-browser.component.html',
})
export class HelperBrowserComponent implements OnInit {
  browserName: string;
  browserVersion: number;

  constructor() {}

  ngOnInit() {
    this.browserName = HelperUtils.getBrowserName();
    this.browserVersion = HelperUtils.getBrowserVersion();
  }
}
