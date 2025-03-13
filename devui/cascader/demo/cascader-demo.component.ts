import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'd-demo-cascader',
    templateUrl: './cascader-demo.component.html',
    standalone: false
})
export class CascaderDemoComponent implements OnInit, OnDestroy {
  cascaderBasicComponent = [
    { title: 'HTML', language: 'html', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
  ];

  cascaderMultipleComponent = [
    { title: 'HTML', language: 'html', code: require('./multiple-cascader/multiple-cascader.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./multiple-cascader/multiple-cascader.component.ts?raw') },
  ];

  cascaderSearchComponent = [
    { title: 'HTML', language: 'html', code: require('./search-cascader/search-cascader.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./search-cascader/search-cascader.component.ts?raw') },
  ];

  cascaderTempComponent = [
    { title: 'HTML', language: 'html', code: require('./template-cascader/template-cascader.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./template-cascader/template-cascader.component.ts?raw') },
  ];

  cascaderLazyloadComponent = [
    { title: 'HTML', language: 'html', code: require('./lazyload-cascader/lazyload-cascader.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./lazyload-cascader/lazyload-cascader.component.ts?raw') },
  ];

  cascaderParentSelectComponent = [
    { title: 'HTML', language: 'html', code: require('./parent-select-cascader/parent-select-cascader.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./parent-select-cascader/parent-select-cascader.component.ts?raw') },
  ];

  CascaderDemoHeaderTemplate: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./header-template/cascader-header-template.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./header-template/cascader-header-template.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./header-template/cascader-header-template.component.scss?raw') },
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
