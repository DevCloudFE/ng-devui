import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox/devui-source-data';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'd-editable-select-demo',
  templateUrl: './editable-select-demo.component.html',
  styleUrls: [
    './editable-select-demo.component.scss'
  ]
})
export class EditableSelectDemoComponent implements OnInit, OnDestroy {
  BasicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/with-source.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/with-source.component.ts') },
  ];
  SearchFnSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./search-function/with-search-function.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./search-function/with-search-function.component.ts') },
  ];
  DisableDataSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./disable-data/disable-data-with-source.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./disable-data/disable-data-with-source.component.ts') },
  ];
  AsyncDataSearchFnSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./async-data-function/async-data-with-function.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./async-data-function/async-data-with-function.component.ts') },
  ];
  LazyLoadComponentSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./lazy-load/lazy-load.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./lazy-load/lazy-load.component.ts') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.editable-select.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.editable-select.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'disable-data-with-source', value: values['disable-data-with-source'] },
      { dAnchorLink: 'with-search-function', value: values['with-search-function'] },
      { dAnchorLink: 'async-data-with-function', value: values['async-data-with-function'] },
      { dAnchorLink: 'lazy-load', value: values['lazy-load'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
