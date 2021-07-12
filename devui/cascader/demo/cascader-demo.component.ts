import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-demo-cascader',
  templateUrl: './cascader-demo.component.html',
})
export class CascaderDemoComponent implements OnInit, OnDestroy {
  cascaderBasicComponent = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') },
  ];

  cascaderMultipleComponent = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./multiple-cascader/multiple-cascader.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./multiple-cascader/multiple-cascader.component.ts') },
  ];

  cascaderSearchComponent = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./search-cascader/search-cascader.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./search-cascader/search-cascader.component.ts') },
  ];

  cascaderTempComponent = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./template-cascader/template-cascader.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./template-cascader/template-cascader.component.ts') },
  ];

  cascaderLazyloadComponent = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./lazyload-cascader/lazyload-cascader.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./lazyload-cascader/lazyload-cascader.component.ts') },
  ];

  cascaderParentSelectComponent = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./parent-select-cascader/parent-select-cascader.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./parent-select-cascader/parent-select-cascader.component.ts') },
  ];

  CascaderDemoHeaderTemplate: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./header-template/cascader-header-template.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./header-template/cascader-header-template.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./header-template/cascader-header-template.component.scss') },
  ];
  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.cascader.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.cascader.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'multiple-cascader', value: values['multiple-cascader'] },
      { dAnchorLink: 'search-cascader', value: values['search-cascader'] },
      { dAnchorLink: 'parent-cascader', value: values['parent-cascader'] },
      { dAnchorLink: 'template-cascader', value: values['template-cascader'] },
      { dAnchorLink: 'lazyload-cascader', value: values['lazyload-cascader'] },
      { dAnchorLink: 'cascader-header-template', value: values['cascader-header-template']},
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
