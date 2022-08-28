import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'd-demo-search',
  templateUrl: './search-demo.component.html',
})
export class SearchDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./basic/basic.component.css?raw') },
  ];

  iconLeftSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./icon-left/icon-left.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./icon-left/icon-left.component.ts?raw') },
  ];

  ngmodelDemoSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./ngmodel/ngmodel.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./ngmodel/ngmodel.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./ngmodel/ngmodel.component.css?raw') },
  ];

  autoFocusDemoSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./auto-focus/auto-focus.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./auto-focus/auto-focus.component.ts?raw') },
  ];

  searchDemoNoBorder: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./no-border/search-no-border.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./no-border/search-no-border.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./no-border/search-no-border.component.scss?raw') },
  ];
  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.search.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.search.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'icon-left', value: values['icon-left'] },
      { dAnchorLink: 'search-no-border', value: values['search-no-border'] },
      { dAnchorLink: 'bidirectional-binding', value: values['bidirectional-binding'] },
      { dAnchorLink: 'auto-focus', value: values['auto-focus'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
