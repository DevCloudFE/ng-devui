import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-multi-auto-complete-demo',
  templateUrl: './multi-auto-complete-demo.component.html',
  styleUrls: [
    './multi-auto-complete-demo.component.scss'
  ]
})
export class MultiAutoCompleteDemoComponent implements OnInit, OnDestroy {
  MultiAutoCompleteDemoDefault: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./default/multi-auto-complete-demo-default.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./default/multi-auto-complete-demo-default.component.ts?raw') },
  ];

  MultiAutoCompleteDemoArray: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./array/multi-auto-complete-demo-array.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./array/multi-auto-complete-demo-array.component.ts?raw') },
  ];

  MultiAutoCompleteDemoDisabled: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./disabled/multi-auto-complete-demo-disabled.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./disabled/multi-auto-complete-demo-disabled.component.ts?raw') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.multi-auto-complete.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.multi-auto-complete.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'auto-complete-array', value: values['auto-complete-array'] },
      { dAnchorLink: 'auto-complete-disabled', value: values['auto-complete-disabled'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
