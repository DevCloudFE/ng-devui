import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-category-search-demo',
  templateUrl: './category-search-demo.component.html',
})
export class CategorySearchDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') },
    { title: 'DATA', language: 'typescript', code: require('!!raw-loader!./demo-data.ts') },
  ];
  autoScrollSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./auto-scroll/auto-scroll.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./auto-scroll/auto-scroll.component.ts') },
    { title: 'DATA', language: 'typescript', code: require('!!raw-loader!./demo-data.ts') },
  ];
  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.category-search.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.category-search.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basicDemo'] },
      { dAnchorLink: 'auto-scroll', value: values['autoScrollDemo'] },
    ];
  }
}
