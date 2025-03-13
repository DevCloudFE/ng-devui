import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
@Component({
    selector: 'd-demo-pagination',
    templateUrl: './pagination-demo.component.html',
    standalone: false
})
export class PaginationDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
  ];

  additionalSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./additional/additional.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./additional/additional.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./additional/additional.component.css?raw') },
  ];
  liteSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./lite/lite.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./lite/lite.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./lite/lite.component.scss?raw') },
  ];
  widgetsSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./widgets/widgets.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./widgets/widgets.component.ts?raw') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.pagination.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.pagination.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'minimalist-model', value: values['minimalist-model'] },
      { dAnchorLink: 'multiple-configurations', value: values['multiple-configurations'] },
      { dAnchorLink: 'exceptional-case', value: values['exceptional-case'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
