import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox/devui-source-data';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-transfer-demo',
  templateUrl: './transfer-demo.component.html',
})
export class TransferDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('./basic/transfer-demo-base.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/transfer-demo-base.component.ts?raw') },
  ];
  customSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('./custom/transfer-demo-custom.component.html?raw') },
    { title: 'SCSS', language: 'css', code: require('./custom/transfer-demo-custom.component.scss?raw') },
    { title: 'TS', language: 'typescript', code: require('./custom/transfer-demo-custom.component.ts?raw') },
  ];
  searchSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('./search/transfer-demo-search.component.html?raw') },
    { title: 'SCSS', language: 'css', code: require('./search/transfer-demo-search.component.scss?raw') },
    { title: 'TS', language: 'typescript', code: require('./search/transfer-demo-search.component.ts?raw') },
  ];
  sortSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('./sort/transfer-demo-sort.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./sort/transfer-demo-sort.component.ts?raw') },
  ];

  TransferDemoVirtualScroll: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./virtual-scroll/transfer-virtual-scroll.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./virtual-scroll/transfer-virtual-scroll.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./virtual-scroll/transfer-virtual-scroll.component.scss?raw') },
  ];
  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.transfer.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.transfer.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'transfer-demo-base', value: values['transfer-demo-base'] },
      { dAnchorLink: 'transfer-demo-search', value: values['transfer-demo-search'] },
      { dAnchorLink: 'transfer-demo-sort', value: values['transfer-demo-sort'] },
      { dAnchorLink: 'transfer-demo-custom', value: values['transfer-demo-custom'] },
      { dAnchorLink: 'transfer-demo-virtual-scroll', value: values['transfer-demo-virtual-scroll']},
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
