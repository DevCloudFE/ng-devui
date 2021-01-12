import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'd-demo-input-number',
  templateUrl: './layout-demo.component.html',
})
export class LayoutDemoComponent implements OnInit, OnDestroy {
  LayoutBasic: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/layout-basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/layout-basic.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./basic/layout-basic.component.scss') },
  ];

  LayoutTop: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./top/top.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./top/top.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./top/top.component.scss') },
  ];

  LayoutTopAside: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./top-aside/top-aside.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./top-aside/top-aside.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./top-aside/top-aside.component.scss') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.layout.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.layout.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'application-scenario1', value: values['application-scenario1'] },
      { dAnchorLink: 'application-scenario2', value: values['application-scenario2'] }
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
