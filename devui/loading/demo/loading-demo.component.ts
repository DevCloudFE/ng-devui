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
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./basic/basic.component.scss') },
  ];

  customSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./custom/custom.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./custom/custom.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./custom/custom.component.scss') },
  ];

  promiseSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./promise/promise.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./promise/promise.component.ts') },
  ];
  loadingDemoSubscriptionSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./subscription/subscription.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./subscription/subscription.component.ts') },
  ];
  showLoadingSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./show-loading/show-loading.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./show-loading/show-loading.component.ts') },
    { title: 'SCSS', language: 'typescript', code: require('!!raw-loader!./show-loading/show-loading.component.scss') },
  ];
  fullScreenSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./full-screen/full-screen.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./full-screen/full-screen.component.ts') },
    { title: 'SCSS', language: 'typescript', code: require('!!raw-loader!./full-screen/full-screen.component.scss') },
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
