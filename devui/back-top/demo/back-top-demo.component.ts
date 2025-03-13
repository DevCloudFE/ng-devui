import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'd-demo-back-top',
    templateUrl: './back-top-demo.component.html',
    standalone: false
})
export class BackTopDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./basic/basic.component.scss?raw') },
  ];
  customizeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./customize/customize.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./customize/customize.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./customize/customize.component.scss?raw') },
  ];
  scrollContainerSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./scroll-container/scroll-container.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./scroll-container/scroll-container.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./scroll-container/scroll-container.component.scss?raw') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.back-top.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.back-top.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'back-top-basic', value: values['back-top-basic'] },
      { dAnchorLink: 'back-top-customize', value: values['back-top-customize'] },
      { dAnchorLink: 'back-top-scroll-container', value: values['back-top-scroll-container'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
