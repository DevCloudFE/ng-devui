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
    {
      title: 'HTML',
      language: 'xml',
      code: require('./basic/basic.component.html?raw'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('./basic/basic.component.ts?raw'),
    },
    {
      title: 'DATA',
      language: 'typescript',
      code: require('./demo-data.ts?raw'),
    },
  ];
  extendSource: Array<DevuiSourceData> = [
    {
      title: 'HTML',
      language: 'xml',
      code: require('./extend/extend.component.html?raw'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('./extend/extend.component.ts?raw'),
    },
    {
      title: 'DATA',
      language: 'typescript',
      code: require('./demo-data.ts?raw'),
    },
    {
      title: 'SCSS',
      language: 'css',
      code: require('./extend/extend.component.scss?raw'),
    },
  ];
  autoScrollSource: Array<DevuiSourceData> = [
    {
      title: 'HTML',
      language: 'xml',
      code: require('./auto-scroll/auto-scroll.component.html?raw'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('./auto-scroll/auto-scroll.component.ts?raw'),
    },
    {
      title: 'DATA',
      language: 'typescript',
      code: require('./demo-data.ts?raw'),
    },
  ];
  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}
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
      { dAnchorLink: 'basic-usage', value: values.basicDemo },
      { dAnchorLink: 'extend-template', value: values.extendDemo },
      { dAnchorLink: 'auto-scroll', value: values.autoScrollDemo },
    ];
  }
}
