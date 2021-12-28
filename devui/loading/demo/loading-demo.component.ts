import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'd-demo-loading',
  templateUrl: './loading-demo.component.html',
})
export class LoadingDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./basic/basic.component.scss?raw') },
  ];

  customSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./custom/custom.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./custom/custom.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./custom/custom.component.scss?raw') },
  ];

  promiseSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./promise/promise.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./promise/promise.component.ts?raw') },
  ];
  loadingDemoSubscriptionSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./subscription/subscription.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./subscription/subscription.component.ts?raw') },
  ];
  showLoadingSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./show-loading/show-loading.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./show-loading/show-loading.component.ts?raw') },
    { title: 'SCSS', language: 'typescript', code: require('./show-loading/show-loading.component.scss?raw') },
  ];
  fullScreenSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./full-screen/full-screen.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./full-screen/full-screen.component.ts?raw') },
    { title: 'SCSS', language: 'typescript', code: require('./full-screen/full-screen.component.scss?raw') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.loading.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.loading.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'custom-style', value: values['custom-style'] },
      { dAnchorLink: 'multi-promise', value: values['multi-promise'] },
      { dAnchorLink: 'use-subscription-mode', value: values['use-subscription-mode'] },
      { dAnchorLink: 'show-loading', value: values['show-loading'] },
      { dAnchorLink: 'full-screen', value: values['full-screen'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
