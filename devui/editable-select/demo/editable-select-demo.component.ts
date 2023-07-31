import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox/devui-source-data';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-editable-select-demo',
  templateUrl: './editable-select-demo.component.html',
  styleUrls: ['./editable-select-demo.component.scss'],
})
export class EditableSelectDemoComponent implements OnInit, OnDestroy {
  BasicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/with-source.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/with-source.component.ts?raw') },
  ];
  ObjectSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./object/object-source.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./object/object-source.component.ts?raw') },
  ];
  SearchFnSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./search-function/with-search-function.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./search-function/with-search-function.component.ts?raw') },
  ];
  DisableDataSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./disable-data/disable-data-with-source.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./disable-data/disable-data-with-source.component.ts?raw') },
  ];
  AsyncDataSearchFnSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./async-data-function/async-data-with-function.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./async-data-function/async-data-with-function.component.ts?raw') },
  ];
  LazyLoadComponentSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./lazy-load/lazy-load.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./lazy-load/lazy-load.component.ts?raw') },
  ];
  customAreaSourceData: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./custom-area/custom-area.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./custom-area/custom-area.component.ts?raw') },
    { title: 'SCSS', language: 'scss', code: require('./custom-area/custom-area.component.scss?raw') },
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
      { dAnchorLink: 'object-source', value: values['object-source'] },
      { dAnchorLink: 'disable-data-with-source', value: values['disable-data-with-source'] },
      { dAnchorLink: 'with-search-function', value: values['with-search-function'] },
      { dAnchorLink: 'async-data-with-function', value: values['async-data-with-function'] },
      { dAnchorLink: 'lazy-load', value: values['lazy-load'] },
      { dAnchorLink: 'custom-area-usage', value: values['custom-area-usage'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
