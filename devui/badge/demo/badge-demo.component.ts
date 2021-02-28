import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-badge-demo',
  templateUrl: './badge-demo.component.html',
})
export class BadgeDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./basic/basic.component.scss') },
  ];
  dotSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./dot/dot.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./dot/dot.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./dot/dot.component.scss') },
  ];
  countSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./count/count.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./count/count.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./count/count.component.scss') },
  ];
  statusSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./status/status.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./status/status.component.ts') },
  ];
  positionSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./position/position.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./position/position.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./position/position.component.scss') },
  ];
  customSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./custom/custom.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./custom/custom.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./custom/custom.component.scss') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.badge.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.badge.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'badge-basic', value: values['badge-basic'] },
      { dAnchorLink: 'badge-dot', value: values['badge-dot'] },
      { dAnchorLink: 'badge-count', value: values['badge-count'] },
      { dAnchorLink: 'badge-status', value: values['badge-status'] },
      { dAnchorLink: 'position', value: values['position'] },
      { dAnchorLink: 'custom', value: values['custom'] }
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
