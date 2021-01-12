import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-anchor-demo',
  templateUrl: './anchor-demo.component.html',
})
export class AnchorDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./basic/basic.component.scss') },
  ];

  asyncSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./async/async.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./async/async.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./async/async.component.scss') },
  ];
  hashSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./hash/hash.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./hash/hash.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./hash/hash.component.scss') },
  ];

  ScrollTargetSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./scroll-target/scroll-target.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./scroll-target/scroll-target.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./scroll-target/scroll-target.component.scss') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.anchor.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.anchor.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'asynchronous-loading', value: values['asynchronous-loading'] },
      { dAnchorLink: 'scroll-target', value: values['scroll-target'] },
      { dAnchorLink: 'support-hash', value: values['support-hash'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
