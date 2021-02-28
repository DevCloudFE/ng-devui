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
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./basic/basic.component.css') },
  ];

  iconLeftSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./icon-left/icon-left.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./icon-left/icon-left.component.ts') },
  ];

  ngmodelDemoSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./ngmodel/ngmodel.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./ngmodel/ngmodel.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./ngmodel/ngmodel.component.css') },
  ];

  autoFocusDemoSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./auto-focus/auto-focus.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./auto-focus/auto-focus.component.ts') },
  ];

  searchDemoNoBorder: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./no-border/search-no-border.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./no-border/search-no-border.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./no-border/search-no-border.component.scss') },
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
