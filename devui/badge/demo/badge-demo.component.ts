import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-badge-demo',
  templateUrl: './badge-demo.component.html',
})
export class BadgeDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./basic/basic.component.scss?raw') },
  ];
  dotSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./dot/dot.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./dot/dot.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./dot/dot.component.scss?raw') },
  ];
  countSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./count/count.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./count/count.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./count/count.component.scss?raw') },
  ];
  statusSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./status/status.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./status/status.component.ts?raw') },
  ];
  positionSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./position/position.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./position/position.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./position/position.component.scss?raw') },
  ];
  customSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./custom/custom.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./custom/custom.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./custom/custom.component.scss?raw') },
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
      { dAnchorLink: 'badge-count', value: values['badge-count'] },
      { dAnchorLink: 'badge-dot', value: values['badge-dot'] },
      { dAnchorLink: 'badge-status', value: values['badge-status'] },
      { dAnchorLink: 'position', value: values.position },
      { dAnchorLink: 'custom', value: values.custom },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
