import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { Subscription } from 'rxjs';
@Component({
  selector: 'd-demo-input-number',
  templateUrl: './layout-demo.component.html',
})
export class LayoutDemoComponent implements OnInit, OnDestroy {
  LayoutBasic: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/layout-basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/layout-basic.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./basic/layout-basic.component.scss?raw') },
  ];

  LayoutTop: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./top/top.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./top/top.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./top/top.component.scss?raw') },
  ];

  LayoutTopAside: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./top-aside/top-aside.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./top-aside/top-aside.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./top-aside/top-aside.component.scss?raw') },
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
