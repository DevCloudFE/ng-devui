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
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./basic/transfer-demo-base.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/transfer-demo-base.component.ts') },
  ];
  customSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./custom/transfer-demo-custom.component.html') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./custom/transfer-demo-custom.component.scss') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./custom/transfer-demo-custom.component.ts') },
  ];
  searchSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./search/transfer-demo-search.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./search/transfer-demo-search.component.ts') },
  ];
  sortSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./sort/transfer-demo-sort.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./sort/transfer-demo-sort.component.ts') },
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
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
