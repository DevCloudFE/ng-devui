import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'd-demo-pagination',
  templateUrl: './pagination-demo.component.html',
})
export class PaginationDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') },
  ];

  additionalSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./additional/additional.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./additional/additional.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./additional/additional.component.css') },
  ];
  liteSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./lite/lite.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./lite/lite.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./lite/lite.component.scss') },
  ];
  widgetsSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./widgets/widgets.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./widgets/widgets.component.ts') },
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
