import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox/devui-source-data';
import { Subscription } from 'rxjs';
@Component({
  selector: 'd-demo-basic',
  templateUrl: './tags.input-demo.component.html',
})
export class TagsInputDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
  ];

  asyncSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./async/async.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./async/async.component.ts?raw') },
  ];

  ngModelSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./ngmodel/ngmodel.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./ngmodel/ngmodel.component.ts?raw') },
  ];

  virtualScrollSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./virtual-scroll/virtual-scroll.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./virtual-scroll/virtual-scroll.component.ts?raw') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.tags-input.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.tags-input.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'ng-model', value: values['ng-model'] },
      { dAnchorLink: 'async-input', value: values['async-input'] },
      { dAnchorLink: 'virtual-scroll', value: values['virtual-scroll'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
